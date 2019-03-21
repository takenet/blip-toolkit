import { Component } from '@component'
import html from 'nanohtml'

export class BlipLoading extends Component {
  $state = {
    darkBackground: false,
    width: '40px',
    height: '40px',
  }

  constructor(options) {
    super()

    this.tagOptions = {
      ...this.$state,
      ...options,
    }

    this.props = {
      darkBackground: this.tagOptions.darkBackground,
      width: this.tagOptions.width,
      height: this.tagOptions.height,
    }
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

    return html`
    <div class="sk-circle ${this.props.darkBackground ? 'dark-background' : ''}" style="width:${this.props.width}; height:${this.props.height}; ">
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    </div>
    `
  }

  /**
   * Update component callback
   */
  update(props) {
    this.props = {
      ...this.props,
      ...props,
    }
    return true
  }
}
