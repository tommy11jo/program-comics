from manim import *
from dijkstras import WeightedDiGraph
from typing import Hashable, Tuple
import heapq

START_COLOR = GREEN
END_COLOR = PURPLE_C
MAIN_COLOR = GREEN
FOCUS_COLOR = RED
MAIN_OPACITY = 0.4
MIN_DIST_COLOR = RED
BEST_SO_FAR_COLOR = BLUE_C
CIRCLE_COLORS = [
    RED_A,
    RED_C,
    PURE_RED,
    MAROON_C,
    MAROON_D,
    MAROON_E,
]  # unique colors for <=6 distinct edges

GRAPH1 = {
    0: [(1, 2), (2, 1)],
    1: [(2, 5), (3, 11), (4, 3)],
    2: [(5, 15)],
    3: [(4, 2)],
    4: [(2, 1), (5, 4), (6, 5)],
    5: [],
    6: [(3, 1), (5, 1)],
}
START1, END1 = 0, 6


GRAPH2 = {
    0: [(1, 7), (2, 1), (4, 1)],
    1: [(6, 2)],
    2: [(3, 3), (4, 2)],
    3: [(5, 4)],
    4: [(5, 6)],
    5: [(7, 100)],
    6: [(7, 1)],
    7: [],
}
START2 = 0
END2 = 7

config.frame_size = (1600, 1200)


# Adds state var tracking to WeightedDiGraph which is customized with functions to visualize Dijkstra's
class StatefulWeightedDiGraph(WeightedDiGraph):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fringe = None
        self.table_of_state_vars = None
        self.state_var_boxes = VGroup()
        self.add(self.state_var_boxes)

        self.explanation = None

    def show_explanation(self, text=None, font_size=24):
        if self.explanation is not None:
            self.remove(self.explanation)
        if text is None:
            text = "Insert (0, start) into priority queue PQ.\n"
            text += "Repeat: Remove best vertex v from PQ, and relax all edges pointing from v.\n"
            text += "- Update PQ, dist_to, and prev during relaxation"
        text_obj = Text(text, font_size=font_size)
        vertices = VGroup(*self.vertices.values())
        text_obj.next_to(vertices, UP, buff=0.5).to_edge(LEFT, buff=0.5)
        self.add(text_obj)
        self.explanation = text_obj

    def show_fringe(self, pq: list[tuple[Hashable, Hashable]]):
        pq.sort()
        if self.fringe:
            self.remove(self.fringe)
        fringe_group = VGroup(Text("Fringe: ", font_size=self.label_font_size))
        fringe_elements = {}
        for key, value in pq:
            key_value_text = Text(f"{key}: {value}", font_size=self.label_font_size)
            fringe_group.add(key_value_text)
            # handle duplicate fringe elements by only adding the first you see
            if value not in fringe_elements:
                fringe_elements[value] = key_value_text
        fringe_group.arrange(RIGHT, buff=0.5)
        # workaround so that bbox is determined by core graph, not annotations like rects
        visual_graph = VGroup(*self.vertices.values())
        fringe_group.next_to(visual_graph, DOWN).align_to(
            self.table_of_state_vars, direction=LEFT
        )

        self.add(fringe_group)
        self.fringe = fringe_group
        self.fringe_elements = (
            fringe_elements  # used for drawing rect on dist label update
        )

    def show_state_table(self, dist_to, prev):
        if self.table_of_state_vars:
            self.remove(self.table_of_state_vars)

        headers = [
            Text(x, font_size=self.label_font_size) for x in ["#", "dist_to", "prev"]
        ]
        rows = [
            [
                str(node),
                "∞" if dist_to[node] == float("inf") else str(dist_to[node]),
                str(prev.get(node, "-")),
            ]
            for node in dist_to
        ]

        table = Table(
            rows,
            col_labels=headers,
            include_outer_lines=False,
            line_config={"stroke_opacity": 0},
            v_buff=0.3,
            h_buff=0.6,
            element_to_mobject_config={"font_size": self.label_font_size},
        )

        # workaround so that bbox is determined by core graph, not annotations like rects
        table.next_to(VGroup(*self.vertices.values()), LEFT)
        self.table_of_state_vars = table
        self.add(table)

    def box_state_var(self, node, col, color=RED):
        # oddly the col indices go backwards
        assert 1 <= col <= 3, "col must be 1 (#), 2 (dist_to), or 3 (prev)"

        # +2 = +1 for header +1 as weird workaround for avoiding last element
        dist_cell_to_focus = self.table_of_state_vars.get_entries_without_labels(
            (node + 1, col)
        )  # (row, col) where top left is (1, 1)
        table_box = SurroundingRectangle(
            dist_cell_to_focus, color=color, buff=0.1, corner_radius=0.1
        )
        self.state_var_boxes.add(table_box)

    def box_fringe_var(self, node, color=RED):
        fringe_box = SurroundingRectangle(
            self.fringe_elements[node], color=color, buff=0.1, corner_radius=0.1
        )
        self.state_var_boxes.add(fringe_box)

    def undo_all_box_state_vars(self):
        self.remove(self.state_var_boxes)
        self.state_var_boxes = VGroup()
        self.add(self.state_var_boxes)


