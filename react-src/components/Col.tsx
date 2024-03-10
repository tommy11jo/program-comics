import React from "react"

type ColProps = {
  comps: React.ReactNode[]
  gap?: number
}

const Col: React.FC<ColProps> = ({ comps, gap = 1 }) => {
  const colStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: `${gap}rem`,
  }

  return (
    <div style={colStyle}>
      {comps.map((Comp, index) => (
        <React.Fragment key={index}>{Comp}</React.Fragment>
      ))}
    </div>
  )
}

export default Col
