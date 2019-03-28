/* eslint-disable */
var jsdom = require('jsdom')
const { JSDOM } = jsdom;

const jsdomInstance = new JSDOM('<html><head></head><body></body></html>')

global.document = jsdomInstance.window.document
global.window = jsdomInstance.window
global.Element = jsdomInstance.window.Element
global.HTMLLabelElement = jsdomInstance.window.HTMLLabelElement
global.HTMLElement = jsdomInstance.window.HTMLElement
global.Event = jsdomInstance.window.Event
global.CustomEvent = jsdomInstance.window.CustomEvent
