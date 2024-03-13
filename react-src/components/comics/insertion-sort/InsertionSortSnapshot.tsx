"use client"
import { Text } from "@/components"
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
  const elText = <Text value="element" color={CUR_RED} inline={true} />
  const arrayText = (
    <Text value="sorted subarray" color={CUR_GREEN} inline={true} />
  )
  const algSteps = (
    <div>
      <b>Algorithm Steps: </b>
      <ul>
        <li>For each {elText}, moving from left to right:</li>

        <li>
          Move the {elText} into the {arrayText} by swapping.
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
      <Text value={summary} />

      <Slideshow folder="/graphics/insertion-sort/slideshow1" size={16} />
    </div>
  )
}
export default InsertionSortCode
