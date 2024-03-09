import React, { useState } from "react"
import Image from "next/image"

interface SlideshowProps {
  folder: string
  size: number
}

const Slideshow: React.FC<SlideshowProps> = ({ folder, size }) => {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => setCurrent((current + 1) % size)
  const prevSlide = () => setCurrent((current - 1 + size) % size)

  return (
    <div>
      {/* must insert all images into DOM, so Next includes them at build time */}
      <div style={{ display: "block" }}>
        {Array.from({ length: size }, (_, index) => (
          <Image
            key={index}
            src={`${folder}/step${index}.png`}
            alt={`Slide ${index}`}
            width={500}
            height={300}
            unoptimized={true}
            style={{ display: current === index ? "block" : "none" }}
          />
        ))}
      </div>
      <button onClick={prevSlide}>Prev</button>
      <button onClick={nextSlide}>Next</button>
    </div>
  )
}

export default Slideshow
