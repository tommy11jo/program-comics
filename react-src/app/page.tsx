import { ComicTitle } from "@/components/mdx/ComicTitle"
import { getSortedConceptsData } from "../lib/concepts"
import Layout from "./layout"
import { Heading } from "@/components/mdx/Heading"
export default async function Home() {
  const allConceptsData = await getSortedConceptsData()
  return (
    <Layout>
      <section>
        <ComicTitle>Program Comics</ComicTitle>
        <ul>
          {allConceptsData.map(({ id, date, title }) => (
            <li key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
