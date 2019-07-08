import { Component } from '@component'
import html from 'nanohtml'
import raw from 'nanohtml/raw'
import previousIcon from '../../img/arrow-ball-left-solid.svg'
import nextIcon from '../../img/arrow-ball-right-solid.svg'

export class BlipCarousel extends Component {
  constructor(elementId, stepWidth = 300) {
    super()
    this.stepWidth = stepWidth
    this.containerDiv = document.getElementById(elementId)
    this.previousButton = html`<button class="previous-button">${raw(previousIcon)}</button>`
    this.nextButton = html`<button class="next-button">${raw(nextIcon)}</button>`
    this.itemsContainer = this.containerDiv.querySelector('.bp-carousel-container')
  }

  createElement() {
    this.items = this.itemsContainer.querySelectorAll('.bp-carousel-item')
    this.itemsContainer.addEventListener('DOMNodeInserted', () => {
      console.log('inserted')
      this.items = this.itemsContainer.querySelectorAll('.bp-carousel-item')
      this._refreshButtons()
    })

    this.previousButton.addEventListener('click', () => {
      this._prevItem()
      setTimeout(
        () => this._refreshButtons(),
        500
      )
    })

    this.nextButton.addEventListener('click', () => {
      this._nextItem()
      setTimeout(
        () => this._refreshButtons(),
        500
      )
    })

    this.containerDiv.prepend(this.previousButton)
    this.containerDiv.appendChild(this.nextButton)

    this._refreshButtons()

    return this.containerDiv
  }

  _prevItem() {
    this.itemsContainer.scrollLeft -= this.stepWidth
  }

  _nextItem() {
    this.itemsContainer.scrollLeft += this.stepWidth
  }

  _refreshButtons() {
    this.previousButton.disabled = false
    this.nextButton.disabled = false
    if (this.itemsContainer.scrollLeft === 0) {
      this.previousButton.disabled = true
    }
    if (this.itemsContainer.scrollLeft >= (this.items.length) * this.stepWidth - this.itemsContainer.offsetWidth) {
      this.nextButton.disabled = true
    }
  }

  _removeElements() {
    this.containerDiv.removeChild(this.nextButton)
    this.containerDiv.removeChild(this.previousButton)
  }

  destroy() {
    this._removeElements()
  }
}
