import { range } from './range'

describe('range', () => {
  it('should return an array until the given number', () => {
    const result = range(5)
    expect(result).toEqual([0, 1, 2, 3, 4])
  })

  it('should return an array starting from 0', () => {
    const result = range(0, 5)
    expect(result).toEqual([0, 1, 2, 3, 4])
  })

  it('should return an array starting from 5', () => {
    const result = range(5, 10)
    expect(result).toEqual([5, 6, 7, 8, 9])
  })

  it('should return an array even when the starting number is higher than the ending number', () => {
    const result = range(5, 0)
    expect(result).toEqual([5, 4, 3, 2, 1])
  })

  it('should return an array even when the starting number is higher than the ending number on the middle', () => {
    const result = range(7, 3)
    expect(result).toEqual([7, 6, 5, 4])
  })
})
