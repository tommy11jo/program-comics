from manim import *


class Test(Scene):
    def construct(self):
        # s = Square()
        # self.add(s)

        # c = Circle()
        # self.add(c)
        # c.shift(RIGHT * 3)

        # a = Arrow(s, c)
        # t = Text("hi")
        # self.add(a)

        # arc = Arc()
        # self.add(arc)
        # t = Tex("hi there")
        # self.add(t)

        # Align test
        # s = Square().shift(RIGHT)
        # s1 = Square(side_length=0.5)
        # s1.next_to(s, UP)
        # This align_to does nothing
        # s1.align_to(s, ORIGIN)
        # self.add(s, s1)

        # number line test
        n = NumberPlane(x_range=(-2, 2, 1), y_range=(-3, 3, 1))
        self.add(n)


scene = Test()
scene.construct()
scene.render(preview=True)
