import { BlipSelect } from '../../src/components/blipSelect'
import { BlipSelectBase } from '../../src/components/blipSelect/blipSelectBase'
import { BlipSelectAdd } from '../../src/components/blipSelect/blipSelectAdd'

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
    it('should return a BlipSelectAdd instance', () => {
      const component = new BlipSelect(selectElement, {
        mode: 'autocomplete',
        canAddOption: {
          text: 'Add option',
        },
      })

      expect(component instanceof BlipSelectAdd).toBeTruthy()
    })

    it('should return a BlipSelectBase instance', () => {
      const component = new BlipSelect(selectElement)
      expect(component instanceof BlipSelectBase).toBeTruthy()
    })

    it('should focus', () => {
      const component = new BlipSelect(selectElement, {
        mode: 'autocomplete',
        onFocus: () => 'focused',
      })

      component.selectOptions = {
        value: 'val1',
        label: 'label 1',
      }

      spyOn(component.configOptions, 'onFocus')
      component._onSelectFocus()
      expect(component.configOptions.onFocus).toHaveBeenCalled()
    })
  })
})
