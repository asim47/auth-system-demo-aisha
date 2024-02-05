'use client';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeProvider } from '@mui/material';
import { darkThemeOptions, lightThemeOptions } from '../theme';
import Head from 'next/head';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from 'react-toastify';
import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import { ASSETS } from '../constants';
import useIsDarkMode from '../Helpers/useIsDarkMode';
import { useEffect } from 'react';

const baseURL = 'https://linkwave.io';
const pageUrl = `${baseURL}/`;
const pageImage = ASSETS.logoGreen;
const title = `Linkwave | Your Custom Link to Infinite Horizons |`;
const favIcon = ASSETS.favGreen;
const favIconBlack = ASSETS.favBlack;
const description = 'Linkwave | Your Custom Link to Infinite Horizons |';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isDarkMode = useIsDarkMode();

  useEffect(() => {
    if (localStorage) {
      localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    }

    const html = document.querySelector('html');
    if (html) {
      if (isDarkMode) {
        html.classList.add('dark');
        document.body.setAttribute('data-theme', 'dark');
      } else {
        html.classList.remove('dark');
        document.body.removeAttribute('data-theme');
      }
    }
  }, [isDarkMode]);

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href={isDarkMode ? favIconBlack : favIcon} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description}></meta>
        <meta name="image" property="og:image" content={pageImage} key="ogimage" />
        <meta property="og:site_name" content={baseURL} key="ogsitename" />
        <meta property="og:url" content={pageUrl} key="ogurl" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <meta data-rh="true" property="og:image" content={pageImage} />
        <meta data-rh="true" name="twitter:image:src" content={pageImage} />
        <meta data-rh="true" name="twitter:card" content="summary_large_image" />
        <title>{title}</title>
      </head>
      <body>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <ThemeProvider theme={isDarkMode ? darkThemeOptions : lightThemeOptions}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>
            </ThemeProvider>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </Provider>
        </I18nextProvider>
      </body>
    </html>
  );
}
