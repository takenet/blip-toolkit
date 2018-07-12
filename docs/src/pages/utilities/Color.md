---
name: Color
category: Utilities
---

BLiP's color palette consists of three groups of colors: **Corporates**, **Semiotics** and **Neutrals**.

Insert classes containing a **root** followed by a **color's name** to apply color on:
* Backgrounds: bp-bg-{color}
* Borders: bp-bc-{color}
* Text: bp-c-{color}


<h3> Corporate Palette </h3>

**Corporate** colors are nuances which feature BLiP's brand and must be used for highlighting and catching users' attention.

```corporates.html
<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-bot">
    </div>
    <span class="db bp-c-bot">
      bp-bg-bot
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-bot">
    </div>
    <span class="db bp-c-bot">
      bp-bc-bot
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-bot bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db bp-c-bot">
      bp-c-bot
    </span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-blip-light">
    </div>
    <span class="db bp-c-blip-light">
      bp-bg-blip-light
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-blip-light">
    </div>
    <span class="db bp-c-blip-light">
      bp-bc-blip-light
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-blip-light bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db bp-c-blip-light">
      bp-c-blip-light
    </span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-blip-dark">
    </div>
    <span class="db bp-c-blip-dark">
      bp-bg-blip-dark
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-blip-dark">
    </div>
    <span class="db bp-c-blip-dark">
      bp-bc-blip-dark
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-blip-dark bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db bp-c-blip-dark">
      bp-c-blip-dark
    </span>
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
    <span class="db bp-c-warning">
      bp-bg-warning
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-warning">
    </div>
    <span class="db bp-c-warning">
      bp-bc-warning
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-warning bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db bp-c-warning">
      bp-c-warning
    </span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-delete">
    </div>
    <span class="db bp-c-delete">
      bp-bg-delete
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-delete">
    </div>
    <span class="db bp-c-delete">
      bp-bc-delete
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-delete bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db bp-c-delete">
      bp-c-delete
    </span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-true">
    </div>
    <span class="db bp-c-true">
      bp-bg-true
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-true">
    </div>
    <span class="db bp-c-true">
      bp-bc-true
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-true bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db bp-c-true">
      bp-c-true
    </span>
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
    <div class="db card-container bp-bg-onix">
    </div>
    <span class="db bp-c-onix">
      bp-bg-onix
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-onix">
    </div>
    <span class="db bp-c-onix">
      bp-bc-onix
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-onix bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db bp-c-onix">
      bp-c-onix
    </span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-city">
    </div>
    <span class="db bp-c-city">
      bp-bg-city
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-city">
    </div>
    <span class="db bp-c-city">
      bp-bc-city
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-city bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db bp-c-city">
      bp-c-city
    </span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-desk">
    </div>
    <span class="db bp-c-desk">
      bp-bg-desk
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-desk">
    </div>
    <span class="db bp-c-desk">
      bp-bc-desk
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-desk bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db bp-c-desk">
      bp-c-desk
    </span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-rooftop">
    </div>
    <span class="db bp-c-rooftop">
      bp-bg-rooftop
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-rooftop">
    </div>
    <span class="db bp-c-rooftop">
      bp-bc-rooftop
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-rooftop bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db bp-c-rooftop">
      bp-c-rooftop
    </span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-cloud">
    </div>
    <span class="db bp-c-cloud">
      bp-bg-cloud
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-cloud">
    </div>
    <span class="db bp-c-cloud">
      bp-bc-cloud
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-cloud bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db bp-c-cloud">
      bp-c-cloud
    </span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-silver">
    </div>
    <span class="db bp-c-silver">
      bp-bg-silver
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-silver">
    </div>
    <span class="db bp-c-silver">
      bp-bc-silver
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-silver bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db bp-c-silver">
      bp-c-silver
    </span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-time">
    </div>
    <span class="db bp-c-time">
      bp-bg-time
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-time">
    </div>
    <span class="db bp-c-time">
      bp-bc-time
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-time bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db bp-c-time">
      bp-c-time
    </span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-breeze">
    </div>
    <span class="db bp-c-black">
      bp-bg-breeze
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-breeze">
    </div>
    <span class="db bp-c-black">
      bp-bc-breeze
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-breeze bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db bp-c-black">
      bp-c-breeze
    </span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-sky">
    </div>
    <span class="db bp-c-black">
      bp-bg-sky
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-sky">
    </div>
    <span class="db bp-c-black">
      bp-bc-sky
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-sky bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db bp-c-black">
      bp-c-sky
    </span>
  </div>
</div>


<div class="w-100 mb4 flex flex-row flex-start flex-wrap items-center">
  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container bp-bg-offwhite">
    </div>
    <span class="db bp-c-black">
      bp-bg-offwhite
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="db card-container ba bw2 bp-bc-offwhite">
    </div>
    <span class="db bp-c-black">
      bp-bc-offwhite
    </span>
  </div>

  <div class="example-container flex flex-column justify-start items-center mt2 mb2 mh3">
    <div class="flex flex-column justify-end card-container">
      <span class="bp-c-offwhite bp-fs-2 bp-fw-bold tc">
        Aa
      </span>
    </div>
    <span class="db bp-c-black">
      bp-c-offwhite
    </span>
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
