import useSWR from 'swr'
import styled from 'styled-components'
import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '@material-ui/core/Typography'
import Head from 'next/head'
import Chip from '@material-ui/core/Chip'

import ListItem from '../../components/ListItem'

const fetcher = url => fetch(url).then(r => r.json())

export async function getStaticPaths() {
  const categories = await fetcher(`${process.env.NEXT_PUBLIC_HCMS_API_URL}/categories`)
  const paths = categories.map(category => ({
    params: { id: category.id.toString() }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const category = await fetcher(`${process.env.NEXT_PUBLIC_HCMS_API_URL}/categories/${params.id}`)

  return { 
    props: { params, category }
  }
}

export default function Category({ params, category }) {
  const initialData = category
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_HCMS_API_URL}/categories/${params.id}`, fetcher, { initialData })

  const skeletonArr = [ 1, 2, 3 ]

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
              className="category"
            /> 
          category:
        </span>
        <div>
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
            : data.articles
              .map((val, index, array) => array[array.length - 1 - index])
              .map(i => <ListItem i={i} key={i.id} />)}
        </div>
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
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 1em 0 1em;
    > div {
      width: 100%;
      min-width: 285px;
      max-width: 425px;
      margin-bottom: 2em;
    }
  }

  @media only screen and (min-width: 768px) {
    > div {
      display: grid;
      grid-template-columns: repeat(auto-fit, 300px);
      grid-row-gap: 1em;
      grid-column-gap: 1em;
      justify-content: center;
      align-items: start;
    }
  }

  @media only screen and (min-width: 1248px) {
    grid-area: 2 / 2 / 3 / 3;
  }
`
