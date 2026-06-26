import { Outlet } from 'react-router-dom'
import "./DashboardLayout.scss"
import Sidebar from '@/components/shared/Sidebar/Sidebar'
import Navbar from '@/components/shared/Navbar/Navbar'
const DashboardLayout = () => {
  return (
   <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-layout__content">
        <Navbar />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}


export default DashboardLayout