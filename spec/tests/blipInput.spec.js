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
  describe('Validation', () => {
    it('should validate minLength', () => {
      const component = new BlipInput({
        minLength: 3,
      })
      const renderedElement = component.render()

      const input = renderedElement.querySelector('input')

      input.value = '12'
      input.dispatchEvent(new Event('keyup'))
      expect(component.props.valid).toBeFalsy()

      input.value = '123'
      input.dispatchEvent(new Event('keyup'))
      expect(component.props.valid).toBeTruthy()
    })

    it('should validate maxLength', () => {
      const component = new BlipInput({
        maxLength: 3,
      })

      const renderedElement = component.render()

      const input = renderedElement.querySelector('input')

      input.value = '12'
      input.dispatchEvent(new Event('keyup'))
      expect(component.props.valid).toBeTruthy()

      input.value = '123'
      input.dispatchEvent(new Event('keyup'))
      expect(component.props.valid).toBeTruthy()

      input.value = '1234'
      input.dispatchEvent(new Event('keyup'))
      expect(component.props.valid).toBeFalsy()
    })

    it('should validate required', () => {
      const component = new BlipInput({
        required: true,
      })

      const renderedElement = component.render()

      const input = renderedElement.querySelector('input')

      expect(component.props.valid).toBeFalsy()

      input.value = '123'
      input.dispatchEvent(new Event('keyup'))
      expect(component.props.valid).toBeTruthy()

      input.value = ''
      input.dispatchEvent(new Event('keyup'))
      expect(component.props.valid).toBeFalsy()
    })

    describe('Type email', () => {
      const component = new BlipInput({
        type: 'email',
      })

      const renderedElement = component.render()
      const input = renderedElement.querySelector('input')

      it('should validate email without @ and domain', () => {
        input.value = 'teste'
        input.dispatchEvent(new Event('keyup'))
        expect(component.props.valid).toBeFalsy()
      })

      it('should validate email with @ and incomplete domain', () => {
        input.value = 'teste@'
        input.dispatchEvent(new Event('keyup'))
        expect(component.props.valid).toBeFalsy()
      })

      it('should validate email without domain', () => {
        input.value = 'teste@teste'
        input.dispatchEvent(new Event('keyup'))
        expect(component.props.valid).toBeFalsy()
      })

      it('should validate valid email', () => {
        input.value = 'teste@teste.com'
        input.dispatchEvent(new Event('keyup'))
        expect(component.props.valid).toBeTruthy()
      })

      it('should validate valid email with full domain and country domain', () => {
        input.value = 'teste@teste.com.br'
        input.dispatchEvent(new Event('keyup'))
        expect(component.props.valid).toBeTruthy()
      })

      it('should validate valid email with label', () => {
        input.value = 'teste+10@teste.com.br'
        input.dispatchEvent(new Event('keyup'))
        expect(component.props.valid).toBeTruthy()
      })
    })

    describe('Type url', () => {
      const component = new BlipInput({
        type: 'url',
      })

      const renderedElement = component.render()
      const input = renderedElement.querySelector('input')

      it('should validate url without protocol and domain', () => {
        input.value = 'take'
        input.dispatchEvent(new Event('keyup'))
        expect(component.props.valid).toBeFalsy()
      })

      it('should validate url with just protocol', () => {
        input.value = 'http://take'
        input.dispatchEvent(new Event('keyup'))
        expect(component.props.valid).toBeFalsy()
      })

      it('should validate url with name and dot', () => {
        input.value = 'take.'
        input.dispatchEvent(new Event('keyup'))
        expect(component.props.valid).toBeFalsy()
      })

      it('should validate url without protocol and with domain', () => {
        input.value = 'take.net'
        input.dispatchEvent(new Event('keyup'))
        expect(component.props.valid).toBeTruthy()
      })

      it('should validate url without protocol and with domain and country', () => {
        input.value = 'take.com.br'
        input.dispatchEvent(new Event('keyup'))
        expect(component.props.valid).toBeTruthy()
      })

      it('should validate url with domain and port', () => {
        input.value = 'take.com:8080'
        input.dispatchEvent(new Event('keyup'))
        expect(component.props.valid).toBeTruthy()
      })

      it('should validate url with www and full domain', () => {
        input.value = 'www.take.com'
        input.dispatchEvent(new Event('keyup'))
        expect(component.props.valid).toBeTruthy()
      })

      it('should validate url with http:// protocol and full domain', () => {
        input.value = 'http://www.take.com'
        input.dispatchEvent(new Event('keyup'))
        expect(component.props.valid).toBeTruthy()
      })

      it('should validate url with https:// protocol and full domain', () => {
        input.value = 'https://www.take.com'
        input.dispatchEvent(new Event('keyup'))
        expect(component.props.valid).toBeTruthy()
      })
    })

    describe('Type custom', () => {
      const component = new BlipInput({
        type: 'custom',
        regex: '^[0-9]*$',
      })

      const renderedElement = component.render()
      const input = renderedElement.querySelector('input')

      it('should validate input with letters', () => {
        input.value = 'take'
        input.dispatchEvent(new Event('keyup'))
        expect(component.props.valid).toBeFalsy()
      })

      it('should validate input with just numbers', () => {
        input.value = '123456484'
        input.dispatchEvent(new Event('keyup'))
        expect(component.props.valid).toBeTruthy()
      })
    })
  })
})
