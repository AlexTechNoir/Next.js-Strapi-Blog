import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

export async function getStaticProps() {
  const articles = await fetcher('http://localhost:1337/articles')

  return {
    props: { articles }
  }
}

export default function Home({ articles }) {
  const initialData = articles
  const { data } = useSWR('http://localhost:1337/articles', fetcher, { initialData })

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home page of my blog" />
      </Head>
      
      <DivIndex>
        {
          data.map(i => {
            return (
              <Link href="/">
                <a>
                  <div>
                    <img
                      src={`http://localhost:1337${i.image[0].formats.small.url}`}
                      alt="Blog owner"
                    />
                    <h1>{i.title}</h1>
                    <time datetime={`${i.published_at.slice(0, 10)}`}>
                      {new Date(i.published_at).toDateString().slice(4)}
                    </time>
                  </div>
                </a>
              </Link>
            )
          })
        }
      </DivIndex>
    </>
  )
}

const DivIndex = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  > a {
    text-decoration: none;
    margin-bottom: 2em;
    > div {
      display: flex;
      flex-direction: column;
      border-radius: 15px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
      transform: translateY(0);
      transition: transform .5s;
      max-width: 425px;
      color: black;
      &:hover {
        transform: translateY(-5px);
      }
      > img {
        width: 100%;
        max-width: 425px;
        height: auto;
      }
      > time {
        align-self: flex-end;
        margin: 0 .5em .5em 0;
      }
      > h1 {
        margin-left: .5em;
      }
    } 
  }
`



