import { strToEl, guid } from '@lib/utils'
import { EventEmitter } from '@lib/eventEmitter'

const ANIMATION_TIMEOUT = 300

const blipTagContainerClass = 'blip-tag-container'
const blipTagClass = 'blip-tag'
const blipTagLabelClass = 'blip-tag__label'
const blipTagRemoveClass = 'blip-tag__remove'
const blipTagColorOptionClass = 'blip-tag-color-option'
const blipTagCanRemoveClass = 'blip-tag--can-remove'
export const blipTagSelectColorClass = 'blip-tag-select-color'
export const blipTagCompactClass = 'blip-tag--compact'

// Color options
const colorOption1 = '#0CC7CB'
const colorOption2 = '#FF4A1E'
const colorOption3 = '#FF6F1E'
const colorOption4 = '#FF961E'
const colorOption5 = '#1EDEFF'
const colorOption6 = '#1EA1FF'
const colorOption7 = '#61D36F'
const colorOption8 = '#37C5AB'
const colorOption9 = '#7762E3'
const colorOption10 = '#EA4D9C'
const colorOption11 = '#FC91AE'
const colorOption12 = '#FF1E90'

export class BlipTag {
  $state = {
    label: '',
    background: '#2cc3d5',
    color: '#fff',
    id: `${blipTagClass}-${guid()}`,
    mode: 'full', // can be full or compact
    classes: '',
    tagClasses: '',
    canChangeBackground: false,
    canRemoveTag: true,
    onRemove: undefined,
    toggleCollapse: false,
    onTagClick: () => {},
    onSelectColor: () => {},
  }

  constructor(options) {
    this.tagContainer = ''

    this.tagOptions = {
      ...this.$state,
      ...options,
    }

    this._setup()
  }

  /**
   * Returns canChangeBackground property
   */
  get canChangeBackground() {
    return this.tagOptions.canChangeBackground
  }

  /**
   * Returns tag label
   */
  get label() {
    return this.tagOptions.label
  }

  /**
   * Returns tag container
   */
  get element() {
    return this.tagContainer
  }

  /**
   * Returns single tag element
   */
  get tagElement() {
    return this.tagContainer.querySelector(`.${blipTagClass}`)
  }

  /**
   * Tag background
   */
  set tagBackground(value) {
    this.tagOptions.background = value
    this.tagContainer.querySelector(`.${blipTagClass}`)
      .style.background = value
  }

  /**
   * Returns tag Id
   */
  get id() {
    return this.tagOptions.id
  }

  /**
   * Returns label value
   */
  getValue() {
    return this.tagOptions.label
  }

  /**
   * Setup BLiP Tag
   */
  _setup() {
    if (!this.tagOptions.label || this.tagOptions.label === '') {
      throw Error('Tag must have a label')
    }

    this.tagContainer = this.renderTemplate({
      label: this.tagOptions.label,
      background: this.tagOptions.background,
      color: this.tagOptions.color,
      id: this.tagOptions.id,
    })

    if (this.tagOptions.canChangeBackground) {
      const colorOptions = strToEl(`
        <ul class="${blipTagSelectColorClass}" tabindex="0">
          <li class="${blipTagColorOptionClass}" data-color="${colorOption1}"></li>
          <li class="${blipTagColorOptionClass}" data-color="${colorOption2}"></li>
          <li class="${blipTagColorOptionClass}" data-color="${colorOption3}"></li>
          <li class="${blipTagColorOptionClass}" data-color="${colorOption4}"></li>
          <li class="${blipTagColorOptionClass}" data-color="${colorOption5}"></li>
          <li class="${blipTagColorOptionClass}" data-color="${colorOption6}"></li>
          <li class="${blipTagColorOptionClass}" data-color="${colorOption7}"></li>
          <li class="${blipTagColorOptionClass}" data-color="${colorOption8}"></li>
          <li class="${blipTagColorOptionClass}" data-color="${colorOption9}"></li>
          <li class="${blipTagColorOptionClass}" data-color="${colorOption10}"></li>
          <li class="${blipTagColorOptionClass}" data-color="${colorOption11}"></li>
          <li class="${blipTagColorOptionClass}" data-color="${colorOption12}"></li>
        </ul>
      `)
      this.tagContainer.appendChild(colorOptions)
    }

    this._setupEventHandlers()
  }

