import path from "path"
import matter from "gray-matter"
import fs from "fs"
import { remark } from "remark"
import html from "remark-html"
interface PageHeaderData {
  date: string
  title?: string
  [key: string]: any
}
export interface ConceptPageMetadata extends PageHeaderData {
  id: string
}

const pageDir = path.join(process.cwd(), "concepts")
export function getSortedConceptsData(): ConceptPageMetadata[] {
  const fnames = fs.readdirSync(pageDir)
  const allPagesData = fnames.map((fname: string) => {
    const id = fname.replace(/\.mdx$/, "")
    const fullPath = path.join(pageDir, fname)
    const fileContent = fs.readFileSync(fullPath, "utf8")

    // metadata section
    const matterResult = matter(fileContent).data as PageHeaderData

    return {
      id,
      ...matterResult,
    }
  })
  return allPagesData.sort((a: any, b: any) => {
    if (a.date < b.date) return 1
    else return -1
  })
}
export const getConceptData = async (
  id: string
): Promise<ConceptPageMetadata> => {
  const fname = `${id}.mdx`
  const fullPath = path.join(pageDir, fname)
  const fileContent = fs.readFileSync(fullPath, "utf8")
  const matterResult = matter(fileContent)
  const pageMetadata = matterResult.data as PageHeaderData
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    html: contentHtml,
    ...pageMetadata,
  }
}
