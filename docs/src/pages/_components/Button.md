---
name: Button
category: Components
---

Buttons are implemented through the base class **bp-btn**. They have a min-width of 160px, an opaque background that darkens on hover and no border.

```base.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn">Base Default</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn" disabled>Base Default</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn [disabled]</td>
    </tr>
  </tbody>
</table>
```

<h3>Size</h3>

There are two size variations that modify a button's minimum width: **bp-btn--small** (120px) and **bp-btn--large** (240px).

```size.html
<table>
  <tbody>
    <tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--blip-dark bp-btn--small">Small</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-blip-dark">.bp-btn--blip-dark</span> .bp-btn--small</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--blip-dark">Normal</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-blip-dark">.bp-btn--blip-dark</span></td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--blip-dark bp-btn--large">Large</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-blip-dark">.bp-btn--blip-dark</span> .bp-btn--large</td>
    </tr>
  </tbody>
</table>
```

<h3>Flat</h3>

The variation **bp-btn--flat** has a transparent background and a solid border. Usually, its text and border have the same color and they darken on hover.

```flat.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--flat bp-btn--blip-light">Flat Default</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-blip-light">.bp-btn--blip-light</span> .bp-btn--flat</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--flat bp-btn--blip-light" disabled>Flat Default</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-blip-light">.bp-btn--blip-light</span> .bp-btn--flat [disabled]</td>
    </tr>
  </tbody>
</table>
```

<h3>Dashed</h3>

The variation **bp-btn--dashed** has a transparent background and a dashed border. Usually, its text and border have the same color and they darken on hover.

```dashed.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--dashed bp-btn--blip-light">Dashed Default</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-blip-light">.bp-btn--blip-light</span> .bp-btn--dashed</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--dashed bp-btn--blip-light" disabled>Dashed Default</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-blip-light">.bp-btn--blip-light</span> .bp-btn--dashed [disabled]</td>
    </tr>
  </tbody>
</table>
```

<h3>Rounded</h3>

The variation **bp-btn-rounded** adds a rounding fashion of 8 pixels to the button.

```rounded.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--rounded bp-btn--blip-light">Rounded Default</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-blip-light">.bp-btn--blip-light</span> .bp-btn--rounded</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--rounded bp-btn--blip-light" disabled>Rounded Default</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-blip-light">.bp-btn--blip-light</span> .bp-btn--rounded [disabled]</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--rounded bp-btn--blip-light bp-btn--flat">Rounded Flat</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-blip-light">.bp-btn--blip-light</span> .bp-btn--rounded bp-btn--flat</td>
    </tr>
  </tbody>
</table>
```

<h3>Arrow</h3>

The variation **bp-btn--arrow** adds a pointy fashion to the button. It works for both base and flat buttons.

```arrow.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--bot bp-btn--arrow">Base Arrow</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-bot">.bp-btn--bot</span> .bp-btn--arrow</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--bot bp-btn--arrow" disabled>Base Arrow</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-bot">.bp-btn--bot</span> .bp-btn--arrow [disabled]</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--onix bp-btn--flat bp-btn--arrow">Flat Arrow</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-onix">.bp-btn--onix</span> .bp-btn--flat .bp-btn--arrow</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--onix bp-btn--flat bp-btn--arrow" disabled>Flat Arrow</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-onix">.bp-btn--onix</span> .bp-btn--flat .bp-btn--arrow [disabled]</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--time bp-btn--dashed bp-btn--arrow">Dashed Arrow</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-time">.bp-btn--time</span> .bp-btn--dashed .bp-btn--arrow</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--time bp-btn--dashed bp-btn--arrow" disabled>Dashed Arrow</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-time">.bp-btn--time</span> .bp-btn--dashed .bp-btn--arrow [disabled]</td>
    </tr>
  </tbody>
</table>
```

<h3>Text-only</h3>

The variation **bp-btn--text-only** not only makes the **base** button's background color transparent, but also its size fits the text inside. Its min-width is 0px, its height is auto, its line-height is 18px and its horizontal padding is smaller.

