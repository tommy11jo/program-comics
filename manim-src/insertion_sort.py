from manim import *

FONT_SIZE = 26
SMALL_FONT_SIZE = 26
config.frame_size = (1600, 500)

# Below is the original comment/paragraph that gave rise to this project. Happened while doing InsertionSort in Manim for practice.
# Create pictures for insertion sort.

# I like the idea of providing a high-level picture of the algorithm but also showing the tedious code steps.
# One is a conceptual picture and the other is a programmatic, behavioral picture. Think about Josh Hug's conceptual picture of expanding circle from the start to the end as A* executes vs the slideshow of A* with all the state vars showing.
# They both deserve pictures.
# https://docs.google.com/presentation/d/177bRUTdCa60fjExdr9eO04NHm0MRfPtCzvEup1iMccM/edit#slide=id.g369665031c_0_292
# https://joshhug.gitbooks.io/hug61b/content/chap19/chap191.html


# In insertion sort, it's a bit easier.
# The conceptual picture just shows insertion into sorted subarray
# The behavioral picture shows swapping.

# A picture can be made dynamic by allowing input from the user to change it.
# A picture can be part of a slideshow of many pictures.
# A slideshow depicts a programs execution in snapshots, which can be navigated through via user interaction.
# A picture can be dynamic and a slideshow.

# (Ok so Manim runs python, only on a server, so no dynamic pictures... yet.)


class InsertionSort(Scene):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.cur_frame = 0
        self.explanation = VGroup()
        self.labels = VGroup()
        self.vlist = VGroup()

    def create_arrow(self, color=GREEN, direction=RIGHT):
        start_point = [0, 0, 0]
        if direction is RIGHT:
            end_point = [0.4, 0, 0]
        elif direction is LEFT:
            end_point = [-0.4, 0, 0]
        elif direction is UP:
            end_point = [0, 0.4, 0]
        elif direction is DOWN:
            end_point = [0, -0.4, 0]
        else:
            raise Exception("invalid direction")
        return Arrow(
            start=start_point,
            end=end_point,
            buff=0,
            max_stroke_width_to_length_ratio=20,
            max_tip_length_to_length_ratio=0.5,
            color=color,
        )

    def show_new_list(self, lst):
        self.remove(self.vlist)
        self.remove(self.explanation)
        squares = [Square(side_length=1) for _ in lst]
        texts = [
            Text(str(el), font_size=20).move_to(squares[i].get_center())
            for i, el in enumerate(lst)
        ]
        labeled_squares = [VGroup(square, text) for square, text in zip(squares, texts)]

        squares_group = VGroup(*labeled_squares).arrange(buff=0)
        squares_group.shift(DOWN * 0.3)

        self.vlist = squares_group
        self.add(squares_group)

        return squares_group

    def show_subarray(self, squares_group, subarray_len):
        for i in range(subarray_len):
            squares_group[i][0].set_fill(color=GREEN_B, opacity=0.5).set_z_index(i + 2)

    def show_insertion_plan(self, vlist, ind) -> VGroup:
        text = f'Move <span foreground="{RED}">element</span> into sorted subarray'
        line1 = MarkupText(text=text, font_size=SMALL_FONT_SIZE)

        line1.next_to(vlist[ind], UP)
        vlist[ind].set_z_index(ind + 2)
        vlist[ind][0].set_fill(color=RED, opacity=0.5)

        if ind > 0:
            subarray_group = VGroup(*vlist[:ind])
            brace = Brace(subarray_group, DOWN, buff=0.1)
            text = Text("Sorted subarray", font_size=SMALL_FONT_SIZE)
            text.next_to(brace, DOWN)
            brace_group = VGroup(brace, text)
        else:
            brace_group = VGroup()

        group = VGroup(vlist, brace_group, line1)
        self.add(group)
        return group

    def show_insertion_result(self, vlist, from_ind, to_ind) -> VGroup:
        arrow = self.create_arrow(color=RED, direction=DOWN)
        arrow.next_to(vlist[to_ind], UP, buff=0.05)

        self.show_subarray(vlist, from_ind + 1)
        vlist[to_ind].set_z_index(from_ind + 2)
        vlist[to_ind][0].set_fill(color=RED, opacity=0.5)

        subarray_group = VGroup(*vlist[: from_ind + 1])
        brace = Brace(subarray_group, DOWN, buff=0.1)
        text = Text(
            "Sorted subarray now includes moved element", font_size=SMALL_FONT_SIZE
        )
        text.next_to(brace, DOWN)

        group = VGroup(vlist, arrow, brace, text)
        self.add(group)
        return group

    def show_list_swap(self, vlst, first, second, val1, val2):
        self.remove(self.labels)
        vlst[second].set_z_index(4)
        vlst[second][0].set_fill(color=RED, opacity=0.5)

        left_list_group = VGroup(vlst[:first])
        compare_list_group = VGroup(vlst[first], vlst[second])
        right_list_group = VGroup(vlst[second + 1 :])

        left_list_group.shift(LEFT * 0.2)
        compare_list_group.shift(UP)
        right_list_group.shift(RIGHT * 0.2)

        el_literal = f'<span foreground="{RED}">element</span>'

        if val1 <= val2:
            text = f"Is {val1} ≤ {val2}? Yes, so the {el_literal} is correctly placed."
        else:
            text = f"Is {val1} ≤ {val2}? No, so swap them."

        label = MarkupText(text, font_size=SMALL_FONT_SIZE)

        label.next_to(compare_list_group, UP)
        self.labels = VGroup(label)
        self.add(self.labels)

    def capture(self):
        self.renderer.camera.capture_mobjects(self.mobjects)
        pixel_array = self.renderer.camera.pixel_array
        img = self.renderer.camera.get_image(pixel_array).copy()
        img.save(f"./pictures/insertion-sort1/step{self.cur_frame}.png")
        self.renderer.camera.reset()
        self.cur_frame += 1

    def construct(self):
        lst = [2, 1, 6, -3, 2, 4]

        def insertion_sort(lst):
            vlist = self.show_new_list(lst)
            self.show_subarray(vlist, subarray_len=1)
            self.capture()
            self.clear()
            for i in range(1, len(lst)):
                cur = lst[i]
                j = i - 1
                vlist = self.show_new_list(lst)
                self.show_subarray(vlist, subarray_len=i)
                self.show_insertion_plan(vlist, i)
                self.capture()
                self.clear()
                while True:
                    if j < 0:
                        break
                    vlist = self.show_new_list(lst)
                    self.show_subarray(vlist, subarray_len=i)
                    self.show_list_swap(vlist, j, j + 1, lst[j], lst[j + 1])
                    self.capture()
                    self.clear()
                    if lst[j] <= cur:
                        break

                    lst[j], lst[j + 1] = lst[j + 1], lst[j]
                    j -= 1

                vlist = self.show_new_list(lst)
                self.show_insertion_result(vlist, i, j + 1)
                self.capture()
                self.clear()

            vlist = self.show_new_list(lst)
            self.show_subarray(vlist, subarray_len=len(lst))
            self.capture()

        insertion_sort(lst)
