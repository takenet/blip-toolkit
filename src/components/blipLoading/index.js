import html from 'nanohtml'

export const LoadingTypes = {
  Dotted: 'dotted',
  Solid: 'solid',
}

export const LoadingSizes = {
  Normal: 'normal',
  Small: 'small',
}

const loadings = {
  [LoadingTypes.Dotted]: html`
    <div class="bp-loading bp-loading__content">
        <div class="bp-loading1 bp-loading__circle"></div>
        <div class="bp-loading2 bp-loading__circle"></div>
        <div class="bp-loading3 bp-loading__circle"></div>
        <div class="bp-loading4 bp-loading__circle"></div>
        <div class="bp-loading5 bp-loading__circle"></div>
        <div class="bp-loading6 bp-loading__circle"></div>
        <div class="bp-loading7 bp-loading__circle"></div>
        <div class="bp-loading8 bp-loading__circle"></div>
        <div class="bp-loading9 bp-loading__circle"></div>
        <div class="bp-loading10 bp-loading__circle"></div>
        <div class="bp-loading11 bp-loading__circle"></div>
        <div class="bp-loading12 bp-loading__circle"></div>
    </div>`,
  [LoadingTypes.Solid]: html`<div class="bp-loading__solid "></div>`,
}

const $defaults = {
  type: LoadingTypes.Dotted,
  size: LoadingSizes.Normal,
}

export const BlipLoading = (props) => {
  props = {
    ...$defaults,
    ...props,
  }
  const loadingEl = loadings[props.type]

  if (props.size === LoadingSizes.Small) {
    loadingEl.classList.add('bp-loading--small')
  }

  return loadingEl
}
