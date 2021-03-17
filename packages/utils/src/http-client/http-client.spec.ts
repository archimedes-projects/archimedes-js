import { HttpClient, Options } from './http-client'
import { mocked } from 'ts-jest/utils'

describe('HttpClient', () => {
  it('should configure base url', () => {
    mocked(fetch).mockImplementation(
      (): Promise<any> =>
        Promise.resolve({
          json: () => Promise.resolve('foo')
        })
    )
    const { httpClient } = setup({ baseUrl: 'foo' })

    httpClient.get('foo')

    expect(mocked(fetch).mock.calls).toEqual([])
  })
})

function setup(options?: Partial<Options>) {
  return {
    httpClient: HttpClient.create(options)
  }
}
