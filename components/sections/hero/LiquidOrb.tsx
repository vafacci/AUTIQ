"use client";

/**
 * Liquid gooey orb — adapted from
 * "Liquid Gooey Orb Shader" by Tamino Martinius
 * https://codepen.io/TaminoMartinius/pen/MYJEyer
 *
 * Autonomous only — no hover, no grab.
 *
 * Variants:
 * - hero: large desktop visual
 * - compact: mid-size accent for mobile hero
 * - mark: small header brand mark (desktop+)
 */

import { useEffect, useRef, useState } from "react";
import { FRAG, VERT } from "./liquid-orb-shaders";
import { cn } from "@/lib/cn";

const ORB_PARAMS = {
  radius: 0.3,
  deform: 0.36,
  frequency: 2.0,
  morphSpeed: 1.3,
  rotSpeed: 0.12,
  specular: 1.0,
  shininess: 140,
  glowStrength: 0.55,
  colorBlue: "#DF5A08",
  colorMagenta: "#8F2D00",
  glowA: "#C4510C",
  glowB: "#DF5A08",
  liquidSpeed: 0.5,
  liquidScale: 2.2,
  liquidBright: 0.72,
  filament: 1.15,
  core: 0.18,
  background: "#070809",
  blend: 0,
} as const;

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  src: string,
): WebGLShader {
  const sh = gl.createShader(type);
  if (!sh) throw new Error("Failed to create shader");
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh) || "shader compile failed";
    gl.deleteShader(sh);
    throw new Error(log);
  }
  return sh;
}

export type LiquidOrbVariant = "hero" | "compact" | "mark";

type LiquidOrbProps = {
  className?: string;
  variant?: LiquidOrbVariant;
};

const VARIANT_CONFIG = {
  hero: {
    maxDpr: 1.5,
    maxSidePx: 900,
    powerPreference: "high-performance" as WebGLPowerPreference,
    sizeClass:
      "mx-auto w-full max-w-[min(100%,24rem)] xl:max-w-[26rem]",
  },
  compact: {
    maxDpr: 1.25,
    maxSidePx: 280,
    powerPreference: "low-power" as WebGLPowerPreference,
    sizeClass: "w-full",
  },
  mark: {
    maxDpr: 1.25,
    maxSidePx: 96,
    powerPreference: "low-power" as WebGLPowerPreference,
    sizeClass: "size-7 shrink-0 sm:size-8",
  },
};

