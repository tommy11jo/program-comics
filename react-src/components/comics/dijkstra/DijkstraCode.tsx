"use client"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"
const DijkstraCode = () => {
  const pythonCode = `import heapq
# graph is a map from vertex v => list of outgoing edges
def dijkstra(graph, start):
    # dist is a map from vertex v => best distance found so far
    dist = {v: float("inf") for v in graph}
    dist[start] = 0
    pq = [(0, start)]
    prev = {}

    while pq:
        d, u = heapq.heappop(pq)
        for neighbor, weight in graph[u]:
            alt = d + weight
            if alt < dist[neighbor]:
                dist[neighbor] = alt
                prev[neighbor] = u
                heapq.heappush(pq, (alt, neighbor))
    return dist, prev

g = {
    0: [(1, 2), (2, 1)],
    1: [(2, 5), (3, 11), (4, 3)],
    2: [(5, 15)],
    3: [(4, 2)],
    4: [(2, 1), (5, 4), (6, 5)],
    5: [],
    6: [(3, 1), (5, 1)],
}
start = 0
dist, prev = dijkstra(g, start)
print("distance to 6 should be 10 and is", dist[6])
`
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
        {pythonCode}
      </SyntaxHighlighter>
    </div>
  )
}
export default DijkstraCode
