import '../styles/index.scss';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import Layout from '../../components/layout';

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Head>
          <title>Entertaiment App</title>
          <meta httpEquiv="Permissions-Policy" content="interest-cohort=()"/>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
