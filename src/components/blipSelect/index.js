import { BlipSelectAdd } from './blipSelectAdd'
import { BlipSelectBase } from './blipSelectBase'

export class BlipSelect {
  constructor(element, options) {
    const componentOptions = {
      mode: 'select',
      ...options,
    }

    if (componentOptions.mode === 'autocomplete' && componentOptions.canAddOption) {
      return new BlipSelectAdd(element, componentOptions)
    } else {
      return new BlipSelectBase(element, componentOptions)
    }
  }
}
