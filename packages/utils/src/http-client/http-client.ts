import { HttpError } from './http-error'

type Url = string

type BeforeHook = (request: Request, options: Options) => void
type AfterHook = (response: any, options: Options) => void

type Options = {
  baseUrl: Url
  hooks: { before: BeforeHook[]; after: AfterHook[] }
} & RequestInit

const defaultOptions = {
  baseUrl: '',
  hooks: { before: [], after: [] }
}

export class HttpClient {
  static create(options: Options = defaultOptions) {
    return new HttpClient(options)
  }

  private constructor(private readonly options: Options) {}

  // TODO handle query params
  async get<Result>(url: Url) {
    const request = new Request(this.getUrl(url))

    this.options.hooks.before.forEach(hook => hook(request, this.options))
    const response = await window.fetch(request)
    this.options.hooks.after.forEach(hook => hook(response, this.options))

    return this.getResponse<Result>(response)
  }

  async post<Result, Body>(url: string, body: Body): Promise<Result> {
    const request = new Request(this.getUrl(url))

    this.options.hooks.before.forEach(hook => hook(request, this.options))
    const response = await window.fetch(request, { method: 'POST', body: this.getParsedBody(body) })
    this.options.hooks.after.forEach(hook => hook(response, this.options))

    return this.getResponse(response)
  }

  async put<Result, Body>(url: string, body: Body): Promise<Result> {
    const request = new Request(this.getUrl(url))

    this.options.hooks.before.forEach(hook => hook(request, this.options))
    const response = await window.fetch(request, { method: 'PUT', body: this.getParsedBody(body) })
    this.options.hooks.after.forEach(hook => hook(response, this.options))

    return this.getResponse(response)
  }

  async delete<Result>(url: string): Promise<Result> {
    const request = new Request(this.getUrl(url))

    this.options.hooks.before.forEach(hook => hook(request, this.options))
    const response = await window.fetch(request, { method: 'DELETE' })
    this.options.hooks.after.forEach(hook => hook(response, this.options))

    return this.getResponse(response)
  }

  private getUrl(url: Url) {
    return `${this.options.baseUrl}/${url}`
  }

  private getParsedBody<Body>(body: Body) {
    return JSON.stringify(body)
  }

  private async getResponse<Result>(response: Response) {
    if (!response.ok) {
      throw new HttpError()
    }
    const json = await response.json()
    return json as Result
  }
}
