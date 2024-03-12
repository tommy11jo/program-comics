import heapq
from manim import *
from typing import Hashable, Tuple

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

# config.frame_size = (1000, 900)
config.frame_size = (500, 450)

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


# manim -pql dijkstras.py
# This file creates a sequence of pictures that show dijkstra's behavior, made for comics, without showing state vars
class WeightedDiGraph(DiGraph):
    """
    A custom weighted direction graph, with labeled nodes and edges.
    Contains additional metadata for showing dijkstra's.

    Parameters
    ----------

    vertices
        A list of vertices. Must be hashable elements.
    weighted_edges
        A list of edges, specified as tuples ``(u, v, w)`` where both ``u``
        and ``v`` are vertices. The edge is directed from ``u`` to ``v`` with weight ``w``.
    vertex_config
        See in ``DiGraph``
    edge_config
        See in ``DiGraph``
    """

    def __init__(
        self,
        vertex_values: list[Hashable],
        weighted_edges: list[tuple[Hashable, Hashable, Hashable]],
        *args,
        vertex_config={},
        edge_config={},
        start=None,
        end=None,
        graph_only=False,
        **kwargs,
    ):
        vertex_radius = 0.4
        if not vertex_config:
            for v in vertex_values:
                vertex_config[v] = {
                    "radius": vertex_radius,
                    "color": LIGHT_GRAY,
                    "fill_opacity": MAIN_OPACITY,
                }
        if not edge_config:
            for v1, v2, _ in weighted_edges:
                edge_config[(v1, v2)] = {"tip_length": 0.2, "color": DARK_GRAY}

        edge_pairs = [(v1, v2) for v1, v2, _ in weighted_edges]
        super().__init__(
            vertex_values,
            edge_pairs,
            # layout="shell",
            layout="spring",
            # layout="kamada_kawai",
            layout_scale=3,
            layout_config={"iterations": 1000, "threshold": 1e-4, "seed": 2},
            labels=False,  # manually create labels and don't use this, since this flag doesn't work with animations
            vertex_type=Dot,
            vertex_config=vertex_config,
            edge_type=Line,
            edge_config=edge_config,
            *args,
            **kwargs,
        )

        self.label_font_size = 24
        self.label_setup(
            vertex_values,
            weighted_edges,
            start,
            end,
        )

    def label_setup(
        self,
        vertices: list[Hashable],
        weighted_edges: list[tuple[Hashable, Hashable, Hashable]],
        start: Hashable | None,
        end: Hashable | None,
    ):
        if start is not None:
            self.annotate_vertex(start, "start")
            self.vertices[start].set(color=START_COLOR, fill_opacity=MAIN_OPACITY)
        if end is not None:
            self.annotate_vertex(end, "goal")
            self.vertices[end].set(color=PURPLE_C, fill_opacity=MAIN_OPACITY)

        self.edge_labels = self.init_edge_labels(weighted_edges)
        self.add(self.edge_labels)

        self.node_labels = self.init_node_labels(vertices)
        self.add(self.node_labels)

        self.dist_labels = self.init_dist_labels()
        self.add(self.dist_labels)

    def init_edge_labels(self, weighted_edges):
        alpha = 0.5
        edge_labels = VGroup()
        for v1, v2, weight in weighted_edges:
            edge_obj = self.edges[(v1, v2)]
            point = edge_obj.point_from_proportion(alpha)
            label = Text(str(weight), font_size=24, color=LIGHT_GRAY).move_to(point)
            label.add_background_rectangle(
                color=config.background_color, opacity=1.0, buff=0.05
            )
            edge_labels.add(label)
        return edge_labels

    def init_node_labels(self, vertices):
        node_labels = VGroup()
        for v in vertices:
            v_obj = self.vertices[v]
            label = Text(str(v), font_size=30, color=BLACK)
            label.move_to(v_obj.get_center())
            node_labels.add(label)
        return node_labels

    def init_dist_labels(self, value="∞", color=BEST_SO_FAR_COLOR):
        dist_labels = VGroup()
        for _, dot in self.vertices.items():
            dist_label = Text(
                str(value), font_size=self.label_font_size, color=BEST_SO_FAR_COLOR
            )
            self.no_overlap_next_to(dist_label, dot, LEFT)
            dist_labels.add(dist_label)
        return dist_labels

    def annotate_vertex(self, node, text):
        text_obj = Text(text, font_size=self.label_font_size)
        self.no_overlap_next_to(text_obj, self.vertices[node], LEFT)
        self.add(text_obj)
        return text_obj

    def no_overlap_next_to(
        self, insert_obj: Mobject, target_obj: Mobject, default_dir=LEFT, buff=0.1
    ):
        dirs = [UP, UP + RIGHT, RIGHT, DOWN + RIGHT, DOWN, DOWN + LEFT, LEFT, UP + LEFT]
        dirs = [default_dir] + dirs

        def is_overlapping(obj1: Mobject, obj2: Mobject):
            obj1_left, obj1_right = obj1.get_left()[0], obj1.get_right()[0]
            obj1_bottom, obj1_top = obj1.get_bottom()[1], obj1.get_top()[1]

            obj2_left, obj2_right = obj2.get_left()[0], obj2.get_right()[0]
            obj2_bottom, obj2_top = obj2.get_bottom()[1], obj2.get_top()[1]

            horizontal_overlap = not (obj1_right < obj2_left or obj1_left > obj2_right)
            vertical_overlap = not (obj1_top < obj2_bottom or obj1_bottom > obj2_top)

            return horizontal_overlap and vertical_overlap

        for dir in dirs:
            insert_obj.next_to(target_obj, dir, buff=buff)
            overlapping = False
            for obj in self.get_tracked_mobjects():
                if (
                    obj is not insert_obj
                    and obj is not target_obj
                    and is_overlapping(insert_obj, obj)
                ):
                    overlapping = True
                    break
            if not overlapping:
                return

    def get_tracked_mobjects(self) -> List[Mobject]:
        tracked_mobjects = []

        def recurse_mobjects(mobject):
            if isinstance(mobject, VGroup):
                for submobj in mobject.submobjects:
                    recurse_mobjects(submobj)
            else:
                tracked_mobjects.append(mobject)

        for mobj in self.submobjects:
            recurse_mobjects(mobj)

        return tracked_mobjects

    def show_dist_label(self, node, distance, color=MIN_DIST_COLOR):
        text = "∞" if distance == float("inf") else str(distance)
        dist_label = Text(
            text,
            font_size=self.label_font_size,
            color=color,
            fill_opacity=0.5,
        )
        self.no_overlap_next_to(dist_label, self.vertices[node], LEFT)
        self.dist_labels[node] = dist_label

    def update_dist_label(self, node, dist, prev_dist, color=RED):
        dist_text = "∞" if dist == float("inf") else str(dist)
        prev_dist_text = "∞" if prev_dist == float("inf") else str(prev_dist)
        new_text = Text(
            dist_text + "  ", color=FOCUS_COLOR, font_size=self.label_font_size
        )
        old_text = Text(
            prev_dist_text, color=BEST_SO_FAR_COLOR, font_size=self.label_font_size
        )
        new_text.next_to(old_text, LEFT, buff=0.2)

        text = VGroup(new_text, old_text)
        self.no_overlap_next_to(text, self.vertices[node], LEFT)

        box = SurroundingRectangle(text, color=color, buff=0.1, corner_radius=0.1)

        start_point = old_text.get_corner(UP + LEFT)
        end_point = old_text.get_corner(DOWN + RIGHT)
        cross_line = Line(start_point, end_point, color=RED, stroke_opacity=0.7)
        cross_line.move_to(old_text.get_center())

        dist_update_unit = VGroup(text, cross_line, box)
        self.dist_labels[node] = dist_update_unit

    def compare_dist_label(
        self, node, dist, prev_dist, color=FOCUS_COLOR, opacity=MAIN_OPACITY
    ):
        dist_text = "∞" if dist == float("inf") else str(dist)
        prev_dist_text = "∞" if prev_dist == float("inf") else str(prev_dist)
        new_text = Text(
            dist_text + " ≥ ", color=FOCUS_COLOR, font_size=self.label_font_size
        )
        old_text = Text(
            prev_dist_text, color=BEST_SO_FAR_COLOR, font_size=self.label_font_size
        )
        new_text.next_to(old_text, LEFT, buff=0.2)

        text = VGroup(new_text, old_text)
        self.no_overlap_next_to(text, self.vertices[node], LEFT)

        box = SurroundingRectangle(
            text, color=color, buff=0.1, corner_radius=0.1, stroke_opacity=opacity
        )

        dist_update_unit = VGroup(text, box)
        self.dist_labels[node] = dist_update_unit

    def highlight_node(
        self,
        node,
        color=MAIN_COLOR,
        opacity=0.5,
    ):
        dot = self.vertices[node]
        dot.set_color(color).set_opacity(opacity)

    def highlight_edge(self, start, end, color=FOCUS_COLOR, opacity=MAIN_OPACITY):
        edge = self.edges[(start, end)]
        edge.set_color(color).set_opacity(opacity)


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
            f"./pictures/dijkstra-behavior{self.file_suffix}/step{self.cur_frame}.png"
        )
        self.renderer.camera.reset()
        self.cur_frame += 1

    def construct(self):
        # shortest path from start to end of graph
        # returns distance and path
        def dijkstra(
            graph: Dict[int, List[Tuple[int, int]]],
            vgraph: WeightedDiGraph,
            start: int,
            end: int,
        ) -> Tuple[float, List[int]]:
            distances = {node: float("inf") for node in graph}
            distances[start] = 0
            pq = [(0, start)]
            prev_node = {}
            reached = False

            new_pos = vgraph.get_center()
            self.camera.frame.shift(new_pos)
            scalar = 1.2
            self.camera.frame.set(
                width=vgraph.width * scalar, height=vgraph.height * scalar
            )
            self.capture()
            while len(pq) > 0:
                cur_dist, cur_node = heapq.heappop(pq)
                # step 1: show node being processed
                vgraph.show_dist_label(cur_node, cur_dist)
                vgraph.highlight_node(cur_node, color=FOCUS_COLOR, opacity=1.0)

                if cur_dist > distances[cur_node]:
                    continue
                if cur_node == end:
                    reached = True
                    vgraph.highlight_node(cur_node)
                    self.capture()
                    break

                self.capture()
                # step 2: show relaxation of edges
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
                    else:
                        vgraph.highlight_edge(cur_node, neighbor)
                        vgraph.compare_dist_label(
                            neighbor, distance, prev_neighbor_dist
                        )

                    _highlight_edge_args_lst.append((cur_node, neighbor, GREEN))
                    _dist_label_args_lst.append((neighbor, distance, BEST_SO_FAR_COLOR))
                self.capture()
                # Cleanup
                vgraph.highlight_node(cur_node)
                for args in _dist_label_args_lst:
                    vgraph.show_dist_label(*args)
                for args in _highlight_edge_args_lst:
                    vgraph.highlight_edge(*args)

            if reached:
                path = []
                node = end
                while node != start:
                    path.append(node)
                    prev = node  # used for tracking
                    node = prev_node[node]
                    vgraph.highlight_node(prev, color=FOCUS_COLOR, opacity=1.0)
                    vgraph.highlight_edge(node, prev, color=FOCUS_COLOR, opacity=1.0)
                    self.capture()
                    vgraph.highlight_node(prev, color=FOCUS_COLOR)
                    vgraph.highlight_edge(node, prev, color=FOCUS_COLOR)
                path.append(start)
                path.reverse()
                vgraph.highlight_node(node, color=FOCUS_COLOR)
                self.capture()
                return distances[end], path
            return float("inf"), []

        file_suffix = 1
        graph, start, end = GRAPH1, START1, END1
        # file_suffix = 2
        # graph, start, end = GRAPH2, START2, END2
        self.set_file_suffix(file_suffix)
        vertices, edges = ShortestPath.convert_graph_to_digraph_format(graph)
        vgraph = WeightedDiGraph(vertices, edges, start=start, end=end)
        self.add(vgraph)

        dist, path = dijkstra(graph, vgraph, start, end)
        print(dist, path)
