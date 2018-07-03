const stylemark = require('stylemark')

const input = './docs/src/pages'
const output = './docs'
const configPath = './build/stylemark.yml'

stylemark({ input, output, configPath })
