import { BlipSelect } from '../../src/components/blipSelect/blipSelect'

describe('BlipSelect', () => {
  let selectElement

  beforeEach(() => {
    const select = document.createElement('select')
    select.id = 'jasmine-select'
    document.body.appendChild(select)
    select.innerHTML = '<option value="opt1">Option 1</option>'
    selectElement = document.getElementById('jasmine-select')
  })

  describe('Instance', () => {
    it('should return a BlipSelect instance', () => {
      const component = new BlipSelect(selectElement)
      expect(component instanceof BlipSelect).toBeTruthy()
    })

    it('should has a list of options', () => {
      const component = new BlipSelect(selectElement)
      component._arrayToDomOptions([
        {
          value: 'val1',
          label: 'label 1',
        },
        {
          value: 'val2',
          label: 'label 2',
        },
      ])

      expect(component.selectOptionsContainer.querySelectorAll('li').length).toEqual(2)
    })
  })

  describe('Instance properties', () => {
    it('should disable component', () => {
      const component = new BlipSelect(selectElement)
      component.isDisabled = true

      expect(component.wrapper.classList.contains('bp-input-wrapper--disabled')).toBeTruthy()
    })

    it('should enable component', () => {
      const component = new BlipSelect(selectElement)
      component.isDisabled = false

      expect(component.wrapper.classList.contains('bp-input-wrapper--disabled')).toBeFalsy()
    })
  })

  describe('Instance methods', () => {
    it('should set a value', () => {
      const component = new BlipSelect(selectElement)
      component.setValue({
        value: 'val1',
      })

      expect(component.input.value).toEqual('val1')
    })

    it('should return a value', () => {
      const component = new BlipSelect(selectElement)
      component.setValue({
        value: 'val1',
      })

      const { value } = component.getValue()
      expect(value).toEqual('val1')
    })
  })
})
