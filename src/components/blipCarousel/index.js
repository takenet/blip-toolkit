import { Component } from '@component'
import html from 'nanohtml'
import raw from 'nanohtml/raw'
import previousIcon from '../../img/arrow-ball-left-solid.svg'
import nextIcon from '../../img/arrow-ball-right-solid.svg'

export class BlipCarousel extends Component {
  constructor(elementId, itemWidth = 100) {
    super()
    this.itemWidth = itemWidth
    this.containerDiv = document.getElementById(elementId)
    this.previousButton = html`<button class="previous-button">${raw(previousIcon)}</button>`
    this.nextButton = html`<button class="next-button">${raw(nextIcon)}</button>`
  }

  createElement() {
    const itemsContainer = html`<div class="bp-carousel-container"></div>`
    const items = this.containerDiv.querySelectorAll('.bp-carousel-item')

    this.previousButton.addEventListener('click', () => {
      this._prevItem(itemsContainer)
      setTimeout(
        () => this._refreshButtons(itemsContainer, items.length),
        500
      )
    })

    this.nextButton.addEventListener('click', () => {
      this._nextItem(itemsContainer)
      setTimeout(
        () => this._refreshButtons(itemsContainer, items.length),
        500
      )
    })

    for (let i = 0; i < items.length; ++i) {
      items[i].style.width = `${this.itemWidth}px`
      itemsContainer.appendChild(items[i])
    }

    this.containerDiv.innerHTML = ''
    this.containerDiv.appendChild(this.previousButton)
    this.containerDiv.appendChild(itemsContainer)
    this.containerDiv.appendChild(this.nextButton)

    this._refreshButtons(itemsContainer, items.length)

    return this.containerDiv
  }

  _prevItem(itemsContainer) {
    itemsContainer.scrollLeft -= this.itemWidth
  }

  _nextItem(itemsContainer) {
    itemsContainer.scrollLeft += this.itemWidth
  }

  _refreshButtons(itemsContainer, itemsLength) {
    this.previousButton.disabled = false
    this.nextButton.disabled = false
    if (itemsContainer.scrollLeft === 0) {
      this.previousButton.disabled = true
    }
    if (itemsContainer.scrollLeft >= (itemsLength) * this.itemWidth - itemsContainer.offsetWidth) {
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
