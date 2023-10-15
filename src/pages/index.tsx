import { useRouter } from 'next/router';
import { useEffect } from 'react';
/**
 * `Home` React component.
 * 
 * This component represents the landing page of the application. However, rather than
 * rendering any content, it automatically redirects users to the `/sign-in` route.
 * 
 * The redirection is achieved using the `useRouter` hook from Next.js and the
 * `useEffect` hook from React. When the component mounts, the `useEffect` hook
 * is triggered, which then invokes the `push` method of the router to navigate
 * to the `/sign-in` page.
 * 
 * Since this component doesn't render any visual content, it returns `null`.
 * 
 * @returns {null} No visual content is rendered.
 */
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/sign-in');
  }, []);

  return null; // You can return null, as this component doesn't render anything
}
