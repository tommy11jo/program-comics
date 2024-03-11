import { ReactElement } from "react"
import { HAlignType, RIGHT, CENTER, LEFT } from "../lib/constants"

type TextProps = {
  value: ReactElement | string
  inline?: boolean
  color?: string
  pos?: HAlignType
  align?: HAlignType
  fontSize?: string | number
  useComicFont?: boolean
  italics?: boolean
  bold?: boolean
  hmargin?: string
  vmargin?: string
  hpadding?: string
  vpadding?: string
}

const Text = ({
  value,
  inline = false,
  color = "white",
  pos = CENTER,
  fontSize = "inherit",
  italics = false,
  bold = false,
  useComicFont = true,
  align = LEFT,
  hmargin = "0",
  vmargin = "0",
  hpadding = "0",
  vpadding = "0",
}: TextProps) => {
  let elStyle: React.CSSProperties = {
    display: inline ? "inline-flex" : "flex",
    // flex: 1,
    color: color,
    justifyContent:
      pos === RIGHT ? "flex-end" : pos === CENTER ? "center" : "flex-start",

    fontSize: fontSize,
    fontFamily: useComicFont ? "Comic Neue" : `"Roboto", "Arial", sans-serif`,
    fontStyle: italics ? "italic" : "normal",
    fontWeight: bold ? "bold" : "normal",
    whiteSpace: "pre-wrap", // ensure whitespace is preserved
    textAlign: align === RIGHT ? "right" : pos === CENTER ? "center" : "left",
    marginBottom: vmargin,
    marginTop: vmargin,
    marginLeft: hmargin,
    marginRight: hmargin,
    paddingBottom: vpadding,
    paddingTop: vpadding,
    paddingLeft: hpadding,
    paddingRight: hpadding,
  }

  return <span style={elStyle}>{value}</span>
}

export default Text
