import { BlipCarousel } from '../../src/components/blipCarousel'
import html from 'nanohtml'

describe('BlipCarousel', () => {
  beforeEach(() => {
    const carouselElement = html`<div id="carousel"
class="bp-carousel">
<div class="bp-carousel-container">
<div class="bp-carousel-item"
    style="height: 200px; text-align: center; border: solid 1px black; width: 300px">
 item 1
</div>
<div class="bp-carousel-item"
    style="height: 200px; text-align: center; border: solid 1px black; width: 300px">
 item 2
</div>
<div class="bp-carousel-item"
    style="height: 200px; text-align: center; border: solid 1px black; width: 300px">
 item 3
</div>
<div class="bp-carousel-item"
    style="height: 200px; text-align: center; border: solid 1px black; width: 300px">
 item 4
</div>
<div class="bp-carousel-item"
    style="height: 200px; text-align: center; border: solid 1px black; width: 300px">
 item 5
</div>
<div class="bp-carousel-item"
    style="height: 200px; text-align: center; border: solid 1px black; width: 300px">
 item 6
</div>
<div class="bp-carousel-item"
    style="height: 200px; text-align: center; border: solid 1px black; width: 300px">
 item 7
</div>
<div class="bp-carousel-item"
    style="height: 200px; text-align: center; border: solid 1px black; width: 300px">
 item 8
</div>
<div class="bp-carousel-item"
    style="height: 200px; text-align: center; border: solid 1px black; width: 300px">
 item 9
</div>
<div class="bp-carousel-item"
    style="height: 200px; text-align: center; border: solid 1px black; width: 300px">
 item 10
</div>
</div>
</div>`
    document.body.appendChild(carouselElement)
  })
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('Should render the control buttons', () => {
    const carousel = new BlipCarousel('carousel', 300)
    const renderedElement = carousel.render()
    const previousButton = renderedElement.querySelector('button.previous-button')
    const nextButton = renderedElement.querySelector('button.next-button')

    expect(previousButton).toBeTruthy()
    expect(nextButton).toBeTruthy()
  })
  it('Should scroll when clicking nextButton', () => {
    const carousel = new BlipCarousel('carousel', 300)
    const renderedElement = carousel.render()
    const nextButton = renderedElement.querySelector('button.next-button')
    const carouselContainer = renderedElement.querySelector('.bp-carousel-container')

    nextButton.click()
    expect(carouselContainer.scrollLeft).toBe(300)
  })

  it('Should scroll when clicking previousButton', () => {
    const carousel = new BlipCarousel('carousel', 300)
    const renderedElement = carousel.render()
    const previousButton = renderedElement.querySelector('button.previous-button')
    const nextButton = renderedElement.querySelector('button.next-button')
    const carouselContainer = renderedElement.querySelector('.bp-carousel-container')

    nextButton.click()

    setTimeout(
      () => {
        previousButton.click()
        expect(carouselContainer.scrollLeft).toBe(0)
      }, 600
    )
  })
})
