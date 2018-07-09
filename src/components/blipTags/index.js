import Nanocomponent from 'nanocomponent'
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

const blipSelectPrefixClass = 'blip-select'
const blipTagsClass = 'blip-tags'

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
    this._handleInputKeyup = this._onInputKeyup.bind(this)
    this._handleSelectOption = this._onSelectOption.bind(this)
    this._handleBlipSelectBlur = this._onSelectBlur.bind(this)
    this._handleCustomSearch = this._customOptionsSearch.bind(this)

    this.blipSelectInstance = new BlipSelect({
      mode: 'autocomplete',
      canAddOption: {
        text: this.tagsOptions.promptTextCreator,
      },
      onAddOption: this._handleAddNewOption,
      onSelectOption: this._handleSelectOption,
      onInputKeyup: this._handleInputKeyup,
      onBlur: this._handleBlipSelectBlur,
      optionCreator: TagOption,
    })

    this.props = {
      tags: [],
      options: [],
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
  update() {
    return true
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

      if (event && event.keyCode === 8) {
        const tagsElement = this.element.querySelectorAll('.blip-tag-container .blip-tag')
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
    const { query } = $event
    const searchResults = this.tags.filter(t => t.label.toLowerCase().includes(query.toLowerCase()))

    return searchResults.map(({ label, tagBackground: value }) => ({ label, value }))
  }

  /**
   * Handle BlipSelect blur
   */
  _onSelectBlur(event) {}

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
            const tagsElement = this.element.querySelectorAll('.blip-tag-container .blip-tag')

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
      options: this.props.options,
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
}
