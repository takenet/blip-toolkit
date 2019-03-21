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

      const input = renderedElement.querySelector('input');

      input.value = '12';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeFalsy();

      input.value = '123';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeTruthy();
    })

    it('should validate maxLength', () => {
      const component = new BlipInput({
        maxLength: 3,
      })

      const renderedElement = component.render()

      const input = renderedElement.querySelector('input');

      input.value = '12';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeTruthy();

      input.value = '123';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeTruthy();

      input.value = '1234';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeFalsy();
    })

    it('should validate required', () => {
      const component = new BlipInput({
        required: true,
      })

      const renderedElement = component.render()

      const input = renderedElement.querySelector('input');

      expect(component.props.valid).toBeFalsy();

      input.value = '123';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeTruthy();

      input.value = '';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeFalsy();
    })

    it('should validate email field', () => {
      const component = new BlipInput({
        type: 'email',
      })

      const renderedElement = component.render()

      const input = renderedElement.querySelector('input');

      expect(component.props.valid).toBeTruthy();

      input.value = 'teste';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeFalsy();

      input.value = 'teste@';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeFalsy();

      input.value = 'teste@teste';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeFalsy();

      input.value = 'teste@teste.com';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeTruthy();

      input.value = 'teste@teste.com.br';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeTruthy();

      input.value = 'teste+10@teste.com.br';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeTruthy();
    })

    it('should validate url field', () => {
      const component = new BlipInput({
        type: 'url',
      })

      const renderedElement = component.render()

      const input = renderedElement.querySelector('input');

      expect(component.props.valid).toBeTruthy();

      input.value = 'take';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeFalsy();

      input.value = 'http://take';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeFalsy();

      input.value = 'take.';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeFalsy();

      input.value = 'take.net';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeTruthy();

      input.value = 'take.com.br';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeTruthy();

      input.value = 'take.com:8080';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeTruthy();

      input.value = 'www.take.com';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeTruthy();

      input.value = 'http://www.take.com';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeTruthy();

      input.value = 'https://www.take.com';
      input.dispatchEvent(new Event('keyup'));
      expect(component.props.valid).toBeTruthy();
    })

  })
})
