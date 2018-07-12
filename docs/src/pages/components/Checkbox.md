---
name: Checkbox
category: Components
---

Checkboxes are implemented with four elements in a certain configuration: ```<label class="bp-input--check--wrapper">```, ```<input class="bp-input">```, ```<div class="bp-input--checkbox">``` and ```<span>```.

The code **MUST** be exactly as the following example's in order to give the desired result.

```base.html
<table class="w-100">
  <tbody class="w-100">
    <tr class="w-100">
      <td class="w-30">
        <label class="bp-input--check--wrapper flex items-center">
          <input class="bp-input" type="checkbox" name="checkbox-input" value="1" checked>
          <div class="bp-input--checkbox bp-fs-6 bp-c-white tc mr2">&check;</div>
          <span>Option 1</span>
        </label>

        <label class="bp-input--check--wrapper flex items-center">
          <input class="bp-input" type="checkbox" name="checkbox-input" value="2">
          <div class="bp-input--checkbox bp-fs-6 bp-c-white tc mr2">&check;</div>
          <span>Option 2</span>
        </label>
      </td>
      <td class="w-70 tl">
        input.bp-input + div.bp-input--checkbox
      </td>
    </tr>
  </tbody>
</table>
```


