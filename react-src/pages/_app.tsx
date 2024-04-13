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
        {/* <link rel="icon" type="image/png" href="/eyes32.png" /> */}
        <link rel="icon" type="image/png" href="/lambda-green.svg" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 text-left m-0 flex justify-between">
          <Link
            href={homePath}
            className="flex flex-row gap-2 text-md sm:text-lg lg:text-2xl"
          >
            <img src="/lambda-green.svg" className="h-8 w-8" />
            <span className="hidden sm:block">Program Comics</span>
          </Link>
          <div className="flex gap-4 items-start">
            <Link
              href="https://www.tomjo.me/program-comics"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog Post
            </Link>
            <Link href="/about" className="text-md">
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
