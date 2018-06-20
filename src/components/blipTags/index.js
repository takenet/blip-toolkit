import { BlipTag } from '../blipTag'
import { BlipSelect } from '../blipSelect'
import { EventEmitter } from '@lib/eventEmitter'
import { strToEl, last, guid } from '@lib/utils'

export class BlipTags {
  $state = {
    onTagAdded: () => {},
    onTagRemoved: () => {},
  }

  constructor(element, options) {
    this.element = element
    this.tagsList = ''
    this.tags = []
    this.blipSelectId = `blip-select-${guid()}`

    this.tagsOptions = {
      ...this.$state,
      ...options,
    }

    this._setup()
    this._setupEventHandlers()
  }

  /**
   * Setup tags element
   */
  _setup() {
    this.tagsContainer = strToEl(`
      <div class="blip-tags">
        <div class="blip-tags-list"></div>
        <select id="${this.blipSelectId}"></select>
        <button data-add-tag type="button">+</button>
      </div>
    `)

    const selectElement = this.tagsContainer.querySelector(`#${this.blipSelectId}`)
    this._handleAddNewOption = this._onAddNewOption.bind(this)
    this.blipSelectInstance = new BlipSelect(
      selectElement,
      {
        mode: 'autocomplete',
        canAddOption: {
          text: 'Criar tag',
        },
        onAddNewOption: this._handleAddNewOption,
      })

    this.tagsList = this.tagsContainer.querySelector('.blip-tags-list')
    this.element.appendChild(this.tagsContainer)
  }

  /**
   * Setup event handlers
   */
  _setupEventHandlers() {
    const addButton = this.tagsContainer.querySelector('button[data-add-tag]')
    this._handleAddButtonClick = this._addTag.bind(this, 'Tag')
    addButton.addEventListener('click', this._handleAddButtonClick)
  }

  /**
   * On add option callback from BlipSelect
   */
  _onAddNewOption({ $event }) {
    const { label } = $event

    this._addTag(label)
  }

  /**
   * Add tag on DOM and tags array
   * @param {String} label - tag label
   */
  _addTag(label) {
    const tag = new BlipTag({
      label,
      onRemove: this._removeTag.bind(this),
    })

    if (this.tags.length > 0) {
      const lastTag = last(this.tags)
      lastTag.hideColorOptions()
    }

    this.tags = this.tags.concat(tag)
    this.tagsList.appendChild(tag.element)

    this.tagsOptions.onTagAdded.call(this, EventEmitter({ tag }))
  }

  /**
   * Remove tag from list and dom
   * @param {EventEmitter} obj - object that contais tag object of BlipTag component
   */
  _removeTag({ $event }) {
    const { tag } = $event

    this.tags = this.tags.filter(t => t.tagOptions.id !== tag.id)
    this.tagsOptions.onTagRemoved.call(this, EventEmitter({ tag }))
  }
}
