import Head from 'next/head'
import styled from 'styled-components'
import useSWR from 'swr'
import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '@material-ui/core/Typography'

import ListItem from '../components/ListItem'

const fetcher = url => fetch(url).then(r => r.json())

export async function getStaticProps() {
  const articles = await fetcher('http://localhost:1337/articles')

  return {
    props: { articles }
  }
}

export default function Home({ articles }) {
  const { data, error } = useSWR('http://localhost:1337/articles', fetcher, { articles })

  const skeletonArr = [ 1, 2 ]

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home page of my blog" />
      </Head>

      <DivIndex>
        {!data ? (
          skeletonArr.map(i => {
            return (
              <div key={i}>
                <Skeleton variant="rect" height={150} animation="wave" />
                <Typography variant="h1">
                  <Skeleton animation="wave" />
                </Typography>
                <Skeleton animation="wave" />
              </div>
            )
          })
        ) : error ? (
          <div>Error.</div>
        ) : (
          data
            .map((val, index, array) => array[array.length - 1 - index])
            .map(i => <ListItem i={i} key={i.id} />)
        )}
      </DivIndex>
    </>
  )
}

const DivIndex = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    display: flex;
    flex-direction: column;
    min-width: 320px;
    max-width: 425px;
    width: 100%;
    margin-bottom: 2em;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    > span {
      border-radius: 15px;      
    }
    > :first-child {
      margin: .5em .5em 0 .5em;
    }
    > :nth-child(2) {
      margin: 0 .1em 0 .1em;
    }
    > :last-child {
      margin: 0 .6em .6em .6em;
    }
  }
`
