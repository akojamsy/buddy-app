import { ArrowUpIcon } from '@/assets/svg'
import { ChartContainer, type ChartConfig } from '#components/ui/chart'
import { cn } from '#lib/utils'
import { Line, LineChart, ReferenceLine, XAxis, YAxis } from 'recharts'

const watchlistChartConfig = {
  value: {
    label: 'Price',
    color: '#FFB800',
  },
} satisfies ChartConfig

const DEFAULT_CHART_DATA = [
  { value: 14 },
  { value: 16 },
  { value: 15 },
  { value: 18 },
  { value: 34 },
  { value: 42 },
  { value: 44 },
  { value: 52 },
  { value: 50 },
  { value: 26 },
  { value: 20 },
  { value: 48 },
]

type WatchlistItemProps = {
  symbol?: string
  price?: string
  changePercent?: string
  isPositive?: boolean
  chartData?: Array<{ value: number }>
  referenceY?: number
  className?: string
}

export function WatchlistItem({
  symbol = 'AAPL',
  price = '$142.90',
  changePercent = '+0.47%',
  isPositive = true,
  chartData = DEFAULT_CHART_DATA,
  referenceY = 32,
  className,
}: WatchlistItemProps) {
  return (
    <div
      className={cn(
        'w-full rounded-[12px] bg-[#F6F6F6] px-4 py-[10.2px]',
        className,
      )}
    >
      <div className='flex w-full items-center justify-between'>
        <div className='min-w-[96px]'>
          <div className='mb-2 flex w-full items-center justify-between'>
            <h1 className='text-lg font-semibold text-[#3B3B45]'>{symbol}</h1>
            <span>
              <ArrowUpIcon
                className={cn(
                  'size-6',
                  isPositive
                    ? 'text-[#00A441]'
                    : 'rotate-180 text-[#E53935]',
                )}
              />
            </span>
          </div>
          <p className='text-[15px] font-medium leading-[149%] text-[#A3A3A6]'>
            {price}
          </p>
          <p
            className={cn(
              'text-xs font-medium',
              isPositive ? 'text-[#00A441]' : 'text-[#E53935]',
            )}
          >
            {changePercent}
          </p>
        </div>

        <div className='min-w-0 flex-1'>
          <ChartContainer
            config={watchlistChartConfig}
            className='mt-1 aspect-auto h-[72px] w-full'
          >
            <LineChart
              data={chartData}
              margin={{ top: 8, right: 4, bottom: 8, left: 0 }}
            >
              <XAxis hide />
              <YAxis hide domain={['dataMin - 4', 'dataMax + 4']} />
              <ReferenceLine
                y={referenceY}
                stroke='#D1D5DB'
                strokeDasharray='5 5'
              />
              <Line
                type='monotone'
                dataKey='value'
                stroke='var(--color-value)'
                strokeWidth={3}
                dot={(props) => {
                  const { cx, cy, index } = props
                  if (
                    index !== chartData.length - 1 ||
                    cx == null ||
                    cy == null
                  ) {
                    return null
                  }
                  return (
                    <g>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={10}
                        fill='#FFB800'
                        fillOpacity={0.25}
                      />
                      <circle cx={cx} cy={cy} r={4} fill='#FFB800' />
                    </g>
                  )
                }}
                activeDot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  )
}
