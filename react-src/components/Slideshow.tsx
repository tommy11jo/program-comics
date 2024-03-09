import { useState, useEffect } from "react"

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

  // workaround: next/image does lazy loading or pre-loading, but we need a load after FCP
  const preloadImages = () => {
    for (let i = 0; i < size; i++) {
      const img = new Image()
      img.src = `${folder}/${fprefix}${i}.png`
    }
  }

  useEffect(() => {
    preloadImages()
  }, [])

  const updateCurrentSlide = (newIndex: number) => setCurrent(newIndex)

  const firstSlide = () => updateCurrentSlide(0)
  const nextSlide = () => updateCurrentSlide((current + 1) % size)
  const prevSlide = () => updateCurrentSlide((current - 1 + size) % size)
  const lastSlide = () => updateCurrentSlide(size - 1)

  return (
    <div className="flex flex-col justify-center p-2 outline outline-slate-200 rounded">
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
            {
              <img
                src={`${folder}/${fprefix}${index}.png`}
                alt={`Slide ${index}`}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slideshow
