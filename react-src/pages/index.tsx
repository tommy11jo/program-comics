import { ConceptPageMetadata } from "../lib/concepts"
import Link from "next/link"
import Image from "next/image"
import { GetStaticProps } from "next"
import fs from "fs"
import path from "path"
const Home = ({ posts }: { posts: ConceptPageMetadata[] }) => {
  return (
    <section>
      <ul>
        {posts &&
          posts.map(({ id, date, title, picturePath }) => (
            <li key={id}>
              <span className="p-4">{date}</span>
              <Link href={`/${id}`}>{title}</Link>
              {/* https://nextjs.org/docs/pages/api-reference/components/image#responsive-images */}
              {picturePath && (
                <div
                  style={{
                    position: "relative",
                    width: "300px",
                    height: "300px",
                  }}
                >
                  <Image
                    src={picturePath}
                    alt={title ?? ""}
                    sizes="500px"
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
            </li>
          ))}
      </ul>
    </section>
  )
}
const pageDir = path.join(process.cwd(), "pages")
export const getStaticProps: GetStaticProps = async () => {
  const fnames = fs.readdirSync(pageDir)
  // only grabs the direct (not nested) .mdx file names
  const mdxFiles = fnames.filter((fn) => /\.mdx?$/.test(fn))
  // Note: Install MDX ext for syntax highlighting in .mdx files: https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx
  const posts: ConceptPageMetadata[] = await Promise.all(
    mdxFiles.map(async (fname) => {
      const { meta } = (await import(`../pages/${fname}`)) as any
      return {
        id: fname.substring(0, fname.length - 4),
        ...meta,
      }
    })
  )
  return { props: { posts } }
}
export default Home
