---
name: Typography
category: Style
---

BLiP's typography is defined by one particular font family: **Nunito**.

Although **Nunito** is embedded throughout every **BLiP Toolkit** component, you can apply it using **bp-ff-nunito**.


<h3> Font Size </h3>

There are **eight** custom font sizes, ordered by decrescent size.

```font-size.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-1 tc">
        Size 1 / 48px / 3rem
      </td>
      <td class="bp-fs-5 tl">.bp-fs-1</td>
    </tr>
    <tr>
      <td class="bp-fs-2 tc">
        Size 2 / 32x / 2rem
      </td>
      <td class="bp-fs-5 tl">.bp-fs-2</td>
    </tr>
    <tr>
      <td class="bp-fs-3 tc">
        Size 3 / 24px / 1.5rem
      </td>
      <td class="bp-fs-5 tl">.bp-fs-3</td>
    </tr>
    <tr>
      <td class="bp-fs-4 tc">
        Size 4 / 20px / 1.25rem
      </td>
      <td class="bp-fs-5 tl">.bp-fs-4</td>
    </tr>
    <tr>
      <td class="bp-fs-5 tc">
        Size 5 / 16px / 1rem
      </td>
      <td class="bp-fs-5 tl">.bp-fs-5</td>
    </tr>
    <tr>
      <td class="bp-fs-6 tc">
        Size 6 / 14px / 0.875rem
      </td>
      <td class="bp-fs-5 tl">.bp-fs-6</td>
    </tr>
    <tr>
      <td class="bp-fs-7 tc">
        Size 7 / 12px / 0.75rem
      </td>
      <td class="bp-fs-5 tl">.bp-fs-7</td>
    </tr>
    <tr>
      <td class="bp-fs-8 tc">
        Size 8 / 10px / 0.625rem
      </td>
      <td class="bp-fs-5 tl">.bp-fs-8</td>
    </tr>
  </tbody>
</table>
```

<h3> Line Height </h3>

There are **eight** custom line heights, ordered by decrescent size and based on all font sizes.

These line heights are calculated by multiplying their respective font size by 1.5, according to [W3's accessibility specifications](https://www.w3.org/TR/WCAG20-TECHS/C21.html).

```line-height-custom.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-1 bp-lh-1 tc">
        Line Height 1 </br> 4.5rem / 72px
      </td>
      <td class="bp-fs-5 tl">.bp-fs-1 .bp-lh-1</td>
    </tr>
    <tr>
      <td class="bp-fs-2 bp-lh-2 tc">
        Line Height 2 </br> 3rem / 48px
      </td>
      <td class="bp-fs-5 tl">.bp-fs-2 .bp-lh-2</td>
    </tr>
    <tr>
      <td class="bp-fs-3 bp-lh-3 tc">
        Line Height 3 </br> 2.25rem / 36px
      </td>
      <td class="bp-fs-5 tl">.bp-fs-3 .bp-lh-3</td>
    </tr>
    <tr>
      <td class="bp-fs-4 bp-lh-4 tc">
        Line Height 4 </br> 1.875rem / 30px
      </td>
      <td class="bp-fs-5 tl">.bp-fs-4 .bp-lh-4</td>
    </tr>
    <tr>
      <td class="bp-fs-5 bp-lh-5 tc">
        Line Height 5 </br> 1.5rem / 24px
      </td>
      <td class="bp-fs-5 tl">.bp-fs-5 .bp-lh-5</td>
    </tr>
    <tr>
      <td class="bp-fs-6 bp-lh-6 tc">
        Line Height 6 </br> 1.3125rem / 21px
      </td>
      <td class="bp-fs-5 tl">.bp-fs-6 .bp-lh-6</td>
    </tr>
    <tr>
      <td class="bp-fs-7 bp-lh-7 tc">
        Line Height 7 </br> 1.125rem / 18px
      </td>
      <td class="bp-fs-5 tl">.bp-fs-7 .bp-lh-7</td>
    </tr>
    <tr>
      <td class="bp-fs-8 bp-lh-8 tc">
        Line Height 8 </br> 1.125rem / 15px
      </td>
      <td class="bp-fs-5 tl">.bp-fs-8 .bp-lh-8</td>
    </tr>
  </tbody>
</table>
```

There are also **four** relative line-height classes: **bp-lh-zero** (0%), **bp-lh-simple** (100%), **bp-lh-plus** (160%) and **bp-lh-double** (200%).

```line-height-relative.html
<table>
  <tbody>
    <tr>
      <td class="bp-fs-4 bp-lh-simple tc">
        Line Height </br> Simple / 100%
      </td>
      <td class="bp-fs-5 tl">.bp-fs-4 .bp-lh-simple</td>
    </tr>
    <tr>
      <td class="bp-fs-4 bp-lh-plus tc">
        Line Height </br> Plus / 160%
      </td>
      <td class="bp-fs-5 tl">.bp-fs-4 .bp-lh-plus</td>
    </tr>
    <tr>
      <td class="bp-fs-4 bp-lh-double tc">
        Line Height </br> Double / 200%
      </td>
      <td class="bp-fs-5 tl">.bp-fs-4 .bp-lh-double</td>
    </tr>
  </tbody>
</table>
```

<h3> Font Weight </h3>

There are **three** custom font sizes: **regular**, **bold** and **extra bold**.

```font-weight.html
<table>
  <tbody>
    <tr>
      <td class="bp-fw-regular tc">
        Regular / 400
      </td>
      <td class="bp-fs-5 tl">.bp-fw-regular</td>
    </tr>
    <tr>
      <td class="bp-fw-bold tc">
        Bold  / 600
      </td>
      <td class="bp-fs-5 tl">.bp-fw-bold</td>
    </tr>
    <tr>
      <td class="bp-fw-extra-bold tc">
        Extra Bold / 700
      </td>
      <td class="bp-fs-5 tl">.bp-fw-extra-bold</td>
    </tr>
  </tbody>
</table>
```

