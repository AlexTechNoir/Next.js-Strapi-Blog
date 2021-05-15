import styled from 'styled-components'
import { DiscussionEmbed } from 'disqus-react'

export default function DisqusComments({ params }) {
  return (
    <Footer>
      <DiscussionEmbed
        shortname='youknowwhatblog'
        config={
          {
            url: `${process.env.NEXT_PUBLIC_PROD_HOST}/articles/${params.id.toString()}`,
            identifier: params.id.toString(),
            title: params.title.toString(),
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
