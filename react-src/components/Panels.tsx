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
}

export const Panel: React.FC<PanelWithTextProps> = ({
  text = "",
  panel = null,
  align = UP,
  posText = UP,
  useOutline = false,
}) => {
  let containerStyle: React.CSSProperties = {
    display: "flex",
    flex: 1,
    flexDirection: align === DOWN ? "column-reverse" : "column",
    outline: useOutline ? "2px solid gray" : null,
    borderRadius: "0.25rem",
    // padding: "0.5rem",
  }

  return (
    <div className="flex flex-col">
      {text !== "" && posText === UP && text}
      <div style={containerStyle}>{panel}</div>
      {text !== "" && posText === DOWN && text}
    </div>
  )
}

export default Panel