export function LiquidOrb({ className, variant = "hero" }: LiquidOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);
  const config = VARIANT_CONFIG[variant];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: true,
      premultipliedAlpha: true,
      powerPreference: config.powerPreference,
    });

    if (!gl) {
      setFallback(true);
      return;
    }

    let disposed = false;
    let raf = 0;
    let program: WebGLProgram | null = null;
    let vao: WebGLVertexArrayObject | null = null;
    let buf: WebGLBuffer | null = null;
    let vertShader: WebGLShader | null = null;
    let fragShader: WebGLShader | null = null;

    try {
      vertShader = compileShader(gl, gl.VERTEX_SHADER, VERT);
      fragShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
      program = gl.createProgram();
      if (!program) throw new Error("Failed to create program");
      gl.attachShader(program, vertShader);
      gl.attachShader(program, fragShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || "link failed");
      }
      gl.useProgram(program);

      vao = gl.createVertexArray();
      gl.bindVertexArray(vao);
      buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW,
      );
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    } catch {
      setFallback(true);
      return;
    }

    const U = {
      time: gl.getUniformLocation(program, "u_time"),
      res: gl.getUniformLocation(program, "u_res"),
      radius: gl.getUniformLocation(program, "u_radius"),
      deform: gl.getUniformLocation(program, "u_deform"),
      freq: gl.getUniformLocation(program, "u_freq"),
      morphSpeed: gl.getUniformLocation(program, "u_morphSpeed"),
      rotSpeed: gl.getUniformLocation(program, "u_rotSpeed"),
      specular: gl.getUniformLocation(program, "u_specular"),
      shininess: gl.getUniformLocation(program, "u_shininess"),
      glowStrength: gl.getUniformLocation(program, "u_glowStrength"),
      colBlue: gl.getUniformLocation(program, "u_colBlue"),
      colMag: gl.getUniformLocation(program, "u_colMag"),
      glowA: gl.getUniformLocation(program, "u_glowA"),
      glowB: gl.getUniformLocation(program, "u_glowB"),
      liquidSpeed: gl.getUniformLocation(program, "u_liquidSpeed"),
      liquidScale: gl.getUniformLocation(program, "u_liquidScale"),
      liquidBright: gl.getUniformLocation(program, "u_liquidBright"),
      filament: gl.getUniformLocation(program, "u_filament"),
      core: gl.getUniformLocation(program, "u_core"),
      bg: gl.getUniformLocation(program, "u_bg"),
      blend: gl.getUniformLocation(program, "u_blend"),
    };

    const bg = hexToRgb(ORB_PARAMS.background);
    const colBlue = hexToRgb(ORB_PARAMS.colorBlue);
    const colMag = hexToRgb(ORB_PARAMS.colorMagenta);
    const glowA = hexToRgb(ORB_PARAMS.glowA);
    const glowB = hexToRgb(ORB_PARAMS.glowB);

    const resize = () => {
      if (disposed) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, config.maxDpr);
      const css = Math.min(rect.width, rect.height);
      const side = Math.min(Math.max(Math.floor(css * dpr), 1), config.maxSidePx);
      if (css <= 0) return;
      if (canvas.width !== side || canvas.height !== side) {
        canvas.width = side;
        canvas.height = side;
      }
      canvas.style.width = `${css}px`;
      canvas.style.height = `${css}px`;
    };

    const draw = (time: number) => {
      if (disposed || !program) return;
      resize();

      const w = canvas.width;
      const h = canvas.height;
      if (w <= 0 || h <= 0) return;

      const isSmall = variant !== "hero";
      const morph = isSmall ? ORB_PARAMS.morphSpeed * 0.85 : ORB_PARAMS.morphSpeed;
      const rot = isSmall ? ORB_PARAMS.rotSpeed * 0.9 : ORB_PARAMS.rotSpeed;
      const glow =
        variant === "mark" ? 0.45 : variant === "compact" ? 0.5 : ORB_PARAMS.glowStrength;

      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      gl.uniform1f(U.time, time);
      gl.uniform2f(U.res, w, h);
      gl.uniform1f(U.radius, ORB_PARAMS.radius);
      gl.uniform1f(U.deform, ORB_PARAMS.deform);
      gl.uniform1f(U.freq, ORB_PARAMS.frequency);
      gl.uniform1f(U.morphSpeed, morph);
      gl.uniform1f(U.rotSpeed, rot);
      gl.uniform1f(U.specular, ORB_PARAMS.specular);
      gl.uniform1f(U.shininess, ORB_PARAMS.shininess);
      gl.uniform1f(U.glowStrength, glow);
      gl.uniform3fv(U.colBlue, colBlue);
      gl.uniform3fv(U.colMag, colMag);
      gl.uniform3fv(U.glowA, glowA);
      gl.uniform3fv(U.glowB, glowB);
      gl.uniform1f(U.liquidSpeed, ORB_PARAMS.liquidSpeed);
      gl.uniform1f(U.liquidScale, ORB_PARAMS.liquidScale);
      gl.uniform1f(U.liquidBright, ORB_PARAMS.liquidBright);
      gl.uniform1f(U.filament, ORB_PARAMS.filament);
      gl.uniform1f(U.core, ORB_PARAMS.core);
      gl.uniform3fv(U.bg, bg);
      gl.uniform1f(U.blend, ORB_PARAMS.blend);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const tick = (now: number) => {
      if (disposed) return;
      if (document.hidden) {
        raf = 0;
        return;
      }
      draw(now * 0.001);
      if (!reduceMotion) {
        raf = requestAnimationFrame(tick);
      }
    };

    const onVisibility = () => {
      if (disposed || reduceMotion) return;
      if (!document.hidden && raf === 0) {
        raf = requestAnimationFrame(tick);
      }
    };

    const ro = new ResizeObserver(() => {
      if (reduceMotion) {
        draw(1.2);
      } else {
        resize();
      }
    });
    ro.observe(container);
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    if (reduceMotion) {
      draw(1.2);
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      raf = 0;
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (buf) gl.deleteBuffer(buf);
      if (vao) gl.deleteVertexArray(vao);
      if (program) gl.deleteProgram(program);
      if (vertShader) gl.deleteShader(vertShader);
      if (fragShader) gl.deleteShader(fragShader);
    };
  }, [variant, config.maxDpr, config.maxSidePx, config.powerPreference]);

  const isMark = variant === "mark";

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-square select-none pointer-events-none",
        config.sizeClass,
        className,
      )}
      role={isMark ? undefined : "img"}
      aria-label={
        isMark ? undefined : "AUTIQ liquid energy orb"
      }
      aria-hidden={isMark ? true : undefined}
    >
      {fallback ? (
        <div
          className={cn(
            "absolute rounded-full border border-border/60 bg-[radial-gradient(circle_at_35%_30%,#DF5A0888_0%,#8F2D0044_35%,#070809_70%)]",
            isMark
              ? "inset-[8%] shadow-[0_0_12px_#C4510C22]"
              : "inset-[18%] shadow-[0_0_60px_#C4510C22]",
          )}
          aria-hidden
        />
      ) : (
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 m-auto block h-full w-full"
        />
      )}
    </div>
  );
}
