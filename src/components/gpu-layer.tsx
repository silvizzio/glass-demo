'use client';

import { Frame, Glass, GlassContainer, Html, LiquidCanvas, Transform, ZStack } from '@liquid-dom/react';

type Surface = { x: number; y: number; width: number; height: number; radius: number };

/** The backdrop lives in the liquid-dom scene so the glass can sample its pixels. */
export function GpuLayer({ width, height, blur, tint, onError }: {
  width: number;
  height: number;
  blur: number;
  tint: number;
  onError: (message: string) => void;
}) {
  const surfaces: Surface[] = [
    { x: 28, y: 86, width: 88, height: 40, radius: 24 },
    { x: 124, y: 86, width: 88, height: 40, radius: 24 },
    { x: 220, y: 86, width: 94, height: 40, radius: 24 },
    { x: 28, y: 148, width: 280, height: 122, radius: 20 },
    { x: 28, y: 286, width: 280, height: 186, radius: 20 },
    { x: 28, y: 490, width: 280, height: Math.max(240, height - 516), radius: 20 },
    { x: width - 308, y: 86, width: 280, height: 468, radius: 20 },
    { x: 328, y: height - 205, width: Math.max(280, Math.min(620, width * 0.39)), height: 180, radius: 20 },
    { x: Math.max(962, width * 0.60), y: height - 205, width: Math.max(280, width - Math.max(962, width * 0.60) - 28), height: 180, radius: 20 },
  ];

  return (
    <LiquidCanvas className="gpu-canvas" canvasClassName="gpu-render" maxDpr={1.5} onError={(e) => onError(String(e))}>
      <ZStack alignment="center">
        <Html sizing="fill" zIndex={-1}>
          <div className="gpu-scene-background" />
        </Html>
        <Frame width={width} height={height}>
          <GlassContainer
            blur={blur}
            spacing={12}
            bezelWidth={17}
            thickness={68}
            contentDepth={16}
            tint={{ r: 0.08, g: 0.105, b: 0.13, a: tint }}
            shadowColor={{ r: 0, g: 0, b: 0, a: 0.22 }}
            shadowBlur={22}
            specularOpacity={0.55}
          >
            <ZStack alignment="center">
              {surfaces.map((s, i) => (
                <Transform key={i} x={s.x + s.width / 2 - width / 2} y={s.y + s.height / 2 - height / 2}>
                  <Glass cornerRadius={s.radius}>
                    <Frame width={s.width} height={s.height} />
                  </Glass>
                </Transform>
              ))}
            </ZStack>
          </GlassContainer>
        </Frame>
      </ZStack>
    </LiquidCanvas>
  );
}
