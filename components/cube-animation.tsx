"use client"

import { useEffect, useRef } from "react"

export function CubeAnimation() {
  const cubeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cube = cubeRef.current
    if (!cube) return

    let rotation = 0
    const animate = () => {
      rotation += 0.5
      cube.style.transform = `rotateX(${rotation * 0.5}deg) rotateY(${rotation}deg)`
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return (
    <div className="relative w-32 h-32 mx-auto mb-8">
      <div ref={cubeRef} className="w-full h-full relative preserve-3d" style={{ transformStyle: "preserve-3d" }}>
        {/* Cube faces */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-cyan-400 opacity-80 cube-face cube-face-front"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-blue-400 opacity-80 cube-face cube-face-back"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-400 opacity-80 cube-face cube-face-right"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-cyan-400 opacity-80 cube-face cube-face-left"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-cyan-500 to-purple-400 opacity-80 cube-face cube-face-top"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-blue-500 to-pink-400 opacity-80 cube-face cube-face-bottom"></div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-cyan-400 rounded-lg blur-xl opacity-30 animate-pulse"></div>
    </div>
  )
}
