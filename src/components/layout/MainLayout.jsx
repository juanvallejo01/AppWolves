import { Outlet } from 'react-router-dom'
import BottomNavBar from './BottomNavBar'

const MainLayout = ({ showNavBar = true }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      {showNavBar && <BottomNavBar />}
    </div>
  )
}

export default MainLayout
