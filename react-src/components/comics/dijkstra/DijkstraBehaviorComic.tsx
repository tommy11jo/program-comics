import Panel from "@/components/Panels"
import { Column, Row, Text } from "@/components/index"
import { CENTER, LEFT, UP } from "@/lib/constants"
import { useRef } from "react"

const CUR_BLUE = "#58C4DD"
const DijkstraBehaviorComic = () => {
  const folder = "/graphics/dijkstra/comic-behavior"
  const imageIndex = useRef(0)
  const nextImage = () => {
    return <img src={`${folder}/step${imageIndex.current++}.png`} />
  }
  const row1 = (
    <Row
      comps={[
        <Panel
          grow={true}
          panel={
            <Text
              hpadding={"0.4rem"}
              vpadding={"0.2rem"}
              value="Welcome! I hope this will be your shortest path to understanding the behavior of Dijkstra's algorithm! Well I don't mean shortest. This sentence breaks that. But engaging and clear."
            />
          }
        />,
        <Panel panel={nextImage()} />,
      ]}
    />
  )
  const row2 = (
    <Row
      comps={[
        <Panel
          textPos={UP}
          panel={nextImage()}
          text={
            <Text value="Explore the start. The minimum distance from the start to start is 0." />
          }
        />,
        <Panel
          panel={nextImage()}
          text={
            <Text
              value={
                <span>
                  Next, relax all the edges going out of the node. That is, for
                  each neighboring node, update its{" "}
                  <Text
                    inline={true}
                    color={CUR_BLUE}
                    value={"best distance so far value"}
                  />
                  . If the distance of the new path along the edge is less than
                  the best distance so far, then we update the best distance so
                  far.
                </span>
              }
            />
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
          text={
            <Text value="Explore node 2 because it has the smallest best distance so far among the unexplored nodes. Node 2’s distance value of 1 is less than node 1’s distance value of 2 and all the other nodes’ distance values of infinity. We now know the minimum distance to node 2 from the start is 1." />
          }
        />,
        <Panel
          panel={nextImage()}
          text={
            <Text value="Again, relax all the edges going out of the node, just one edge in this case." />
          }
        />,
      ]}
    />
  )
  return <Column comps={[row1, row2, row3]} />
}
export default DijkstraBehaviorComic
