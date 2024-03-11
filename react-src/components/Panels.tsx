import React, { ReactElement } from "react"
import { VPosType, UP, DOWN } from "../lib/constants"
import Text from "./Text"

// TODO: this type constraint isn't working, pass in <div> to panel

type ReactImage = ReactElement<{ src: string; alt?: string }>
type PanelType = ReactElement<PanelWithTextProps> | ReactImage
interface PanelWithTextProps {
  text?: ReactElement<typeof Text> | string
  panel?: ReactElement<PanelType> | null
  align?: VPosType
  posText?: VPosType
  useOutline?: boolean
  hmargin?: string
  vmargin?: string
  hpadding?: string
  vpadding?: string
}

export const Panel: React.FC<PanelWithTextProps> = ({
  text = "",
  panel = null,
  align = UP,
  posText = UP,
  hmargin = "0.3rem",
  vmargin = "0.3rem",
  hpadding = "0.0rem",
  vpadding = "0.0rem",
  useOutline = false,
}) => {
  const outerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
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
    // flex: 1,
    flexShrink: 1,
    // flexGrow: 1,
    flexDirection: align === DOWN ? "column-reverse" : "column",
    outline: useOutline ? "2px solid gray" : null,
    borderRadius: "0.25rem",
    // padding: "0.5rem",
  }

  return (
    <div style={outerStyle}>
      {text !== "" && posText === UP && text}
      <div style={containerStyle}>{panel}</div>
      {text !== "" && posText === DOWN && text}
    </div>
  )
}

export default Panel
