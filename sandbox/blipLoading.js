import {
  BlipLoading,
  LoadingSizes,
  LoadingTypes,
} from '../src/components/blipLoading'

const blipLoadingComponentDotted = BlipLoading({ size: LoadingSizes.Small })
document.getElementById('dotted-loading').appendChild(blipLoadingComponentDotted)

const blipLoadingComponentSolid = BlipLoading({ type: LoadingTypes.Solid })
document.getElementById('solid-loading').appendChild(blipLoadingComponentSolid)