  /**
   * Setup event handlers for tag
   */
  _setupEventHandlers() {
    this._handleRemoveTag = this._removeTag.bind(this)
    this._handleTagKeydown = this._onTagKeydown.bind(this)
    this._handleTagClick = this._onTagClick.bind(this)

    // Handle click on remove button
    const removeButton = this.tagContainer.querySelector(`.${blipTagRemoveClass}`)

    if (removeButton) {
      removeButton
        .addEventListener('click', this._handleRemoveTag)
    }

    this.tagElement.addEventListener('keydown', this._handleTagKeydown)

    if (this.tagOptions.canChangeBackground) {
      Array.prototype.forEach.call(this.tagContainer.querySelectorAll(`.${blipTagColorOptionClass}`),
        element => {
          const color = element.getAttribute('data-color')
          element.style.background = color

          element.addEventListener('click', this._selectColor.bind(this, color))
        })
    }

    this.tagElement.addEventListener('click', this._handleTagClick)
  }

  /**
   * Render tag template with options
   * @param {options} object - Tag template options
   */
  renderTemplate({
    label,
    id,
    background,
    color,
  }) {
    const renderRemoveButton = () =>
      this.tagOptions.onRemove || this.tagOptions.canRemoveTag
        ? `<button class="${blipTagRemoveClass}" style="color: ${color}">x</button>`
        : ''

    const renderTagClasses = () => {
      let tagClasses = `${blipTagClass} ${this.tagOptions.tagClasses}`

      if (this.tagOptions.mode === 'compact') {
        tagClasses += ` ${blipTagCompactClass}`
      }

      if (this.tagOptions.canRemoveTag || this.tagOptions.onRemove) {
        tagClasses += ` ${blipTagCanRemoveClass}`
      }

      return tagClasses
    }

    return strToEl(`
      <div class="${blipTagContainerClass} ${this.tagOptions.classes}" id="${id}">
        <div tabindex="0" class="${renderTagClasses()}" style="background: ${background}; color: ${color}">
          <span class="${blipTagLabelClass}">${label}</span>
          ${renderRemoveButton()}
        </div>
      </div>
    `)
  }

  /**
   * Function invoked when select color option
   * @param {String} color - Hexadecimal color selected
   */
  _selectColor(color) {
    this.tagBackground = color
    this.tagOptions.onSelectColor.call(this, EventEmitter({ color, tag: this }))
    this.hideColorOptions()
  }

  /**
   * Hide color options container
   */
  hideColorOptions() {
    const colorOptionsContainer = this.tagContainer.querySelector(`.${blipTagSelectColorClass}`)

    colorOptionsContainer.style.transform = 'scale(0)'
    colorOptionsContainer.style.opacity = 0

    setTimeout(() => { // Needed for animation
      colorOptionsContainer.style.display = 'none'
    }, ANIMATION_TIMEOUT) // Milliseconds should be greater than value setted on transition css property
  }

  /**
   * Function invoked when remove tag
   */
  _removeTag(backspace) {
    if (this.tagOptions.onRemove) {
      this.tagOptions.onRemove.call(this, EventEmitter({
        tag: {
          element: this.tagContainer,
          id: this.tagOptions.id,
          label: this.tagOptions.label,
        },
        backspace,
      }))
    }

    if (this.tagOptions.canRemoveTag) {
      this.tagContainer.parentNode.removeChild(this.tagContainer)
      this.tagContainer = undefined
    }
  }

  /**
   * Handle tag keydown when its is focused
   */
  _onTagKeydown(event) {
    switch (event.keyCode) {
      case 8: // backspace
        this._removeTag(true)
        break
    }
  }

  /**
   * Handle tag click
   * @param {Event} event - Click event
   */
  _onTagClick(event) {
    this.tagOptions.onTagClick.call(this, EventEmitter({ tag: this }))

    if (this.tagOptions.toggleCollapse) {
      this.toggleCollapse()
    }
  }

  /**
   * Toggle tag mode (collapse or full)
   */
  toggleCollapse() {
    if (this.tagElement.classList.contains(blipTagCompactClass)) {
      this.tagElement.classList.remove(blipTagCompactClass)
    } else {
      this.tagElement.classList.add(blipTagCompactClass)
    }
  }
}
