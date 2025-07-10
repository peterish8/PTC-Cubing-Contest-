"use client";

import { useEffect, useRef, useState } from "react";

interface InteractiveCubeProps {
  size?: number; // px
  mode?: "interactive" | "auto";
  className?: string;
}

export function InteractiveCube({
  size = 250,
  mode = "interactive",
  className = "",
}: InteractiveCubeProps) {
  const cubeRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const autoRotation = useRef({ x: -20, y: 30 });
  const [isFollowing, setIsFollowing] = useState(false);
  const dragBase = useRef<{
    x: number;
    y: number;
    mouseX: number;
    mouseY: number;
  } | null>(null);

  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;
    let running = true;

    if (mode === "interactive") {
      // Auto-rotate by default
      const animate = () => {
        if (!isFollowing) {
          autoRotation.current.x += 0.3;
          autoRotation.current.y += 0.7;
          cube.style.transform = `rotateX(${autoRotation.current.x}deg) rotateY(${autoRotation.current.y}deg)`;
        }
        if (running) animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);

      // Mouse events for true drag-follow
      const handleMouseDown = (e: MouseEvent) => {
        if (!cube.contains(e.target as Node)) return;
        setIsFollowing(true);
        dragBase.current = {
          x: autoRotation.current.x,
          y: autoRotation.current.y,
          mouseX: e.clientX,
          mouseY: e.clientY,
        };
      };
      const handleMouseMove = (e: MouseEvent) => {
        if (!isFollowing || !dragBase.current) return;
        const dx = e.clientX - dragBase.current.mouseX;
        const dy = e.clientY - dragBase.current.mouseY;
        // Sensitivity: 0.5deg per px
        const rotateX = dragBase.current.x - dy * 0.5;
        const rotateY = dragBase.current.y + dx * 0.5;
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        autoRotation.current = { x: rotateX, y: rotateY };
      };
      const handleMouseUp = () => {
        setIsFollowing(false);
        dragBase.current = null;
      };
      cube.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        running = false;
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        cube.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    } else {
      // auto mode
      let running = true;
      const animate = () => {
        autoRotation.current.x += 0.3;
        autoRotation.current.y += 0.7;
        cube.style.transform = `rotateX(${autoRotation.current.x}deg) rotateY(${autoRotation.current.y}deg)`;
        if (running) animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
      return () => {
        running = false;
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    }
  }, [mode, isFollowing]);

  const faceStyle = (transform: string) => ({
    position: "absolute" as const,
    width: size,
    height: size,
    transform,
    background: "linear-gradient(135deg, #101a40, #1520a6, #d4af37)",
    opacity: 0.95,
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow: "0 0 30px rgba(212,175,55,0.3)",
    filter: "brightness(1.2) saturate(1.5) blur(1px)",
    backgroundImage:
      "linear-gradient(145deg, rgba(212,175,55,0.4), rgba(21,32,166,0.5), rgba(255,255,255,0.05))",
  });

  const half = size / 2;

  return (
    <div
      className={`scene ${className}`}
      style={{
        width: size,
        height: size,
        perspective: 1000,
        userSelect: "none",
      }}
    >
      <div
        className="cube"
        ref={cubeRef}
        style={{
          width: size,
          height: size,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateX(${autoRotation.current.x}deg) rotateY(${autoRotation.current.y}deg)`,
          transition: "transform 0.3s ease-out",
          cursor: mode === "interactive" ? "grab" : undefined,
        }}
      >
        <div
          className="face front glow"
          style={faceStyle(`rotateY(0deg) translateZ(${half}px)`)}
        />
        <div
          className="face back glow"
          style={faceStyle(`rotateY(180deg) translateZ(${half}px)`)}
        />
        <div
          className="face right glow"
          style={faceStyle(`rotateY(90deg) translateZ(${half}px)`)}
        />
        <div
          className="face left glow"
          style={faceStyle(`rotateY(-90deg) translateZ(${half}px)`)}
        />
        <div
          className="face top glow"
          style={faceStyle(`rotateX(90deg) translateZ(${half}px)`)}
        />
        <div
          className="face bottom glow"
          style={faceStyle(`rotateX(-90deg) translateZ(${half}px)`)}
        />
      </div>
    </div>
  );
}
