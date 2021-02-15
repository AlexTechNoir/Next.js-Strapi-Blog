import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

import ProgressiveImage from './markdown/ProgressiveImage'

export default function Markdown({ data }) {
  return (
    <>
      <Header>
        <h1>{data.title}</h1>
        <time dateTime={data.published_at.slice(0, 10)}>
          {new Date(data.published_at).toDateString().slice(4)}
        </time>
        <span>
          by {data.created_by.firstname} {data.created_by.lastname}
        </span>
      </Header>
      <Figure>
        <ProgressiveImage
          preview={data.image[0].formats.thumbnail.url}
          image={data.image[0].url}
          alt={data.image[0].alternativeText}
        />
        <figcaption><em>{data.image[0].caption}</em></figcaption>
      </Figure>
      <ReactMarkdown
        source={data.content}
        escapeHtml={false}
        transformImageUri={uri =>
          uri.startsWith('http') ? uri : `${process.env.NEXT_PUBLIC_HCMS_API_URL}${uri}`
        }
      />
    </>
  )
}

const Header = styled.header`
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
`

const Figure = styled.figure`
  margin: 0;
  > img {
    width: 100%;
    max-width: 1200px;
    height: auto;
  }
  > figcaption {
    text-align: center;
  }
`
