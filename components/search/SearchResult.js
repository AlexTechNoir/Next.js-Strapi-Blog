import styled from 'styled-components'
import Link from 'next/link'
import showdown from 'showdown'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function SearchResult({ value, result }) {
  const {
    id,
    title,
    content,
    image
  } = result

  const htmlFromMarkup = new showdown.Converter().makeHtml(content)
  const textFromHtml = new DOMParser().parseFromString(htmlFromMarkup, 'text/html').body.textContent

  const p = useRef()

  useEffect(() => {
    const firstMatchIndex = p.current.innerHTML.toLowerCase().indexOf('<mark>')
    const lastMatchIndex = p.current.innerHTML.toLowerCase().lastIndexOf('<mark>')
    const matchInArticleText = firstMatchIndex !== -1
    const noMatchInArticleText = firstMatchIndex === -1

    if (matchInArticleText) {
      const rangeAroundMatch = 20
      const initialRangeBeforeMatch = firstMatchIndex - rangeAroundMatch
      const initialRangeAfterMatch = firstMatchIndex + '<mark>'.length + value.length + '</mark>'.length + rangeAroundMatch

      const finalRangeBeforeMatch =
        initialRangeBeforeMatch >= 0
          ? initialRangeBeforeMatch
          : firstMatchIndex - (rangeAroundMatch + initialRangeBeforeMatch)

      const finalRangeAfterMatch =
        initialRangeAfterMatch <= p.current.innerHTML.length
          ? initialRangeAfterMatch
          : (initialRangeAfterMatch + (initialRangeAfterMatch - p.current.innerHTML.length))

      const oneMatchFound = firstMatchIndex === lastMatchIndex
      const moreThanOneMatchFound = firstMatchIndex !== lastMatchIndex

      if (oneMatchFound) {
        const newText = p.current.innerHTML.slice(finalRangeBeforeMatch, finalRangeAfterMatch)

        p.current.innerHTML = 
          initialRangeBeforeMatch <= 0 && initialRangeAfterMatch >= p.current.innerHTML.length
          ? newText
          : initialRangeBeforeMatch > 0 && initialRangeAfterMatch < p.current.innerHTML.length
          ? '...' + newText + '...'
          : initialRangeBeforeMatch <= 0
          ? newText + '...'
          : initialRangeAfterMatch >= p.current.innerHTML.length
          ? '...' + newText
          : null

      } else if (moreThanOneMatchFound) {
        const amountOfMatches = p.current.innerHTML
          .toLowerCase()
          .match(new RegExp(value.trim().toLowerCase(), 'g')).length
        
        const newText = p.current.innerHTML.slice(finalRangeBeforeMatch, finalRangeAfterMatch)
        const message = '<br /><br />' + `+ ${amountOfMatches - 1} more match(es).`

        p.current.innerHTML = 
          initialRangeBeforeMatch <= 0 && initialRangeAfterMatch >= p.current.innerHTML.length
          ? newText + message
          : initialRangeBeforeMatch > 0 && initialRangeAfterMatch < p.current.innerHTML.length
          ? '...' + newText + '...' + message
          : initialRangeBeforeMatch <= 0
          ? newText + '...' + message
          : initialRangeAfterMatch >= p.current.innerHTML.length
          ? '...' + newText + message
          : null
      }
    } else if (noMatchInArticleText) {
      p.current.innerHTML = 'No matches in article text'
    }
  }, [value])

  return (
    <Link href="/articles/[id]" as={`/articles/${id}`}>
      <StyledLink className="searchResult">
        <div>
          <Image
            src={image[0].formats.thumbnail.url}
            alt={image[0].alternativeText}
            width={120}
            height={80}
            layout="fixed"
          />
          <h2>
            {title}
          </h2>
          <p ref={p}>
            <span>
              {
                textFromHtml
                  .split(new RegExp(`(${value})`, "ig"))
                  .map(i => i.match(new RegExp(`(${value})`, "ig")) ? <mark>{i}</mark> : i)
              }
            </span>
          </p>
        </div>
      </StyledLink>
    </Link>
  )
}

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  > div {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: auto 1fr;
    column-gap: 1em;
    border: 1px solid black;
    border-radius: 15px;
    background: #f8f9fa;
    margin-bottom: 1em;
    padding: 1em;
    > img {
      grid-area: 1 / 1 / 2 / 2;
    }
    > h2 {
      grid-area: 1 / 2 / 2 / 3;
      margin: 0;
    }
    > :last-child {
      grid-area: 2 / 1 / 3 / 3;
    }
  }
`
