import { BlipSelect } from '../../src/components/blipSelect/blipSelect'

describe('BlipSelect', function() {
  describe('Instance', function() {
    it('should return a BlipSelect instance', function(done) {
      const x = new BlipSelect()
      expect(x instanceof BlipSelect).toBeTruthy()
    })
  })
})
