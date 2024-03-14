import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"
type CodeEditorProps = {
  code: string
  lang: string
}
const CodeEditor = ({ code, lang }: CodeEditorProps) => {
  const customStyle = {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
      background: "#000",
      fontFamily: 'Cursive, "Roboto Mono", monospace',
      lineHeight: "normal",
      fontSize: "16px",
      color: "white", // workaround to override defaults
      overflow: "auto",
    },
    // combining these class does not work, why?
    'code[class*="language-"]': {
      fontSize: "16px",
      color: "white",
      overflow: "auto",
    },
  }

  // Note: Manually set bg to black in /node_modules/react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus.js
  return (
    <div className="p-1 md:p-8 outline outline-[#333] rounded-lg">
      <SyntaxHighlighter language={lang} style={customStyle}>
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
export default CodeEditor
