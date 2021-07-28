import { guid } from '@lib/utils'
import { EventEmitter } from '@lib/eventEmitter'
import Component from 'nanocomponent'
import html from 'nanohtml'

const blipTagLabelClass = 'blip-tag__label'
const blipTagRemoveClass = 'blip-tag__remove'
const blipTagColorOptionClass = 'blip-tag-color-option'
const blipTagCanRemoveClass = 'blip-tag--can-remove'
export const blipTagSelectColorClass = 'blip-tag-select-color'
export const blipTagCompactClass = 'blip-tag--compact'
export const defaultTagBackground = '#2cc3d5'

// Color options
const colors = [
  '#0CC7CB',
  '#FF4A1E',
  '#FF6F1E',
  '#FF961E',
  '#1EDEFF',
  '#1EA1FF',
  '#61D36F',
  '#37C5AB',
  '#7762E3',
  '#EA4D9C',
  '#FC91AE',
  '#FF1E90',
  '#80E3EB',
  '#167491',
  '#B3D4FF',
  '#0747A6',
  '#000000',
  '#DFEA95',
  '#0A6045',
  '#90E6BC',
  '#21CC79',
  '#AA398D',
  '#3A4A65',
  '#6E7B91',
  '#B9CBD3',
  '#4F0E87',
  '#CC99FF',
  '#B2B229',
  '#757010',
  '#FFEC03',
]

export class BlipTag extends Component {
  $state = {
    id: `blip-tag-${guid()}`,
    mode: 'full', // can be full or compact
    classes: '',
    tagClasses: '',
    canRemoveTag: true,
    onRemove: undefined,
    toggleCollapse: false,
    onTagClick: () => {},
    onSelectColor: () => {},
    onTagKeydown: () => {},
  }

  constructor(options) {
    super()

    this.tagOptions = {
      ...this.$state,
      ...options,
    }

    this._handleRemoveTag = this._removeTag.bind(this)
    this._handleTagKeydown = this._onTagKeydown.bind(this)
    this._handleTagClick = this._onTagClick.bind(this)

    this.props = {
      id: this.tagOptions.id,
      background: undefined,
      label: undefined,
      canChangeBackground: false,
      collapsed: false,
    }
  }

  /**
   * Returns canChangeBackground property
   */
  get canChangeBackground() {
    return this.props.canChangeBackground
  }

  /**
   * Returns tag label
   */
  get label() {
    return this.props.label
  }

  /**
   * Returns tag Id
   */
  get id() {
    return this.tagOptions.id
  }

  /**
   * Render tag template with options
   * @param {Object} props - Tag template properties
   */
  createElement(props) {
    this.props = {
      ...this.props,
      ...props,
    }

    const renderRemoveButton = () =>
      this.tagOptions.onRemove && this.tagOptions.canRemoveTag
        ? html`<span
            onclick="${this._handleRemoveTag}"
            class="${blipTagRemoveClass}"
            >x</span
          >`
        : ''

    const renderTagClasses = () => {
      let tagClasses = `${this.tagOptions.tagClasses}`

      if (this.props.collapsed) {
        tagClasses += ` ${blipTagCompactClass}`
      }

      if (this.tagOptions.canRemoveTag && this.tagOptions.onRemove) {
        tagClasses += ` ${blipTagCanRemoveClass}`
      }

      return tagClasses
    }

    return html`
      <div
        class="blip-tag-wrapper ${this.tagOptions.classes} ${renderTagClasses()}"
      >
        <div
          tabindex="0"
          id="${this.props.id || this.tagOptions.id}"
          onclick="${this._handleTagClick}"
          onmousedown="${this._stopPropagation}"
          onmouseup="${this._stopPropagation}"
          onkeydown="${this._handleTagKeydown}"
          class="blip-tag"
          style="${this.props.background
    ? `background: ${this.props.background}`
    : ''}"
        >
          <span class="${blipTagLabelClass}">${this.props.label}</span>
          ${renderRemoveButton()}
        </div>
        ${this.props.canChangeBackground && !this.props.collapsed
    ? html` <ul class="${blipTagSelectColorClass}" tabindex="0">
              ${colors.map(
    (c) => html`
                  <li
                    onclick="${this._selectColor.bind(this)}"
                    class="${blipTagColorOptionClass}"
                    style="background: ${c}"
                    data-color="${c}"
                  ></li>
                `,
  )}
            </ul>`
    : ''}
      </div>
    `
  }

  /**
   * Update component callback
   */
  update(props) {
    if (
      props.collapsed !== undefined &&
      props.collapsed !== this.props.collapsed
    ) {
      this.toggleCollapse()
      this.props.collapsed = props.collapsed
      return false
    }

    return true
  }

  /**
   * Returns label value
   */
  getValue() {
    return this.props.label
  }

  _stopPropagation(event) {
    event.stopPropagation()
  }

  /**
   * Function invoked when select color option
   * @param {String} color - Hexadecimal color selected
   */
  _selectColor(event) {
    const background = event.target.getAttribute('data-color')
    this.render({
      ...this.props,
      background,
      canChangeBackground: false,
    })
    this.tagOptions.onSelectColor.call(this, EventEmitter({ tag: this }))
  }

  /**
   * Function invoked when remove tag
   */
  _removeTag(event) {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    if (this.tagOptions.onRemove && this.tagOptions.canRemoveTag) {
      this.tagOptions.onRemove.call(
        this,
        EventEmitter({
          tag: this,
          event,
        }),
      )
    }
  }

  /**
   * Handle tag keydown when its is focused
   */
  _onTagKeydown(event) {
    this.tagOptions.onTagKeydown.call(this, event)

    switch (event.keyCode) {
      case 8: // backspace
        this._removeTag(event)
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
      this.render({
        collapsed: !this.props.collapsed,
      })
    }
  }

  /**
   * Toggle tag mode (collapse or full)
   */
  toggleCollapse() {
    if (this.element.classList.contains(blipTagCompactClass)) {
      this.element.classList.remove(blipTagCompactClass)
    } else {
      this.element.classList.add(blipTagCompactClass)
    }
  }
}
