import styled from 'styled-components'

export default function Footer() {
  return (
    <StyledFooter>
      <center>This demo blog was created with Next.js and Strapi Headless CMS.</center>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  grid-area: 3 / 1 / 4 / 2;
  margin-top: 2em;
  padding: 1em;
  border-top: 2px solid #6c757d;
`
