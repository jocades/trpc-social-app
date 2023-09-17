import { NavBar } from '@/components/nav-bar'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="relative flex flex-col min-h-screen">
      <NavBar />
      <main className="flex flex-col flex-1">{children}</main>
    </div>
  )
}

export default MainLayout
