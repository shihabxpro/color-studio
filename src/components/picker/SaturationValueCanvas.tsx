import { useCallback, useRef, type KeyboardEvent, type PointerEvent } from 'react';
import { getNormalizedPointerPosition } from '@/lib/color';

export interface SaturationValueCanvasProps {
  hue: number;
  saturation: number;
  value: number;
  previewHex: string;
  ariaLabel: string;
  onChange: (next: { s: number; v: number }) => void;
}

export function SaturationValueCanvas({
  hue,
  saturation,
  value,
  previewHex,
  ariaLabel,
  onChange,
}: SaturationValueCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef<boolean>(false);

  const updateFromClientCoords = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const { x, y } = getNormalizedPointerPosition(clientX, clientY, rect);
      onChange({
        s: x * 100,
        v: (1 - y) * 100,
      });
    },
    [onChange]
  );

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientCoords(event.clientX, event.clientY);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientCoords(event.clientX, event.clientY);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 2;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      onChange({ s: Math.min(100, saturation + step), v: value });
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      onChange({ s: Math.max(0, saturation - step), v: value });
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      onChange({ s: saturation, v: Math.min(100, value + step) });
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      onChange({ s: saturation, v: Math.max(0, value - step) });
    }
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(saturation)}
      aria-valuetext={`S ${Math.round(saturation)}%, V ${Math.round(value)}%`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      style={{ backgroundColor: `hsl(${hue} 100% 50%)` }}
      className="relative h-44 sm:h-52 w-full rounded-sm border border-line overflow-hidden cursor-crosshair touch-none select-none"
    >
      {/* Horizontal white -> transparent saturation layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0) 100%)',
        }}
      />
      {/* Vertical transparent -> black value layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, #000000 100%)',
        }}
      />

      {/* Selection Reticle */}
      <div
        aria-hidden="true"
        style={{
          left: `${saturation}%`,
          top: `${100 - value}%`,
          backgroundColor: previewHex,
        }}
        className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1.5px_rgba(9,9,11,0.8),0_2px_4px_rgba(0,0,0,0.35)]"
      />
    </div>
  );
}
