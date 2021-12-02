import { HttpError } from './http-error'
import { HttpParams } from './http-params'
import { HttpStatusCode } from './http-status-code'

type Url = string

export interface HttpClientResponse<Result> {
  result: Result
  status: HttpStatusCode
  headers: Headers
  options: RequestInit
}

export type HttpClientBeforeHook = (request: Request, options: HttpclientOptions) => void
export type HttpClientAfterHook = (response: Response & { result: unknown }, options: HttpclientOptions) => void

export interface HttpclientOptions {
  baseUrl: Url
  hooks: { before: HttpClientBeforeHook[]; after: HttpClientAfterHook[] }
  defaults?: RequestInit
}

export type HttpClientCreateOptions = Partial<
  Omit<HttpclientOptions, 'hooks'> & { hooks: { before?: HttpClientBeforeHook[]; after?: HttpClientAfterHook[] } }
>

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
  }: HttpClientCreateOptions = defaultOptions) {
    const defaultBeforeHooks = hooks?.before ?? []
    const defaultAfterHooks = hooks?.after ?? []

    return new HttpClient({
      baseUrl,
      hooks: { before: defaultBeforeHooks, after: defaultAfterHooks },
      defaults
    })
  }

  private constructor(private readonly options: HttpclientOptions) {}

  async get<Result>(url: Url, httpParams?: HttpParams): Promise<HttpClientResponse<Result>> {
    return this.sendRequest(url, { method: 'GET' }, httpParams)
  }

  async post<Result, Body>(url: string, body: Body, httpParams?: HttpParams): Promise<HttpClientResponse<Result>> {
    return this.sendRequest(url, { method: 'POST', body: this.getParsedBody(body) }, httpParams)
  }

  async put<Result, Body>(url: string, body: Body, httpParams?: HttpParams): Promise<HttpClientResponse<Result>> {
    return this.sendRequest(url, { method: 'PUT', body: this.getParsedBody(body) }, httpParams)
  }

  async delete<Result>(url: string, httpParams?: HttpParams): Promise<HttpClientResponse<Result>> {
    return this.sendRequest(url, { method: 'DELETE' }, httpParams)
  }

  private async sendRequest<Result>(
    url: string,
    options: RequestInit,
    httpParams?: HttpParams
  ): Promise<HttpClientResponse<Result>> {
    const request = this.getRequest(url, httpParams)
    this.options.hooks.before.forEach(hook => hook(request, this.options))
    const response = await fetch(request, { ...this.options.defaults, ...options })
    const result = await response.json()
    this.options.hooks.after.forEach(hook => hook({ ...response, result }, this.options))
    return this.getResponse(response, options)
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

  private async getResponse<Result>(response: Response, options: RequestInit): Promise<HttpClientResponse<Result>> {
    if (!response.ok) {
      throw new HttpError({ name: response.status.toString(), message: response.statusText })
    }
    const json = await response.json()
    return { result: json as Result, headers: response.headers, options, status: response.status }
  }
}
