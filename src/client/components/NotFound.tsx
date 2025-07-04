import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import astro from "~/svg/astro.svg";
import { cn } from "../lib/utils";
import { useRef, useState, useEffect } from "react";

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
}

export function NotFound({ children }: { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { x, y } = useMousePosition();

  // Grid-of-dots warp effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initDots();
    };
    window.addEventListener("resize", handleResize);

    type TDot = { x0: number; y0: number };
    const dots: TDot[] = [];
    const spacing = 40; // px between dots

    const initDots = () => {
      dots.length = 0;
      for (let ix = 0; ix < width; ix += spacing) {
        for (let iy = 0; iy < height; iy += spacing) {
          dots.push({ x0: ix, y0: iy });
        }
      }
    };

    initDots();

    const mouse = { x, y };
    const radius = 150; // influence radius in px
    const strength = 30; // max displacement in px

    const updateMouse = () => {
      mouse.x = x;
      mouse.y = y;
    };

    // Track latest mouse position each animation frame
    let animationId: number;
    const render = () => {
      updateMouse();

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#aaa";

      for (const d of dots) {
        const dx = d.x0 - mouse.x;
        const dy = d.y0 - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let nx = d.x0;
        let ny = d.y0;

        if (dist < radius && dist > 0) {
          const pull = (radius - dist) / radius; // 0..1
          const displacement = pull * strength;
          nx = d.x0 + (dx / dist) * displacement;
          ny = d.y0 + (dy / dist) * displacement;
        }

        ctx.fillRect(nx, ny, 3, 3);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [x, y]);

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="relative flex h-screen flex-col items-center space-y-6 p-2 pt-40"
    >
      {/* Distortable dot grid canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 flex h-full w-full"
      />
      <div
        className={cn(
          "relative flex flex-col-reverse gap-10 md:flex md:flex-row md:items-center",
          "after:absolute after:-top-24 after:-right-20 after:-z-10 after:h-[75px] after:w-[75px] after:rounded-full after:bg-gray-200",
          "after:",
        )}
        style={{}}
      >
        <div className="flex flex-col items-center gap-10">
          <div className="font-mono text-9xl font-semibold">404</div>
          <Buttons />
        </div>
        <img src={astro} className="h-80 w-80" />
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={() => window.history.back()}
        variant={"secondary"}
        className="font-semibold"
      >
        Go back
      </Button>
      <Link to="/">
        <Button variant={"default"} className="font-semibold">
          Go Home
        </Button>
      </Link>
    </div>
  );
}
