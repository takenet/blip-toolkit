import { guid } from '@lib/utils'
import { EventEmitter } from '@lib/eventEmitter'
import Nanocomponent from 'nanocomponent'
import html from 'nanohtml'

const blipTagContainerClass = 'blip-tag-container'
const blipTagLabelClass = 'blip-tag__label'
const blipTagRemoveClass = 'blip-tag__remove'
const blipTagColorOptionClass = 'blip-tag-color-option'
const blipTagCanRemoveClass = 'blip-tag--can-remove'
export const blipTagSelectColorClass = 'blip-tag-select-color'
export const blipTagCompactClass = 'blip-tag--compact'
export const defaultTagBackground = '#2cc3d5'

// Color options
const colors = ['#0CC7CB', '#FF4A1E', '#FF6F1E', '#FF961E', '#1EDEFF', '#1EA1FF', '#61D36F', '#37C5AB', '#7762E3', '#EA4D9C', '#FC91AE', '#FF1E90']

export class BlipTag extends Nanocomponent {
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
  }

  constructor(options) {
    super()
    this.tagContainer = ''

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
   * Returns single tag element
   */
  get tagElement() {
    return this.tagContainer.querySelector('.blip-tag')
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
        ? html`<button onclick="${this._handleRemoveTag}" class="${blipTagRemoveClass}">x</button>`
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
      <div class="${blipTagContainerClass} ${this.tagOptions.classes} ${renderTagClasses()}">
        <div class="blip-tag-wrapper">
          <div tabindex="0"
            id="${this.props.id || this.tagOptions.id}"
            onclick="${this._handleTagClick}"
            onkeydown="${this._handleTagKeydown}"
            class="blip-tag"
            style="${this.props.background ? `background: ${this.props.background}` : ''}">
            <span class="${blipTagLabelClass}">${this.props.label}</span>
            ${renderRemoveButton()}
          </div>
          ${this.props.canChangeBackground && !this.props.collapsed ? html`
          <ul class="${blipTagSelectColorClass}" tabindex="0">
            ${colors.map(c => html`
              <li onclick="${this._selectColor.bind(this)}" class="${blipTagColorOptionClass}" style="background: ${c}" data-color="${c}"></li>
            `)}
          </ul>` : ''}
        </div>
      </div>
    `
  }

  /**
   * Update component callback
   */
  update(props) {
    if (props.collapsed !== undefined && props.collapsed !== this.props.collapsed) {
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
    if (this.tagOptions.onRemove && this.tagOptions.canRemoveTag) {
      this.tagOptions.onRemove.call(this, EventEmitter({
        tag: this,
        event,
      }))
    }
  }

  /**
   * Handle tag keydown when its is focused
   */
  _onTagKeydown(event) {
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
