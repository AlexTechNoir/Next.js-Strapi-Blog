import Head from 'next/head'
import styled from 'styled-components'

export default function About() {
  return (
    <>
      <Head>
        <title>About Page</title>
        <meta name="description" content="About page of my blog" />
      </Head>

      <DivAbout>
        About
      </DivAbout>
    </>
  )
}

const DivAbout = styled.div`
  grid-area: 2 / 1 / 3 / 2;
`
