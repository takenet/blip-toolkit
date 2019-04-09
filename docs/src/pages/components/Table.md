---
name: Table
category: Components
---

Tables are styled through the base class **bp-table**. They MUST respect the standards of a HTML5 table: have `<table>` englobing `<thead><tr><th></th></tr></thead>` and `<tbody><tr><td></td></tr></tbody>`.

The text-align property of `bp-table` is not defined for more flexibility.

```base.html
<table class="bp-table">
  <thead>
    <tr>
      <th class="tl">Header 1</th>
      <th class="tc">Header 2</th>
      <th class="tr">Header 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="tl">Description 1</td>
      <td class="tc">Description 2</td>
      <td class="tr">Description 3</td>
    </tr>
    <tr>
      <td class="tl">Description 1</td>
      <td class="tc">Description 2</td>
      <td class="tr">Description 3</td>
    </tr>
  </tbody>
</table>
```

<h3>Vertical Scroll</h3>

Tables also can have the **bp-table--scroll-y** variation, which allows its `<tbody>` to have vertical scroll if overflown. For that to work, you must manually declare the `<tbody>`'s maximum height.

*Important:* This variation transforms the table's display into flex. If you don't want any unexpected layout breaks, you must set all `<th>` and `<td>`'s width accordingly, so they respect one another.

```scrolly.css
tbody {
  max-height: 472px;
}

th, td {
  width: 33%;
}
```

```scrolly.html
<table class="bp-table bp-table--scroll-y tl">
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
      <th>Header 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Description 1</td>
      <td>Description 2</td>
      <td>Description 3</td>
    </tr>
    <tr>
      <td>Description 1</td>
      <td>Description 2</td>
      <td>Description 3</td>
    </tr>
    <tr>
      <td>Description 1</td>
      <td>Description 2</td>
      <td>Description 3</td>
    </tr>
    <tr>
      <td>Description 1</td>
      <td>Description 2</td>
      <td>Description 3</td>
    </tr>
    <tr>
      <td>Description 1</td>
      <td>Description 2</td>
      <td>Description 3</td>
    </tr>
    <tr>
      <td>Description 1</td>
      <td>Description 2</td>
      <td>Description 3</td>
    </tr>
    <tr>
      <td>Description 1</td>
      <td>Description 2</td>
      <td>Description 3</td>
    </tr>
    <tr>
      <td>Description 1</td>
      <td>Description 2</td>
      <td>Description 3</td>
    </tr>
    <tr>
      <td>Description 1</td>
      <td>Description 2</td>
      <td>Description 3</td>
    </tr>
    <tr>
      <td>Description 1</td>
      <td>Description 2</td>
      <td>Description 3</td>
    </tr>
    <tr>
      <td>Description 1</td>
      <td>Description 2</td>
      <td>Description 3</td>
    </tr>
    <tr>
      <td>Description 1</td>
      <td>Description 2</td>
      <td>Description 3</td>
    </tr>
    <tr>
      <td>Description 1</td>
      <td>Description 2</td>
      <td>Description 3</td>
    </tr>
  </tbody>
</table>
```

<h3>Google Charts</h3>

Since Google Charts do not allow the addition of classes in its tables, you can use **bp-table-chart** and **bp-table-chart--scroll-y** on the table's parent. Also, **bp-table-chart--sort** can be used to add pointer cursor onto headers' sorting arrows and remove their outline.
