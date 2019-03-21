import { BlipLoading } from '../../src/components/blipLoading'

describe('BlipLoading', () => {
  describe('Instance', () => {
    it('should return a BlipLoading instance', () => {
      const loading = new BlipLoading()

      expect(loading instanceof BlipLoading).toBeTruthy()
    })
  })
})
