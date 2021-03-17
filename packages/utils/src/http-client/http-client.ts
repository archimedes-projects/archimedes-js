import { HttpError } from './http-error'
import { HttpParams } from './http-params'

type Url = string

type BeforeHook = (request: Request, options: Options) => void
type AfterHook = (response: any, options: Options) => void

export type Options = {
  baseUrl: Url
  hooks: { before: BeforeHook[]; after: AfterHook[] }
} & RequestInit

const defaultOptions = {
  baseUrl: '',
  hooks: { before: [], after: [] }
}

export class HttpClient {
  static create({
    baseUrl = defaultOptions.baseUrl,
    hooks = { ...defaultOptions.hooks },
    ...rest
  }: Partial<Options> = defaultOptions) {
    return new HttpClient({ baseUrl, hooks, ...rest })
  }

  private constructor(private readonly options: Options) {}

  async get<Result>(url: Url, httpParams?: HttpParams) {
    const request = new Request(this.getUrl(url, httpParams))

    this.options.hooks.before.forEach(hook => hook(request, this.options))
    const response = await window.fetch(request)
    this.options.hooks.after.forEach(hook => hook(response, this.options))

    return this.getResponse<Result>(response)
  }

  async post<Result, Body>(url: string, body: Body, httpParams?: HttpParams): Promise<Result> {
    const request = new Request(this.getUrl(url, httpParams))

    this.options.hooks.before.forEach(hook => hook(request, this.options))
    const response = await window.fetch(request, { method: 'POST', body: this.getParsedBody(body) })
    this.options.hooks.after.forEach(hook => hook(response, this.options))

    return this.getResponse(response)
  }

  async put<Result, Body>(url: string, body: Body, httpParams?: HttpParams): Promise<Result> {
    const request = new Request(this.getUrl(url, httpParams))

    this.options.hooks.before.forEach(hook => hook(request, this.options))
    const response = await window.fetch(request, { method: 'PUT', body: this.getParsedBody(body) })
    this.options.hooks.after.forEach(hook => hook(response, this.options))

    return this.getResponse(response)
  }

  async delete<Result>(url: string, httpParams?: HttpParams): Promise<Result> {
    const request = new Request(this.getUrl(url, httpParams))

    this.options.hooks.before.forEach(hook => hook(request, this.options))
    const response = await window.fetch(request, { method: 'DELETE' })
    this.options.hooks.after.forEach(hook => hook(response, this.options))

    return this.getResponse(response)
  }

  private getUrl(url: Url, params?: HttpParams) {
    let fullUrl = this.options.baseUrl === '' ? url : this.options.baseUrl + '/' + url

    if (params !== undefined) {
      fullUrl += `?${params.toString()}`
    }
    return new URL(fullUrl).toString()
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
