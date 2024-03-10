import Head from "next/head"
import "../styles/globals.css"
import type { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  //   const isDev = process.env.NODE_ENV === "development"
  const homePath = "http://localhost:3000"

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 text-left m-0 flex justify-between">
          <a href={homePath} className="text-xl">
            Program Comics
          </a>
        </header>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
