import { Panel, Row } from "@/components"
import Link from "next/link"
const RelatedIdeas = () => {
  const row1 = (
    <Row
      equalSpace={false}
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
              style={{
                height: "15rem",
                objectFit: "cover",
              }}
            />
          }
        />,

        <Panel
          panel={
            <img
              src={`/graphics/dijkstra/slideshow1/step7.png`}
              style={{
                height: "15rem",
                objectFit: "cover",
              }}
            />
          }
        />,
      ]}
    />
  )

  const row2 = (
    <span>
      <b>Idea 2:</b> An immediate use, high-quality slideshow presentations of
      algorithms to share with teachers/students
    </span>
  )
  const euclid =
    "If a first magnitude has to a second the same ratio as a third has to a fourth, and also a fifth has to the second the same ratio as a sixth to the fourth, then the sum of the first and fifth has to the second the same ratio as the sum of the third and sixth has to the fourth. You made it to the end, I didn't."
  const row3 = (
    <Row
      equalSpace={false}
      label={
        <span>
          <b>Idea 3: </b>An alternative to wikipedia when I want intuition
          instead of verbal detail for programming concepts??? (I do like
          wikipedia, just usually not for conceptual learning). This feeling:
        </span>
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
  return (
    <div className="flex flex-col gap-2">
      {row1}
      {row2}
      {row3}
    </div>
  )
}
export default RelatedIdeas
