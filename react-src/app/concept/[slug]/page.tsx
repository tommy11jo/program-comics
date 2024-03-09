import { getConceptData } from "@/lib/concepts"

type PageProps = {
  params: {
    slug: string
  }
}
export default async function ConceptPage({ params }: PageProps) {
  const conceptData = await getConceptData(params.slug)
  return (
    <div>
      <span>{conceptData.date}</span>
      <div dangerouslySetInnerHTML={{ __html: conceptData.html }} />
    </div>
  )
}
