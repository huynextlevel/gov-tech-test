import { numberWithCommas, roundToNearestHalfHour } from 'src/utils'

describe('Helpers functions unit test', () => {
  describe('numberWithCommas', () => {
    it('should format number with commas', () => {
      expect(numberWithCommas(0)).toBe('0')
      expect(numberWithCommas(1234567)).toBe('1,234,567')
      expect(numberWithCommas('1234567')).toBe('1,234,567')
      expect(numberWithCommas(1234)).toBe('1,234')
      expect(numberWithCommas('1234')).toBe('1,234')
      expect(numberWithCommas(1000000)).toBe('1,000,000')
      expect(numberWithCommas(12)).toBe('12')
    })

    it('should handle negative numbers', () => {
      expect(numberWithCommas(-1234567)).toBe('-1,234,567')
      expect(numberWithCommas('-1234567')).toBe('-1,234,567')
    })
  })

  describe('roundToNearestHalfHour', () => {
    it('should round to the nearest half hour', () => {
      const time1 = new Date('2023-01-01T14:10:00Z')
      const roundedTime1 = roundToNearestHalfHour(time1)
      expect(roundedTime1.format('HH:mm')).toBe('21:00')

      const time2 = new Date('2023-01-01T14:20:00Z')
      const roundedTime2 = roundToNearestHalfHour(time2)
      expect(roundedTime2.format('HH:mm')).toBe('21:30')

      const time3 = new Date('2023-01-01T14:50:00Z')
      const roundedTime3 = roundToNearestHalfHour(time3)
      expect(roundedTime3.format('HH:mm')).toBe('22:00')

      const time4 = new Date('2023-01-01T14:45:00Z')
      const roundedTime4 = roundToNearestHalfHour(time4)
      expect(roundedTime4.format('HH:mm')).toBe('22:00')
    })
  })
})