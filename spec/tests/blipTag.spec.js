import { BlipTag } from '../../src/components/blipTag'

describe('BlipTag', () => {
  let tagList

  beforeEach(() => {
    tagList = document.createElement('div')
    tagList.id = 'my-tag-list'
    document.body.appendChild(tagList)
  })

  describe('Element', () => {
    it('should give a tag element with label passed as param', () => {
      const component = new BlipTag({
        label: 'my-tag',
      })

      expect(component.getValue()).toEqual('my-tag')
    })

    it('should set a tag background', () => {
      const component = new BlipTag({
        label: 'my-tag',
      })

      component._selectColor('#FF4A1E')
      expect(component.tagContainer.querySelector('.blip-tag').style.background).toEqual('rgb(255, 74, 30)')
    })

    it('should remove a tag', () => {
      const component = new BlipTag({
        label: 'my-tag',
      })

      tagList.appendChild(component.element)
      component._removeTag()
      expect(component.tagContainer).toBeUndefined()
    })
  })
})
