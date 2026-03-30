import React, { useRef, useEffect } from "react";

/**
 * MiniGlobe – Pure Canvas 2D (no WebGL required)
 * Auto-rotating cyberpunk Earth with latitude/longitude grid,
 * cyan atmosphere, and neon glow ring.
 *
 * Props:
 *   size   – pixel diameter (default 120)
 */
const MiniGlobe = ({ size = 120 }) => {
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const phaseRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const r = size / 2;
        const cx = r;
        const cy = r;

        const draw = () => {
            ctx.clearRect(0, 0, size, size);

            /* ── Base sphere (dark navy radial gradient) ── */
            const baseGrad = ctx.createRadialGradient(
                cx - r * 0.28, cy - r * 0.28, r * 0.05,
                cx, cy, r
            );
            baseGrad.addColorStop(0, "#0a2e42");
            baseGrad.addColorStop(0.55, "#071820");
            baseGrad.addColorStop(1, "#020d14");

            ctx.beginPath();
            ctx.arc(cx, cy, r * 0.97, 0, Math.PI * 2);
            ctx.fillStyle = baseGrad;
            ctx.fill();

            /* ── Clip to circle for all grid lines ── */
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, r * 0.97, 0, Math.PI * 2);
            ctx.clip();

            const phase = phaseRef.current;

            /* Latitude lines (horizontal ellipses) */
            const latCount = 7;
            for (let i = 1; i < latCount; i++) {
                const lat = (i / latCount) * Math.PI;
                const ly = cy - r * Math.cos(lat);
                const lrx = r * Math.abs(Math.sin(lat));
                ctx.beginPath();
                ctx.ellipse(cx, ly, lrx * 0.97, lrx * 0.14, 0, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(0,255,120,0.35)";
                ctx.lineWidth = 0.65;
                ctx.stroke();
            }

            /* Longitude lines (vertical ellipses, phase-shifted for rotation) */
            const lonCount = 9;
            for (let i = 0; i < lonCount; i++) {
                const angle = (i / lonCount) * Math.PI + phase;
                const cosA = Math.cos(angle);
                const sinA = Math.sin(angle);
                const scaleX = Math.abs(cosA);
                if (scaleX < 0.02) continue;

                ctx.save();
                ctx.translate(cx, cy);
                ctx.scale(scaleX * 0.97, 1);
                ctx.beginPath();
                ctx.arc(0, 0, r * 0.97, 0, Math.PI * 2);
                const alpha = ((sinA + 1) / 2) * 0.38 + 0.08;
                ctx.strokeStyle = `rgba(0,255,200,${alpha.toFixed(2)})`;
                ctx.lineWidth = 0.8 / Math.max(scaleX, 0.15);
                ctx.stroke();
                ctx.restore();
            }

            ctx.restore();

            /* ── Atmosphere glow ring ── */
            const atmosGrad = ctx.createRadialGradient(cx, cy, r * 0.88, cx, cy, r * 1.12);
            atmosGrad.addColorStop(0, "rgba(0,255,255,0.0)");
            atmosGrad.addColorStop(0.45, "rgba(0,255,255,0.13)");
            atmosGrad.addColorStop(1, "rgba(0,255,255,0.0)");
            ctx.beginPath();
            ctx.arc(cx, cy, r * 1.1, 0, Math.PI * 2);
            ctx.fillStyle = atmosGrad;
            ctx.fill();

            /* ── Specular highlight ── */
            const hlGrad = ctx.createRadialGradient(
                cx - r * 0.26, cy - r * 0.26, 0,
                cx - r * 0.26, cy - r * 0.26, r * 0.38
            );
            hlGrad.addColorStop(0, "rgba(160,235,255,0.09)");
            hlGrad.addColorStop(1, "rgba(160,235,255,0.0)");
            ctx.beginPath();
            ctx.arc(cx - r * 0.26, cy - r * 0.26, r * 0.38, 0, Math.PI * 2);
            ctx.fillStyle = hlGrad;
            ctx.fill();

            phaseRef.current += 0.009;
            animRef.current = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, [size]);

    return (
        <span
            className="inline-flex flex-col items-center select-none pointer-events-none"
            style={{ width: size, height: size + 10, verticalAlign: "middle" }}
        >
            <canvas
                ref={canvasRef}
                width={size}
                height={size}
                style={{
                    borderRadius: "50%",
                    display: "block",
                    boxShadow: `
            0 0 ${Math.round(size * 0.16)}px rgba(0,255,255,0.55),
            0 0 ${Math.round(size * 0.38)}px rgba(0,255,255,0.18)
          `,
                }}
            />
            {/* Neon glow shadow beneath */}
            <span
                style={{
                    display: "block",
                    width: size * 0.62,
                    height: 4,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(ellipse at center, rgba(0,255,255,0.65) 0%, transparent 80%)",
                    marginTop: 5,
                    filter: "blur(2px)",
                }}
            />
        </span>
    );
};

export default MiniGlobe;
