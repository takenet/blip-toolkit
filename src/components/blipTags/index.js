import Component from 'nanocomponent'
import html from 'nanohtml'

import {
  BlipTag,
  defaultTagBackground,
} from '../blipTag'
import { BlipSelect } from '../blipSelect'
import { EventEmitter } from '@lib/eventEmitter'
import {
  last,
  guid,
} from '@lib/utils'

import { TagOption } from './TagOption'
import { compose } from '../shared'
import { differenceByLabel } from '../../lib/utils'

// Utils
const hideBackgroundOptions = t => ({ ...t, canChangeBackground: false })
const addIdIfNotExists = t => t.id ? t : ({ ...t, id: `blip-tag-${guid()}` })
const addBackgroundIfNotExists = t => t.background ? t : ({ ...t, background: defaultTagBackground })

export class BlipTags extends Component {
  $state = {
    promptTextCreator: 'Create tag',
    placeholder: 'Add tag...',
    mode: 'full', // can be 'full' or 'compact'
    canChangeBackground: true,
    toggleTagsMode: false,
    canRemoveTags: true,
    canAddOptions: true,
    onTagAdded: () => {},
    onTagRemoved: () => {},
    onSelectTagColor: () => {},
    onTagClick: () => {},
  }

  constructor(options) {
    super()

    this.selectElement = ''
    this.blipSelectId = `blip-select-${guid()}`
    this.inputBuffer = ''

    this.tagsOptions = {
      ...this.$state,
      ...options,
    }

    this._handleAddNewOption = this.addTag.bind(this)
    this._handleInputKeyup = this._onInputKeyup.bind(this)
    this._handleSelectOption = this._onSelectOption.bind(this)
    this._handleBlipSelectBlur = this._onSelectBlur.bind(this)
    this._handleBlipSelectFocus = this._onSelectFocus.bind(this)
    this._handleCustomSearch = this._customOptionsSearch.bind(this)
    this._handleWrapperClick = this._onWrapperClick.bind(this)
    this._handleWrapperEnter = this._onWrapperEnter.bind(this)
    this._handleWrapperLeave = this._onWrapperLeave.bind(this)

    if (this.tagsOptions.mode === 'full') {
      this.blipSelectInstance = new BlipSelect({
        mode: 'autocomplete',
        canAddOptions: this.tagsOptions.canAddOptions
          ? {
            text: this.tagsOptions.promptTextCreator,
          }
          : false,
        onAddOption: this._handleAddNewOption,
        onSelectOption: this._handleSelectOption,
        onInputKeyup: this._handleInputKeyup,
        onBlur: this._handleBlipSelectBlur,
        onFocus: this._handleBlipSelectFocus,
        customSearch: this._handleCustomSearch,
        optionCreator: TagOption,
        placeholder: this.tagsOptions.placeholder,
      })
    }

    this.addGlobalListeners()

    this.props = {
      tags: [],
      options: [],
    }
  }

  /**
   * Options view list
   */
  get optionsList() {
    return this.props.options.filter(differenceByLabel(this.props.tags)) || []
  }

  /**
   * Click to focus on input
   */
  _onWrapperClick(event) {
    const target = event.target
    if (target && this.blipSelectInstance) {
      this.blipSelectInstance.input.onclick(event)
    }
  }

  _onWrapperEnter() {
    if (this.blipSelectInstance) {
      this.blipSelectInstance.render({
        isParentHighlighted: true,
      })
    }
  }

  _onWrapperLeave() {
    if (this.blipSelectInstance) {
      this.blipSelectInstance.render({
        isParentHighlighted: false,
      })
    }
  }

  /**
   * Setup blip tags view
   */
  createElement(props) {
    const { tags, options } = props
    const normalizedTags = tags
      ? tags.map(compose(addIdIfNotExists, addBackgroundIfNotExists))
      : this.props.tags
    const normalizedOptions = options
      ? options.map(compose(addIdIfNotExists, addBackgroundIfNotExists))
      : this.props.options

    this.props = {
      ...this.props,
      ...props,
      tags: normalizedTags,
      options: normalizedOptions,
    }

    const renderTag = t => new BlipTag({
      canRemoveTag: this.tagsOptions.canRemoveTags,
      onSelectColor: this._onSelectTagColor.bind(this),
      onRemove: this._handleRemoveTag.bind(this),
      onTagClick: this._onTagClick.bind(this),
    }).render(({
      ...t,
      collapsed: this.tagsOptions.mode === 'compact',
    }))

    const shouldRenderSelect = () => this.tagsOptions.mode === 'full'

    if (shouldRenderSelect()) {
      return html`
        <div class="blip-tags"
          onclick=${this._handleWrapperClick}
          onmouseenter=${this._handleWrapperEnter}
          onmouseleave="${this._handleWrapperLeave}">
          ${this.props.tags.map(renderTag)}
          ${this.blipSelectInstance.render({ options: this.optionsList })}
        </div>
      `
    }

    return html`
      <div class="blip-tags blip-tags--compact-mode">
        ${this.props.tags.map(renderTag)}
      </div>
    `
  }

