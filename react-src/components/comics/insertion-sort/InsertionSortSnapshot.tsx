"use client"
import Slideshow from "@/components/Slideshow"
import { GREEN_B, RED } from "@/lib/colorConstants"
const InsertionSortCode = () => {
  const CUR_RED = RED
  const CUR_GREEN = GREEN_B
  const purpose = (
    <div>
      <b>Purpose: </b>
      <span>Sort a list of comparable elements.</span>
    </div>
  )
  const elText = (
    <span
      style={{
        color: CUR_RED,
      }}
    >
      element
    </span>
  )
  const arrayText = (
    <span
      style={{
        color: CUR_GREEN,
      }}
    >
      sorted subarray
    </span>
  )
  const algSteps = (
    <div>
      <b>Algorithm Steps: </b>
      <ul>
        <li>
          For each {elText}, moving from left to right:
          <ul>
            <li>
              Move the {elText} into the {arrayText}. One way to do this is by
              swapping side-by-side elements repeatedly.
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
  const runtime = (
    <div>
      <b>Runtime: </b>
      <span>
        <code>O(N^2)</code>, where <code>N</code> is the number of list
        elements. Insertion sort is much less efficient on large lists than more
        advanced algorithms such as quicksort, heapsort, or merge sort, which
        run in <code>O(N*log(N))</code>.
      </span>
    </div>
  )
  const summary = (
    <div>
      {purpose}
      {runtime}
      {algSteps}
    </div>
  )
  return (
    <div>
      {summary}

      <Slideshow folder="/graphics/insertion-sort/slideshow1" size={21} />
    </div>
  )
}
export default InsertionSortCode
