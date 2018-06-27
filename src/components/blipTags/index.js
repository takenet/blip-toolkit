import {
  BlipTag,
  blipTagSelectColorClass,
} from '../blipTag'
import { BlipSelect } from '../blipSelect'
import { EventEmitter } from '@lib/eventEmitter'
import {
  strToEl,
  last,
  guid,
  insertAfter,
} from '@lib/utils'
import { blipSelectOptionClass } from '../blipSelect/blipSelectBase'

const blipSelectPrefixClass = 'blip-select'
const blipTagsClass = 'blip-tags'
const blipTagOnListClass = 'blip-tag--on-list'
const blipTagLabelOptionClass = 'blip-tag__label-option'

export class BlipTags {
  $state = {
    addTagText: 'Add tag',
    mode: 'full', // can be 'full' or 'compact'
    canChangeBackground: true,
    toggleTagsMode: false,
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
    switch (this.tagsOptions.mode) {
      case 'full':
        this._setupFullMode()
        break
      case 'compact':
        this._setupCompactMode()
        break
    }

    this.element.appendChild(this.tagsContainer)
    this.bindTagsIfExists()
  }

  /**
   * Setup BlipTags in full mode
   */
  _setupFullMode() {
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
    this._handleSanitizeNewOption = this._sanitizeNewOption.bind(this)
    this._handleCustomSearch = this._customOptionsSearch.bind(this)

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
        newOption: this._handleSanitizeNewOption,
        customSearch: this._handleCustomSearch,
      })

    if (this.tagsOptions.canChangeBackground) {
      this.blipSelectInstance._arrayToDomOptions = this._overrideSelectDomOptions.bind(this.blipSelectInstance)
    }
  }

  /**
   * Sanitize new option
   */
  _sanitizeNewOption({ $event }) {
    const { context } = $event
    const label = context.input.value

    return {
      value: '#2cc3d5',
      label,
    }
  }

  /**
   * Custom options search
   */
  _customOptionsSearch({ $event }) {
    const { query } = $event
    const searchResults = this.tags.filter(t => t.label.toLowerCase().includes(query.toLowerCase()))

    return searchResults.map(({ label, tagBackground: value }) => ({ label, value }))
  }

  /**
   * Setup BlipTags in compact mode
   */
  _setupCompactMode() {
    this.tagsContainer = strToEl(`
      <div class="${blipTagsClass}"></div>
    `)
  }

  /**
   * Bind pre-defined tags if exists
   */
  bindTagsIfExists() {
    if (this.tagsOptions.tags.length > 0) {
      switch (this.tagsOptions.mode) {
        case 'full':
          this.bulkInsertTags(this.tagsOptions.tags)
          break
        case 'compact':
          this.bulkInsertCompactTags(this.tagsOptions.tags)
          break
      }
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
  _onSelectOption({ $event }) {
    this.blipSelectInstance.clearInput()

    const { label, value } = $event
    const tag = new BlipTag({ label, background: value, canChangeBackground: false })
    this.addTag(tag)
  }

  /**
   * On add option callback from BlipSelect
   * @param {EventEmitter} obj - Object that contains option object of BlipSelect component
   */
  _onAddNewOption({ $event }) {
    const { label, id } = $event

    const tag = new BlipTag({ label, id, canChangeBackground: this.tagsOptions.canChangeBackground })
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
   * Insert tag into DOM
   */
  insertTagIntoDom(tag) {
    if (this.tags.length === 0) {
      this.tagsContainer.prepend(tag.element)
    } else {
      const lastElement = last(this.tags).element
      insertAfter(tag.element, lastElement)
    }

    this.tags = this.tags.concat(tag)
  }

  /**
   * Insert multiple tags from array (in compact mode)
   * @param {Array} tags - { label: string, background: string }
   */
  bulkInsertCompactTags(tags) {
    tags.map(({ label, background }) => {
      const tag = new BlipTag({
        label,
        background,
        canChangeBackground: false,
        canRemoveTag: false,
        toggleCollapse: false,
        onTagClick: this.onTagClick.bind(this),
        mode: 'compact',
        classes: `${blipTagOnListClass} `,
      })

      // Insert tag element into DOM
      this.insertTagIntoDom(tag)
    })
  }

  /**
   * Insert multiple tags from array
   * @param {Array} tags - { label: string, background: string, id: string }
   */
  bulkInsertTags(tags) {
    tags.map(({ label, background, id }) => {
      const tag = new BlipTag({
        label,
        [background ? 'background' : '']: background,
        [id ? 'id' : '']: id,
        canChangeBackground: false,
        onRemove: this._removeTag.bind(this),
        onSelectColor: this._onSelectTagColor.bind(this),
        classes: `${blipTagOnListClass}`,
      })

      // Insert tag element into DOM
      this.insertTagIntoDom(tag)
      this.blipSelectInstance.addNewOption({
        label: tag.label,
        value: tag.tagOptions.background,
      }, false)
    })
  }

  /**
   * Add tag on DOM and tags array
   * @param {BlipTag} tag - tag instance
   */
  addTag(tagInstance, focusOnInput) {
    const {
      id,
      label,
      canChangeBackground,
      tagOptions: { background },
    } = tagInstance

    const tag = new BlipTag({
      id,
      label,
      canChangeBackground,
      background,
      onRemove: this._removeTag.bind(this),
      onSelectColor: this._onSelectTagColor.bind(this),
      classes: `${blipTagOnListClass}`,
    })

    // Hide last tag color options if I can
    this._hideLastTagOptions()

    // Insert tag element into DOM
    this.insertTagIntoDom(tag)

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

  /**
   * Handle select color callback
   * @param {EventEmitter} emitter - emitter obj
   */
  _onSelectTagColor(emitter) {
    this.tagsOptions.onSelectTagColor.call(this, emitter)
  }

  /**
   * Handle tag click
   */
  onTagClick({ $event }) {
    if (this.tagsOptions.toggleTagsMode) {
      this.tags.forEach(t => t.toggleCollapse())
    }
  }

  /**
   * Override BlipSelect '_arrayToDomOptions' method due to customize generated options
   * Scope: the blip select instance
   * @override
   * @param {Array} options - Options array
   */
  _overrideSelectDomOptions(options = [{ value: '', label: '', id: '' }]) {
    // Reset HTML content
    this.selectOptionsContainer.innerHTML = ''

    // Add options to container
    options.forEach(({ value, label, id }) => {
      this.selectOptionsContainer.appendChild(
        strToEl(`
          <li tabindex="0" class="${blipSelectOptionClass}" id="${id}" data-label="${label}" data-value="${value}">
            <span class="${blipTagLabelOptionClass}" style="background: ${value}">${label}</span>
          </li>
        `)
      )
    })

    this._setupOptionsEventHandlers()
  }
}
