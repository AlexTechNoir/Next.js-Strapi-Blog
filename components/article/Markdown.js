import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { useEffect, useState } from 'react'

import ProgressiveImage from './markdown/ProgressiveImage'

export default function Markdown({ data }) {
  const [ headings, setHeadings ] = useState([])

  useEffect(() => {
    const hTagsCollection = document.querySelectorAll('h2, h3, h4, h5, h6')
    const hTagsArr = [].slice.call(hTagsCollection)
    console.log(hTagsCollection, hTagsArr)
    setHeadings(hTagsArr)
  
    if (hTagsArr.length !== 0) {
      hTagsArr.map(el => el.setAttribute('id', el.textContent))
    }
  },[])

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
          smallImage={data.image[0].formats.small.url}
          mediumImage={data.image[0].formats.medium.url}
          largeImage={data.image[0].formats.large.url}
          sourceImage={data.image[0].url}
          alt={data.image[0].alternativeText}
        />
        <figcaption><em>{data.image[0].caption}</em></figcaption>
      </Figure>
      {
        headings.length === 0 ? null :
        <Nav className="contents">
          <p>Contents</p>
          <ul>
            {
              headings.map(li => 
                <li className={li.nodeName} key={li.textContent}>
                  <a href={`#${li.textContent}`}>{li.textContent}</a>
                </li>
              )
            }
          </ul>
        </Nav>
      }
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
    height: auto;
  }
  > figcaption {
    text-align: center;
  }
`

const Nav = styled.nav`
  border: 2px solid black;
  border-radius: 15px;
  padding: 1em;
  margin-top: 1em;
  > p {
    margin-top: 0;
  }
  > ul {
    list-style-type: none;
    padding-left: 1em;
    > .H3 {
      padding-left: .5em;
    }
    > .H4 {
      padding-left: 1em;
    }
    > .H5 {
      padding-left: 1.5em;
    }
    > .H6 {
      padding-left: 2em;
    }
  }
`
