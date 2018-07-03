// import { BlipSelectAdd } from './BlipSelectAdd'
import { BlipSelectBase } from './BlipSelectBase'

export class BlipSelect {
  constructor(options) {
    const componentOptions = {
      mode: 'select',
      ...options,
    }

    return new BlipSelectBase(componentOptions)

    // if (componentOptions.mode === 'autocomplete' && componentOptions.canAddOption) {
    //   return new BlipSelectAdd(componentOptions)
    // } else {
    //   return new BlipSelectBase(componentOptions)
    // }
  }
}
