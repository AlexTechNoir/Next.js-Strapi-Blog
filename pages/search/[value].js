import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import styled from 'styled-components'
import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '@material-ui/core/Typography'

import SearchResult from '../../components/search/SearchResult'

const fetcher = url => fetch(url).then(r => r.json())

export default function SearchResults() {
  const { data, error } = useSWR('http://localhost:1337/articles', fetcher)

  const router = useRouter()
  const { asPath } = router
  const value = asPath.substr(asPath.lastIndexOf('/') + 1).replace(/ +/g, ' ').split('%20').join(' ')

  const skeletonArr = [ 1, 2, 3, 4, 5 ]

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <DivSearchResults>
        <span>Search results for "{value}" :</span>
        {!data ? (
          skeletonArr.map(result => {
            return (
              <div key={result}>
                <Skeleton variant="circle" width={45} height={45} />
                <Typography component="div" key="h2" variant="h2">
                  <Skeleton />
                </Typography>
              </div>
            )
          })
        ) : error ? (
          <div>Error</div>
        ) : (
          data.map(result => {
            if (
              result.title.toLowerCase().includes(value.toLowerCase().replace(/ +/g, ' ').trim()) ||
              result.content.toLowerCase().includes(value.toLowerCase().replace(/ +/g, ' ').trim())
            ) {
              return <SearchResult key={result.id} value={value} result={result} />
            }
          })
        )}
      </DivSearchResults>
    </>
  )
}

const DivSearchResults = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  display: flex;
  flex-direction: column;
  padding: 1em;
  > :first-child {
    margin-bottom: 1em;
  }
  > div {
    display: flex;
    > :first-child {
      margin: 1em 1em 0 0;
    }
    > :last-child {
      width: 100%;
    }
  }
`
