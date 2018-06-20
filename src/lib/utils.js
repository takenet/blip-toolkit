/**
 * Turn a string into a node
 * @param  {String} String to convert
 * @return {HTMLElement}   Converted node element
 */
export const strToEl = (() => {
  const tmpEl = document.createElement('div')

  return function(str) {
    const cleanedInput = str.trim()
    let r
    tmpEl.innerHTML = cleanedInput
    r = tmpEl.children[0]

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
