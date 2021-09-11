import useSWR from 'swr'
import styled from 'styled-components'
import Head from 'next/head'

import Markdown from '../../components/article/Markdown'
import Comments from '../../components/article/Comments'

const fetcher = url => fetch(url).then(r => r.json())

export async function getStaticPaths() {
  const articles = await fetcher(`${process.env.NEXT_PUBLIC_HCMS_API_URL}/articles`)
  const paths = articles.map(article => ({
    params: { id: article.id.toString() }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const article = await fetcher(`${process.env.NEXT_PUBLIC_HCMS_API_URL}/articles/${params.id}`)

  return { 
    props: { params, article }, 
    revalidate: 10
  }
}

export default function Article({ params, article }) {
  const initialData = article
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_HCMS_API_URL}/articles/${params.id}`, fetcher, { initialData })

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.content.substring(0, 150) + '...'} />
        <meta property="og:image" content={data.image[0].url} />
        <meta name="twitter:image" content={data.image[0].url} />
      </Head>

      <DivArticle>
        <Markdown data={data} />
        <Comments params={params} />
      </DivArticle>
    </>
  )
}

const DivArticle = styled.article`
  grid-area: 2 / 1 / 3 / 2;
  justify-self: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  align-items: center;
  > h1, h2, h3, h4, h5, h6 {
    margin-left: 1em;
    margin-right: 1em;
    align-self: start;
  }
  > p {
    padding-left: 1em;
    padding-right: 1em;
    text-align: justify;
    align-self: start;
    width: 100%;
    max-width: 1200px;
    > img {
      display: block;
      margin-left: auto;
      margin-right: auto;
      max-width: 100%;
    }
  }
  > ul, ol {
    align-self: start;
    padding-right: 1em;
  }
  > blockquote {
    border-left: 5px solid #BBAB92;
    padding-left: 1em;
    align-self: start;
    font-style: italic;
  }
  > nav {
    align-self: flex-start;
    margin-left: 2em;
  }

  @media only screen and (min-width: 1248px) {
    grid-area: 2 / 2 / 3 / 3;
  }
`
