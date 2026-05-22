import lady1Avatar from '@/assets/images/lady1.avif'
import lady2Avatar from '@/assets/images/lady2.webp'
import man1Avatar from '@/assets/images/man1.jpg'
import man2Avatar from '@/assets/images/man2.jpeg'
import man3Avatar from '@/assets/images/man3.jpg'
import type { TrendingPostItemData } from '@/pages/protected/dashboard/components/trending-post-item'

export const OVERVIEW_TABS = [
  'Robbin Hood',
  'Amreitrade',
  'Fidelity',
  'Charles',
] as const

export type OverviewTab = (typeof OVERVIEW_TABS)[number]

export const OVERVIEW_MONTHS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
] as const

export const OVERVIEW_CHART_MAX = 1000

export type OverviewChartDataPoint = {
  month: (typeof OVERVIEW_MONTHS)[number]
  primary: number
  secondary: number
}

export type OverviewTabConfig = {
  highlightMonthIndex: number
  data: OverviewChartDataPoint[]
}

type MonthlyPairs = [
  { primary: number; secondary: number },
  { primary: number; secondary: number },
  { primary: number; secondary: number },
  { primary: number; secondary: number },
  { primary: number; secondary: number },
  { primary: number; secondary: number },
  { primary: number; secondary: number },
  { primary: number; secondary: number },
  { primary: number; secondary: number },
  { primary: number; secondary: number },
  { primary: number; secondary: number },
  { primary: number; secondary: number },
]

function buildOverviewData(pairs: MonthlyPairs): OverviewChartDataPoint[] {
  return OVERVIEW_MONTHS.map((month, index) => ({
    month,
    primary: pairs[index].primary,
    secondary: pairs[index].secondary,
  }))
}

export const OVERVIEW_TAB_CONFIG: Record<OverviewTab, OverviewTabConfig> = {
  'Robbin Hood': {
    highlightMonthIndex: 5,
    data: buildOverviewData([
      { primary: 320, secondary: 240 },
      { primary: 480, secondary: 360 },
      { primary: 410, secondary: 300 },
      { primary: 560, secondary: 440 },
      { primary: 640, secondary: 520 },
      { primary: 880, secondary: 720 },
      { primary: 760, secondary: 620 },
      { primary: 520, secondary: 400 },
      { primary: 450, secondary: 340 },
      { primary: 590, secondary: 470 },
      { primary: 380, secondary: 280 },
      { primary: 300, secondary: 220 },
    ]),
  },
  Amreitrade: {
    highlightMonthIndex: 2,
    data: buildOverviewData([
      { primary: 280, secondary: 200 },
      { primary: 420, secondary: 310 },
      { primary: 820, secondary: 690 },
      { primary: 490, secondary: 370 },
      { primary: 530, secondary: 410 },
      { primary: 670, secondary: 540 },
      { primary: 710, secondary: 580 },
      { primary: 500, secondary: 390 },
      { primary: 460, secondary: 350 },
      { primary: 540, secondary: 420 },
      { primary: 360, secondary: 260 },
      { primary: 440, secondary: 330 },
    ]),
  },
  Fidelity: {
    highlightMonthIndex: 8,
    data: buildOverviewData([
      { primary: 350, secondary: 260 },
      { primary: 510, secondary: 390 },
      { primary: 390, secondary: 290 },
      { primary: 600, secondary: 480 },
      { primary: 720, secondary: 590 },
      { primary: 680, secondary: 560 },
      { primary: 550, secondary: 430 },
      { primary: 480, secondary: 360 },
      { primary: 910, secondary: 760 },
      { primary: 620, secondary: 500 },
      { primary: 440, secondary: 330 },
      { primary: 330, secondary: 250 },
    ]),
  },
  Charles: {
    highlightMonthIndex: 10,
    data: buildOverviewData([
      { primary: 300, secondary: 220 },
      { primary: 440, secondary: 330 },
      { primary: 500, secondary: 380 },
      { primary: 470, secondary: 350 },
      { primary: 580, secondary: 460 },
      { primary: 690, secondary: 560 },
      { primary: 610, secondary: 490 },
      { primary: 420, secondary: 320 },
      { primary: 560, secondary: 440 },
      { primary: 490, secondary: 370 },
      { primary: 850, secondary: 700 },
      { primary: 340, secondary: 260 },
    ]),
  },
}

export type PotentialMemberData = {
  id: string
  name: string
  handle: string
  growth: string
  avatar: string
}

export const POTENTIAL_MEMBERS: PotentialMemberData[] = [
  {
    id: 'wanda-parker',
    name: 'Wanda Parker',
    handle: '@ashking1234',
    growth: '10.3%',
    avatar: lady1Avatar,
  },
  {
    id: 'terry-brown-1',
    name: 'Terry Brown',
    handle: '@ashking1234',
    growth: '9.8%',
    avatar: man1Avatar,
  },
  {
    id: 'lucas-holmes',
    name: 'Lucas Holmes',
    handle: '@ashking1234',
    growth: '6.5%',
    avatar: man2Avatar,
  },
  {
    id: 'janice-miller',
    name: 'Janice Miller',
    handle: '@ashking1234',
    growth: '8.6%',
    avatar: lady2Avatar,
  },
  {
    id: 'terry-brown-2',
    name: 'Terry Brown',
    handle: '@ashking1234',
    growth: '9.8%',
    avatar: man3Avatar,
  },
]

export const TRENDING_POSTS: TrendingPostItemData[] = [
  {
    title: '8 Upcoming Influencer Marketing Trends and Benefits',
    excerpt:
      "Marketing is evolving. It's changing from a one-way street to a two-way conversa...",
    likes: 260,
    comments: 234,
    shares: 123,
  },
  {
    title: 'How Influencer Marketing Affects Consumer Buying Behavior',
    excerpt:
      'As influencer marketing continues to grow, consumers have been turning to their...',
    likes: 260,
    comments: 234,
    shares: 123,
  },
]
