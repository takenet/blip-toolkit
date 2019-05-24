---
name: Badge
category: Components
---

Badges are interface elements that can contain or not text inside (usually numbers). They use the class **bp-badge** and have their size and padding related to their font-size. They have a minimum size of 1.6em, line-height of 1.6em and horizontal padding of 0.5em. A badge has blip-light as default background color and white as default text color. Also, they have bottom vertical alignment.

If you wish to use a badge only as a colored circle with no text, you can use the variant **bp-badge--no-text**. They have a smaller size of 1em, with no line-height and padding.

```example.html
<table>
  <tbody>
    <tr>
      <td>
        <span class="bp-badge bp-fs-7">2</span>
      </td>
      <td>
        .bp-badge .bp-fs-7
      </td>
    <tr>
    <tr>
      <td>
        <span class="bp-badge bp-fs-6">2323+</span>
      </td>
      <td>
        .bp-badge .bp-fs-6
      </td>
    <tr>
    <tr>
      <td>
        <span class="bp-badge bp-fs-8">33231331 <br> 2</span>
      </td>
      <td>
        .bp-badge .bp-fs-8
      </td>
    <tr>
    <tr>
      <td>
        <span class="bp-badge bp-fs-6"></span>
      </td>
      <td>
        .bp-badge .bp-fs-6
      </td>
    <tr>
    <tr>
      <td>
        <span class="bp-badge bp-badge--no-text bp-fs-6"></span>
      </td>
      <td>
        .bp-badge .bp-badge--no-text .bp-fs-6
      </td>
    <tr>
  </tbody>
</table>
```
</table>
