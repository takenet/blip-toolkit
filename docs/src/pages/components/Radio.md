---
name: Radio
category: Components
---

Radios are implemented with four elements in a certain configuration:
- a **label** with class **bp-input--check--wrapper** englobing the others;
- an **input** with class **bp-input**;
- a **div** with class **bp-input--radio**;
- and a **span** containing the text.

The code **MUST** be exactly as the following example's in order to give the desired result.

```base.html
<table class="w-100">
  <tbody class="w-100">
    <tr class="w-100">
      <td class="w-30">
        <label class="bp-input--check--wrapper pb0 mb2 flex items-center">
          <input class="bp-input" type="radio" value="1" name="radio-group">
          <div class="bp-input--radio"></div>
          <span class="ml2">Option 1</span>
        </label>
        <label class="bp-input--check--wrapper pb0 mb2 flex items-center">
          <input class="bp-input" type="radio" value="2" name="radio-group">
          <div class="bp-input--radio"></div>
          <span class="ml2">Option 2</span>
        </label>
        <label class="bp-input--check--wrapper pb0 mb2 flex items-center">
          <input class="bp-input" type="radio" value="3" name="radio-group">
          <div class="bp-input--radio"></div>
          <span class="ml2">Option 3</span>
        </label>
      </td>
      <td class="w-70 bp-fs-5 bp-lh-5 tl">
        label.bp-input--check--wrapper </br> input.bp-input </br> div.bp-input--radio
      </td>
    </tr>
  </tbody>
</table>
```
