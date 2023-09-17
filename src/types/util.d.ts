export type Use<T extends (...args: any) => any> = Awaited<ReturnType<T>>
