---
name: Table
category: Components
---

Tables are styled through the base class **bp-table**. They MUST respect the standards of a HTML5 table: have `<table>` englobing `<thead><tr><th></th></tr></thead>` and `<tbody><tr><td></td></tr></tbody>`.

The text-align property of the table is not defined in means of flexibility.

```base.html
<table class="bp-table tl">
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
      <th>Header 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Description 1 asuwheaj klrwajkr sjakdfas</td>
      <td>Description 2</td>
      <td>Description 3 asddas sad</td>
    </tr>
    <tr>
      <td>Description 1 asuwheaj klrwajkr sjakdfas</td>
      <td>Description 2</td>
      <td>Description 3 asddas sad</td>
    </tr>
  </tbody>
</table>
```

<h3>Vertical Scroll</h3>

Tables also can have the **bp-table--scroll-y** variation, which allows its `<tbody>` to have vertical scroll if overflown. For that to work, you must manually declare the `<tbody>`'s maximum height.

```scrolly.html
<table class="bp-table bp-table--scroll-y">
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
      <th>Header 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Description 1 asuwheaj klrwajkr sjakdfas</td>
      <td>Description 2</td>
      <td>Description 3 asddas sad</td>
    </tr>
    <tr>
      <td>Description 1 asuwheaj klrwajkr sjakdfas</td>
      <td>Description 2</td>
      <td>Description 3 asddas sad</td>
    </tr>
  </tbody>
</table>
```

```scrolly.css hidden
.bp-table--scroll-y tbody {
  max-height: 472px;
}
```

<h3>Google Charts</h3>

Since Google Charts do not allow the addition of classes in its tables, you can use **bp-table-chart** and **bp-table-chart--scroll-y** on the table's parent. Also, **bp-table-chart--sort** can be used to add pointer cursor onto headers' sorting arrows and remove their outline.
