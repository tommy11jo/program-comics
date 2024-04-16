from manim import *


class Test(Scene):
    def construct(self):
        n = NumberPlane(x_range=(-2, 2, 1), y_range=(-3, 3, 1))
        self.add(n)


scene = Test()
scene.construct()
scene.render(preview=True)
