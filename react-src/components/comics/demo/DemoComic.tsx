import { resetConfig, setConfig } from "@/components/ConfigContext"
import { Panel, Text, Row } from "../../index"
import { RED, RED_E } from "@/lib/colorConstants"

// Create comics in a separate file from the mdx in order to get IDE support for style/layout components like `TextNode`
const DemoComic = () => {
  setConfig("alignItems", "flex-end")
  const panel = (
    <Row
      vpadding={"0.5rem"}
      label={<Text value="Styling and Layout" color={RED} fontSize="24px" />}
      comps={[
        <Row
          label={
            <Text
              value="You can select a group of panels and annotate them. Use the boolean prop `useOutline` to declare whether each panel has an outline (default is false)."
              textAlign={"center"}
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
              useOutline={true}
              label={
                <Text
                  value="You can choose the text's horizontal position, alignment, color, and font size..."
                  color={RED_E}
                  fontSize="16px"
                  textAlign={"right"}
                />
              }
              panel={<img src="/graphics/demo/car-stop-sign1.png" />}
            />,
            <Panel
              useOutline={true}
              label={
                <Text
                  fontSize="14px"
                  value="...and the relative position of the text to the panel."
                />
              }
              panel={<img src="/graphics/demo/car-stop-sign2.png" />}
            />,
          ]}
        />,
      ]}
    />
  )
  //   resetConfig()
  return panel
}

export default DemoComic
