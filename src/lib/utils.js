/**
 * Turn a string into a node
 * @param  {String} String to convert
 * @return {HTMLElement}   Converted node element
 */
export const strToEl = (() => {
  const tmpEl = document.createElement('div')

  return function(str) {
    const cleanedInput = str.trim()
    tmpEl.innerHTML = cleanedInput
    const r = tmpEl.children[0]

    while (tmpEl.firstChild) {
      tmpEl.removeChild(tmpEl.firstChild)
    }

    return r
  }
})()

/**
 * Unique Random ID
 */
export const guid = (() => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)

  return () => {
    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    )
  }
})()

/**
 * Last array element
 */
export const last = array => array[array.length - 1]

/**
 * Insert element after another
 */
export const insertAfter = (newElement, referenceElement) => {
  referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling)
}

/**
 * Returns the difference between two arrays
 * @param {Array} a
 * @param {Array} b
 */
export const differenceByLabel = otherArray => current =>
  otherArray.filter(other => {
    return other.label === current.label
  }).length === 0

/**
 * Creates a HTML element with given classes
 * @param {String} elementTag
 * @param {Array} classes
 */
export const createHTMLElement = (elementTag, ...classes) => {
  var element = document.createElement(elementTag)
  if (classes) {
    classes.forEach(className => element.classList.add(className))
  }
  return element
}
