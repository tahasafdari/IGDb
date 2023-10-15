import { Html, Head, Main, NextScript } from 'next/document';
/**
 * `Document` React component.
 * 
 * Serves as the main document structure for the entire Next.js application. This component
 * provides a shared structure for all pages, such as the `<head>` and `<body>` tags.
 * Customizations to the global HTML document can be made here.
 * 
 * Note: The component should only be used for static content that's shared across pages.
 * Dynamic content or data-fetching should be avoided in this file.
 * 
 * @returns {JSX.Element} The global structure of the application, including the main content
 * and scripts required for the Next.js app to function correctly.
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
      </Head>
      <body suppressHydrationWarning={true}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
