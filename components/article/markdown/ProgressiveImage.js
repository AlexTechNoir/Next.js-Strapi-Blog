import { useState, useEffect, useRef } from 'react'

export default function ProgressiveImage({ preview, image, alt }) {
  const [ currentImage, setCurrentImage ] = useState(preview)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ loadingImage, setLoadingImage ] = useState(image)

  useEffect(() => {
    fetchImage(image)
  },[])

  const isFirstRun = useRef(true)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    setCurrentImage(preview)
    setIsLoading(false)
  }, [image])

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    fetchImage(image)
  }, [currentImage])

  const fetchImage = src => {
    const image = new Image()
    image.onload = () => {
      setCurrentImage(loadingImage.src)
      setIsLoading(false)
    }
    image.src = src
    setLoadingImage(image)
  }
  
  const style = isLoading => {
    return {
      transition: '0.5s filter linear',
      filter: `${isLoading ? 'blur(50px)' : ''}`
    }
  }

  return (
    <img 
      style={style(isLoading)} 
      src={currentImage} 
      alt={alt} 
      width="1200"
      height="800"
    />
  )
}
