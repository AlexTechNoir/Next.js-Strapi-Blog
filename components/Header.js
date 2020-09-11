import styled from 'styled-components'
import { useState } from 'react'
import useSWR from 'swr'

import Logo from './header/Logo'
import SearchBar from './header/SearchBar'
import HamburgerMenu from './header/HamburgerMenu'
import UsualMenu from './header/UsualMenu'

const fetcher = url => fetch(url).then(r => r.json())

export default function Header({ isDarkModeOn }) {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_HCMS_API_URL}/categories`, fetcher)
  const [ isMenuOpen, setIsMenuOpen ] = useState(false)

  return (
    <StyledHeader>
      <Logo setIsMenuOpen={setIsMenuOpen} />
      <SearchBar />
      <div>
        <div className="usualMenu">
          <UsualMenu 
            isMenuOpen={isMenuOpen} 
            setIsMenuOpen={setIsMenuOpen} 
            data={data} 
            error={error}
            isDarkModeOn={isDarkModeOn}
          />
        </div>
        <div className="hamburgerMenu">
          <HamburgerMenu 
            isMenuOpen={isMenuOpen} 
            setIsMenuOpen={setIsMenuOpen} 
            data={data} 
            error={error}
          />
        </div>
      </div>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > :first-child > img {
    margin: 1em;
  }
  > :last-child {
    z-index: 1;
    > .usualMenu {
      display: none;
      margin-right: 1em;
    }
    > .hamburgerMenu {
      display: block;
    }
  }

  @media only screen and (min-width: 1024px) {
    > :last-child {
      > .usualMenu {
        display: block;
      }
      > .hamburgerMenu {
        display: none;
      }
    }
  }

  @media only screen and (min-width: 1248px) {
    grid-area: 1 / 1 / 2 / 4;
  }
`
