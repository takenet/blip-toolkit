import { BlipTags } from '../../src/components/blipTags'
import { BlipTag } from '../../src/components/blipTag'

describe('BlipTags', () => {
  let tagList

  beforeEach(() => {
    tagList = document.createElement('div')
    tagList.id = 'my-tag-list'
    document.body.appendChild(tagList)
  })

  describe('Instance', () => {
    it('should return a BlipTags instance', () => {
      const tags = new BlipTags(tagList)

      expect(tags instanceof BlipTags).toBeTruthy()
    })
  })

  describe('Methods', () => {
    describe('Handle tags', () => {
      describe('Add', () => {
        it('should add a tag', () => {
          const tagsInstance = new BlipTags(tagList)
          const tag = new BlipTag({ label: 'Tag', background: 'red' })
          tagsInstance.addTag(tag)

          expect(tagsInstance.tags.filter(t => t.label === 'Tag').length > 0).toBeTruthy()
        })
      })

      describe('Remove', () => {
        it('should remove a tag', () => {
          const tagsInstance = new BlipTags(tagList)
          const tag = new BlipTag({ label: 'Tag', background: 'red' })
          const newTag = tagsInstance.addTag(tag)

          tagsInstance._removeTag({
            $event: {
              tag: {
                label: newTag.label,
                id: newTag.tagOptions.id,
              },
            },
          })

          expect(tagsInstance.tags.filter(t => t.label === 'Tag').length === 0).toBeTruthy()
        })
      })
    })
  })
})
