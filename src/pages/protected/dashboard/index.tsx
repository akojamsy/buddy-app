import { CardWrapper } from '@/components/fragments'
import DashboardLayout from '../app-layout'
import {
  DashboardStats,
  OverviewChart,
  RevenueItem,
  PotentialMembers,
  TrendingPosts,
  WatchlistItem,
  type RevenueItemProps,
} from './components'
import TrendingNews from './components/trending'

const REVENUE_ITEMS: RevenueItemProps[] = [
  {
    amount: '$4,000',
    label: 'Recently Added Pages',
    platform: 'facebook',
  },
  {
    amount: '$2,120',
    label: 'Video Monetization',
    platform: 'instagram',
  },
  {
    amount: '$1,752',
    label: 'Community Buildup',
    platform: 'linkedin',
  },
]

const Dashboard = () => {
  return (
    <DashboardLayout pageTitle='My Portfolio' contentClassName='max-w-[1160px]'>
      <div className='flex flex-col gap-y-4 sm:flex-row sm:gap-x-8'>
        <div className='w-full flex flex-col gap-y-4'>
          <DashboardStats />
          <OverviewChart />
          <TrendingPosts />
          <PotentialMembers />
        </div>

        <div className='w-full space-y-4 sm:max-w-[330px]'>
          <CardWrapper>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg md:text-xl font-bold text-[#3B3B45]'>
                Watchlist
              </h2>
              <button className='text-xs font-semibold text-[#FF8600] hover:text-[#FF8600] uppercase! cursor-pointer p-0'>
                View All
              </button>
            </div>
            <div className='flex flex-col gap-y-3 mt-4'>
              <WatchlistItem />
              <WatchlistItem
                isPositive={false}
                changePercent='-0.78%'
                symbol='BPL'
              />
            </div>
          </CardWrapper>

          <CardWrapper className='w-full'>
            <h1 className='mb-4 text-lg font-semibold text-[#3B3B45] md:text-xl leading-[133%]'>
              Revenue
            </h1>
            <div className='flex flex-col gap-3'>
              {REVENUE_ITEMS.map((item) => (
                <RevenueItem key={item.label} {...item} />
              ))}
            </div>
          </CardWrapper>

          <TrendingNews />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
