import Panel from "@/components/Panels"
import { Column, Row, Text } from "@/components/index"
import { useRef } from "react"

const CUR_BLUE = "#58C4DD"
const CUR_RED = "#7E312A"
const DijkstraBehaviorComic = () => {
  const folder = "/graphics/dijkstra/comic-behavior"
  const imageIndex = useRef(0)
  const nextImage = () => {
    return <img src={`${folder}/step${imageIndex.current++}.png`} />
  }
  const introText =
    "Welcome! We're going to apply Dijkstra's to the problem of finding the shortest path from the start to the end of a graph with non-negative weights."
  const row1 = (
    <Row
      comps={[
        <Panel
          panel={
            <Panel
              justifyPanelContent="center"
              // labelBelow={<Text justifyContent="center" value="" />}
              panel={
                <img src={`/graphics/dijkstra/lambda.png`} width={"60px"} />
              }
              label={<Text value={introText} />}
            />
          }
        />,
        <Panel
          panel={nextImage()}
          label={
            <Text
              value="This is our graph. Now I'll lose the first-person and get right to it."
              justifyContent="center"
            />
          }
        />,
      ]}
    />
  )

  const row2 = (
    <Row
      comps={[
        <Panel
          panel={nextImage()}
          label={
            <Text value="Explore the start. The minimum distance from the start to start is 0." />
          }
        />,
        <Panel
          panel={nextImage()}
          label={
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
                  the best distance so far, then update the best distance so
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
          label={
            <Text value="Explore node 2 because it has the smallest best distance so far among the unexplored nodes. Node 2’s distance value of 1 is less than node 1’s distance value of 2 and all the other nodes’ distance values of infinity." />
          }
        />,
        <Panel
          panel={nextImage()}
          label={
            <Text value="Again, relax all the edges going out of the node, just one edge in this case." />
          }
        />,
      ]}
    />
  )
  const row4 = (
    <Row
      comps={[
        <Row
          label={
            <Text value="Explore node 1 because it has the smallest best distance so far among the unexplored nodes. And relax the edges." />
          }
          comps={[<Panel panel={nextImage()} />, <Panel panel={nextImage()} />]}
        />,
        <Row
          label={
            <Text value="And repeat. Notice how the goal node was reached but we continue searching until the goal node is actually explored." />
          }
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
            <Text
              value={
                <span>
                  Explore node 5. When a node is reached in an explore step
                  (like this one), the{" "}
                  {
                    <Text
                      inline={true}
                      color={CUR_RED}
                      value={"minimum distance"}
                    />
                  }{" "}
                  and the shortest path to that node from the start has been
                  found. That statement deserves a proof but for now let's keep
                  going.
                </span>
              }
            />
          }
        />,
        <Panel
          panel={nextImage()}
          label={
            <Text value="Just a lonely and agitated 5. No shared edges to relax." />
          }
        />,
      ]}
    />
  )

  const row6 = (
    <Row
      comps={[
        <Panel
          panel={nextImage()}
          label={
            <Text value="The goal is now explored so the shortest path has been found with a distance value of 10! But the vertices in the path still must be identified." />
          }
        />,
        <Column
          label={
            <Text value="Repeatedly follow edges backward until the start is reached." />
          }
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
