# BLiP Tabs

Component is a pure JavaScript plugin that transforms determined HTML markup into Tabs.

## Usage

```html
<div id="my-tabs-container">
    <ul class="bp-tab-nav">
        <li>
            <a href="#" data-ref="tab1">Tab 1</a>
        </li>
        <li>
            <a href="#" data-ref="tab2">Tab 2</a>
        </li>
        <li>
            <a href="#" data-ref="tab3">Tab 3</a>
        </li>
        </li>
    </ul>
    <div class="bp-tab-content" data-ref="tab1">Conteúdo da tab 1</div>
    <div class="bp-tab-content" data-ref="tab2">Outro conteúdo, agora tab 2</div>
    <div class="bp-tab-content" data-ref="tab3">Mais coisas, pra tab 3</div>
</div>

<script type="text/javascript">
  import { BlipTabs } from 'blip-toolkit'
  BlipTabs('my-tabs-container')
</script>
```

### `data-ref`
The attribute `data-ref` has to be set in the anchor tag and the `bp-tab-content` div, to link them with each other.