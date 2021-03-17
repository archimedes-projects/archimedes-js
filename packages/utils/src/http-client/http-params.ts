export class HttpParams {
  private constructor(private readonly param: URLSearchParams) {}

  static create() {
    return new HttpParams(new URLSearchParams())
  }

  set<Value extends string | boolean | number>(key: string, value: Value): HttpParams {
    this.param.set(key, value.toString())
    return new HttpParams(this.param)
  }

  toString() {
    return this.param.toString()
  }
}