class ShortestPath(MovingCameraScene):
    def __init__(self, file_suffix=0):
        super().__init__()
        self.cur_frame = 0
        self.file_suffix = file_suffix

    # unique suffix for creating different folders for different runs
    def set_file_suffix(self, file_suffix):
        self.file_suffix = file_suffix

    def convert_graph_to_digraph_format(graph):
        vertices = list(graph.keys())
        edges = []
        for vertex, neighbors in graph.items():
            for neighbor, weight in neighbors:
                edges.append((vertex, neighbor, weight))
        return vertices, edges

    def capture(self):
        self.renderer.camera.capture_mobjects(self.mobjects)
        pixel_array = self.renderer.camera.pixel_array
        img = self.renderer.camera.get_image(pixel_array).copy()
        img.save(
            f"./pictures/dijkstra-behavior-state{self.file_suffix}/step{self.cur_frame}.png"
        )
        self.renderer.camera.reset()
        self.cur_frame += 1

    def construct(self):
        # shortest path from start to end of graph
        # returns distance and path
        def dijkstra(
            graph: Dict[int, List[Tuple[int, int]]],
            vgraph: StatefulWeightedDiGraph,
            start: int,
            end: int,
        ) -> Tuple[float, List[int]]:
            distances = {node: float("inf") for node in graph}
            distances[start] = 0
            pq = [(0, start)]
            prev_node = {}
            reached = False

            vgraph.show_explanation()
            vgraph.show_state_table(distances, prev_node)
            new_pos = vgraph.get_center()
            self.camera.frame.shift(new_pos)
            scalar = 1.2
            self.camera.frame.set(
                width=vgraph.width * scalar, height=vgraph.height * scalar
            )
            self.capture()
            while len(pq) > 0:
                vgraph.show_fringe(pq)
                cur_dist, cur_node = heapq.heappop(pq)
                # step 1: show node being processed
                vgraph.show_dist_label(cur_node, cur_dist)
                vgraph.highlight_node(cur_node, color=FOCUS_COLOR, opacity=1.0)

                if cur_dist > distances[cur_node]:
                    continue
                if cur_node == end:
                    reached = True
                    self.capture()
                    vgraph.highlight_node(cur_node)
                    break

                vgraph.box_fringe_var(cur_node, color=GREEN)
                self.capture()
                vgraph.undo_all_box_state_vars()
                # step 2: show relaxation of edges
                fringe_box_args_lst = []
                box_state_var_args_lst = []

                _dist_label_args_lst = []
                _highlight_edge_args_lst = []
                circle_colors = iter(CIRCLE_COLORS)
                for neighbor, weight in graph[cur_node]:
                    distance = cur_dist + weight
                    prev_neighbor_dist = distances[neighbor]  # used for tracking
                    if distance < distances[neighbor]:
                        distances[neighbor] = distance
                        prev_node[neighbor] = cur_node
                        heapq.heappush(pq, (distance, neighbor))
                        vgraph.highlight_edge(cur_node, neighbor, opacity=1.0)
                        vgraph.update_dist_label(
                            neighbor, distance, prev_neighbor_dist, next(circle_colors)
                        )

                        col = next(circle_colors)
                        fringe_box_args_lst.append((neighbor, col))
                        box_state_var_args_lst.append((neighbor, 2, col))
                        box_state_var_args_lst.append((neighbor, 3, col))
                    else:
                        vgraph.highlight_edge(cur_node, neighbor)
                        vgraph.compare_dist_label(
                            neighbor, distance, prev_neighbor_dist
                        )

                    _highlight_edge_args_lst.append((cur_node, neighbor, GREEN))
                    _dist_label_args_lst.append((neighbor, distance, BEST_SO_FAR_COLOR))

                vgraph.show_fringe(pq)
                vgraph.show_state_table(distances, prev_node)
                for args in box_state_var_args_lst:
                    vgraph.box_state_var(*args)
                for args in fringe_box_args_lst:
                    vgraph.box_fringe_var(*args)
                self.capture()
                # Cleanup
                vgraph.undo_all_box_state_vars()
                vgraph.highlight_node(cur_node)
                for args in _dist_label_args_lst:
                    vgraph.show_dist_label(*args)
                for args in _highlight_edge_args_lst:
                    vgraph.highlight_edge(*args)

            if reached:
                path = []
                node = end
                vgraph.show_explanation(
                    text="Now, follow the edges backwards, from goal to start"
                )
                while node != start:
                    path.append(node)
                    prev = node  # used for tracking
                    node = prev_node[node]
                    vgraph.highlight_node(prev, color=FOCUS_COLOR, opacity=1.0)
                    vgraph.highlight_edge(node, prev, color=FOCUS_COLOR, opacity=1.0)
                    vgraph.box_state_var(prev, 3)
                    self.capture()
                    vgraph.highlight_node(prev, color=FOCUS_COLOR)
                    vgraph.highlight_edge(node, prev, color=FOCUS_COLOR)
                    vgraph.undo_all_box_state_vars()
                path.append(start)
                path.reverse()
                vgraph.highlight_node(node, color=FOCUS_COLOR, opacity=1.0)
                vgraph.show_explanation(
                    f"The shortest path is {path} with distance {distances[end]}."
                )
                self.capture()
                return distances[end], path
            return float("inf"), []

        # file_suffix = 1
        # graph, start, end = GRAPH1, START1, END1
        file_suffix = 2
        graph, start, end = GRAPH2, START2, END2
        self.set_file_suffix(file_suffix)
        vertices, edges = ShortestPath.convert_graph_to_digraph_format(graph)
        vgraph = StatefulWeightedDiGraph(vertices, edges, start=start, end=end)
        self.add(vgraph)

        dist, path = dijkstra(graph, vgraph, start, end)
        print(dist, path)
