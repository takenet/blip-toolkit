---
name: Arrow
category: Components
---

Arrows can be represented through SVGs also, but you can use the CSS arrow with **bp-arrow** followed by **bp-arrow--up**, **bp-arrow--down**, **bp-arrow--right** or **bp-arrow--left**. Their size is related to their current font size.

Since CSS arrows are made from a border hack, you must change border color in order to customize these arrows.

```example.html
<table>
  <tbody>
    <tr>
      <td>
        <span class="bp-arrow bp-arrow--up bp-fs-4"></span>
      </td>
      <td>
        .bp-arrow bp-arrow--up
      </td>
    <tr>
    <tr>
      <td>
        <span class="bp-arrow bp-arrow--down bp-bc-time bp-fs-4"></span>
      </td>
      <td>
        .bp-arrow bp-arrow--down .bp-bc-time
      </td>
    <tr>
    <tr>
      <td>
        <span class="bp-arrow bp-arrow--right bp-bc-rooftop bp-fs-4"></span>
      </td>
      <td>
        .bp-arrow bp-arrow--right .bp-bc-rooftop
      </td>
    <tr>
    <tr>
      <td>
        <span class="bp-arrow bp-arrow--left bp-bc-blip-light bp-fs-4"></span>
      </td>
      <td>
        .bp-arrow bp-arrow--left .bp-bc-blip-light
      </td>
    <tr>
  </tbody>
</table>
```
</table>
