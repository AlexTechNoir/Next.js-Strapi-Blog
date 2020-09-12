import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

export default function SocialButtons({ params }) {
  return (
    <DivSocialButtons>
      <div
        className="fb-like"
        data-href={`${process.env.NEXT_PUBLIC_PROD_HOST}/articles/${params.id}`}
        data-width=""
        data-layout="standard"
        data-action="like"
        data-size="large"
        data-share="true"
      ></div>
      <a
        className="twitter-share-button"
        href={`https://twitter.com/intent/tweet?text=That's%20a%20nice%20article%20I've%20just%20read!&url=${process.env.NEXT_PUBLIC_PROD_HOST}/articles/${params.id}`}
      >
        <FontAwesomeIcon icon={faTwitter} />
        Tweet
      </a>
    </DivSocialButtons>
  )
}

const DivSocialButtons = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1em 0 1em;
  > a {
    background: #00ACEE;
	  border-radius: 15px;
	  color: #fff;
    padding: .5em 1em .5em 1em;
    text-decoration: none;
    > svg {
      margin-right: .5em;
    }
  }
`
