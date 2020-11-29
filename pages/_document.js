import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="preload" as="style" />
          <link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet" />

          {/* Facebook Comments moderation tool */}
          <meta property="fb:app_id" content="1011434979249112" />
        </Head>
        <body>

          {/* Facebook Comments Plugin */}
          <div id="fb-root"></div>
          <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v8.0&appId=1011434979249112" nonce="FAtNA3Xa"></script>
          
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument