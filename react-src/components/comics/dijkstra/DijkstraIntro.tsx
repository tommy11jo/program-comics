import { Column, Panel, Row, Text } from "@/components"
import Editor from "@monaco-editor/react"

const DijkstraIntro = () => {
  const CUR_BLUE = "#58C4DD"
  const DIST_RED = "#7E312A"
  const VERTEX_RED = "#FC6255"
  const CUR_GRAY = "#383838"

  let textIntro = (
    <span>
      <b>Purpose: </b>
      Dijkstra's algorithm is used to find the shortest paths between a source
      vertex and all other vertices in a graph with nonnegative weights.
      Djikstra's can also solve the more specific problem of finding the
      shortest path from a start vertex to an end vertex. One use case could be
      finding directions from Point A to Point B using roads on a map.
    </span>
  )

  let textRuntime = (
    <span>
      <b>Runtime: </b>
      <code>O((E+V)logV)</code> for a simple python implementation (see below),
      where E is the number of edges and V is the number of vertices.
    </span>
  )
  let algSteps = (
    <span>
      <b>Algorithm Steps: </b>
      <ul>
        <li>
          Initialize:
          <ul>
            <li>
              A priority queue <code>PQ</code>: where priorities are distances
              and values are vertices
            </li>
            <li>
              A map <code>distances</code>: vertex → best distance so far
            </li>
            <li>
              A map <code>prev</code>: vertex → previous vertex in best path
              found so far
            </li>
          </ul>
        </li>
        <li>
          Repeat until <code>PQ</code> is empty:
        </li>
        <ul>
          <li>
            Pop vertex <code>v</code> from <code>PQ</code>{" "}
          </li>
          <li>
            <b>Relax</b> the outgoing edges of <code>v</code> by updating{" "}
            <code>distances</code>, <code>PQ</code>, and <code>prev</code>. See
            the picture above to see a relaxation step.
          </li>
        </ul>
      </ul>
    </span>
  )

  let snapshotText = <div>{textIntro}</div>
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="w-3/5">
          {<Text fontSize="20px" value={snapshotText} />}
          <br />
          {<Text fontSize="20px" value={textRuntime} />}
        </div>
        <div className="w-2/5">
          <img src="/graphics/dijkstra/comic-behavior/step6.png" alt="" />
        </div>
      </div>

      <br />
      {<Text value={algSteps} />}
    </div>
  )
}
export default DijkstraIntro
