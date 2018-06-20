import { BlipSelectAdd } from './blipSelectAdd'
import { BlipSelectBase } from './blipSelectBase'

export class BlipSelect {
  constructor(element, options) {
    if (options.mode === 'autocomplete' && options.canAddOption) {
      return new BlipSelectAdd(element, options)
    } else {
      return new BlipSelectBase(element, options)
    }
  }
}
