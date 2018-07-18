import './lib/prependPolyfill'
import './scss/main.scss'

if (!window._babelPolyfill) {
  require('babel-polyfill')
}

//
export { BlipSelect } from './components/blipSelect'
export { BlipTags } from './components/blipTags'
export { BlipTag } from './components/blipTag'
