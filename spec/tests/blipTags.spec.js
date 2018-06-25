import { BlipTags } from '../../src/components/blipTags'

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
          tagsInstance.addTag({ label: 'Tag', background: 'red' })

          expect(tagsInstance.tags.filter(t => t.label === 'Tag').length > 0).toBeTruthy()
        })
      })

      describe('Remove', () => {
        it('should remove a tag', () => {
          const tagsInstance = new BlipTags(tagList)
          const newTag = tagsInstance.addTag({ label: 'Tag', background: 'red' })

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
