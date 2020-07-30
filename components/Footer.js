import styled from 'styled-components'

export default function Footer() {
  return (
    <StyledFooter>
      Footer
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  grid-area: 3 / 1 / 4 / 2;
  margin-top: 3em;
`
