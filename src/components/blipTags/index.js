import { BlipTag } from '../blipTag'

export class BlipTags {
  constructor(element, options) {
    this.tagsContainer = element
    this.tags = []
  }

  /**
   * Add tag on DOM and tags array
   * @param {String} label - tag label
   */
  _addTag(label) {
    this._handleTagRemove = this._removeTag.bind(this)
    const tag = new BlipTag({
      label,
      onRemove: this._handleTagRemove,
    })

    this.tags = this.tags.concat(tag)
    this.tagsContainer.appendChild(tag.element)
  }

  /**
   * Remove tag from list and dom
   * @param {EventEmitter} param0 - object that contais tag object of BlipTag component
   */
  _removeTag({ $event }) {
    const { tag } = $event
    this.tags = this.tags.filter(t => t.id !== tag.id)
    this.tagsContainer.removeChild(tag.element)
  }
}
