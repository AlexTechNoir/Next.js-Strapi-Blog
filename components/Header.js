import styled from 'styled-components'
import Link from 'next/link'

export default function Header() {
  return (
    <StyledHeader>
      <Link href="/">
        <a>
          <img src="/img/logo.svg" alt="website logo" width="48" height="48" />
        </a>
      </Link>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  grid-area: 1 / 1 / 2 / 2;
  > a > img {
    margin: 1em;
  }  
`
