import Nanocomponent from 'nanocomponent'
import html from 'nanohtml'

import {
  BlipTag,
  blipTagSelectColorClass,
  defaultTagBackground,
} from '../blipTag'
import { BlipSelect, blipSelectOptionClass } from '../blipSelect'
import { EventEmitter } from '@lib/eventEmitter'
import {
  strToEl,
  last,
  guid,
  insertAfter,
} from '@lib/utils'

import { TagOption } from './TagOption'
import { compose } from '../shared'

const blipSelectPrefixClass = 'blip-select'
const blipTagsClass = 'blip-tags'
const blipTagOnListClass = 'blip-tag--on-list'
const blipTagLabelOptionClass = 'blip-tag__label-option'

// Utils
const hideBackgroundOptions = t => ({ ...t, canChangeBackground: false })
const addIdIfNotExists = t => t.id ? t : ({ ...t, id: `blip-tag-${guid()}` })
const addBackgroundIfNotExists = t => t.background ? t : ({ ...t, background: defaultTagBackground })

export class BlipTags extends Nanocomponent {
  $state = {
    promptTextCreator: 'Add tag',
    mode: 'full', // can be 'full' or 'compact'
    canChangeBackground: true,
    toggleTagsMode: false,
    onTagAdded: () => {},
    onTagRemoved: () => {},
    onSelectTagColor: () => {},
  }

  constructor(options) {
    super()

    this.selectElement = ''
    this.blipSelectId = `${blipSelectPrefixClass}-${guid()}`
    this.inputBuffer = ''

    this.tagsOptions = {
      ...this.$state,
      ...options,
    }

    this._handleAddNewOption = this.addTag.bind(this)
    this._handleInputChange = this._onInputChange.bind(this)
    this._handleSelectOption = this._onSelectOption.bind(this)
    this._handleBlipSelectBlur = this._onSelectBlur.bind(this)
    this._handleSanitizeNewOption = this._sanitizeNewOption.bind(this)
    this._handleCustomSearch = this._customOptionsSearch.bind(this)

    this.blipSelectInstance = new BlipSelect({
      mode: 'autocomplete',
      canAddOption: {
        text: this.tagsOptions.promptTextCreator,
      },
      onAddOption: this._handleAddNewOption,
      // onSelectOption: this._handleSelectOption,
      onInputChange: this._handleInputChange,
      onBlur: this._handleBlipSelectBlur,
      newOption: this._handleSanitizeNewOption,
      optionCreator: TagOption,
    })

    this.props = {
      tags: [],
      options: [],
    }
  }

  /**
   * Get last tag
   */
  get lastTag() {
    return last(this.tags)
  }

  /**
   * Setup blip tags view
   */
  createElement(props) {
    const { tags, options } = props
    const normalizedTags = tags ? tags.map(compose(addIdIfNotExists, addBackgroundIfNotExists)) : []
    const normalizedOptions = options ? options.map(compose(addIdIfNotExists, addBackgroundIfNotExists)) : []

    this.props = {
      ...this.props,
      ...props,
      tags: normalizedTags,
      options: normalizedOptions,
    }

    const renderTag = t => new BlipTag({
      canRemoveTag: true,
      onSelectColor: this._onSelectTagColor.bind(this),
      onRemove: this._handleRemoveTag.bind(this),
    }).render(t)

    return html`
      <div class="${blipTagsClass}">
        ${this.props.tags.map(renderTag)}
        ${this.blipSelectInstance.render({ options: this.props.options })}
      </div>
    `
  }

  /**
   * Update component callback
   * @param {Object} props
   */
  update(props) {
    return true
  }

  /**
   * Handle tag remove
   */
  _handleRemoveTag({ $event }) {
    const { tag } = $event

    if (tag) {
      const newTags = this.props.tags.filter(t => t.id !== tag.props.id)

      this.render({
        tags: newTags,
      })
    }
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
    this._handleAddNewOption = this.addTag.bind(this)
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
          text: this.tagsOptions.promptTextCreator,
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
    const { label, background } = $event
    const newOption = { label, background }
    this.blipSelectInstance.clearInput()

    this.addTag(EventEmitter({ newOption }))
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
          if (this.props.tags.length > 0) {
            const tagsElement = this.element.querySelectorAll('.blip-tag-container .blip-tag')

            last([...tagsElement]).focus()
          }
        }
        break
    }
  }

  /**
   * Hide last tag color options
   */
  _hideLastTagOptions() {
    // if (this.props.tags.length > 0 && this.props.tags.some(t => t.canChangeBackground)) {
    //   this.render({
    //     tags: this.props.tags.map(t => ({...t, canChangeBackground: false})),
    //   })
    // }
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
  addTag({ $event }) {
    const { newOption } = $event

    const newTags = this.props.tags
      .map(hideBackgroundOptions) // Hide last background options
      .concat({
        ...newOption,
        canChangeBackground: this.tagsOptions.canChangeBackground,
      }) // Add new tag

    this.render({
      tags: newTags,
      options: this.props.options.concat({ ...newOption }),
    })

    this.blipSelectInstance.input.focus()
    this.tagsOptions.onTagAdded.call(this, EventEmitter({ tag: newOption }))
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
    const { $event: { tag } } = emitter
    this.render({
      tags: this.props.tags.map(t =>
        t.id === tag.props.id
          ? ({
            ...t,
            canChangeBackground: false,
            background: tag.props.background,
          })
          : t
      ),
    })

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
