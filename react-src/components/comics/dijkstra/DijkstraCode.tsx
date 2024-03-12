import Editor from "@monaco-editor/react"

const DijkstraCode = () => {
  const pythonCode = `import heapq
def dijkstra(graph, start):
    # graph is a map from vertex v => list of outgoing edges
    dist = {node: float("inf") for node in graph}
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
  return (
    <Editor
      height="38rem"
      defaultLanguage="python"
      theme="vs-dark"
      defaultValue={pythonCode}
      options={{
        readOnly: true,
        minimap: { enabled: false },
        scrollbar: { vertical: "hidden", alwaysConsumeMouseWheel: false },
        scrollBeyondLastLine: false,
        fontSize: 16,
      }}
    />
  )
}
export default DijkstraCode
