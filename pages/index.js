import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import useSWR from 'swr'
import Chip from '@material-ui/core/Chip'
import { CommentCount } from 'disqus-react'
import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '@material-ui/core/Typography'

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
            );
          })
        ) : error ? (
          <div>Error.</div>
        ) : (
          data
            .map((val, index, array) => array[array.length - 1 - index])
            .map(i => {
              return (
                <Link href="/articles/[id]" as={`/articles/${i.id}`} key={i.id}>
                  <a>
                    <div>
                      <img
                        src={`http://localhost:1337${i.image[0].formats.small.url}`}
                        alt={i.image[0].alternativeText}
                      />
                      <h1>{i.title}</h1>
                      <div>
                        {i.categories.map(category => {
                          return (
                            <Chip
                              label={category.name}
                              variant="outlined"
                              color="primary"
                              size="small"
                            />
                          )
                        })}
                      </div>
                      <div>
                        <CommentCount
                          shortname="youknowwhatblog"
                          config={{
                            url: `http://localhost:3000/articles/${i.id}`,
                            identifier: `${i.id}`,
                            title: `${i.title}`
                          }}
                        >
                          {/* Placeholder Text */}
                          Comments
                        </CommentCount>
                        <time dateTime={`${i.published_at.slice(0, 10)}`}>
                          {new Date(i.published_at).toDateString().slice(4)}
                        </time>
                      </div>
                    </div>
                  </a>
                </Link>
              )
            })
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
  > a {
    text-decoration: none;
    margin-bottom: 2em;
    width: 100%;
    min-width: 320px;
    max-width: 425px;
    > div {
      display: flex;
      flex-direction: column;
      border-radius: 15px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
      transform: translateY(0);
      transition: transform .5s;
      color: black;
      &:hover {
        transform: translateY(-5px);
      }
      > img {
        width: 100%;
        min-width: 320px;
        max-width: 425px;
        height: auto;
      }
      > h1 {
        margin: .5em .5em 0 .5em;
      }
      > :nth-child(3) {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 1em 1em 0 1em;
        > div {
          cursor: pointer !important;
        }
      }
      > :nth-child(4) {
        display: flex;
        justify-content: space-between;
        margin: 1em;
      }
    } 
  }
`
