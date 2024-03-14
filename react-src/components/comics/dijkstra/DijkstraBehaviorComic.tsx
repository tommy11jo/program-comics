import Panel from "@/components/Panels"
import { Column, Row } from "@/components/index"
import { useRef } from "react"

const CUR_BLUE = "#58C4DD"
const CUR_RED = "#7E312A"
const VERTEX_RED = "#FC6255"
const DijkstraBehaviorComic = () => {
  const folder = "/graphics/dijkstra/comic-behavior"
  const imageIndex = useRef(0)
  const nextImage = () => {
    return <img src={`${folder}/step${imageIndex.current++}.png`} />
  }
  const introText =
    "Welcome! We're going to apply Dijkstra's to find the shortest path from the start vertex to the end vertex of a directed graph (meaning edges have direction) with non-negative weights. You can also think of this as finding the shortest driving directions on a map, where each edge is a one-way street and each edge weight is the distance (or time) to travel that street."
  const _ignoreFirstImage = nextImage()

  const row1 = (
    <div className="flex flex-row gap-4 items-center pb-4 border-b border-white">
      {<img src={`/graphics/dijkstra/lambda.png`} width={"60px"} />}
      <div>{introText}</div>
    </div>
  )

  const row2 = (
    <Row
      comps={[
        <Panel
          panel={nextImage()}
          label={
            "Explore the start. The minimum distance from the start to start is 0."
          }
        />,
        <Panel
          panel={nextImage()}
          label={
            <span>
              Next, relax all the edges going out of vertex{" "}
              <span style={{ color: VERTEX_RED }}>v</span>. That is, for each
              neighboring vertex, update its{" "}
              <span style={{ color: CUR_BLUE }}>
                best distance so far value
              </span>
              . If the distance of the new path along the edge is less than the
              best distance so far, then update the best distance so far. Also
              update the previous vertex of this neighbor to be vertex{" "}
              <span style={{ color: VERTEX_RED }}>v</span>, in order to track
              the shortest paths.
            </span>
          }
        />,
      ]}
    />
  )
  const row3 = (
    <Row
      comps={[
        <Panel
          panel={nextImage()}
          label={
            <span>
              Explore vertex 2 because it has the smallest best distance so far
              among the unexplored vertexs. Vertex 2’s distance value of 1 is
              less than vertex 1’s distance value of 2 and all the other
              vertexs’ distance values of infinity.
            </span>
          }
        />,
        <Panel
          panel={nextImage()}
          label="Again, relax all the edges going out of the vertex, just one edge in this case."
        />,
      ]}
    />
  )
  const row4 = (
    <Row
      comps={[
        <Row
          label="Explore vertex 1 because it has the smallest best distance so far
              among the unexplored vertexs. And relax the edges."
          comps={[<Panel panel={nextImage()} />, <Panel panel={nextImage()} />]}
        />,
        <Row
          label="And repeat. Notice how the goal vertex was reached but we continue searching until the goal vertex is actually explored."
          comps={[<Panel panel={nextImage()} />, <Panel panel={nextImage()} />]}
        />,
      ]}
    />
  )
  const row5 = (
    <Row
      comps={[
        <Panel
          panel={nextImage()}
          label={
            <span>
              Explore vertex 5. When a vertex is reached in an explore step
              (like this one), its shortest path and{" "}
              {<span style={{ color: CUR_RED }}>minimum distance</span>} from
              the start has been found. That statement deserves a proof but for
              now let's keep going.
            </span>
          }
        />,
        <Panel
          panel={nextImage()}
          label="Just a lonely and agitated 5. No shared edges to relax."
        />,
      ]}
    />
  )

  const row6 = (
    <Row
      comps={[
        <Panel
          panel={nextImage()}
          label="The goal is now explored so the shortest path has been found with a distance value of 10! But the vertices in the path still must be identified."
        />,
        <Column
          label="Using the previous vertices tracked in the relax step, repeatedly follow edges backward until the start is reached."
          comps={[
            <Row
              comps={[
                <Panel panel={nextImage()} />,
                <Panel panel={nextImage()} />,
              ]}
            />,
            <Row
              comps={[
                <Panel panel={nextImage()} />,
                <Panel panel={nextImage()} />,
              ]}
            />,
          ]}
        />,
      ]}
    />
  )
  return <Column comps={[row1, row2, row3, row4, row5, row6]} />
}
export default DijkstraBehaviorComic
