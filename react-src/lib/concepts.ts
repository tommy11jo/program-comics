import path from "path"
import matter from "gray-matter"
import fs from "fs"
import { remark } from "remark"
import html from "remark-html"
import { ConceptPageMetadata, PageMetadataType } from "./conceptCategories"

const pageDir = path.join(process.cwd(), "pages")
// export function getSortedConceptsData(): ConceptPageMetadata[] {

export const getConceptData = async (
  id: string
): Promise<ConceptPageMetadata> => {
  const fname = `${id}.mdx`
  const fullPath = path.join(pageDir, fname)
  const fileContent = fs.readFileSync(fullPath, "utf8")
  const matterResult = matter(fileContent)
  const pageMetadata = matterResult.data as PageMetadataType
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
