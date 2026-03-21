"use client"

import { useEffect, useRef, useState } from "react"
import { useScroll, useTransform, useMotionValue } from "framer-motion"

export default function MetroTrainScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Total frames available (240 as per available assets)
  const frameCount = 240
  
  // Map scroll progress to frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount])

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = []
    let loadedCount = 0

    const preloadImages = () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image()
        img.src = `/images/train/${i}.jpg`
        img.onload = () => {

          loadedCount++
          if (loadedCount === frameCount) {
            setImagesLoaded(true)
          }
        }
        loadedImages.push(img)
      }
      setImages(loadedImages)
    }

    preloadImages()
  }, [])

  // Draw frame on canvas
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (canvas && context && images[index - 1]) {
      const img = images[index - 1]
      
      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height)
      
      // Calculate aspect ratio for "contain" fit
      const imgRatio = img.width / img.height
      const canvasRatio = canvas.width / canvas.height
      
      let drawWidth, drawHeight, offsetX, offsetY
      
      if (imgRatio > canvasRatio) {
        drawWidth = canvas.width
        drawHeight = canvas.width / imgRatio
        offsetX = 0
        offsetY = (canvas.height - drawHeight) / 2
      } else {
        drawWidth = canvas.height * imgRatio
        drawHeight = canvas.height
        offsetX = (canvas.width - drawWidth) / 2
        offsetY = 0
      }
      
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
    }
  }

  // Handle resizing
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
        // Initial draw
        const currentIndex = Math.floor(frameIndex.get())
        if (!isNaN(currentIndex) && imagesLoaded) {
          drawFrame(currentIndex)
        }

      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()
    
    return () => window.removeEventListener("resize", handleResize)
  }, [imagesLoaded])

  // Update canvas on scroll
  useEffect(() => {
    return frameIndex.on("change", (latest) => {
      const currentIndex = Math.floor(latest)
      if (!isNaN(currentIndex) && imagesLoaded) {
        requestAnimationFrame(() => drawFrame(currentIndex))
      }
    })
  }, [imagesLoaded, images, frameIndex])


  return (
    <div ref={containerRef} className="relative h-[800vh] bg-white">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-white">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
              <span className="text-blue-500 font-bold tracking-tighter uppercase">Initializing Journey...</span>
            </div>
          </div>
        )}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-contain"
          style={{ filter: "contrast(1.1) brightness(0.9)" }}
        />
        
        {/* Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-blue-100/30 via-transparent to-white/20" />
      </div>
    </div>
  )
}
