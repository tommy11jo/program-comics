import React, { ReactElement } from "react"
import { VPosType, UP, DOWN } from "../lib/constants"
import Text from "./Text"

// TODO: this type constraint isn't working, pass in <div> to panel

type ReactImage = ReactElement<{ src: string; alt?: string }>
type PanelType = ReactElement<PanelProps> | ReactImage
interface PanelProps {
  text?: ReactElement<typeof Text> | string
  panel?: ReactElement<PanelType> | null
  align?: VPosType
  textPos?: VPosType
  useOutline?: boolean
  hmargin?: string
  vmargin?: string
  hpadding?: string
  vpadding?: string
  grow?: boolean
}

const Panel: React.FC<PanelProps> = ({
  text = "",
  panel = null,
  align = UP,
  textPos = UP,
  hmargin = "0.3rem",
  vmargin = "0.3rem",
  hpadding = "0",
  vpadding = "0",
  useOutline = false,
  grow = false,
}) => {
  const outerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", // ugh
    marginBottom: vmargin,
    marginTop: vmargin,
    marginLeft: hmargin,
    marginRight: hmargin,
    paddingBottom: vpadding,
    paddingTop: vpadding,
    paddingLeft: hpadding,
    paddingRight: hpadding,
  }
  let containerStyle: React.CSSProperties = {
    display: "flex",
    // justifyContent: "flex-end",
    // flex: 1,
    flexShrink: 1,
    flexGrow: grow ? 1 : 0,
    flexDirection: align === DOWN ? "column-reverse" : "column",
    outline: useOutline ? "2px solid gray" : null,
    borderRadius: "0.25rem",
    // padding: "0.5rem",
  }

  return (
    <div style={outerStyle}>
      {text !== "" && textPos === UP && text}
      <div style={containerStyle}>{panel}</div>
      {text !== "" && textPos === DOWN && text}
    </div>
  )
}

export default Panel
