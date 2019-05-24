---
name: Color
category: Style
---

BLiP's color palette consists of three groups of colors: **Corporates**, **Semiotics** and **Neutrals**.

Insert classes containing a **root** followed by a **color's name** to apply color on:
* Background: bp-bg-{color}
* Border: bp-bc-{color}
* Text: bp-c-{color}
* Button: bp-btn-{color} - see Button section for more!
* Svg/Use fill: bp-fill-{color} - see below for more!

<h3> SVG fillings </h3>

SVG icons, if inline or created with a **use** tag, can have their fill colors stylized. For that, you can use fill classes for the base element and for some pseudo classes:

* Base color: bp-fill-{color}
* Hover color: bp-fill-{color}--hover
* Active color: bp-fill-{color}--active
* Disabled color: bp-fill-{color}--disabled

Those classes apply for all **svg** and **use** tags inside the component, so **be careful**!

<h3> Corporate Palette </h3>

**Corporate** colors are nuances which feature BLiP's brand and must be used for highlighting and catching users' attention.

```corporates.html
<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-bot">
    </div>
    <span class="db tc bp-c-bot">
      .bp-bg-bot
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-bot">
    </div>
    <span class="db tc bp-c-bot">
      .bp-bc-bot
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-bot bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-bot">
      .bp-c-bot
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>Bot</span>
    <span>#2cc3d5</span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-blip-light">
    </div>
    <span class="db tc bp-c-blip-light">
      .bp-bg-blip-light
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-blip-light">
    </div>
    <span class="db tc bp-c-blip-light">
      .bp-bc-blip-light
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-blip-light bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-blip-light">
      .bp-c-blip-light
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>BLiP Light</span>
    <span>#0cc8cc</span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-blip-dark">
    </div>
    <span class="db tc bp-c-blip-dark">
      .bp-bg-blip-dark
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-blip-dark">
    </div>
    <span class="db tc bp-c-blip-dark">
      .bp-bc-blip-dark
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-blip-dark bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-blip-dark">
      .bp-c-blip-dark
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>BLiP Dark</span>
    <span>#15afb2</span>
  </div>
</div>
```

```corporates.css hidden

.example-container {
  width: 120px;
}

.card-container {
  height: 80px;
  width: 80px;
  padding: 0;
  margin-bottom: 0.25rem;
}
```








<h3> Semiotic Palette </h3>

**Semiotic** colors carry recurrent meanings and transmit messages to users.

```semiotics.html
<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-warning">
    </div>
    <span class="db tc bp-c-warning">
      .bp-bg-warning
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-warning">
    </div>
    <span class="db tc bp-c-warning">
      .bp-bc-warning
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-warning bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-warning">
      .bp-c-warning
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>Warning</span>
    <span>#f76556</span>
  </div>
</div>

<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-warning-yellow">
    </div>
    <span class="db tc bp-c-warning-yellow">
      .bp-bg-warning-yellow
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-warning-yellow">
    </div>
    <span class="db tc bp-c-warning-yellow">
      .bp-bc-warning-yellow
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-warning-yellow bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-warning-yellow">
      .bp-c-warning-yellow
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>Warning Yellow</span>
    <span>#ffcf33</span>
  </div>
</div>

<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-cheetos">
    </div>
    <span class="db tc bp-c-cheetos">
      .bp-bg-cheetos
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-cheetos">
    </div>
    <span class="db tc bp-c-cheetos">
      .bp-bc-cheetos
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-cheetos bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-cheetos">
      .bp-c-cheetos
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>Cheetos</span>
    <span>#F9B42F</span>
  </div>
</div>

<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-warning-light">
    </div>
    <span class="db tc bp-c-warning-light">
      .bp-bg-warning-light
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-warning-light">
    </div>
    <span class="db tc bp-c-warning-light">
      .bp-bc-warning-light
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-warning-light bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-warning-light">
      .bp-c-warning-light
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>Warning Light</span>
    <span>#fbeaea</span>
  </div>
</div>

<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-delete">
    </div>
    <span class="db tc bp-c-delete">
      .bp-bg-delete
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-delete">
    </div>
    <span class="db tc bp-c-delete">
      .bp-bc-delete
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-delete bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-delete">
      .bp-c-delete
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>Delete</span>
    <span>#fb7a6d</span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-true">
    </div>
    <span class="db tc bp-c-true">
      .bp-bg-true
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-true">
    </div>
    <span class="db tc bp-c-true">
      .bp-bc-true
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-true bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-true">
      .bp-c-true
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>True</span>
    <span>#4dcb7b</span>
  </div>
</div>
```

```semiotics.css hidden

.example-container {
  width: 120px;
}

.card-container {
  height: 80px;
  width: 80px;
  padding: 0;
  margin-bottom: 0.25rem;
}
```







<h3> Neutral Palette </h3>

**Neutral** colors are tones used in typography and the biggest part of the platform's components. These colors create a fluid experience, with no visual noise.

