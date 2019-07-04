import html from 'nanohtml'

export class BlipCarousel {
  constructor(elementId, itemWidth = 100) {
    this.itemWidth = itemWidth
    this.containerDiv = document.getElementById(elementId)
    this.init()
  }

  init() {
    const previousButton = html`<button disabled>prev</button>`
    const nextButton = html`<button>next</button>`
    const itemsContainer = html`<div class="bp-carousel-container"></div>`
    const items = this.containerDiv.querySelectorAll('.bp-carousel-item')

    previousButton.addEventListener('click', () => {
      this._prevItem(itemsContainer)
      this.refreshButtons(previousButton, nextButton, itemsContainer, items.length)
    })

    nextButton.addEventListener('click', () => {
      this._nextItem(itemsContainer)
      this.refreshButtons(previousButton, nextButton, itemsContainer, items.length)
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
    if (itemsContainer.scrollLeft === 0) {
      previousButton.disabled = true
      nextButton.disabled = false
    } else if (itemsContainer.scrollLeft >= (itemsLength - 1) * this.itemWidth - itemsContainer.offsetWidth) {
      previousButton.disabled = false
      nextButton.disabled = true
    } else {
      previousButton.disabled = false
      nextButton.disabled = false
    }
  }
}
