import styled from 'styled-components'

import Logo from './header/Logo'
import Search from './header/Search'

export default function Header() {
  return (
    <StyledHeader>
      <Logo />
      <Search />
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
