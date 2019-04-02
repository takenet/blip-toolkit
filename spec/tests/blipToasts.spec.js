import { BlipToasts } from '../../src/components/blipToasts'

jasmine.clock().install()

describe('BlipToasts', () => {
  it('should show info toast', () => {
    const component = new BlipToasts()
    const renderedElement = component.render()
    const msg = 'Toast content'
    document.body.appendChild(renderedElement)
    component.info(msg)

    const toast = renderedElement.querySelector('.bp-toast')
    expect(toast).not.toEqual(null)
    expect(toast).toHaveClass('bp-toast--info')
  })

  it('should show success toast', () => {
    const component = new BlipToasts()
    const renderedElement = component.render()
    const msg = 'Toast content'
    document.body.appendChild(renderedElement)
    component.success(msg)

    const toast = renderedElement.querySelector('.bp-toast')
    expect(toast).not.toEqual(null)
    expect(toast).toHaveClass('bp-toast--success')
  })

  it('should show danger toast', () => {
    const component = new BlipToasts()
    const renderedElement = component.render()
    const msg = 'Toast content'
    document.body.appendChild(renderedElement)
    component.danger(msg)

    const toast = renderedElement.querySelector('.bp-toast')
    expect(toast).not.toEqual(null)
    expect(toast).toHaveClass('bp-toast--danger')
  })

  it('should show warning toast', () => {
    const component = new BlipToasts()
    const renderedElement = component.render()
    const msg = 'Toast content'
    document.body.appendChild(renderedElement)
    component.warning(msg)

    const toast = renderedElement.querySelector('.bp-toast')
    expect(toast).not.toEqual(null)
    expect(toast).toHaveClass('bp-toast--warning')
  })

  it('should desapear after elapsed time', () => {
    const component = new BlipToasts()
    const renderedElement = component.render()
    const msg = 'Toast content'
    document.body.appendChild(renderedElement)
    component.warning(msg, 2000)

    let toast = renderedElement.querySelector('.bp-toast')
    expect(toast).not.toEqual(null)
    jasmine.clock().tick(2500)
    toast = renderedElement.querySelector('.bp-toast')
    expect(toast).toBeNull()
  })

  it('should not desapear if time is set to 0', () => {
    const component = new BlipToasts()
    const renderedElement = component.render()
    const msg = 'Toast content'
    document.body.appendChild(renderedElement)
    component.warning(msg, 0)

    let toast = renderedElement.querySelector('.bp-toast')
    expect(toast).not.toEqual(null)
    jasmine.clock().tick(2500)
    toast = renderedElement.querySelector('.bp-toast')
    expect(toast).not.toEqual(null)
    jasmine.clock().tick(2500)
    toast = renderedElement.querySelector('.bp-toast')
    expect(toast).not.toEqual(null)
  })

  it('should be dismissable', () => {
    const component = new BlipToasts()
    const renderedElement = component.render()
    const msg = 'Toast content'
    document.body.appendChild(renderedElement)
    component.warning(msg, 0)

    const dismissButton = renderedElement.querySelector('.dismiss')

    let toast = renderedElement.querySelector('.bp-toast')
    expect(toast).not.toEqual(null)
    dismissButton.dispatchEvent(new Event('click'))
    toast = renderedElement.querySelector('.bp-toast')
    expect(toast).toBeNull()
  })
})
