import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Home() {
  return (
    <section className="container mx-auto pt-8">
      <h1 className="text-6xl font-extrabold leading-tight tracking-tighter">
        Next 13 project initialized with j0rdi CLI
      </h1>
    </section>
  )
}
