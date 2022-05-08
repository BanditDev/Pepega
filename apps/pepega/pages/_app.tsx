import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'resize-observer-polyfill';
import { withApollo } from '../utils/apollo';
import { ThemeProvider } from 'styled-components';
// import { version } from '../../package.json';
import { GlobalStyle, themes } from '../themes';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface IProps {
  isServer: boolean;
  apolloClient: any;
}

class MyApp extends App<IProps> {
  // componentDidMount() {
  //   console.log(`Version: ${version}`);
  // }

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={themes.dark}>
        <>
          <Head>
            <title>PepegaCom</title>
          </Head>
          <Component {...pageProps} />
          <GlobalStyle />
        </>
      </ThemeProvider>
    );
  }
}

export default withApollo(MyApp);
