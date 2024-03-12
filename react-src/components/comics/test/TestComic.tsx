import { Panel, Row, Text } from "@/components"

const TestComic = () => {
  const row1 = (
    <Row
      label={
        <Text
          value="You can select a group of panels and annotate them. Use the boolean prop `useOutline` to declare whether each panel has an outline (default is false)."
          // value="You can"
          textAlign={"center"}
          justifyContent={"center"}
        />
      }
      comps={[
        <Panel
          useOutline={true}
          panel={<img src="/graphics/demo/car-stop-sign1.png" />}
        />,
        <Panel
          useOutline={true}
          panel={<img src="/graphics/demo/car-stop-sign2.png" />}
        />,
        <Panel
          useOutline={true}
          panel={<img src="/graphics/dijkstra/slideshow/step0.png" />}
        />,
      ]}
    />
  )
  return row1
}
export default TestComic