```text-only.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--silver bp-btn--text-only">Text Only</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-silver">.bp-btn--silver</span> .bp-btn--text-only</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--silver bp-btn--text-only" disabled>Text Only</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-silver">.bp-btn--silver</span> .bp-btn--text-only [disabled]</td>
    </tr>
  </tbody>
</table>
```

<h3>Custom colored: Base Button</h3>

Buttons have custom-colored variations for all colors in BLiP's palette. They can be applied using the variation **bp-btn--{color}**.

On the base class, the variation **bp-btn--{color}** sets the button's background color to the palette color and its text color to either black or white.

```color-base.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--bot">Bot </button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn
        <span class="bp-c-bot">.bp-btn--bot</span>
      </td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--blip-light">BLiP Light</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn
        <span class="bp-c-blip-light">.bp-btn--blip-light</span>
      </td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--blip-dark">BLiP Dark</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn
        <span class="bp-c-blip-dark">.bp-btn--blip-dark</span>
      </td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--warning">Warning</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn
        <span class="bp-c-warning">.bp-btn--warning</span>
      </td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--delete">Delete</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn
        <span class="bp-c-delete">.bp-btn--delete</span>
      </td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--true">True</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn
        <span class="bp-c-true">.bp-btn--true</span>
      </td>
    </tr>
  </tbody>
</table>
```

<h3>Custom colored: Flat & Dashed Buttons</h3>

In the flat and dashed variations, **bp-btn--{color}** sets the button's border and text color to the palette color.

```color-flat.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--flat bp-btn--bot">Flat Bot</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--flat
        <span class="bp-c-bot">.bp-btn--bot</span>
      </td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--flat bp-btn--blip-light">Flat BLiP Light</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--flat
        <span class="bp-c-blip-light">.bp-btn--bot</span>
      </td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--flat bp-btn--blip-dark">Flat BLiP Dark</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--flat
        <span class="bp-c-blip-dark">.bp-btn--blip-dark</span>
      </td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--dashed bp-btn--warning">Dashed Warning</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--dashed
        <span class="bp-c-warning">.bp-btn--warning</span>
      </td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--dashed bp-btn--delete">Dashed Delete</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--dashed
        <span class="bp-c-delete">.bp-btn--delete</span>
      </td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--dashed bp-btn--true">Dashed True</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--dashed
        <span class="bp-c-true">.bp-btn--true</span>
      </td>
    </tr>
  </tbody>
</table>
```

<h3>Custom colored: Text-only Button</h3>

In the text-only variation, **bp-btn--{color}** sets only the button's text color to the palette color. The variation **bp-btn--c-colorName** will work the same way in this case.

```color-text-only.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--text-only bp-btn--bot">Text-only Bot</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--text-only
        <span class="bp-c-bot">.bp-btn--bot</span>
      </td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--text-only bp-btn--blip-light">Text-only BLiP Light</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--text-only
        <span class="bp-c-blip-light">.bp-btn--blip-light</span>
      </td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--text-only bp-btn--blip-dark">Text-only BLiP Dark</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--text-only
        <span class="bp-c-blip-dark">.bp-btn--blip-dark</span>
      </td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--text-only bp-btn--warning">Text-only Warning</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--text-only
        <span class="bp-c-warning">.bp-btn--warning</span>
      </td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--text-only bp-btn--delete">Text-only Delete</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--text-only
        <span class="bp-c-delete">.bp-btn--delete</span>
      </td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--text-only bp-btn--true">Text-only True</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--text-only
        <span class="bp-c-true">.bp-btn--true</span>
      </td>
    </tr>
  </tbody>
</table>
```

<h3>Text color</h3>

The variation **bp-btn--c-colorName** modifies the button's text color.

```text-color.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--c-delete">Text Delete</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-delete">.bp-btn--c-delete</span></td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--c-black">Text Black</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--c-black</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--c-white">Text White</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--c-white</td>
    </tr>
  </tbody>
</table>
```

<h3>Background color</h3>

The variation **bp-btn--bg-colorName** modifies the button's background color.

```background-color.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--bg-delete">Background Delete</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-delete">.bp-btn--bg-delete</span></td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--bg-black">Background Black</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--bg-black</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--bg-white bp-btn--c-black">Background White</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--bg-white .bp-btn--c-black</td>
    </tr>
  </tbody>
</table>
```
