import { BlipTag, blipTagSelectColorClass } from '../blipTag'
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
    tags: [],
    onTagAdded: () => {},
    onTagRemoved: () => {},
    onSelectTagColor: () => {},
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
   * Get last tag
   */
  get lastTag() {
    return last(this.tags)
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
    this._handleSelectOption = this._onSelectOption.bind(this)
    this._handleBlipSelectBlur = this._onSelectBlur.bind(this)

    this.blipSelectInstance = new BlipSelect(
      this.selectElement,
      {
        mode: 'autocomplete',
        canAddOption: {
          text: this.tagsOptions.addTagText,
        },
        onAddNewOption: this._handleAddNewOption,
        onSelectOption: this._handleSelectOption,
        onInputChange: this._handleInputChange,
        onBlur: this._handleBlipSelectBlur,
      })

    this.element.appendChild(this.tagsContainer)
    this.bindTagsIfExists()
  }

  /**
   * Bind pre-defined tags if exists
   */
  bindTagsIfExists() {
    if (this.tagsOptions.tags.length > 0) {
      this.tagsOptions.tags.map(options => {
        const tag = new BlipTag({ ...options })
        this.addTag(tag, false)
      })
    }
  }

  /**
   * Handle BlipSelect blur
   */
  _onSelectBlur(event) {
    if (event.relatedTarget && event.relatedTarget.classList.contains(blipTagSelectColorClass)) {
      return
    }

    this._hideLastTagOptions()
  }

  /**
   * Handle select option
   * @param {EventEmitter} emitter - EventEmitter object
   */
  _onSelectOption(emitter) {
    this.blipSelectInstance.clearInput()
    this._onAddNewOption(emitter)
  }

  /**
   * On add option callback from BlipSelect
   * @param {EventEmitter} obj - object that contais option object of BlipSelect component
   */
  _onAddNewOption({ $event }) {
    const { label } = $event

    const tag = new BlipTag({ label })
    this.addTag(tag)
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
            last(this.tags).tagElement.focus()
          }
        }
        break
    }
  }

  /**
   * Hide last tag color options
   */
  _hideLastTagOptions() {
    if (this.tags.length > 0) {
      if (this.lastTag.canChangeBackground) {
        this.lastTag.hideColorOptions()
      }
    }
  }

  /**
   * Add tag on DOM and tags array
   * @param {BlipTag} tag - tag instance
   */
  addTag(tagInstance, focusOnInput) {
    const {
      label,
      canChangeBackground,
      tagOptions: { background },
    } = tagInstance

    const tag = new BlipTag({
      label,
      canChangeBackground,
      background,
      onRemove: this._removeTag.bind(this),
      onSelectColor: this.tagsOptions.onSelectTagColor,
      classes: `${blipTagOnListClass}`,
    })

    // Hide last tag color options if I can
    this._hideLastTagOptions()

    if (this.tags.length === 0) {
      this.tagsContainer.prepend(tag.element)
    } else {
      const lastElement = last(this.tags).element
      insertAfter(tag.element, lastElement)
    }

    this.tags = this.tags.concat(tag)
    if (focusOnInput) {
      this.blipSelectInstance.input.focus()
    }

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
      last(this.tags).tagElement.focus()
    } else {
      this.blipSelectInstance.input.focus()
    }
  }
}
