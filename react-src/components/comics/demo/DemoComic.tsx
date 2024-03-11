import { Panel, Text, Row, Column } from "../../index"
import { CENTER, DOWN, RIGHT, UP } from "../../../lib/constants"
import { RED, RED_E } from "@/lib/colorConstants"

// Create comics in a separate file from the mdx in order to get IDE support for style/layout components like `TextNode`
const DemoComic = () => {
  const panel = (
    <Row
      vpadding={"0.5rem"}
      useOutline={true}
      text={<Text value="Styling and Layout" color={RED} fontSize="24px" />}
      comps={[
        <Row
          text={
            <Text
              value="You can select a group of panels and annotate them. Use the boolean prop `useOutline` to declare whether each panel has an outline (default is false)."
              pos={CENTER}
              align={CENTER}
            />
          }
          comps={[
            <Panel
              useOutline={true}
              panel={<img src="/graphics/demo/car-stop-sign1.png" />}
            />,
            <Panel panel={<img src="/graphics/demo/car-stop-sign2.png" />} />,
          ]}
        />,
        <Row
          comps={[
            <Panel
              text={
                <Text
                  value="You can choose the text's horizontal position, alignment, color, and font size..."
                  color={RED_E}
                  fontSize="16px"
                  align={RIGHT}
                />
              }
              useOutline={true}
              panel={<img src="/graphics/demo/car-stop-sign1.png" />}
            />,
            <Panel
              text={
                <Text
                  fontSize="14px"
                  value="...and the relative position of the text to the panel."
                />
              }
              textPos={DOWN}
              useOutline={true}
              panel={<img src="/graphics/demo/car-stop-sign2.png" />}
            />,
          ]}
        />,
      ]}
    />
  )
  return panel
  //   return <Row comps={[panel, panel]} />
}

export default DemoComic
