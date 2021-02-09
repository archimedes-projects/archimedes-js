import { EmptyLink } from './empty-link'
import { instance, mock } from 'ts-mockito'
import { Link } from './link'

describe('EmptyLink', () => {
  it('should do nothing when setting link', () => {
    const emptyLink = new EmptyLink()
    const link = mock<Link>()

    const actual = emptyLink.setNext(instance(link))

    expect(actual).toEqual(emptyLink)
  })
})
