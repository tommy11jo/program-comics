export const allConceptCategories = {
  "graph-algs": "Graph Algorithms",
  "sorting-algs": "Sorting Algorithms",
} as const

export type ConceptCategorySlug = keyof typeof allConceptCategories

export type PageMetadataType = {
  title: string
  date: string
  picturePaths: string[]
  category: ConceptCategorySlug
  pageType: "review" | "learn" | "about"
}
export interface ConceptPageMetadata extends PageMetadataType {
  id: string
  html: string
}
