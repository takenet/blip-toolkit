import { BlipLoading } from '../src/components/blipLoading'

const blipLoadingComponentDotted = BlipLoading()
document.getElementById('dotted-loading').appendChild(blipLoadingComponentDotted)

const blipLoadingComponentSolid = BlipLoading({type: 'solid'})
document.getElementById('solid-loading').appendChild(blipLoadingComponentSolid)
