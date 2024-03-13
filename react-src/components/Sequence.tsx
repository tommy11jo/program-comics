import React, { ReactElement, ReactNode } from "react"
import { useConfig } from "./ConfigContext"
type SequenceProps = {
  comps: ReactNode[]
  label?: ReactElement | string
  labelBelow?: ReactElement | string
  gap?: number
  equalSpace?: boolean // toggles flex-1
  isColumn?: boolean
  hmargin?: string
  vmargin?: string
  hpadding?: string
  vpadding?: string
}

const Sequence: React.FC<SequenceProps> = ({
  comps,
  label = "",
  labelBelow = "",
  gap = "0.3rem",
  equalSpace = true,
  isColumn = false,
  hmargin = "0",
  vmargin = "0",
  hpadding = "0",
  vpadding = "0",
}) => {
  const { alignItems } = useConfig()
  const outerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
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
  const sequenceStyle: React.CSSProperties = {
    display: "flex",
    // flexDirection: isColumn ? "column" : "row",
    gap: gap,
    alignItems: alignItems,
  }
  //   <div key={index} style={{ display: "flex" }}>
  return (
    <div style={outerStyle}>
      {label !== "" && label}
      <div style={sequenceStyle} className={!isColumn ? "row" : "column"}>
        {comps.map((Comp, index) => (
          <div
            key={index}
            // style={{ display: "flex", flex: "0 1 auto" }}
            style={{ display: "flex", flex: equalSpace ? 1 : "0 1 auto" }}
          >
            {Comp}
          </div>
        ))}
      </div>
      {labelBelow != "" && labelBelow}
    </div>
  )
}

export const Row: React.FC<Omit<SequenceProps, "isColumn">> = (props) => {
  return <Sequence {...props} isColumn={false} />
}

export const Column: React.FC<Omit<SequenceProps, "isColumn">> = (props) => {
  return <Sequence {...props} isColumn={true} />
}
