import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

export default function ProgressiveImage({ preview, smallImage, mediumImage, largeImage, sourceImage, alt }) {
  const [ isLoading, setIsLoading ] = useState(true)

  const isFirstRun = useRef(true)

  useEffect(() => {
    if (isFirstRun.current.complete) {
      setIsLoading(false)
    }
    
    isFirstRun.current.addEventListener('load', () => setIsLoading(false))
  }, [])

  return (
    <WrappingDiv isLoading={isLoading}>
      <img 
        src={preview}
        alt={alt}
        width="1200" 
        height="800" 
      />
      <picture>
        <source
          srcSet={ `${smallImage} 500w, 
                    ${mediumImage} 750w, 
                    ${largeImage} 1000w,
                    ${sourceImage} 1200w` }
          type="image/jpeg"
        />        
        <img 
          ref={isFirstRun}      
          src={smallImage}
          srcSet={ `${smallImage} 500w, 
                    ${mediumImage} 750w, 
                    ${largeImage} 1000w,
                    ${sourceImage} 1200w` }
          sizes="(max-width: 500px) 500px, 
                (max-width: 750px) 750px, 
                (max-width: 1000px) 1000px, 
                1200px"
          alt={alt}
          width="1200" 
          height="800" 
        />
      </picture>
    </WrappingDiv>
  )
}

const WrappingDiv = styled.div`
  position: relative;
  overflow: hidden;
  transition: 0.5s filter linear;
  filter: ${props => props.isLoading ? 'blur(30px)' : ''};
  img {
    max-width: 100%;
    height: auto;
  }
  picture > img {
    max-width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
  }
`
