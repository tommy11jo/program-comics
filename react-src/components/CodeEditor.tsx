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
      fontFamily: '"Roboto Mono", monospace',
    },
    'code[class*="language-"]': {
      fontFamily: '"Roboto Mono", monospace',
    },
  }
  return (
    <div className="p-2 outline outline-[#333] rounded-lg">
      <SyntaxHighlighter language="python" style={customStyle}>
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
export default CodeEditor
