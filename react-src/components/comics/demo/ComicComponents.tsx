import { Panel, Row, Col, Text } from "@/components"
import { LEFT, RIGHT } from "@/lib/constants"
const ComicComponents = () => {
  const seqCodeStr = `// Sequence.tsx
<Row
  comps={[
    <Panel
      useOutline={true}
      panel={<img src="/graphics/demo/car-stop-sign1.png" />}
    />,
    <Panel
      useOutline={true}
      panel={<img src="/graphics/demo/car-stop-sign2.png" />}
    />,
  ]}
/>
`
  const rhs = (
    <Panel
      useOutline={true}
      panel={
        <Text
          fontSize={"12px"}
          hpadding={"0.2rem"}
          vpadding={"0.2rem"}
          pos={LEFT}
          value={
            <div className="flex flex-1">
              <code>{seqCodeStr}</code>
            </div>
          }
        />
      }
    />
  )

  const twoCars = (
    <Row
      comps={[
        <Panel
          useOutline={true}
          panel={<img src="/graphics/demo/car-stop-sign1.png" />}
        />,
        <Panel
          useOutline={true}
          panel={<img src="/graphics/demo/car-stop-sign2.png" />}
        />,
      ]}
    />
  )
  const seqRHS = (
    <Col
      comps={[
        twoCars,
        <Panel
          text={
            <Text
              value={
                "The code snippet to the left creates the two panels above. This entire example is made of three sequences. A horizontal sequence (the two cars) nested in a vertical sequence (the right half) nested in a horizontal sequence."
              }
              fontSize="16px"
            />
          }
        />,
      ]}
    />
  )
  const seqRow = (
    <Panel
      text={<Text value={"Example with four panels"} fontSize="30px" />}
      panel={<Row comps={[rhs, seqRHS]} />}
      vmargin={"1rem"}
    />
  )
  return seqRow
}
export default ComicComponents
