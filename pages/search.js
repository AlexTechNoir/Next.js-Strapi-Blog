import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr'
import styled from 'styled-components'
import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '@material-ui/core/Typography'
import { useEffect } from 'react'

import SearchResult from '../components/search/SearchResult'

const fetcher = url => fetch(url).then(r => r.json())

export default function SearchResults() {
  const { data, error, isValidating } = useSWR(`${process.env.NEXT_PUBLIC_HCMS_API_URL}/articles`, fetcher, {
    revalidateOnFocus: false,
    initialData: []
  })

  const router = useRouter()
  const { query } = router
  const { searchValue } = query

  const filteredData = data.map(result => {
    if (
      result.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      result.content.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return <SearchResult key={result.id} value={searchValue} result={result} />
    }
  })

  const skeletonArr = [ 1, 2, 3, 4, 5 ]

  useEffect(() => {
    mutate(`${process.env.NEXT_PUBLIC_HCMS_API_URL}/articles`)
  }, [searchValue])

  return (
    <DivSearchResults>
      {
        filteredData.every(dataItem => dataItem === undefined)
        ? <span>No results for "{searchValue}"</span>
        : <span>Search results for "{searchValue}" :</span>
      }  
      {!data || isValidating ? (
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
        filteredData
      )}
    </DivSearchResults>
  )
}

const DivSearchResults = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  justify-self: center;
  display: flex;
  flex-direction: column;
  padding: 1em;
  width: 100%;
  max-width: 768px;
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
  
  @media only screen and (min-width: 1248px) {
    grid-area: 2 / 2 / 3 / 3;
  }
`
