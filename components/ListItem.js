import Link from 'next/link'
import Chip from '@material-ui/core/Chip'
import { CommentCount } from 'disqus-react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'

import ProgressiveImage from './article/markdown/ProgressiveImage'

export default function ListItem({ i }) {
  const [ isCategories, setIsCategories ] = useState(true)

  useEffect(() => {
    if (location.pathname.includes('categories')) {
      setIsCategories(true)
    } else {
      setIsCategories(null)
    }
  }, [])

  return (
    <Link href="/articles/[id]" as={`/articles/${i.id}`} key={i.id}>
      <StyledLink>
        <div>
          <ProgressiveImage
            preview={`http://localhost:1337${i.image[0].formats.thumbnail.url}`}
            image={`http://localhost:1337${i.image[0].formats.small.url}`}
            alt={i.image[0].alternativeText}
          />
          <h1>{i.title}</h1>
          {isCategories ? null : (
            <div className="categories">
              {i.categories.map(category => {
                return (
                  <Chip
                    label={category.name}
                    variant="outlined"
                    color="primary"
                    size="small"
                    key={category.id}
                  />
                )
              })}
            </div>
          )}
          <div className="commentCount">
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
      </StyledLink>
    </Link>
  )
}

const StyledLink = styled.a`
  text-decoration: none;
  margin-bottom: 2em;
  width: 100%;
  min-width: 320px;
  max-width: 425px;
  cursor: pointer;
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
    > .categories {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: 1em 1em 0 1em;
      > div {
        cursor: pointer !important;
        margin-right: .2em;
      }
    }
    > .commentCount {
      display: flex;
      justify-content: space-between;
      margin: 1em;
    }
  }
`
