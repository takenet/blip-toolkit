---
name: Checkbox
category: Components
---

Checkboxes are implemented with four elements in a certain configuration:
- a **label** with class **bp-input--check--wrapper** englobing the others;
- an **input** with class **bp-input**;
- a **div** with class **bp-input--checkbox**;
- and a **span** containing the text.

The code **MUST** be exactly as the following example's in order to get the desired result.

```base.html
<table class="w-100">
  <tbody class="w-100">
    <tr class="w-100">
      <td class="w-30">
        <label class="bp-input--check--wrapper mb2">
          <input class="bp-input" type="checkbox" name="checkbox-group" value="1" checked>
          <div class="bp-input--checkbox">&check;</div>
          <span>Option 1</span>
        </label>

        <label class="bp-input--check--wrapper mb4">
          <input class="bp-input" type="checkbox" name="checkbox-group" value="2">
          <div class="bp-input--checkbox">&check;</div>
          <span>Option 2</span>
        </label>

        <label class="bp-input--check--wrapper mb2">
          <input class="bp-input" type="checkbox" name="checkbox-disabled-group" value="1" disabled checked>
          <div class="bp-input--checkbox">&check;</div>
          <span>Option 1 (Disabled and Checked)</span>
        </label>

        <label class="bp-input--check--wrapper mb2">
          <input class="bp-input" type="checkbox" name="checkbox-disabled-group" value="2" disabled>
          <div class="bp-input--checkbox">&check;</div>
          <span>Option 2 (Disabled and Not Checked)</span>
        </label>
      </td>
      <td class="w-70 bp-fs-5 bp-lh-5 tl">
        label.bp-input--check--wrapper </br> input.bp-input </br> div.bp-input--checkbox
      </td>
    </tr>
  </tbody>
</table>
```


