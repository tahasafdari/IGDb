import React, { useState } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import 'tailwindcss/tailwind.css'
import Sidebar from '@/components/Sidebar/Sidebar'
import ResponsiveAppBar from '@/components/navbar/navbar' // <-- import here
import routes from '@/routes'

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { pathname } = router

  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up'

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className={`${!isAuthPage ? 'flex' : ''}`}>
      {!isAuthPage && (
        <>
           {/* <-- Place here */}
          <ResponsiveAppBar />
          <Sidebar routes={routes} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </>
      )}
    <div className={`flex-grow ${!isAuthPage && 'md:pl-64'} ${isSidebarOpen ? 'pl-64 md:pl-0' : ''}`}>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default App
