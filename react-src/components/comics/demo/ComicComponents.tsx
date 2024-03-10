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
  const panelCodeStr = `// Panels.tsx
interface PanelWithTextProps {
    text: ReactElement<typeof Text> | string
    panel?: ReactElement<PanelType> | null
    align?: VPosType // UP or DOWN
    useOutline?: boolean
}`
  const seqPanel1 = (
    <Panel
      useOutline={true}
      panel={
        <Text
          fontSize={"12px"}
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

  const seqTwoCars = (
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
        seqTwoCars,
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
      panel={<Row comps={[seqPanel1, seqRHS]} />}
    />
  )
  const panel2 = (
    <Panel
      useOutline={true}
      text={
        <Text
          fontSize={"12px"}
          pos={LEFT}
          value={
            <div>
              <code>{panelCodeStr}</code>
            </div>
          }
        />
      }
    />
  )
  //   return seqPanel2
  return seqRow
  //   return <Sequence comps={[seqRow, panel2]} isColumn={true} />
}
export default ComicComponents
