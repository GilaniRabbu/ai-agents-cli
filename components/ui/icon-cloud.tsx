"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";

interface Icon {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  id: number;
}

interface IconCloudProps {
  icons?: React.ReactNode[];
  images?: string[];
  color?: string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function IconCloud({
  icons,
  images,
  color = "#4444FF",
}: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [iconPositions, setIconPositions] = useState<Icon[]>([]);
  const [rotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState<{
    x: number;
    y: number;
    startX: number;
    startY: number;
    distance: number;
    startTime: number;
    duration: number;
  } | null>(null);
  const animationFrameRef = useRef<number>(undefined);
  const rotationRef = useRef(rotation);
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([]);
  const imagesLoadedRef = useRef<boolean[]>([]);

  // Create icon canvases once when icons/images change
  useEffect(() => {
    if (!icons && !images) return;

    const items = icons || images || [];
    imagesLoadedRef.current = new Array(items.length).fill(false);

    const newIconCanvases = items.map((item, index) => {
      const offscreen = document.createElement("canvas");
      offscreen.width = 32; // Adjust Icon size to 32
      offscreen.height = 32; // Adjust Icon size to 32
      const offCtx = offscreen.getContext("2d");

      if (offCtx) {
        if (images) {
          // Handle image URLs directly
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = items[index] as string;
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height);

            // Create circular clipping path
            offCtx.beginPath();
            // Adjust this value to control border radius size
            const borderRadius = 2; // Adjust this value to control border radius size (smaller = less rounded)
            const width = 60; // Match your icon width
            const height = 60; // Match your icon height
            offCtx.moveTo(borderRadius, 0);
            offCtx.lineTo(width - borderRadius, 0);
            offCtx.quadraticCurveTo(width, 0, width, borderRadius);
            offCtx.lineTo(width, height - borderRadius);
            offCtx.quadraticCurveTo(
              width,
              height,
              width - borderRadius,
              height
            );
            offCtx.lineTo(borderRadius, height);
            offCtx.quadraticCurveTo(0, height, 0, height - borderRadius);
            offCtx.lineTo(0, borderRadius);
            offCtx.quadraticCurveTo(0, 0, borderRadius, 0);
            // Adjust this value to control border radius size

            offCtx.arc(16, 16, 16, 0, Math.PI * 2); // Adjust Icon size to 16
            offCtx.closePath();
            offCtx.clip();

            // Draw the image
            offCtx.drawImage(img, 0, 0, 32, 32); // Adjust Icon size to 32

            // Add this code to apply the color
            if (color) {
              offCtx.globalCompositeOperation = "source-atop";
              offCtx.fillStyle = color;
              offCtx.fillRect(0, 0, 32, 32);

              // Restore original alpha (keeps transparency but changes color)
              offCtx.globalCompositeOperation = "destination-in";
              offCtx.drawImage(img, 0, 0, 32, 32);
            }

            imagesLoadedRef.current[index] = true;
          };
        } else {
          // Handle SVG icons
          offCtx.scale(0.4, 0.4);
          const svgString = renderToString(item as React.ReactElement);
          const img = new Image();
          img.src = "data:image/svg+xml;base64," + btoa(svgString);
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
            offCtx.drawImage(img, 0, 0);
            imagesLoadedRef.current[index] = true;
          };
        }
      }
      return offscreen;
    });

    iconCanvasesRef.current = newIconCanvases;
  }, [icons, images]);

  // Generate initial icon positions on a sphere
  useEffect(() => {
    const items = icons || images || [];
    const newIcons: Icon[] = [];
    const numIcons = items.length || 20;

    // Fibonacci sphere parameters
    const offset = 2 / numIcons;
    const increment = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;

      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;

      // In the useEffect that generates initial icon positions
      newIcons.push({
        x: x * 150, // Increased from 100
        y: y * 150, // Increased from 100
        z: z * 150, // Increased from 100
        scale: 1,
        opacity: 1,
        id: i,
      });
    }
    setIconPositions(newIcons);
  }, [icons, images, color]);

  // Handle mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !canvasRef.current) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    iconPositions.forEach((icon) => {
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;

      const screenX = canvasRef.current!.width / 2 + rotatedX;
      const screenY = canvasRef.current!.height / 2 + rotatedY;

      const scale = (rotatedZ + 200) / 300;
      const radius = 20 * scale;
      const dx = x - screenX;
      const dy = y - screenY;

      if (dx * dx + dy * dy < radius * radius) {
        const targetX = -Math.atan2(
          icon.y,
          Math.sqrt(icon.x * icon.x + icon.z * icon.z)
        );
        const targetY = Math.atan2(icon.x, icon.z);

        const currentX = rotationRef.current.x;
        const currentY = rotationRef.current.y;
        const distance = Math.sqrt(
          Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
        );

        const duration = Math.min(2000, Math.max(800, distance * 1000));

        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance,
          startTime: performance.now(),
          duration,
        });
        return;
      }
    });

    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    }

    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.004, // Doubled from 0.002
        y: rotationRef.current.y + deltaX * 0.004, // Doubled from 0.002
      };

      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Animation and rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const dx = mousePos.x - centerX;
      const dy = mousePos.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 0.006 + (distance / maxDistance) * 0.02; // Doubled from 0.003 and 0.01

      if (targetRotation) {
        const elapsed = performance.now() - targetRotation.startTime;
        const progress = Math.min(1, elapsed / targetRotation.duration);
        const easedProgress = easeOutCubic(progress);

        rotationRef.current = {
          x:
            targetRotation.startX +
            (targetRotation.x - targetRotation.startX) * easedProgress,
          y:
            targetRotation.startY +
            (targetRotation.y - targetRotation.startY) * easedProgress,
        };

        if (progress >= 1) {
          setTargetRotation(null);
        }
      } else if (!isDragging) {
        rotationRef.current = {
          x: rotationRef.current.x + (dy / canvas.height) * speed,
          y: rotationRef.current.y + (dx / canvas.width) * speed,
        };
      }

      iconPositions.forEach((icon, index) => {
        const cosX = Math.cos(rotationRef.current.x);
        const sinX = Math.sin(rotationRef.current.x);
        const cosY = Math.cos(rotationRef.current.y);
        const sinY = Math.sin(rotationRef.current.y);

        const rotatedX = icon.x * cosY - icon.z * sinY;
        const rotatedZ = icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX + rotatedZ * sinX;

        const scale = (rotatedZ + 200) / 300;
        const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 150) / 200));

        ctx.save();
        ctx.translate(
          canvas.width / 2 + rotatedX,
          canvas.height / 2 + rotatedY
        );
        ctx.scale(scale, scale);
        ctx.globalAlpha = opacity;

        if (icons || images) {
          // Only try to render icons/images if they exist
          if (
            iconCanvasesRef.current[index] &&
            imagesLoadedRef.current[index]
          ) {
            ctx.drawImage(iconCanvasesRef.current[index], -16, -16, 32, 32); // Adjust Icon size to 16 & 32
          }
        } else {
          // Show numbered circles if no icons/images are provided
          ctx.beginPath();
          // Adjust this value to control border radius size
          const fallbackBorderRadius = 2; // Same border radius as above
          ctx.moveTo(-30 + fallbackBorderRadius, -30);
          ctx.lineTo(30 - fallbackBorderRadius, -30);
          ctx.quadraticCurveTo(30, -30, 30, -30 + fallbackBorderRadius);
          ctx.lineTo(30, 30 - fallbackBorderRadius);
          ctx.quadraticCurveTo(30, 30, 30 - fallbackBorderRadius, 30);
          ctx.lineTo(-30 + fallbackBorderRadius, 30);
          ctx.quadraticCurveTo(-30, 30, -30, 30 - fallbackBorderRadius);
          ctx.lineTo(-30, -30 + fallbackBorderRadius);
          ctx.quadraticCurveTo(-30, -30, -30 + fallbackBorderRadius, -30);
          ctx.closePath();
          // Adjust this value to control border radius size

          ctx.arc(0, 0, 16, 0, Math.PI * 2); // Adjust Icon size to 16
          ctx.fillStyle = color;
          ctx.fill();
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "16px Arial";
          ctx.fillText(`${icon.id + 1}`, 0, 0);
        }

        ctx.restore();
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    icons,
    images,
    iconPositions,
    isDragging,
    mousePos,
    targetRotation,
    color,
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="my-10"
      aria-label="Interactive 3D Icon Cloud"
      role="img"
    />
  );
}

// Line: 60, 61, 95, 100, 319, 338 - Icon Size
// Line: 239, 240, 266 - Speed Control
// Line: 19 29 103-111 163 339 367 - Icon Color
