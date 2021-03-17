import { HttpClient, Options } from './http-client'

describe('HttpClient', () => {
  it('should configure base url', async () => {
    const { httpClient } = setup({ baseUrl: 'http://foo' })

    await httpClient.get('bar')

    expect(window.fetch).toHaveBeenCalledWith(new Request('http://foo/bar'))
  })

  it('should make a get request', async () => {
    const { httpClient } = setup()

    await httpClient.get('http://foo')

    expect(window.fetch).toHaveBeenCalledWith(new Request('http://foo'))
  })

  it('should make a post request', async () => {
    const { httpClient } = setup()

    await httpClient.post('http://foo', { bar: 'baz' })

    expect(window.fetch).toHaveBeenCalledWith(new Request('http://foo'), { body: '{"bar":"baz"}', method: 'POST' })
  })

  it('should make a put request', async () => {
    const { httpClient } = setup()

    await httpClient.put('http://foo', { bar: 'baz' })

    expect(window.fetch).toHaveBeenCalledWith(new Request('http://foo'), { body: '{"bar":"baz"}', method: 'PUT' })
  })

  it('should make a delete request', async () => {
    const { httpClient } = setup()

    await httpClient.delete('http://foo')

    expect(window.fetch).toHaveBeenCalledWith(new Request('http://foo'), { method: 'DELETE' })
  })
})

function setup(options?: Partial<Options>) {
  const fetchMock = jest.fn()
  fetchMock.mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(), ok: true }))
  window.fetch = fetchMock

  return {
    httpClient: HttpClient.create(options)
  }
}
