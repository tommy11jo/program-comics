import { useState, useEffect, useRef, useCallback } from "react"

const UNFOCUS_COL = "#333"
const FOCUS_COL = "#888"

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
  const currentRef = useRef(current)
  const [isFocused, setIsFocused] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)

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

  const updateCurrentSlide = (newIndex: number) => {
    currentRef.current = newIndex
    setCurrent(newIndex)
  }

  const firstSlide = () => updateCurrentSlide(0)
  const nextSlide = () => updateCurrentSlide((currentRef.current + 1) % size)
  const prevSlide = () =>
    updateCurrentSlide((currentRef.current - 1 + size) % size)
  const lastSlide = () => updateCurrentSlide(size - 1)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowRight" && currentRef.current !== size - 1) {
      nextSlide()
    } else if (e.key === "ArrowLeft" && currentRef.current !== 0) {
      prevSlide()
    }
  }, [])
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (divRef.current && divRef.current.contains(e.target as Node)) {
        if (!isFocused) {
          divRef.current.style.outline = `2px solid ${FOCUS_COL}`
          document.addEventListener("keydown", handleKeyDown)
          setIsFocused(true)
        }
      } else {
        if (isFocused) {
          if (divRef.current) {
            divRef.current.style.outline = `1px solid ${UNFOCUS_COL}`
          }
          document.removeEventListener("keydown", handleKeyDown)
          setIsFocused(false)
        }
      }
    },
    [isFocused, handleKeyDown]
  )
  useEffect(() => {
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [handleClick])

  return (
    <div
      ref={divRef}
      className="flex flex-col justify-center p-2 my-4 outline rounded"
      style={{
        outline: `1px solid ${UNFOCUS_COL}`,
      }}
    >
      <div className="flex flex-row justify-center">
        <span>
          Slide {current} of {size - 1}
        </span>
      </div>
      <div className="flex flex-row gap-2 justify-center">
        <button onClick={firstSlide}>&lt;&lt; First</button>
        <button onClick={prevSlide} disabled={current === 0}>
          &lt; Prev
        </button>
        <button onClick={nextSlide} disabled={current === size - 1}>
          Next &gt;
        </button>
        <button onClick={lastSlide}>Last &gt;&gt;</button>
      </div>

      <div className="flex flex-col items-center justify-center">
        {Array.from({ length: size }, (_, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              //   width: "800px",
              //   height: "450px",
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
      <div className="flex flex-row justify-end">
        <div className="flex flex-row justify-end">
          <span
            style={{
              visibility: isFocused ? "visible" : "hidden",
              color: "gray",
            }}
          >
            Use Arrow keys
          </span>
        </div>
      </div>
    </div>
  )
}

export default Slideshow
