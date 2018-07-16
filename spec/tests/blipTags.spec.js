import { BlipTags } from '../../src/components/blipTags'

describe('BlipTags', () => {
  describe('Instance', () => {
    it('should return a BlipTags instance', () => {
      const tags = new BlipTags()

      expect(tags instanceof BlipTags).toBeTruthy()
    })
  })

  describe('Methods', () => {
    describe('Handle tags', () => {
      describe('Add', () => {
        it('should add a tag', () => {
          const tagsInstance = new BlipTags()

          document.body.appendChild(tagsInstance.render({
            tags: [{ label: 'a', background: 'red' }, { label: 'b' }, { label: 'c' }],
            options: [{ label: 'a', background: 'red' }, { label: 'b' }, { label: 'c' }, { label: 'd', background: 'black' }],
          }))

          tagsInstance.addTag({
            $event: {
              newOption: {
                label: 'Added tag',
                background: 'black',
              },
            },
          })

          expect(tagsInstance.props.tags.some(t => t.label === 'Added tag')).toBeTruthy()
        })
      })

      describe('Remove', () => {
        it('should remove a tag', () => {
          const tagsInstance = new BlipTags()
          document.body.appendChild(tagsInstance.render({
            tags: [{ label: 'Tag 1', background: 'red' }],
          }))

          expect(tagsInstance.props.tags.some(t => t.label === 'Tag 1')).toBeTruthy()

          const tagId = tagsInstance.props.tags[0].id
          tagsInstance._handleRemoveTag({
            $event: {
              tag: {
                props: {
                  id: tagId,
                },
              },
            },
          })

          expect(tagsInstance.props.tags.some(t => t.label === 'Tag 1')).toBeFalsy()
        })
      })
    })
  })
})
