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
    background-color: #FFFFFF; 
  }

  #__next {
    height: 100%;
  }
  
  /* indie-flower-regular - latin */
  @font-face {
    font-family: 'Indie Flower';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/indie-flower-v11-latin-regular.eot'); /* IE9 Compat Modes */
    src: local('Indie Flower'), local('IndieFlower'),
        url('/fonts/indie-flower-v11-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('/fonts/indie-flower-v11-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
        url('/fonts/indie-flower-v11-latin-regular.woff') format('woff'), /* Modern Browsers */
        url('/fonts/indie-flower-v11-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
        url('/fonts/indie-flower-v11-latin-regular.svg#IndieFlower') format('svg'); /* Legacy iOS */
  }
`

const DivGrid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  height: 100%;
  position: relative;
`