  /**
   * Update component callback
   * @param {Object} props
   */
  update() {
    return true
  }

  /**
   * Called when the component is removed from the DOM
   */
  unload() {
    document.removeEventListener('click', this.handleCloseColors)
  }

  /**
   * Global event listeners
   */
  addGlobalListeners() {
    this.handleCloseColors = (event) => {
      if (
        event.target &&
        (
          event.target.classList.contains('blip-tag-select-color') ||
          event.target.classList.contains('blip-select__add-option') ||
          event.target.classList.contains('blip-new-option-text') ||
          event.target.classList.contains('blip-prompt-add-option')
        )
      ) {
        return
      }

      if (this.props.tags.some(t => t.canChangeBackground)) {
        this.render({
          tags: this.props.tags.map(hideBackgroundOptions),
        })
      }
    }

    document.addEventListener('click', this.handleCloseColors.bind(this))
  }

  /**
   * Handle tag remove
   */
  _handleRemoveTag({ $event }) {
    const { tag, event } = $event
    if (tag) {
      const newTags = this.props.tags.filter(t => t.id !== tag.props.id)

      this.render({
        tags: newTags,
      })

      this.tagsOptions.onTagRemoved.call(this, EventEmitter({ $event }))

      if (event && event.keyCode === 8) {
        const tagsElement = this.element.querySelectorAll('.blip-tag-wrapper .blip-tag')
        if (tagsElement.length > 0) {
          last([...tagsElement]).focus()
        } else {
          this.blipSelectInstance.input.focus()
        }
      }
    }
  }

  /**
   * Custom options search
   */
  _customOptionsSearch({ $event }) {
    const { query, items } = $event
    const lowerCaseQuery = query.toLowerCase()
    const searchResults = items.filter(({ label }) => label.toLowerCase().includes(lowerCaseQuery))

    if (
      this.props.tags.some(t => t.label.toLowerCase() === lowerCaseQuery)
    ) {
      this.blipSelectInstance.render({
        blockNewEntries: true,
        emptyMessage: 'Tag já adicionada',
      })
    } else {
      this.blipSelectInstance.render({
        blockNewEntries: false,
      })
    }

    return searchResults
  }

  /**
   * Handle BlipSelect blur
   */
  _onSelectBlur(event) {
    this.element.classList.remove('bp-input-wrapper--focus')
  }

  /**
   * Handle BlipSelect focus
   */
  _onSelectFocus(event) {
    this.element.classList.add('bp-input-wrapper--focus')
  }

  /**
   * Handle select option
   * @param {EventEmitter} emitter - EventEmitter object
   */
  _onSelectOption({ $event }) {
    const { optionProps } = $event
    this.blipSelectInstance.clearInput()

    if (this.props.tags.some(t => t.label === optionProps.label)) {
      this.blipSelectInstance.input.focus()
      return
    }

    this.render({
      tags: this.props.tags.concat(optionProps),
    })

    this.blipSelectInstance.input.focus()
    this.tagsOptions.onTagAdded.call(this, EventEmitter({ tag: optionProps }))
  }

  /**
   * Handle BlipSelect input change
   */
  _onInputKeyup({ $event }) {
    const { event, value } = $event
    const currentInputBuffer = this.inputBuffer
    this.inputBuffer = value

    switch (event.keyCode) {
      case 8: // backspace
        if (currentInputBuffer === '') {
          if (this.props.tags.length > 0) {
            const tagsElement = this.element.querySelectorAll('.blip-tag-wrapper .blip-tag')
            last([...tagsElement]).focus()
          }
        }
        break
    }
  }

  /**
   * Add tag on DOM and tags array
   * @param {BlipTag} tag - tag instance
   */
  addTag({ $event }) {
    const { newOption } = $event

    if (this.props.options.some(t => t.label === newOption.label)) {
      return
    }

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
   * Handle select color callback
   * @param {EventEmitter} emitter - emitter obj
   */
  _onSelectTagColor(emitter) {
    const { $event: { tag } } = emitter
    const addNewBackground = newTag => currentTag =>
      currentTag.id === newTag.props.id
        ? ({
          ...currentTag,
          canChangeBackground: false,
          background: newTag.props.background,
        })
        : currentTag

    this.props.tags = this.props.tags.map(addNewBackground(tag))
    this.props.options = this.props.options.map(addNewBackground(tag))

    this.blipSelectInstance.render({
      options: this.optionsList,
    })

    this.tagsOptions.onSelectTagColor.call(this, emitter)
  }

  /**
   * Handle tag click
   */
  _onTagClick({ $event }) {
    if (this.tagsOptions.toggleTagsMode) {
      const tagElements = [...this.element.querySelectorAll('.blip-tag-wrapper')]

      tagElements.forEach(t => {
        if (t.classList.contains('blip-tag--compact')) {
          t.classList.remove('blip-tag--compact')
        } else {
          t.classList.add('blip-tag--compact')
        }
      })
    }

    this.tagsOptions.onTagClick.call(this, EventEmitter({ ...$event }))
  }
}
