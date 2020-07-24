import styled, { createGlobalStyle } from 'styled-components'

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
  }

  html, body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Georgia, sans-serif;
    height: 100%;
    scroll-behavior: smooth;
    background-color: #e9e9e9; 
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
