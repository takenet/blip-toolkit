import Component from 'nanocomponent'
import { EventEmitter } from '@lib/eventEmitter'
import html from 'nanohtml'

const styles = {
  wrapper: 'bp-textarea-wrapper',
  textarea: 'bp-textarea',
  v2: {
    wrapper: 'bp2-textarea',
    label: 'bp2-textarea__label',
    placeholder: 'bp2-textarea__placeholder',
    show: 'bp2-textarea--show',
  },
}

export class BlipTextarea extends Component {
  constructor (options) {
    super()
    this.options = { ...options }
    this._handleEnableEditMode = this._enableEditMode.bind(this)
  }

  _handleValue = (props, key) => props && key in props ? props[key] : '';

  _enableEditMode = () => {
    this.element.classList.add(styles.v2.show)
  };

  _disableEditMode = () => {
    this.element.classList.remove(styles.v2.show)
    const { value } = this.element.querySelector('textarea')
    this.options.onFinish && this.options.onFinish(EventEmitter({ value }))
  }

  createElement(props) {
    return html`
      <div class="${styles.wrapper} ${styles.v2.wrapper}" onclick="${this._handleEnableEditMode}">
        <label class="${styles.v2.label}">
          ${this._handleValue(props, 'label')}
        </label>

        <textarea
          rows="10"
          class="${styles.textarea} ${styles.v2.wrapper}"
          placeholder="${this._handleValue(props, 'placeholder')}"
        ></textarea>
      </div>
    `
  }

  update(state) {
    state.editMode ? this._enableEditMode() : this._disableEditMode()
  }
}
