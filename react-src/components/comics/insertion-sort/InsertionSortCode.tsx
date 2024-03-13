import { Editor } from "@monaco-editor/react"

const InsertionSortCode = () => {
  const pythonCode = `def insertion_sort(lst):
  for i, cur in enumerate(lst):
      j = i - 1
      while j >= 0 and lst[j] > cur:
          lst[j], lst[j + 1] = lst[j + 1], lst[j]  # alternatively, use temporary var
          j -= 1
      lst[j + 1] = cur


lst = [1, 8, 32, -3, 2, 10, 1, 5, 100]
insertion_sort(lst)
print("list sorted:", lst)
`
  return (
    <div>
      <Editor
        className="monaco-editor"
        //   height="38rem"
        height={pythonCode.split("\n").length * 21 + "px"}
        defaultLanguage="python"
        theme="vs-dark"
        defaultValue={pythonCode}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          scrollbar: { vertical: "hidden", alwaysConsumeMouseWheel: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
        }}
      />
    </div>
  )
}
export default InsertionSortCode
