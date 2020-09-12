import styled from 'styled-components'
import { useEffect, useContext } from 'react'
import Context from '../../context'

export default function DisqusComments({ params }) {
  const { isDarkModeOn } = useContext(Context)

  useEffect(() => {
    window.FB.XFBML.parse()
  })

  return (
    <Footer>
      <div
        className='fb-comments'
        data-href={`${process.env.NEXT_PUBLIC_PROD_HOST}/articles/${params.id}`}
        data-numposts='10'
        data-width='100%'
        data-colorscheme={`${isDarkModeOn ? 'dark' : 'light'}`}
        data-lazy={true}
      ></div>
    </Footer>
  )
}

const Footer = styled.footer`
  width: 100%;
  padding: 0 1em 0 1em;
` 
