import { ReactElement } from "react"

type TextProps = {
  value: ReactElement | string
  inline?: boolean
  color?: string
  textAlign?: "left" | "center" | "right"
  justifyContent?: "flex-start" | "center" | "flex-end"
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
  fontSize = "inherit",
  italics = false,
  bold = false,
  useComicFont = true,
  textAlign = "left", // how text should be aligned when taking up full space
  justifyContent = "flex-start", // where text should be positioned when not taking up full space
  hmargin = "0",
  vmargin = "0",
  hpadding = "0",
  vpadding = "0",
}: TextProps) => {
  let elStyle: React.CSSProperties = {
    display: inline ? "inline-flex" : "flex",
    flexGrow: 1,
    color: color,
    fontSize: fontSize,
    fontFamily: useComicFont ? "Comic Neue" : `"Roboto", "Arial", sans-serif`,
    fontStyle: italics ? "italic" : "normal",
    fontWeight: bold ? "bold" : "normal",
    whiteSpace: "pre-wrap", // ensure whitespace is preserved
    justifyContent: justifyContent,
    textAlign: textAlign,
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
