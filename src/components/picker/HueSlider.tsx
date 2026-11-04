import { useCallback, useRef, type KeyboardEvent, type PointerEvent } from 'react';
import { getNormalizedPointerPosition } from '@/lib/color';

export interface HueSliderProps {
  hue: number;
  label: string;
  onChange: (hue: number) => void;
}

const HUE_GRADIENT =
  'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)';

export function HueSlider({ hue, label, onChange }: HueSliderProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef<boolean>(false);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const { x } = getNormalizedPointerPosition(clientX, rect.top, rect);
      onChange(Math.min(359.99, Math.max(0, x * 360)));
    },
    [onChange]
  );

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(event.clientX);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 15 : 3;
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      onChange((hue + step) % 360);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      onChange((hue - step + 360) % 360);
    }
  };

  const percent = Math.min(100, Math.max(0, (hue / 360) * 100));

  return (
    <div className="space-y-1.5 min-w-0">
      <div className="flex items-center justify-between gap-2 text-[12px]">
        <span className="font-medium text-ink-secondary">{label}</span>
        <span className="font-mono text-[11px] text-ink-muted tabular-nums">
          {Math.round(hue)}°
        </span>
      </div>

      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={Math.round(hue)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        style={{ background: HUE_GRADIENT }}
        className="relative h-3.5 w-full rounded-full border border-line cursor-pointer touch-none select-none"
      >
        <div
          aria-hidden="true"
          style={{
            left: `${percent}%`,
            backgroundColor: `hsl(${hue} 100% 50%)`,
          }}
          className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1.5px_rgba(9,9,11,0.75)]"
        />
      </div>
    </div>
  );
}
