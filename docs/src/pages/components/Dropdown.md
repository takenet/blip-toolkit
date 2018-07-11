---
name: Dropdown
category: Components
---

Dropdowns are implemented through the base class **bp-dropdown**. They only delimit a dropdown's container CSS. Its size is decided by its content.

Dropdowns **must** have at least one variation of orientation - **bp-dropdown--right** or **bp-dropdown--left** - and one of visibility - **bp-dropdown--show** or **bp-dropdown--hide**.

```base.html
<table class="w-100">
  <tbody class="w-100">
    <tr class="w-100">
      <td class="w-100 bp-fs-5 tc">
        <div class="relative">
          <div class="bp-dropdown bp-dropdown--show bp-dropdown--left">
            .bp-dropdown .bp-dropdown--show .bp-dropdown--left
          </div>
        </div>
      </td>
    </tr>
    <tr class="w-100">
      <td class="w-100 bp-fs-5 tc">
        <div class="relative">
          <div class="bp-dropdown bp-dropdown--show bp-dropdown--right">
            .bp-dropdown .bp-dropdown--show .bp-dropdown--right
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</table>
```
