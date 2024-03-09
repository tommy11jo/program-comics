import React, { useState } from "react"
import Image from "next/image"

interface SlideshowProps {
  folder: string
  size: number
  fprefix?: string
}

const Slideshow: React.FC<SlideshowProps> = ({
  folder,
  size,
  fprefix = "step",
}) => {
  const [current, setCurrent] = useState(0)

  const firstSlide = () => setCurrent(0)
  const nextSlide = () => setCurrent((current + 1) % size)
  const prevSlide = () => setCurrent((current - 1 + size) % size)
  const lastSlide = () => setCurrent(size - 1)

  return (
    <div className="flex flex-col justify-center p-2 outline outline-slate-200 rounded">
      {/* must insert all images into DOM, so Next includes them at build time */}
      <div className="flex flex-row gap-2 justify-center">
        <button onClick={firstSlide}>&lt;&lt; First</button>
        <button onClick={prevSlide}>&lt; Prev</button>
        <button onClick={nextSlide}>Next &gt;</button>
        <button onClick={lastSlide}>Last &gt;&gt;</button>
      </div>
      <div className="flex flex-col items-center justify-center">
        {Array.from({ length: size }, (_, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              width: "600px",
              height: "400px",
              display: current === index ? "block" : "none",
            }}
          >
            <Image
              src={`${folder}/${fprefix}${index}.png`}
              alt={`Slide ${index}`}
              sizes="500px"
              fill
              style={{
                objectFit: "contain",
              }}
              // workaround: load before FCP
              // what i really want is time based image loading, after FCP
              priority
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slideshow
