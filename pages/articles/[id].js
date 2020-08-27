import useSWR from 'swr'
import styled from 'styled-components'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import Markdown from '../../components/article/Markdown'
const DisqusComments = dynamic(() => import('../../components/article/DisqusComments'))

const fetcher = url => fetch(url).then(r => r.json())

export async function getStaticPaths() {
  const articles = await fetcher('http://localhost:1337/articles')
  const paths = articles.map(article => ({
    params: { id: article.id.toString() }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const article = await fetcher(`http://localhost:1337/articles/${params.id}`)

  return { 
    props: { params, article }, 
    revalidate: 1
  }
}

export default function Article({ params, article }) {
  const initialData = article
  const { data } = useSWR(`http://localhost:1337/articles/${params.id}`, fetcher, { initialData })
  
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.content} />
      </Head>

      <DivArticle>
        <Markdown data={data} />
        <DisqusComments params={params} data={data} />
      </DivArticle>
    </>
  )
}

const DivArticle = styled.article`
  grid-area: 2 / 1 / 3 / 2;
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
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

  @media only screen and (min-width: 1248px) {
    grid-area: 2 / 2 / 3 / 3;
  }
`
