import '../styles/globals.css';
import { QueryClientProvider } from 'react-query';

import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'jotai';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Script from 'next/script';

import DebugAtoms from 'src/atom/DebugAtom';
import ErrorBoundary from 'src/components/ErrorBoundary';
import Layout from 'src/components/Layout';
import queryClient from 'src/config/client';
import { theme } from 'src/utils/theme';

import SEO from '../next-seo.config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Provider>
        <DebugAtoms />
        <QueryClientProvider client={queryClient}>
          <DefaultSeo {...SEO} />
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></Script>
          <Script id="ga-tag" strategy="lazyOnload">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
                  
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname
            });
            `}</Script>
          <Layout>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </Layout>
        </QueryClientProvider>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
