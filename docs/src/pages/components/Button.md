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

<h1>Variations</h1>

<h3>Flat</h3>

The variation **bp-btn--flat** has a transparent background and an opaque border. Usually, its text and border have the same color and they darken on hover.

```flat.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--flat bp-btn--blip-light">Flat Default</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-btn--blip-light">.bp-btn--blip-light</span> .bp-btn--flat</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--flat bp-btn--blip-light" disabled>Flat Default</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-btn--blip-light">.bp-btn--blip-light</span> .bp-btn--flat [disabled]</td>
    </tr>
  </tbody>
</table>
```

<h3>Small</h3>

The variation **bp-btn--small** modifies the button's min-width to 100px.

```small.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--blip-dark bp-btn--small">Base Small</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-blip-dark">.bp-btn--blip-dark</span> .bp-btn--small</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--city bp-btn--flat bp-btn--small">Flat Small</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-city">.bp-btn--city</span> .bp-btn--flat .bp-btn--small</td>
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
  </tbody>
</table>
```

<h3>Ready-made colors: Base Button</h3>

Buttons have ready-made color variations for all colors in BLiP's palette. They can be applied using the variation **bp-btn--colorName**.

On the base class, the variation **bp-btn--colorName** sets the button's background color to the palette color and its text color to either black or white.

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

<h3>Ready-made colors: Flat Button</h3>

On the flat variation, **bp-btn--colorName** sets the button's border and text color to the palette color.

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
        <button class="bp-btn bp-btn--flat bp-btn--warning">Flat Warning</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--flat
        <span class="bp-c-warning">.bp-btn--warning</span>
      </td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--flat bp-btn--delete">Flat Delete</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--flat
        <span class="bp-c-delete">.bp-btn--delete</span>
      </td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--flat bp-btn--true">Flat True</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--flat
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

<h3>No background</h3>

The variation **bp-btn--no-background** makes the **base** button's background color transparent. It should not affect a flat button.

```no-background.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--c-rooftop bp-btn--no-background">No Background</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-rooftop">.bp-btn--c-rooftop</span> .bp-btn--no-background</td>
    </tr>
  </tbody>
</table>
```

<h3>No border</h3>

The variation **bp-btn--no-border** makes the **flat** button's border color transparent. It should not affect a base button.

```no-border.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--flat bp-btn--desk bp-btn--no-border">No Border</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--flat <span class="bp-c-desk">.bp-btn--desk</span> .bp-btn--no-border</td>
    </tr>
  </tbody>
</table>
```
