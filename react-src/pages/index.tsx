import { GetStaticProps } from "next"
import fs from "fs"
import path from "path"
import {
  ConceptPageMetadata,
  allConceptCategories,
} from "@/lib/conceptCategories"
import Link from "next/link"
const Home = ({ posts }: { posts: ConceptPageMetadata[] }) => {
  const postsByCategory = {}

  for (const category in allConceptCategories) postsByCategory[category] = []

  for (const post of posts) {
    const { category, title } = post
    if (!(category in allConceptCategories)) {
      console.error(`Invalid category for post: ${title}`)
      continue
    }

    postsByCategory[category].push(post)
  }
  return (
    <div className="font-comic flex flex-col items-center min-h-screen p-2 lg:p-4">
      <div className="w-full max-w-3xl">
        {Object.entries(allConceptCategories).map(
          ([categorySlug, categoryName]) => (
            <section key={categorySlug}>
              <h2>{categoryName}</h2>
              <ul className="list-none">
                {postsByCategory[categorySlug].map(
                  ({ id, title, picturePaths, description, runtime }) => (
                    <li key={id}>
                      <Link href={`/${id}`}>
                        <div className="group flex flex-col outline outline-2 outline-[#222] hover:outline-[#444] opacity-[0.92] hover:opacity-[1.0] p-2 m-2 lg:p-4 lg:m-8 rounded-lg">
                          <span>
                            {title}:{" "}
                            <span className="text-white group-hover:text-white">
                              {description}
                              {runtime && (
                                <span>
                                  {" "}
                                  The runtime is <code>{runtime}.</code>
                                </span>
                              )}
                            </span>
                          </span>
                          <div className="flex flex-row gap-2">
                            {picturePaths.map((picturePath) => (
                              <div
                                key={picturePath}
                                style={{
                                  position: "relative",
                                  width: "300px",
                                  display: "block",
                                }}
                              >
                                <img
                                  src={picturePath}
                                  alt={title ?? ""}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </section>
          )
        )}
      </div>
    </div>
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
      const { meta } = (await import(`../pages/${fname}`)) as {
        meta: ConceptPageMetadata
      }
      return {
        id: fname.substring(0, fname.length - 4),
        ...meta,
      }
    })
  )
  const validPosts = posts.filter(
    (post) => post.pageType === "review" || post.pageType === "learn"
  )
  return { props: { posts: validPosts } }
}
export default Home
