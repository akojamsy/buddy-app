import { cn } from '#lib/utils'
import { useLayoutEffect } from 'react'
import type { TooltipPayload, TooltipValueType } from 'recharts'

/** Maps chart scale (0–1000) to display dollars shown in the design tooltips */
const TOOLTIP_VALUE_SCALE = 0.35

type Coordinate = { x?: number; y?: number }

type OverviewBarTooltipProps = {
  active?: boolean
  payload?: TooltipPayload
  coordinate?: Coordinate
  label: string
  /** Left bar in the pair (secondary) */
  placement: 'left-bar' | 'right-bar'
  onSyncPosition?: (position: { x: number; y: number } | undefined) => void
}

function getPayloadNumericValue(
  value: TooltipValueType | undefined,
): number | null {
  if (value == null) return null
  if (typeof value === 'number' && !Number.isNaN(value)) return value
  if (typeof value === 'string') {
    const parsed = Number(value)
    return Number.isNaN(parsed) ? null : parsed
  }
  if (Array.isArray(value) && value.length > 0) {
    return getPayloadNumericValue(value[value.length - 1])
  }
  return null
}

function TooltipArrow({ direction }: { direction: 'left' | 'right' }) {
  return (
    <span
      aria-hidden
      className={cn(
        'size-0 shrink-0 border-y-[7px] border-y-transparent',
        direction === 'right' && 'border-l-8 border-l-[#3B3B45]',
        direction === 'left' && 'border-r-8 border-r-[#3B3B45]',
      )}
    />
  )
}

export function OverviewBarTooltip({
  active,
  payload,
  coordinate,
  label,
  placement,
  onSyncPosition,
}: OverviewBarTooltipProps) {
  const isLeftBar = placement === 'left-bar'

  useLayoutEffect(() => {
    if (active && coordinate?.x != null && coordinate?.y != null) {
      onSyncPosition?.({ x: coordinate.x, y: coordinate.y })
      return
    }
    onSyncPosition?.(undefined)
  }, [active, coordinate, onSyncPosition])

  if (!active || !payload?.length) return null

  const numericValue = getPayloadNumericValue(payload[0]?.value)
  if (numericValue == null) return null

  const formattedValue = `$${(numericValue * TOOLTIP_VALUE_SCALE).toFixed(2)}`

  return (
    <div
      className='pointer-events-none flex items-center font-lexend'
      style={{
        transform: isLeftBar ? 'translate(-100%, -50%)' : 'translate(0, -50%)',
      }}
    >
      {!isLeftBar && <TooltipArrow direction='left' />}
      <div className='rounded-[12px] bg-[#3B3B45] px-5 py-3 text-center text-white shadow-[0_4px_20px_rgba(0,0,0,0.15)]'>
        <p className='text-base font-semibold leading-tight'>
          {formattedValue}
        </p>
        <p className='mt-0.5 text-sm font-normal text-white/90'>{label}</p>
      </div>
      {isLeftBar && <TooltipArrow direction='right' />}
    </div>
  )
}
