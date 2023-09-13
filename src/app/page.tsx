import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
}

const Home = () => {
  return (
    <section className="container mx-auto pt-8">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-6xl font-extrabold leading-tight tracking-tighter">
          Next 13 project initialized with j0rdi CLI
        </h1>
      </div>
    </section>
  )
}

export default Home
