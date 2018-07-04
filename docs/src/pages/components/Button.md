---
name: Button
category: Components
---

Buttons are implemented through the base class *.bp-btn*. They have an opaque background that darkens on hover and no border.

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

<h2>Variations</h2>

Buttons can accept variations alongside their base class. Variations are modifiers that can affect properties such as background-color, border and max-width.

<h4>Flat</h4>
The variation *.bp-btn--flat* has a transparent background and an opaque border. Usually, its text and border have the same color and they darken on hover.

```flat.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--flat">Flat Default</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--flat</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--flat" disabled>Flat Default</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--flat [disabled]</td>
    </tr>
  </tbody>
</table>
```

<h4>Ready-made colors: Base Button</h4>
Buttons have ready-made color variations for all colors in BLiP's palette. They can be applied using the variation *.bp-btn--colorName*.

On the base class, the variation *bp-btn--colorName* sets the button's background color to the palette color and its text color to either black or white.

```colorbase.html
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

<h4>Ready-made colors: Flat Button</h4>

On the flat variation, the variation *bp-btn--colorName* sets the button's border and text color to the palette color.

```colorflat.html
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

<h4>Text colors</h4>

The variation *bp-btn--c-colorName* modifies only the button's text color. It accepts any color from BLiP's palette.

```textcolor.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--c-true">Text True</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--c-true</td>
    </tr>
  </tbody>
</table>
```



<h4>Background colors</h4>

The variation *bp-btn--bg-colorName* modifies only the button's text color. It accepts any color from BLiP's palette.

```bgcolor.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--bg-true">Background True</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--bg-true</td>
    </tr>
  </tbody>
</table>
```

<h4>Arrow</h4>

The variation *bp-btn--arrow* adds a pointy fashion to the button. It works with both base and flat variations.

```arrow.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--arrow">Base Arrow</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--arrow</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--arrow" disabled>Base Arrow</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--arrow [disabled]</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--flat bp-btn--arrow">Flat Arrow</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--flat .bp-btn--arrow</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        <button class="bp-btn bp-btn--flat bp-btn--arrow" disabled>Flat Arrow</button>
      </td>
      <td class="bp-fs-5 tl">.bp-btn .bp-btn--flat .bp-btn--arrow [disabled]</td>
    </tr>
  </tbody>
</table>
```
