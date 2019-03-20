import { BlipInput } from '../../src/components/blipInput'

describe('BlipInput', () => {
  describe('Initial', () => {
    it('should have a label', () => {
      const component = new BlipInput()
      const renderedElement = component.render({ label: 'My label' })
      const label = renderedElement.querySelector('label')

      expect(label.innerHTML).toEqual('My label')
    })
  })
})
