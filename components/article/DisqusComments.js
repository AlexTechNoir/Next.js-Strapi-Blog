import { DiscussionEmbed } from 'disqus-react'
import styled from 'styled-components'

export default function DisqusComments({ params, data }) {
  const disqusShortname = 'youknowwhatblog'
  const disqusConfig = {
    url: `${process.env.NEXT_PUBLIC_PROD_HOST}/articles/${params.id}`,
    identifier: `${params.id}`,
    title: `${data.title}`,
    language: "en_GB"
  }

  return (
    <Footer>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </Footer>
  )
}

const Footer = styled.footer`
  width: 100%;
  padding: 0 1em 0 1em;
` 
