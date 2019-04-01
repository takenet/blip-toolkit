import { strToEl } from '../../src/lib/utils'
import { BlipModal } from '../../src/components/blipModal'

const DEFAULT_MODAL = 'my-modal'
describe('BlipModal', () => {
  let instance
  beforeAll(() => {
    const boilerplate = strToEl(`
      <div>
        <button id="${DEFAULT_MODAL}">Open modal</button>
        <div ref="${DEFAULT_MODAL}">
          <h1>Hello! I'm some lost modal!</h1>
        </div>
      </div>
    `)

    document.body.appendChild(boilerplate)
    instance = new BlipModal({
      target: DEFAULT_MODAL,
    })
  })

  it('should open modal on trigger click', () => {
    spyOn(instance, 'open')
    instance.trigger.dispatchEvent(new Event('click'))
    expect(instance.open).toHaveBeenCalled()
    expect(document.querySelector('.bp-modal')).toBeDefined()
  })

  it('should programatically open modal', () => {
    setTimeout(() => {
      instance.open()
      expect(document.querySelector('.bp-modal')).toBeDefined()
      expect(document.querySelector('.bp-modal')).not.toBeNull()

      setTimeout(() => {
        expect(instance.renderedModal instanceof HTMLElement).toBeTruthy()
      })
    }, 250)
  })
})
