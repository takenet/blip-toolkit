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
      const component = new BlipTag()
      component.render({
        label: 'my-tag',
      })

      expect(component.props.label).toEqual('my-tag')
    })

    it('should set a tag background', () => {
      const component = new BlipTag()
      const tagElement = component.render({
        canChangeBackground: true,
      })

      const someColor = tagElement.querySelectorAll('.blip-tag-select-color li')[1]
      someColor.dispatchEvent(new Event('click'))

      expect(component.props.background).toEqual(someColor.getAttribute('data-color'))
    })

    it('should remove a tag', () => {
      const component = new BlipTag({
        canRemoveTag: true,
        onRemove: function() {
          console.log('Tag removed callback called')
        },
      })

      spyOn(component.tagOptions, 'onRemove')
      component._removeTag()
      expect(component.tagOptions.onRemove).toHaveBeenCalled()
    })
  })
})
