import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import Sidebar from '@/components/Sidebar/Sidebar';
import routes from '@/routes';
function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;

  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up';

  // Create a state to manage the sidebar's open/close state.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`${!isAuthPage ? 'flex' : ''}`}>
      {!isAuthPage && (
        <Sidebar routes={routes} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <div className={`flex-grow ${isSidebarOpen ? 'pl-64' : ''}`}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}


export default App;
