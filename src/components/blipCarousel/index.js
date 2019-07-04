import html from 'nanohtml'
import raw from 'nanohtml/raw'
import previousIcon from '../../img/arrow-ball-left-solid.svg'
import nextIcon from '../../img/arrow-ball-right-solid.svg'

export class BlipCarousel {
  constructor(elementId, itemWidth = 100) {
    this.itemWidth = itemWidth
    this.containerDiv = document.getElementById(elementId)
    this.init()
  }

  init() {
    const previousButton = html`<button disabled>${raw(previousIcon)}</button>`
    const nextButton = html`<button>${raw(nextIcon)}</button>`
    const itemsContainer = html`<div class="bp-carousel-container"></div>`
    const items = this.containerDiv.querySelectorAll('.bp-carousel-item')

    previousButton.addEventListener('click', () => {
      this._prevItem(itemsContainer)
      setTimeout(
        () => this.refreshButtons(previousButton, nextButton, itemsContainer, items.length),
        500
      )
    })

    nextButton.addEventListener('click', () => {
      this._nextItem(itemsContainer)
      setTimeout(
        () => this.refreshButtons(previousButton, nextButton, itemsContainer, items.length),
        500
      )
    })

    items.forEach(item => {
      item.style.width = `${this.itemWidth}px`
      itemsContainer.appendChild(item)
    })

    this.containerDiv.innerHTML = ''

    this.containerDiv.appendChild(previousButton)
    this.containerDiv.appendChild(itemsContainer)
    this.containerDiv.appendChild(nextButton)
  }

  _prevItem(itemsContainer) {
    itemsContainer.scrollLeft -= this.itemWidth
  }

  _nextItem(itemsContainer) {
    itemsContainer.scrollLeft += this.itemWidth
  }

  refreshButtons(previousButton, nextButton, itemsContainer, itemsLength) {
    console.log(itemsContainer.scrollLeft)
    if (itemsContainer.scrollLeft === 0) {
      previousButton.disabled = true
      nextButton.disabled = false
    } else if (itemsContainer.scrollLeft >= (itemsLength) * this.itemWidth - itemsContainer.offsetWidth) {
      previousButton.disabled = false
      nextButton.disabled = true
    } else {
      previousButton.disabled = false
      nextButton.disabled = false
    }
  }
}
