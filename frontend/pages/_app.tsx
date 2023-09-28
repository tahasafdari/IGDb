import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import Sidebar from '@/components/Sidebar/Sidebar';
import routes from '@/routes';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;

  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up';

  return (
    <div className={`${!isAuthPage ? 'flex' : ''}`}>
      {!isAuthPage && <Sidebar routes={routes} />}
      <div className="flex-grow">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default App;
