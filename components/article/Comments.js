import styled from 'styled-components'
import { DiscussionEmbed } from 'disqus-react'

export default function Comments({ params }) {
  return (
    <Footer className="comments">
      <DiscussionEmbed
        shortname='youknowwhatblog'
        config={
          {
            url: `${process.env.NEXT_PUBLIC_PROD_HOST}/articles/${params.id}`,
            identifier: params.id,
            title: params.title,
            language: 'en_GB'
          }
        }
      />
    </Footer>
  )
}

const Footer = styled.footer`
  width: 100%;
  padding: 0 1em 0 1em;
` 
