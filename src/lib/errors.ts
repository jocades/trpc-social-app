export class ApiError extends Error {
  constructor(message: string, code?: number, url?: string) {
    super(`${message} (code: ${code})\nURL: ${url}`)
    this.name = 'ApiError'
  }
}
