import { Column, Panel, Row, Text } from "@/components"
import Link from "next/link"
const OtherPerspectives = () => {
  const row1 = (
    <Row
      label={
        <span>
          <b>Idea 1: </b>
          <Link
            href="https://pythontutor.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Python tutor
          </Link>{" "}
          but for predefined visual algorithms
        </span>
      }
      comps={[
        <Panel
          panel={
            <img
              className="opacity-60 rounded"
              src={`/graphics/about/python-tutor.png`}
            />
          }
        />,

        <Panel
          panel={<img src={`/graphics/dijkstra/slideshow1/step7.png`} />}
        />,
      ]}
    />
  )
  const euclid =
    "If a first magnitude has to a second the same ratio as a third has to a fourth, and also a fifth has to the second the same ratio as a sixth to the fourth, then the sum of the first and fifth has to the second the same ratio as the sum of the third and sixth has to the fourth. You made it to the end, I didn't."
  const row2 = (
    <Row
      label={
        <Text
          value={
            <span>
              <b>Idea 2: </b>An alternative to wikipedia when I want intuition
              instead of verbal detail for programming concepts??? (I do like
              wikipedia, just usually not for conceptual learning)
            </span>
          }
        />
      }
      comps={[
        <Panel useOutline={true} panel={<em>{euclid}</em>} />,
        <Panel
          labelBelow={
            <span className="flex justify-center">
              <span>
                Image Credit:{" "}
                <Link
                  href="https://www.youtube.com/watch?v=qWFScmtiC44"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Video
                </Link>{" "}
                by Jonathan Blow{" "}
              </span>
            </span>
          }
          panel={<img className="rounded" src={`/graphics/about/euclid.png`} />}
        />,
      ]}
    />
  )

  const row3 = (
    <Panel
      panel={
        <span className="p-4">
          <b>Idea 3:</b> An immediate use, high-quality slideshow presentations
          of algorithms to share with teachers/students
        </span>
      }
    />
  )
  //   return <Column comps={[row1, row2, row3]} />
  return (
    <div className="flex flex-col gap-2">
      {row1}
      {row2}
      {row3}
    </div>
  )
}
export default OtherPerspectives
