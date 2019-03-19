import { BlipInput } from '../../src/components/blipInput'

describe('BlipInput', () => {
  describe('Initial', () => {
    it('should render component label', () => {
      const component = new BlipInput({ label: 'Label' })
      const renderedComponent = component.render()
      const label = renderedComponent.querySelector('label')
      expect(label.innerText).toBe('Label')
    })
  })
})
