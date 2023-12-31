// import { NodeEnv } from '@/config/consts'
// import { ApiError } from '@/lib/errors'

interface ServiceOptions {
  baseURL?: string
  headers?: Record<string, string>
}

export function create({ baseURL, headers }: ServiceOptions) {
  return new Service(baseURL, headers)
}

class Service {
  public headers: Headers

  constructor(private baseURL = '', headers?: Record<string, string>) {
    this.headers = new Headers(headers)
  }

  private _fetch<T>(endpoint: string, opts: RequestInit = {}) {
    const url = this.baseURL + endpoint

    if (opts.body && typeof opts.body === 'object') {
      this.headers.set('Content-Type', 'application/json')
    }

    return fetch(url, {
      ...opts,
      headers: this.headers,
      body: opts.body && JSON.stringify(opts.body),
    })

    // const res = await fetch(url, {
    //   ...opts,
    //   headers: this.headers,
    //   body: opts.body && JSON.stringify(opts.body),
    // })
    //
    // if (!res.ok) {
    //   try {
    //     const data = await res.json()
    //     process.env.NODE_ENV === NodeEnv.DEV && console.error(data)
    //   } catch (err) {
    //     console.error(err)
    //   }
    //   throw new ApiError(res.statusText, res.status, url)
    // }
    //
    // try {
    //   const data = await res.json()
    //   return data as T
    // } catch (err) {
    //   if (err instanceof SyntaxError) {
    //     return {} as T
    //   }
    //   throw err
    // }
  }

  get<T>(endpoint: string, opts: RequestInit = {}) {
    return this._fetch<T>(endpoint, { ...opts, method: 'GET' })
  }

  post<T>(endpoint: string, body?: any, opts: RequestInit = {}) {
    return this._fetch<T>(endpoint, { ...opts, body, method: 'POST' })
  }

  put<T>(endpoint: string, body?: any, opts: RequestInit = {}) {
    return this._fetch<T>(endpoint, { ...opts, body, method: 'PUT' })
  }

  patch<T>(endpoint: string, body?: any, opts: RequestInit = {}) {
    return this._fetch<T>(endpoint, { ...opts, body, method: 'PATCH' })
  }

  delete<T>(endpoint: string, body?: any, opts: RequestInit = {}) {
    return this._fetch<T>(endpoint, { ...opts, body, method: 'DELETE' })
  }
}

const api = create({
  headers: {
    'Content-Type': 'application/json',
  },
})

async function getUser() {
  const res = await api.get('https://jsonplaceholder.typicode.com/users/1')
  const data = await res.json()
}
