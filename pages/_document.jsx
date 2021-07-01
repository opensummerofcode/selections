import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charset="utf-8" />
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Selection tool for Open Summer of Code" />
          <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto&family=Montserrat&display=swap"
            rel="stylesheet"
          />
          <title>Selections | Open Summer of Code</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
