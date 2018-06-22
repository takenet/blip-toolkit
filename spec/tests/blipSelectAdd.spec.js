import { strToEl } from '../../src/lib/utils'
import { BlipSelect } from '../../src/components/blipSelect'

describe('BlipSelectAdd', () => {
  let selectElement

  beforeEach(() => {
    const select = document.createElement('select')
    select.id = 'jasmine-select'
    document.body.appendChild(select)
    select.innerHTML = '<option value="opt1">Option 1</option>'
    selectElement = document.getElementById('jasmine-select')
  })

  describe('Instance', () => {
    it('should render "create option" element', () => {
      const component = new BlipSelect(selectElement, {
        mode: 'autocomplete',
        canAddOption: {
          text: 'Add option',
        },
      })

      const template = component._renderOptionButton('Text')

      expect(template.querySelector('small').innerHTML).toEqual('Add option')
      expect(template.querySelector('.blip-new-option-text').innerHTML).toEqual('Text')
    })

    it('should add new option', () => {
      const component = new BlipSelect(selectElement, {
        mode: 'autocomplete',
        canAddOption: {
          text: 'Add option',
        },
      })

      const element = strToEl(`<li tabindex="0" class="blip-select__option" data-value="Option">Option</li>`)

      component.addNewOption({
        label: 'Option',
        value: 'Option',
        element,
      })

      expect(component.selectOptions.filter(o => o.label === 'Option').length > 0).toBeTruthy()
    })
  })
})
