import styled, { createGlobalStyle } from 'styled-components'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { useState, useEffect } from 'react'
import Context from '../context' 

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MyApp({ Component, pageProps }) { 
  const [ isDarkModeOn, setIsDarkModeOn ] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("userSelectedColorMode") !== null) {
      if (localStorage.getItem("userSelectedColorMode") === "dark") {
        setIsDarkModeOn(true)
      } else {
        setIsDarkModeOn(false)
      }
    } else {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme)").media !== "not all" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setIsDarkModeOn(true)
      }
    }
  }, [])

  const toggleColorMode = e => {
    if (e.currentTarget.id === 'swithToDarkMode') {
      setIsDarkModeOn(true)
      localStorage.setItem('userSelectedColorMode', 'dark')
    } else if (e.currentTarget.id === 'swithToLightMode') {
      setIsDarkModeOn(false)
      localStorage.setItem('userSelectedColorMode', 'light')
    }
  }

  return (
    <Context.Provider value={{
      isDarkModeOn,       
      toggleColorMode
    }}>
      <GlobalStyle />
      <DivGrid className={isDarkModeOn ? 'darkMode' : ''}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </DivGrid>
    </Context.Provider>
  )
}

const GlobalStyle = createGlobalStyle` 
  * {
    box-sizing: border-box;
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

  .darkMode {    
    background-color: hsla(101, 100%, 0%, 1);
    color: hsla(0, 100%, 100%, 0.9);

    a, a.listItem {
      color: hsla(0, 100%, 100%, 0.9);
      > div {
        color: hsla(0, 100%, 100%, 0.9);
      }
      > img {
        filter: invert(1) hue-rotate(180deg);
      }
    }

    a.listItem > div {
      box-shadow: 0 0 0 1px hsla(0, 100%, 100%, 0.9);
    }
    
    .searchResult > div {
      border: 1px solid hsla(0, 100%, 100%, 0.9);
      background-color: hsla(101, 100%, 0%, 1);
      color: hsla(0, 100%, 100%, 0.9);
    } 

    form, 
    .categories, 
    .loadMoreBtton, 
    .dropDownMenuList, 
    .hamburgerMenuButton,
    .menu,
    .menu > nav,
    .menu > nav > :first-child,
    .category {
      filter: invert(1) hue-rotate(180deg);
    }

    img:not(.logo) {
      transition: opacity 0.3s !important;
      opacity: 0.6;
      &:hover {
        opacity: 1;
      }
    }
  }
`

const DivGrid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  min-height: 100%;
  position: relative;

  @media only screen and (min-width: 1248px) {
    grid-template-columns: 1fr 1200px 1fr;
  }
`
