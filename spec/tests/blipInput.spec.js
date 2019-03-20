import { BlipInput } from '../../src/components/blipInput'

describe('BlipInput', () => {
  describe('Initial', () => {
    it('should has a label', () => {
      const component = new BlipInput()
      const renderedElement = component.render({ label: 'My label' })
      const label = renderedElement.querySelector('label')

      expect(label.innerHTML).toEqual('My label')
    })

    it('should invalidate input', () => {
      const component = new BlipInput({
        minLength: 10,
      })
      const renderedElement = component.render({
        label: 'Label',
        value: 'invalid',
      })

      const keyUpEvent = new Event('keyup', { key: 'a' })
      renderedElement.dispatchEvent(keyUpEvent)
      expect(component.props.error !== '').toBeTruthy()
    })
  })
})
