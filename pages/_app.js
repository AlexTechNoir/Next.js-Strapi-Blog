import styled, { createGlobalStyle } from 'styled-components'
import { useEffect } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <DivGrid>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </DivGrid>
    </>
  )
}

const GlobalStyle = createGlobalStyle` 
  * {
    box-sizing: border-box;
    font-family: 'Indie Flower', cursive;
    font-family: 'Merriweather', serif;
  }

  html, body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Georgia, sans-serif;
    height: 100%;
    scroll-behavior: smooth;
    background-color: #FFFFFF; 
  }

  #__next {
    height: 100%;
  }
`

const DivGrid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  height: 100%;
  position: relative;
`
