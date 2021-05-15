import Link from 'next/link'
import Chip from '@material-ui/core/Chip'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { CommentCount } from 'disqus-react'

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
      <StyledLink className="listItem">
        <div>
          <Image
            src={i.image[0].formats.large.url}
            alt={i.image[0].alternativeText}
            width={320}
            height={191}
            layout="responsive"
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
          <div>
            <span>
              <CommentCount
                shortname='youknowwhatblog'
                config={
                  {
                    url: `${process.env.NEXT_PUBLIC_PROD_HOST}/articles/${i.id.toString()}`,
                    identifier: i.id.toString(),
                    title: i.title.toString(),
                  }
                }
              >
                {/* Placeholder Text */}
                Comments
              </CommentCount>
            </span>
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
  min-width: 288px;
  max-width: 425px;
  cursor: pointer;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 15px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
    transform: translateY(0);
    transition: transform .5s;
    color: black;
    &:hover {
      transform: translateY(-5px);
    }
    > :first-child {
      width: 100%;
      min-width: 288px;
      max-width: 425px;
      height: auto;
      border-radius: 15px;
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
        margin: 0 .2em .2em 0;
      }
    }
    > :last-child {
      display: flex;
      justify-content: space-between;
      margin: 1em;
      > span > span {
        margin-right: .5em;
      }
      > time {
        text-align: right;
      }
    }
  }

  @media only screen and (min-width: 768px) {
    min-width: 100%;
    max-width: 100%;
    > div > div > img {
      min-width: 100%;
      max-width: 100%;
    }
  }
`
