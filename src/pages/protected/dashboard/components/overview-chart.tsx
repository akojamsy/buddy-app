'use client'

import { ChartContainer, type ChartConfig } from '#components/ui/chart'
import { cn } from '#lib/utils'
import { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { OverviewBarTooltip } from '../../../../components/fragments/overview-bar-tooltip'
import {
  OVERVIEW_CHART_MAX,
  OVERVIEW_TAB_CONFIG,
  OVERVIEW_TABS,
  type OverviewTab,
} from '../../../../utils/overview-data'
import { DashboardCard } from './dashboard-card'

const INACTIVE_BAR_COLOR = '#E5E7EB'
const BAR_SIZE_MOBILE = 10
const BAR_SIZE_DESKTOP = 12
const SM_BREAKPOINT = 640

function useOverviewBarSize() {
  const [barSize, setBarSize] = useState(BAR_SIZE_DESKTOP)

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${SM_BREAKPOINT}px)`)
    const update = () => {
      setBarSize(mql.matches ? BAR_SIZE_DESKTOP : BAR_SIZE_MOBILE)
    }
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  return barSize
}

const overviewChartConfig = {
  primary: {
    label: 'Primary',
    color: '#FF8600',
  },
  secondary: {
    label: 'Secondary',
    color: '#FFB800',
  },
} satisfies ChartConfig

export function OverviewChart() {
  const [activeTab, setActiveTab] = useState<OverviewTab>('Robbin Hood')
  const [tooltipPosition, setTooltipPosition] = useState<
    { x: number; y: number } | undefined
  >(undefined)
  const barSize = useOverviewBarSize()
  const { data: chartData, highlightMonthIndex } =
    OVERVIEW_TAB_CONFIG[activeTab]

  return (
    <DashboardCard
      title='Overview'
      headerClassName='mb-4'
      className='rounded-[16px]'
      action={
        <div className='flex max-w-full gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden'>
          {OVERVIEW_TABS.map((tab) => (
            <button
              key={tab}
              type='button'
              onClick={() => setActiveTab(tab)}
              className={cn(
                'rounded-[12px] px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-[12px] cursor-pointer',
                activeTab === tab
                  ? 'bg-[#FF8600] text-white'
                  : 'bg-[#F0F0F2] text-[#5B6871] hover:bg-[#E8E8ED]',
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      }
    >
      <ChartContainer
        config={overviewChartConfig}
        className='aspect-auto h-[200px] w-full sm:h-[224px]'
        initialDimension={{ width: 640, height: 240 }}
      >
        <BarChart
          data={chartData}
          margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
          barCategoryGap='18%'
          barGap={2}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray='4 4'
            stroke='#E5E7EB'
          />
          <XAxis
            dataKey='month'
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 10 }}
            interval={0}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            domain={[0, OVERVIEW_CHART_MAX]}
            ticks={[0, 200, 400, 600, 800, 1000]}
            tick={{ fill: '#9CA3AF', fontSize: 11 }}
            width={36}
          />
          <Tooltip
            shared={false}
            offset={0}
            position={tooltipPosition}
            allowEscapeViewBox={{ x: true, y: true }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
            content={({ active, payload, coordinate }) => {
              const dataKey = payload?.[0]?.dataKey

              if (dataKey === 'secondary') {
                return (
                  <OverviewBarTooltip
                    active={active}
                    payload={payload}
                    coordinate={coordinate}
                    label='Purchase Value'
                    placement='left-bar'
                    onSyncPosition={setTooltipPosition}
                  />
                )
              }

              if (dataKey === 'primary') {
                return (
                  <OverviewBarTooltip
                    active={active}
                    payload={payload}
                    coordinate={coordinate}
                    label='Market Value'
                    placement='right-bar'
                    onSyncPosition={setTooltipPosition}
                  />
                )
              }

              return null
            }}
            wrapperStyle={{ outline: 'none', zIndex: 20 }}
            contentStyle={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              boxShadow: 'none',
            }}
          />
          <Bar
            dataKey='secondary'
            fill='var(--color-secondary)'
            barSize={barSize}
            radius={[2, 2, 0, 0]}
          >
            {chartData.map((_, index) => (
              <Cell
                key={`secondary-${index}`}
                fill={
                  index === highlightMonthIndex ? '#FFB800' : INACTIVE_BAR_COLOR
                }
              />
            ))}
          </Bar>
          <Bar
            dataKey='primary'
            fill='var(--color-primary)'
            barSize={barSize}
            radius={[2, 2, 0, 0]}
          >
            {chartData.map((_, index) => (
              <Cell
                key={`primary-${index}`}
                fill={
                  index === highlightMonthIndex ? '#FF8600' : INACTIVE_BAR_COLOR
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </DashboardCard>
  )
}
