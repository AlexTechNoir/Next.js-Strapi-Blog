import styled from 'styled-components'

export default function Header() {
  return (
    <StyledHeader>
      <img src="/img/logo.svg" alt="website logo" width="48" height="48" />
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  grid-area: 1 / 1 / 2 / 2;
  > img {
    margin: 1em;
  }  
`
