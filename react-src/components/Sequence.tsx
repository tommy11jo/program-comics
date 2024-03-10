import React, { ReactElement, ReactNode } from "react"
import { VPosType, UP, DOWN } from "../lib/constants"

type SequenceProps = {
  text?: ReactElement | string
  comps: ReactNode[]
  gap?: number
  isColumn?: boolean
  alignText?: VPosType
  useOutline?: boolean
  hmargin?: string
  vmargin?: string
  hpadding?: string
  vpadding?: string
}

const Sequence: React.FC<SequenceProps> = ({
  comps,
  text = "",
  gap = 1,
  isColumn = false,
  alignText = UP,
  hmargin = "0.5rem",
  vmargin = "1rem",
  hpadding = "0",
  vpadding = "0.2rem",
  useOutline = false,
}) => {
  const outerStyle: React.CSSProperties = {
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
    gap: `${gap}rem`,
    flex: 1,
    alignItems: "stretch",
  }
  return (
    <div className="flex flex-col" style={outerStyle}>
      {text !== "" && alignText == UP && text}
      <div style={sequenceStyle}>
        {comps.map((Comp, index) => (
          <div key={index} style={{ display: "flex", flex: 1 }}>
            {Comp}
          </div>
        ))}
      </div>
      {text !== "" && alignText == DOWN && text}
    </div>
  )
}

export const Row: React.FC<Omit<SequenceProps, "isColumn">> = (props) => {
  return <Sequence {...props} isColumn={false} />
}

export const Col: React.FC<Omit<SequenceProps, "isColumn">> = (props) => {
  return <Sequence {...props} isColumn={true} />
}
