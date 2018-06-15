import { guid } from '@lib/utils'

export class BlipTag {
  $state = {
    label: '',
    background: '#2cc3d5',
    color: '#fff',
    id: guid(),
  }

  constructor(options) {
    this.tagOptions = {
      ...this.$state,
      ...options,
    }
  }
}
