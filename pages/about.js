import Head from 'next/head'
import styled from 'styled-components'

export default function About() {
  return (
    <>
      <Head>
        <title>About Page</title>
        <meta name="description" content="About page of author's blog" />
      </Head>

      <DivAbout>
        <p>
          <picture>
            <source srcSet="/img/me.webp" type="image/webp" />
            <img src="/img/me.jpg" alt="Me" />
          </picture>
          Hi! My name is Alex!
          <br /> 
          <br />
          I'm learning webdev for more than 1.5 years now! I've made this website for my portfolio.
          <br /> 
          <br />
          I'm not really creative, so here's the Lorem Ipsum text.
          <br /> 
          <br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, sit, illo laborum hic ut dolor quidem sapiente aut iusto doloribus laudantium tempore voluptatum perspiciatis suscipit. Quis assumenda odio adipisci eos.
          Perferendis non reprehenderit iure nulla omnis suscipit ea tempore voluptates nostrum quisquam, error pariatur, obcaecati a sed. Rem perferendis minima nulla reprehenderit error adipisci voluptates minus, reiciendis obcaecati eos! Officia!
          Commodi optio accusamus non nostrum dicta quisquam omnis iure reprehenderit in ut consequuntur cupiditate sunt, necessitatibus incidunt expedita, voluptatum, beatae quis quia? Temporibus nostrum, expedita porro aliquid omnis ducimus! Libero?
          Necessitatibus mollitia minus ipsam iure ipsum voluptatibus atque corporis aliquid beatae explicabo nostrum reiciendis, ex architecto itaque maiores quis nam minima hic cum, iste laboriosam, dolore officiis? Totam, reiciendis aspernatur.
          Delectus, consectetur qui. Doloremque tempore voluptates debitis tempora consequatur perferendis nihil, quod laborum earum ea deserunt corporis accusantium repellat quas unde nostrum delectus doloribus qui obcaecati voluptatum vitae ducimus sint!
        </p>
      </DivAbout>
    </>
  )
}

const DivAbout = styled.div`
  padding: 2em;
  > p {
    grid-area: 2 / 1 / 3 / 2;
    text-align: justify;
    text-justify: inter-word;    
    > picture > source, img {
      display: block;
      margin: 0 auto 1em auto;
      float: none;
      width: 100%;
      max-width: 494px;
    }
  }

  @media only screen and (min-width: 1248px) {
    grid-area: 2 / 2 / 3 / 3;
  }
`
