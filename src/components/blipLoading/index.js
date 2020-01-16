import html from 'nanohtml'

const loadings = {
  'dotted': html`
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
    </div>
    `,
  'solid': html`<div class="bp-loading__solid "></div>`,
}

export const BlipLoading = (props = {type: 'dotted'}) => loadings[props.type]
