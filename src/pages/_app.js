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
      <Head>
        <title>Entertaiment App</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
