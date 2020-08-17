import useSWR from 'swr'
import styled from 'styled-components'
import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '@material-ui/core/Typography'
import Head from 'next/head'
import Chip from '@material-ui/core/Chip'

import ListItem from '../../components/ListItem'

const fetcher = url => fetch(url).then(r => r.json())

export async function getStaticPaths() {
  const categories = await fetcher('http://localhost:1337/categories')
  const paths = categories.map(category => ({
    params: { id: category.id.toString() }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const category = await fetcher(`http://localhost:1337/categories/${params.id}`)

  return { props: { params, category }}
}

export default function Category({ params, category }) {
  const initialData = category
  const { data } = useSWR(`http://localhost:1337/categories/${params.id}`, fetcher, { initialData })

  const skeletonArr = [ 1, 2 ]

  return (
    <>
      <Head>
        <title>Articles by {data.name} category</title>
        <meta
          name="description"
          content={`Articles by ${data.name} category`}
        />
      </Head>

      <DivCategories>
        <span>
          All articles by 
            <Chip
              label={data.name}
              variant="outlined"
              color="primary"
              size="small"
            /> 
          category:
        </span>
        {!data
          ? skeletonArr.map(i => {
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
          : data.articles.map(i => <ListItem i={i} key={i.id} />)}
      </DivCategories>
    </>
  )
}

const DivCategories = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  > :first-child {
    margin-bottom: 2em;
    > div {
      margin: 0 .5em 0 .5em;
    }
  }
`
