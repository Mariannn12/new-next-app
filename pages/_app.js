import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider} from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import {SessionProvider} from 'next-auth/react';
const clientSideEmotionCache = createEmotionCache();


export default function App(props) {
  
  const {Component, emotionCache = clientSideEmotionCache, pageProps,session} = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <SessionProvider session={session}>
          <Component {...pageProps}/>
        </SessionProvider>
      </ThemeProvider>

    </CacheProvider>
  
  );
}


App.propTypes = {
  Component : PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps : PropTypes.object.isRequired,  
};