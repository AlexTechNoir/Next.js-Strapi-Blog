import Head from 'next/head'
import styled from 'styled-components'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home page of my blog" />
      </Head>
      
      <DivIndex>
        Index
      </DivIndex>
    </>
  )
}

const DivIndex = styled.div`
  grid-area: 2 / 1 / 3 / 2;
`
