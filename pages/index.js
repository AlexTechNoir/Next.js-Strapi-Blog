import Head from 'next/head'
import styled from 'styled-components'
import { useSWRInfinite } from 'swr'
import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import ListItem from '../components/ListItem'

const fetcher = url => fetch(url).then(r => r.json())

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null
  return `${process.env.NEXT_PUBLIC_HCMS_API_URL}/articles?_sort=published_at:DESC&_start=${pageIndex + 7}&_limit=1`
}

export async function getStaticProps() {
  const articles = await fetcher(`${process.env.NEXT_PUBLIC_HCMS_API_URL}/articles?_sort=published_at:DESC&_start=0&_limit=7`)

  return {
    props: { articles }
  }
}

export default function Home({ articles }) {
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    initialSize: 0,
    revalidateAll: true
  })

  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 1)

  const skeletonArr = [ 1, 2, 3 ]

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home page of my blog" />
      </Head>

      <MainIndex>
        {!articles ? (
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
          <>
            {
              articles.map(i => {
                return <ListItem i={i} key={i.id} />
              })
            }
            {
              data !== undefined ? (
                data.map((artciles, index) => {
                  return artciles.map(i => <ListItem i={i} key={i.id} />)
                })
              ) : null
            }
            {
              !isReachingEnd ? (
                <Button 
                  variant="outlined" 
                  color="primary" 
                  onClick={() => setSize(size + 4)} 
                  className="loadMoreButton"
                >
                  Load More
                </Button>
              ) : null
            }
          </>
        )}
      </MainIndex>
    </>
  )
}

const MainIndex = styled.main`
  grid-area: 2 / 1 / 3 / 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    display: flex;
    flex-direction: column;
    min-width: 320px;
    max-width: 896px;
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
  > .loadMoreButton {
    width: 300px;
  }

  @media only screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, 320px);
    grid-row-gap: .5em;
    grid-column-gap: 2em;
    justify-content: center;
    align-items: start;
    padding: 2em 2em 0 2em;
    > .loadMoreButton {
      justify-self: center;
    }
  }

  @media only screen and (min-width: 1024px) {
    grid-template-columns: repeat(auto-fit, 425px);
    > .loadMoreButton {
      grid-column: span 1;
      justify-self: center;
    }
  }

  @media only screen and (min-width: 1248px) {
    grid-area: 2 / 2 / 3 / 3;
    grid-template-columns: repeat(auto-fit, 288px);
    grid-row-gap: 1em;
    grid-column-gap: 1em;
    justify-content: center;
    align-items: start;
    padding: 2em 0 0 0;
    > div {
      max-width: 100%;
    }
    > :first-child {
      grid-area: 1 / 1 / 3 / 4;
      align-self: stretch;
      > div {
        height: 100%;
        > div {
          max-width: 896px;
        }        
      }
    }
    > :nth-child(2) {
      grid-area: 1 / 4 / 2 / 5;
      > div > h1 {
        font-size: 1.8em;
      }
    }
    > :nth-child(3) {
      grid-area: 2 / 4 / 3 / 5;
      > div > h1 {
        font-size: 1.8em;
      }
    }
    > .loadMoreButton {
      grid-column: span 4;
      justify-self: center;
    }
  }
`