```neutrals.html
<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-piano">
    </div>
    <span class="db tc bp-c-piano">
      .bp-bg-piano
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-piano">
    </div>
    <span class="db tc bp-c-piano">
      .bp-bc-piano
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-piano bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-piano">
      .bp-c-piano
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>Piano</span>
    <span>#191919</span>
  </div>
</div>

<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-console">
    </div>
    <span class="db tc bp-c-console">
      .bp-bg-console
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-console">
    </div>
    <span class="db tc bp-c-console">
      .bp-bc-console
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-console bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-console">
      .bp-c-console
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>Console</span>
    <span>#1d1d1d</span>
  </div>
</div>

<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-obsidian">
    </div>
    <span class="db tc bp-c-obsidian">
      .bp-bg-obsidian
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-obsidian">
    </div>
    <span class="db tc bp-c-obsidian">
      .bp-bc-obsidian
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-obsidian bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-obsidian">
      .bp-c-obsidian
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>Obsidian</span>
    <span>#1a272f</span>
  </div>
</div>

<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-onix">
    </div>
    <span class="db tc bp-c-onix">
      .bp-bg-onix
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-onix">
    </div>
    <span class="db tc bp-c-onix">
      .bp-bc-onix
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-onix bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-onix">
      .bp-c-onix
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>Onix</span>
    <span>#242b36</span>
  </div>
</div>

<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-suit">
    </div>
    <span class="db tc bp-c-suit">
      .bp-bg-suit
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-suit">
    </div>
    <span class="db tc bp-c-suit">
      .bp-bc-suit
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-suit bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-suit">
      .bp-c-suit
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>Suit</span>
    <span>#3d4554</span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-city">
    </div>
    <span class="db tc bp-c-city">
      .bp-bg-city
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-city">
    </div>
    <span class="db tc bp-c-city">
      .bp-bc-city
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-city bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-city">
      .bp-c-city
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>City</span>
    <span>#52636c</span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-desk">
    </div>
    <span class="db tc bp-c-desk">
      .bp-bg-desk
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-desk">
    </div>
    <span class="db tc bp-c-desk">
      .bp-bc-desk
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-desk bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-desk">
      .bp-c-desk
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>Desk</span>
    <span>#607B99</span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-rooftop">
    </div>
    <span class="db tc bp-c-rooftop">
      .bp-bg-rooftop
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-rooftop">
    </div>
    <span class="db tc bp-c-rooftop">
      .bp-bc-rooftop
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-rooftop bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-rooftop">
      .bp-c-rooftop
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>Rooftop</span>
    <span>#738192</span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-cloud">
    </div>
    <span class="db tc bp-c-cloud">
      .bp-bg-cloud
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-cloud">
    </div>
    <span class="db tc bp-c-cloud">
      .bp-bc-cloud
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-cloud bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-cloud">
      .bp-c-cloud
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>Cloud</span>
    <span>#8ca0b3</span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-silver">
    </div>
    <span class="db tc bp-c-silver">
      .bp-bg-silver
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-silver">
    </div>
    <span class="db tc bp-c-silver">
      .bp-bc-silver
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-silver bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-silver">
      .bp-c-silver
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>Silver</span>
    <span>#94a3ab</span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-time">
    </div>
    <span class="db tc bp-c-time">
      .bp-bg-time
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-time">
    </div>
    <span class="db tc bp-c-time">
      .bp-bc-time
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-time bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-time">
      .bp-c-time
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>Time</span>
    <span>#a8bfc4</span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-breeze">
    </div>
    <span class="db tc bp-c-black">
      .bp-bg-breeze
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-breeze">
    </div>
    <span class="db tc bp-c-black">
      .bp-bc-breeze
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-breeze bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-black">
      .bp-c-breeze
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>Breeze</span>
    <span>#c9dfe4</span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-sky">
    </div>
    <span class="db tc bp-c-black">
      .bp-bg-sky
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-sky">
    </div>
    <span class="db tc bp-c-black">
      .bp-bc-sky
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-sky bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-black">
      .bp-c-sky
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>Sky</span>
    <span>#daf2f4</span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-offwhite">
    </div>
    <span class="db tc bp-c-black">
      .bp-bg-offwhite
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-offwhite">
    </div>
    <span class="db tc bp-c-black">
      .bp-bc-offwhite
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-offwhite bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-black">
      .bp-c-offwhite
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>Offwhite</span>
    <span>#eaeeee</span>
  </div>
</div>

<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-whisper">
    </div>
    <span class="db tc bp-c-black">
      .bp-bg-whisper
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-whisper">
    </div>
    <span class="db tc bp-c-black">
      .bp-bc-whisper
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-whisper bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db tc bp-c-black">
      .bp-c-whisper
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <span>Whisper</span>
    <span>#f5f8f9</span>
  </div>
</div>
```

```neutrals.css hidden

.example-container {
  width: 120px;
}

.card-container {
  height: 80px;
  width: 80px;
  padding: 0;
  margin-bottom: 0.25rem;
}
```









<h3> Gradients </h3>

**Gradients** are used in specific cases and consists of colors from the palette's spectrum.

Insert a class containing **bp-grad-{gradient}** to apply it as a **background-image**.

```gradients.html
<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-grad-shine">
    </div>
    <span class="db tc bp-c-time">
      .bp-grad-shine: (180deg, #f9fbfc 0%, #ecf1f3 100%);
    </span>
  </div>
</div>

<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-grad-bot">
    </div>
    <span class="db tc bp-c-blip-dark">
      .bp-grad-bot: (90deg, #51DBE3 0%, #28B4C3 100%);
    </span>
  </div>
</div>

<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-grad-blip">
    </div>
    <span class="db tc bp-c-blip-light">
      .bp-grad-blip: (137.45deg, #1BD6E7 0%, #0FC3F8 56.17%, #0ABCFF 100%);
    </span>
  </div>
</div>

<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-center items-center mt2 mb2 mh3">
    <div class="db card-container bp-grad-suit">
    </div>
    <span class="db tc bp-c-suit">
      .bp-grad-suit: (90deg,#3d4554,#2f3747);
    </span>
  </div>
</div>
```

```gradients.css hidden

.example-container {
  width: 240px;
}

.card-container {
  height: 120px;
  width: 120px;
  padding: 0;
  margin-bottom: 0.25rem;
}
```
