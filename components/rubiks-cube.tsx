"use client"

import { useEffect, useRef, useState } from "react"

interface RubiksCubeProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  variant?: "default" | "floating" | "decorative" | "hero"
}

export function RubiksCube({ size = "md", className = "", variant = "default" }: RubiksCubeProps) {
  const cubeRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [autoRotation, setAutoRotation] = useState({ x: -15, y: 25 })
  const animationRef = useRef<number>()

  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-40 h-40",
    lg: "w-60 h-60",
    xl: "w-80 h-80",
  }

  const cubeDepth = {
    sm: 80,
    md: 160,
    lg: 240,
    xl: 320,
  }

  useEffect(() => {
    const cube = cubeRef.current
    const container = containerRef.current
    if (!cube || !container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      setMousePosition({ x: mouseX, y: mouseY })

      if (isHovered) {
        const rotateY = (mouseX / rect.width) * 60 + 25
        const rotateX = -(mouseY / rect.height) * 60 - 15

        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        setAutoRotation({ x: rotateX, y: rotateY })
      }
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
    }

    if (variant !== "decorative") {
      document.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (variant !== "decorative") {
        document.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered, variant])

  useEffect(() => {
    if (isHovered && variant !== "decorative") return

    const animate = () => {
      const cube = cubeRef.current
      if (!cube) return

      setAutoRotation((prev) => ({
        x: prev.x + (variant === "decorative" ? 0.3 : 0.5),
        y: prev.y + (variant === "decorative" ? 0.8 : 1.2),
      }))

      cube.style.transform = `rotateX(${autoRotation.x}deg) rotateY(${autoRotation.y}deg)`

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered, autoRotation.x, autoRotation.y, variant])

  // Create 3x3 grid for each face
  const createCubeFace = (faceClass: string, colors: string[], transform: string) => (
    <div
      className={`absolute ${faceClass}`}
      style={{
        transform,
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="grid grid-cols-3 grid-rows-3 w-full h-full gap-[2px] p-2 bg-black/20 rounded-lg border border-white/10">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`${color} rounded-sm border border-black/30 shadow-inner`}
            style={{
              boxShadow:
                "inset 3px 3px 6px rgba(255,255,255,0.4), inset -3px -3px 6px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)",
            }}
          />
        ))}
      </div>
    </div>
  )

  // PTC themed color schemes for each face
  const frontColors = Array(9).fill("bg-gradient-to-br from-[#1520A6] to-[#0A1340]")
  const backColors = Array(9).fill("bg-gradient-to-br from-[#D4AF37] to-[#B8941F]")
  const rightColors = Array(9).fill("bg-gradient-to-br from-[#FFFFFF] to-[#E5E5E5]")
  const leftColors = Array(9).fill("bg-gradient-to-br from-[#FF6B35] to-[#E55A2B]")
  const topColors = Array(9).fill("bg-gradient-to-br from-[#32CD32] to-[#228B22]")
  const bottomColors = Array(9).fill("bg-gradient-to-br from-[#FF1493] to-[#DC143C]")

  const depth = cubeDepth[size]

  return (
    <div
      ref={containerRef}
      className={`relative ${sizeClasses[size]} mx-auto ${className}`}
      style={{ perspective: "1200px" }}
    >
      <div
        ref={cubeRef}
        className="w-full h-full relative transition-transform duration-300 ease-out cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          filter: isHovered ? "brightness(1.2) contrast(1.1)" : "brightness(1)",
        }}
      >
        {/* Front face */}
        {createCubeFace("rubiks-face-front", frontColors, `translateZ(${depth / 2}px)`)}

        {/* Back face */}
        {createCubeFace("rubiks-face-back", backColors, `rotateY(180deg) translateZ(${depth / 2}px)`)}

        {/* Right face */}
        {createCubeFace("rubiks-face-right", rightColors, `rotateY(90deg) translateZ(${depth / 2}px)`)}

        {/* Left face */}
        {createCubeFace("rubiks-face-left", leftColors, `rotateY(-90deg) translateZ(${depth / 2}px)`)}

        {/* Top face */}
        {createCubeFace("rubiks-face-top", topColors, `rotateX(90deg) translateZ(${depth / 2}px)`)}

        {/* Bottom face */}
        {createCubeFace("rubiks-face-bottom", bottomColors, `rotateX(-90deg) translateZ(${depth / 2}px)`)}
      </div>

      {/* Enhanced glow effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1520A6] via-[#0A1340] to-[#D4AF37] rounded-lg blur-xl opacity-30 animate-pulse pointer-events-none"></div>
      <div className="absolute inset-0 bg-[#D4AF37] rounded-lg blur-2xl opacity-15 animate-pulse delay-500 pointer-events-none"></div>

      {/* Particle effects for enhanced cubes */}
      {(variant === "hero" || isHovered) && (
        <>
          <div className="absolute -top-2 -left-2 w-1 h-1 bg-[#D4AF37] rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-3 w-1 h-1 bg-[#1520A6] rounded-full animate-ping delay-300"></div>
          <div className="absolute -bottom-2 -left-1 w-1 h-1 bg-[#D4AF37] rounded-full animate-ping delay-700"></div>
          <div className="absolute -bottom-1 -right-2 w-1 h-1 bg-[#1520A6] rounded-full animate-ping delay-1000"></div>
        </>
      )}
    </div>
  )
}
