import { BlipTag } from '../blipTag'
import { BlipSelect } from '../blipSelect'
import { EventEmitter } from '@lib/eventEmitter'
import {
  strToEl,
  last,
  guid,
  insertAfter,
} from '@lib/utils'

const blipSelectPrefixClass = 'blip-select'
const blipTagsClass = 'blip-tags'
const blipTagOnListClass = 'blip-tag--on-list'

export class BlipTags {
  $state = {
    addTagText: 'Add tag',
    onTagAdded: () => {},
    onTagRemoved: () => {},
  }

  constructor(element, options) {
    this.element = element
    this.selectElement = ''
    this.tags = []
    this.blipSelectId = `${blipSelectPrefixClass}-${guid()}`
    this.inputBuffer = ''

    this.tagsOptions = {
      ...this.$state,
      ...options,
    }

    this._setup()
  }

  /**
   * Setup tags element
   */
  _setup() {
    this.tagsContainer = strToEl(`
      <div class="${blipTagsClass}">
        <select id="${this.blipSelectId}"></select>
      </div>
    `)

    this.selectElement = this.tagsContainer.querySelector(`#${this.blipSelectId}`)
    this._handleAddNewOption = this._onAddNewOption.bind(this)
    this._handleInputChange = this._onInputChange.bind(this)
    this.blipSelectInstance = new BlipSelect(
      this.selectElement,
      {
        mode: 'autocomplete',
        canAddOption: {
          text: this.tagsOptions.addTagText,
        },
        onAddNewOption: this._handleAddNewOption,
        onSelectOption: (emitter) => {
          this.blipSelectInstance.clearInput()
          this._onAddNewOption(emitter)
        },
        onInputChange: this._handleInputChange,
      })

    this.element.appendChild(this.tagsContainer)
  }

  /**
   * On add option callback from BlipSelect
   * @param {EventEmitter} obj - object that contais option object of BlipSelect component
   */
  _onAddNewOption({ $event }) {
    const { label } = $event

    this._addTag(label)
  }

  /**
   * Handle BlipSelect input change
   */
  _onInputChange({ $event }) {
    const { event, value } = $event
    const currentInputBuffer = this.inputBuffer
    this.inputBuffer = value

    switch (event.keyCode) {
      case 8: // backspace
        if (currentInputBuffer === '') {
          if (this.tags.length > 0) {
            last(this.tags).element.focus()
          }
        }
        break
    }
  }

  /**
   * Add tag on DOM and tags array
   * @param {String} label - tag label
   */
  _addTag(label) {
    const tag = new BlipTag({
      label,
      canChangeBackground: true,
      onRemove: this._removeTag.bind(this),
      classes: `${blipTagOnListClass}`,
    })

    if (this.tags.length > 0 && tag.canChangeBackground) {
      const lastTag = last(this.tags)
      lastTag.hideColorOptions()
    }

    if (this.tags.length === 0) {
      this.tagsContainer.prepend(tag.element)
    } else {
      const lastElement = last(this.tags).element
      insertAfter(tag.element, lastElement)
    }

    this.tags = this.tags.concat(tag)
    this.blipSelectInstance.input.focus()

    this.tagsOptions.onTagAdded.call(this, EventEmitter({ tag }))

    return tag
  }

  /**
   * Remove tag from list and dom
   * @param {EventEmitter} obj - object that contais tag object of BlipTag component
   */
  _removeTag({ $event }) {
    const { tag, backspace } = $event
    this.tags = this.tags.filter(t => t.tagOptions.id !== tag.id)
    this.tagsOptions.onTagRemoved.call(this, EventEmitter({ tag }))

    if (backspace && this.tags.length > 0) {
      last(this.tags).element.focus()
    } else {
      this.blipSelectInstance.input.focus()
    }
  }
}
