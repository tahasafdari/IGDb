import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/sign-in');
  }, []);

  return null; // You can return null, as this component doesn't render anything
}
