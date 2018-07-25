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
        onRemove: () => {
          console.log('Tag removed callback called')
        },
      })

      spyOn(component.tagOptions, 'onRemove')
      component._removeTag()
      expect(component.tagOptions.onRemove).toHaveBeenCalled()
    })

    it('should execute tag click callback', () => {
      const component = new BlipTag({
        onTagClick: () => {
          console.log('tag clicked')
        },
      })

      const tagElement = component.render({
        label: 'My tag',
      })

      document.body.appendChild(tagElement)
      spyOn(component.tagOptions, 'onTagClick')
      tagElement.querySelector('.blip-tag').dispatchEvent(new Event('click'))
      expect(component.tagOptions.onTagClick).toHaveBeenCalled()
    })

    it('should update collapsed prop', () => {
      const component = new BlipTag({
        onTagClick: () => {
          console.log('tag clicked')
        },
      })

      component.render({
        label: 'My tag',
      })

      expect(component.props.label).toEqual('My tag')

      component.render({
        collapsed: true,
      })

      expect(component.props.collapsed).toBeTruthy()
      expect(component.props.label).toEqual('My tag')
    })
  })
})
