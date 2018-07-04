---
name: Divider
category: Components
---

Dividers are implemented through either **bp-divider-h** (horizontal) or **bp-divider-v** (vertical). They are basically lines with a width ranging from 1 to 3 px, depending on their variation: base (1px), **bp-divider--medium** (2px) or **bp-divider--large** (3px).

```horizontal.html
<table class="w-100">
  <tbody class="w-100">
    <tr class="w-100">
      <td class="w-50">
        <div class="w-100 bp-bg-rooftop bp-divider-h"></div>
      </td>
    </tr>
    <tr class="w-100">
      <td class="w-50">
        <div class="w-100 bp-bg-rooftop bp-divider-h bp-divider--medium"></div>
      </td>
    </tr>
    <tr class="w-100">
      <td class="w-50">
        <div class="w-100 bp-bg-rooftop bp-divider-h bp-divider--large"></div>
      </td>
    </tr>
  </tbody>
</table>
```

```vertical.html
<table class="w-100">
  <tbody class="w-100">
    <tr class="w-100">
      <td>
        <div class="bp-bg-rooftop bp-divider-v"></div>
      </td>
      <td class="w-100 tl">
        .bp-bg-rooftop .bp-divider-v
      </td>
    </tr>
    <tr>
      <td>
        <div class="bp-bg-rooftop bp-divider-v bp-divider--medium"></div>
      </td>
      <td class="w-100 tl">
        .bp-bg-rooftop .bp-divider-v .bp-divider--medium
      </td>
    </tr>
    <tr>
      <td>
        <div class="bp-bg-rooftop bp-divider-v bp-divider--large"></div>
      </td>
      <td class="w-100 tl">
        .bp-bg-rooftop .bp-divider-v .bp-divider--large
      </td>
    </tr>
  </tbody>
</table>
```
```vertical.css hidden
.bp-divider-v {
  height: 30px;
}
```
