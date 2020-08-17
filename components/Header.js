import styled from 'styled-components'
import { useState } from 'react'

import Logo from './header/Logo'
import Search from './header/Search'
import Menu from './header/Menu'

export default function Header() {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false)

  return (
    <StyledHeader>
      <Logo setIsMenuOpen={setIsMenuOpen} />
      <Search />
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > a > img {
    margin: 1em;
  }
`
