import { NullLink } from './null-link'
import { instance, mock } from 'ts-mockito'
import { Context } from '../context'
import { ChainError } from '../chain-error'

describe('NullLink', () => {
  it('should throw chain error', () => {
    const nullLink = new NullLink()
    const context = mock(Context)

    try {
      nullLink.next(instance(context))
    } catch (e) {
      expect(e).toEqual(new ChainError())
    }
  })
})
