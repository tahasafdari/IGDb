import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import Sidebar from '@/components/Sidebar/Sidebar';
import ResponsiveAppBar from '@/components/navbar/navbar';
import routes from '@/routes';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
/**
 * `App` React component.
 * 
 * Serves as the main wrapper for the entire Next.js application. Provides essential layouts 
 * and configuration for the inner pages. This component ensures that the Apollo Client 
 * is available to every page in the Next.js application.
 * 
 * @param {AppProps} { Component, pageProps } - The component and its properties for the currently active page.
 * @returns {JSX.Element} A wrapper that provides the layout and essential configurations to the active page.
 */
function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;
  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  /**
   * Toggles the sidebar open or closed.
   */
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Create Apollo Client instance
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}> {/* Wrap your entire app with ApolloProvider */}
      <div className={`${!isAuthPage ? 'flex' : ''}`}>
        {!isAuthPage && (
          <>
            <ResponsiveAppBar />
            <Sidebar routes={routes} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          </>
        )}
        <div className={`flex-grow ${!isAuthPage && 'md:pl-64'} ${isSidebarOpen ? 'pl-64 md:pl-0' : ''}`}>
          <Component {...pageProps} />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;





