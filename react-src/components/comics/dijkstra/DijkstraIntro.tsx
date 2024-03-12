import { Panel, Row, Text } from "@/components"
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
      shortest path from a start vertex to an end vertex. A common use case is
      finding directions from Point A to Point B on a map.
    </span>
  )
  let algSteps = (
    <span>
      <b>Algorithm Steps: </b>
      <ul>
        <li>
          Initialize a priority queue <code>PQ</code> and a map{" "}
          <code>distances</code>.
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
            <code>distances</code> and <code>PQ</code> and also{" "}
            <code>prev</code> for tracking these paths. See the picture to see a
            relaxation step.
          </li>
        </ul>
      </ul>
    </span>
  )
  let textRuntime = (
    <span>
      <b>Runtime: </b>
      With a simple python implementation (see below), its runtime is{" "}
      <code>O((E+V)logV)</code> where E is the number of edges and V is the
      number of vertices.
    </span>
  )

  let snapshotText = (
    <div>
      {textIntro}
      <br />
      <br />
      {algSteps}
      <br />
      {textRuntime}
    </div>
  )
  return (
    <div>
      <Row
        comps={[
          <Panel
            label={
              <div>
                <Text fontSize="18px" value={snapshotText} />
              </div>
            }
          />,
          <Panel
            panel={<img src="/graphics/dijkstra/comic-behavior/step6.png" />}
          />,
        ]}
      />
    </div>
  )
}
export default DijkstraIntro
