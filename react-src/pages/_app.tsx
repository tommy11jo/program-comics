import Head from "next/head"
import "../styles/globals.css"
import "../styles/Sequence.css"
import type { AppProps } from "next/app"
import Link from "next/link"

function MyApp({ Component, pageProps }: AppProps) {
  const homePath = "./"

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="flex flex-col min-h-screen pr-10">
        <header className="p-4 text-left m-0 flex justify-between">
          <Link href={homePath} className="text-2xl">
            Program Comics
          </Link>
          <div className="flex gap-3 items-start">
            <Link href={`${homePath}/about`} className="text-md">
              <span>About</span>
            </Link>
            <Link
              href="https://github.com/tommy11jo/program-comics"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </Link>
          </div>
        </header>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
