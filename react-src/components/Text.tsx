import { ReactElement } from "react"
import { HAlignType, RIGHT, CENTER, LEFT } from "../lib/constants"

type TextProps = {
  value: ReactElement | string
  inline?: boolean
  color?: string
  buff?: number
  pos?: HAlignType
  align?: HAlignType
  fontSize?: string | number
  useComicFont?: boolean
  italics?: boolean
  bold?: boolean
}

const Text = ({
  value,
  inline = false,
  color = "white",
  buff = 0,
  pos = CENTER,
  fontSize = "inherit",
  italics = false,
  bold = false,
  useComicFont = true,
  align = LEFT,
}: TextProps) => {
  let elStyle: React.CSSProperties = {
    display: inline ? "inline-flex" : "flex",
    // flex: 1,
    color: color,
    justifyContent:
      pos === RIGHT ? "flex-end" : pos === CENTER ? "center" : "flex-start",
    padding: `${buff}rem`,
    fontSize: fontSize,
    fontFamily: useComicFont ? "Comic Neue" : `"Roboto", "Arial", sans-serif`,
    fontStyle: italics ? "italic" : "normal",
    fontWeight: bold ? "bold" : "normal",
    whiteSpace: "pre-wrap", // ensure whitespace is preserved
    textAlign: align === RIGHT ? "right" : pos === CENTER ? "center" : "left",
  }

  return <span style={elStyle}>{value}</span>
}

export default Text
