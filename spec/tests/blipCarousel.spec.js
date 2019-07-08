import { BlipCarousel } from '../../src/components/blipCarousel'
import html from 'nanohtml'

const carouselElement = html`<div id="carousel" class="bp-carousel">
<div class="bp-carousel-item" style="height: 200px; text-align: center; border: solid 1px black">
  item 1
</div>
<div class="bp-carousel-item" style="height: 200px; text-align: center; border: solid 1px black">
  item 2
</div>
<div class="bp-carousel-item" style="height: 200px; text-align: center; border: solid 1px black">
  item 3
</div>
<div class="bp-carousel-item" style="height: 200px; text-align: center; border: solid 1px black">
  item 4
</div>
<div class="bp-carousel-item" style="height: 200px; text-align: center; border: solid 1px black">
  item 5
</div>
<div class="bp-carousel-item" style="height: 200px; text-align: center; border: solid 1px black">
  item 6
</div>
<div class="bp-carousel-item" style="height: 200px; text-align: center; border: solid 1px black">
  item 7
</div>
<div class="bp-carousel-item" style="height: 200px; text-align: center; border: solid 1px black">
  item 8
</div>
<div class="bp-carousel-item" style="height: 200px; text-align: center; border: solid 1px black">
  item 9
</div>
<div class="bp-carousel-item" style="height: 200px; text-align: center; border: solid 1px black">
  item 10
</div>
</div>`

beforeEach(() => document.body.appendChild(carouselElement))
afterEach(() => document.body.removeChild(carouselElement))

describe('BlipCarousel', () => {
  it('Should render control buttons', () => {
    const carousel = new BlipCarousel('carousel', 300)
    const renderedElement = carousel.containerDiv
    const previousButton = renderedElement.querySelector('button.previous-button')
    const nextButton = renderedElement.querySelector('button.next-button')
    console.log(previousButton)

    expect(previousButton).toBeTruthy()
    expect(nextButton).toBeTruthy()
  })
})
