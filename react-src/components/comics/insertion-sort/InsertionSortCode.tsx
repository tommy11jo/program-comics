import CodeEditor from "@/components/CodeEditor"
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
  return <CodeEditor code={pythonCode} lang="python" />
}
export default InsertionSortCode
