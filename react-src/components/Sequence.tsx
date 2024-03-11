import React, { ReactElement, ReactNode } from "react"
import { VPosType, DirType, UP, DOWN, RIGHT, LEFT } from "../lib/constants"

type SequenceProps = {
  text?: ReactElement | string
  comps: ReactNode[]
  gap?: number
  isColumn?: boolean

  posText?: VPosType
  useOutline?: boolean
  align?: string
  hmargin?: string
  vmargin?: string
  hpadding?: string
  vpadding?: string
}

const Sequence: React.FC<SequenceProps> = ({
  comps,
  text = "",
  gap = "0.3rem",
  isColumn = false,
  posText = UP,
  useOutline = false,
  align = isColumn ? "flex-start" : "flex-end",
  hmargin = "0",
  vmargin = "0",
  hpadding = "0",
  vpadding = "0",
}) => {
  const outerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: align,
    marginBottom: vmargin,
    marginTop: vmargin,
    marginLeft: hmargin,
    marginRight: hmargin,
    paddingBottom: vpadding,
    paddingTop: vpadding,
    paddingLeft: hpadding,
    paddingRight: hpadding,
    outline: useOutline ? "2px solid gray" : null,
    borderRadius: "0.25rem",
  }
  const sequenceStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: isColumn ? "column" : "row",
    gap: gap,
    // flex: 1,
    alignItems: "stretch",
  }
  return (
    <div style={outerStyle}>
      {text !== "" && posText == UP && text}
      <div style={sequenceStyle}>
        {comps.map((Comp, index) => (
          <div key={index} style={{ display: "flex", flex: 1 }}>
            {Comp}
          </div>
        ))}
      </div>
      {text !== "" && posText == DOWN && text}
    </div>
  )
}

export const Row: React.FC<Omit<SequenceProps, "isColumn">> = (props) => {
  return <Sequence {...props} isColumn={false} />
}

export const Column: React.FC<Omit<SequenceProps, "isColumn">> = (props) => {
  return <Sequence {...props} isColumn={true} />
}
