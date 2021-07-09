import { HttpError } from './http-error'
import { HttpParams } from './http-params'

type Url = string

type BeforeHook = (request: Request, options: Options) => void
type AfterHook = (response: any, options: Options) => void

export type Options = {
  baseUrl: Url
  hooks: { before: BeforeHook[]; after: AfterHook[] }
  defaults?: RequestInit
}

const defaultOptions = {
  baseUrl: '',
  hooks: { before: [], after: [] }
}

export class HttpClient {
  private readonly defaultHeaders = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  })

  static create({
    baseUrl = defaultOptions.baseUrl,
    hooks = { ...defaultOptions.hooks },
    defaults
  }: Partial<Options> = defaultOptions) {
    return new HttpClient({ baseUrl, hooks, defaults: defaults })
  }

  private constructor(private readonly options: Options) {}

  async get<Result>(url: Url, httpParams?: HttpParams): Promise<Result> {
    return this.sendRequest(url, { method: 'GET' }, httpParams)
  }

  async post<Result, Body>(url: string, body: Body, httpParams?: HttpParams): Promise<Result> {
    return this.sendRequest(url, { method: 'POST', body: this.getParsedBody(body) }, httpParams)
  }

  async put<Result, Body>(url: string, body: Body, httpParams?: HttpParams): Promise<Result> {
    return this.sendRequest(url, { method: 'PUT', body: this.getParsedBody(body) }, httpParams)
  }

  async delete<Result>(url: string, httpParams?: HttpParams): Promise<Result> {
    return this.sendRequest(url, { method: 'DELETE' }, httpParams)
  }

  private async sendRequest<Result>(url: string, options: RequestInit, httpParams?: HttpParams): Promise<Result> {
    const request = this.getRequest(url, httpParams)
    this.options.hooks.before.forEach(hook => hook(request, this.options))
    const response = await fetch(request, { ...this.options.defaults, ...options })
    this.options.hooks.after.forEach(hook => hook(response, this.options))
    return this.getResponse(response)
  }

  private getRequest(url: string, httpParams: HttpParams | undefined) {
    return new Request(this.getUrl(url, httpParams), { headers: this.defaultHeaders })
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
      throw new HttpError({ name: response.status.toString(), message: response.statusText })
    }
    const json = await response.json()
    return json as Result
  }
}
