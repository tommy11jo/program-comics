import React, { ReactElement } from "react"
import Text from "./Text"
import { CENTER, DOWN, UP } from "@/lib/constants"

// TODO: this type constraint isn't working, pass in <div> to panel
type ReactImage = ReactElement<{ src: string; alt?: string }>
type PanelType = ReactElement<PanelProps> | ReactImage
interface PanelProps {
  label?: ReactElement<typeof Text> | string // label above the panel contents
  labelBelow?: ReactElement<typeof Text> | string // label below the panel contents
  panel?: ReactElement<PanelType> | null
  useOutline?: boolean
  justifyPanelContent?: "flex-start" | "center" | "flex-end" // position of `panel` along horizontal axis
  hmargin?: string
  vmargin?: string
  hpadding?: string
  vpadding?: string
}

const Panel: React.FC<PanelProps> = ({
  label = "",
  labelBelow = "",
  panel = null,
  useOutline = false,
  justifyPanelContent = "flex-start",
  hmargin = "0.3rem",
  vmargin = "0.3rem",
  hpadding = "0",
  vpadding = "0",
}) => {
  const outerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "flex-start",
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
    flexDirection: "column",
    alignItems: justifyPanelContent,
    flexShrink: 1,
    flexGrow: 1,
    outline: useOutline ? "2px solid gray" : null,
    borderRadius: "0.25rem",
    // padding: "0.5rem",
  }

  return (
    <div style={outerStyle}>
      {label !== "" && label}
      {/* div below handles space between case */}
      <div>
        <div style={containerStyle}>{panel}</div>
        {labelBelow !== "" && labelBelow}
      </div>
    </div>
  )
}

export default Panel
