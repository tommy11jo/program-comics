import { Html, Head, Main, NextScript } from "next/document"
// https://nextjs.org/docs/messages/no-stylesheets-in-head-component

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
