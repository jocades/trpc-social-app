import { Metadata } from 'next'

import { NavBar } from '@/components/nav-bar'

export const metadata: Metadata = {
  title: 'Home',
}

const Home = () => {
  return (
    <section className="container mx-auto pt-8">
      <h1 className="text-6xl font-extrabold leading-tight tracking-tighter">
        Next 13 project initialized with j0rdi CLI
      </h1>
    </section>
  )
}

export default Home
