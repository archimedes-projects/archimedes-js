import { HttpClientCreateOptions, HttpClient } from './http-client'

describe('HttpClient', () => {
  it('should configure base url', async () => {
    const { httpClient } = setup({ baseUrl: 'http://foo' })

    await httpClient.get('bar')

    expect(window.fetch).toHaveBeenCalledWith(
      new Request('http://foo/bar', {
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        })
      }),
      {
        method: 'GET'
      }
    )
  })

  it('should make a get request', async () => {
    const { httpClient } = setup()

    await httpClient.get('http://foo')

    expect(window.fetch).toHaveBeenCalledWith(
      new Request('http://foo', {
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        })
      }),
      {
        method: 'GET'
      }
    )
  })

  it('should make a post request', async () => {
    const { httpClient } = setup()

    await httpClient.post('http://foo', { bar: 'baz' })

    expect(window.fetch).toHaveBeenCalledWith(
      new Request('http://foo', {
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        })
      }),
      { body: '{"bar":"baz"}', method: 'POST' }
    )
  })

  it('should make a put request', async () => {
    const { httpClient } = setup()

    await httpClient.put('http://foo', { bar: 'baz' })

    expect(window.fetch).toHaveBeenCalledWith(
      new Request('http://foo', {
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        })
      }),
      { body: '{"bar":"baz"}', method: 'PUT' }
    )
  })

  it('should make a delete request', async () => {
    const { httpClient } = setup()

    await httpClient.delete('http://foo')

    expect(window.fetch).toHaveBeenCalledWith(
      new Request('http://foo', {
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        })
      }),
      { method: 'DELETE' }
    )
  })

  it('should execute after hook', async () => {
    const mock = jest.fn()
    const options = { hooks: { after: [mock] }, result: 'foo' }
    const { httpClient } = setup(options)

    await httpClient.get('http://foo')

    expect(mock).toHaveBeenCalledWith(expect.anything(), {
      hooks: { after: [mock], before: [] },
      baseUrl: '',
      defaults: undefined
    })
  })

  it('should execute before hook', async () => {
    const mock = jest.fn()
    const options = { hooks: { before: [mock] }, result: 'foo' }
    const { httpClient } = setup(options)

    await httpClient.get('http://foo')

    expect(mock).toHaveBeenCalledWith(expect.anything(), {
      hooks: { after: [], before: [mock] },
      baseUrl: '',
      defaults: undefined
    })
  })
})

function setup<T>(options?: HttpClientCreateOptions & Partial<{ result: T }>) {
  const fetchMock = jest.fn()
  fetchMock.mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(options?.result), ok: true }))
  window.fetch = fetchMock

  return {
    httpClient: HttpClient.create(options)
  }
}
