---
name: Divider
category: Components
---

Dividers are implemented through either **bp-divider-h** (horizontal) or **bp-divider-v** (vertical). They are basically lines with a width ranging from 1 to 3 px, depending on their variation: base (1px), **bp-divider--medium** (2px) or **bp-divider--large** (3px).

```horizontal.html
<table class="w-100">
  <tbody class="w-100">
    <tr class="w-100">
      <td class="w-30">
        <div class="bp-divider-h"></div>
      </td>
      <td class="w-70 tl">
        .bp-divider-h
      </td>
    </tr>
    <tr class="w-100">
      <td class="w-30">
        <div class="bp-divider-h bp-divider--medium"></div>
      </td>
      <td class="w-70 tl">
        .bp-divider-h .bp-divider--medium
      </td>
    </tr>
    <tr class="w-100">
      <td class="w-30">
        <div class="bp-divider-h bp-divider--large"></div>
      </td>
      <td class="w-70 tl">
        .bp-divider-h .bp-divider--large
      </td>
    </tr>
  </tbody>
</table>
```

```vertical.html
<table class="w-100">
  <tbody class="w-100">
    <tr class="w-100">
      <td class="divider-container">
        <div class="bp-divider-v"></div>
      </td>
      <td class="w-100 tl">
        .bp-divider-v
      </td>
    </tr>
    <tr>
      <td class="divider-container">
        <div class="bp-divider-v bp-divider--medium"></div>
      </td>
      <td class="w-100 tl">
        .bp-divider-v .bp-divider--medium
      </td>
    </tr>
    <tr>
      <td class="divider-container">
        <div class="bp-divider-v bp-divider--large"></div>
      </td>
      <td class="w-100 tl">
        .bp-divider-v .bp-divider--large
      </td>
    </tr>
  </tbody>
</table>
```
```vertical.css hidden
.divider-container {
  height: 30px;
}
```
