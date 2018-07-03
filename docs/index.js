const stylemark = require('stylemark')

const input = './docs/pages'
const output = './docs/build'
const configPath = './build/stylemark.yml'

stylemark({ input, output, configPath })
