import { create } from './service'

export const api = create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})
