import useSWR from 'swr'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { DiscussionEmbed } from 'disqus-react'

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

  return { props: { params, article }}
}

export default function Article({ params, article }) {
  const initialData = article
  const { data } = useSWR(`http://localhost:1337/articles/${params.id}`, fetcher, { initialData })

  const disqusShortname = 'youknowwhatblog'
  const disqusConfig = {
    url: `http://localhost:3000/articles/${params.id}`,
    identifier: 'article-id',
    title: `${data.title}`
  }
  
  return (
    <DivArticle>
      <header>
        <h1>{data.title}</h1>
        <time dateTime={`${data.published_at.slice(0, 10)}`}>
          {new Date(data.published_at).toDateString().slice(4)}
        </time>
        <span>
          by {data.created_by.firstname} {data.created_by.lastname}
        </span>
      </header>
      <figure>
        <img src={`http://localhost:1337${data.image[0].url}`} alt={data.image[0].alternativeText} />
        <figcaption><em>{data.image[0].caption}</em></figcaption>
      </figure>
      <ReactMarkdown
        source={data.content}
        transformImageUri={uri =>
          uri.startsWith('http') ? uri : `http://localhost:1337${uri}`
        }
      />
      <footer>
        <DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </footer>
    </DivArticle>
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
  > header {
    align-self: center;
    margin-bottom: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    > :first-child {
      font-size: 2em;
      margin-left: 1em;
      margin-right: 1em;
    }
  }
  > figure {
    margin: 0;
    > img {
      width: 100%;
      max-width: 1200px;
    }
    > figcaption {
      text-align: center;
    }
  }
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
      width: 100%;
      max-width: 1200px;
    }
  }
  > footer {
    width: 100%;
    padding: 0 1em 0 1em;
  }
`
