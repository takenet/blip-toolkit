# Blip Loading

Blip loading shows a loading animation. We are using [nanocomponent](https://github.com/choojs/nanocomponent) to get a decent and clean lifecycle to our components. You can use just as custom select or autocomplete behavior.

## Usage

```javascript
import { BlipLoading } from 'blip-toolkit'
const blipLoadingComponent = BlipLoading()
document.getElementById('loading').appendChild(blipLoadingComponent)
```

```html
<div id="loading" class="bp-loading"></div>
```

## Customization

The customization is done adding classes to the parent element. Default size is 40px x 40px

### `bp-loading` - class
Required class to display loading

### `bp-loading--small` - class
Changes size to 25px x 25px

