import { CardWrapper } from '@/components/fragments'
import elonMuskImage from '@/assets/images/elon-musk.webp'
import fuelImage from '@/assets/images/fuel.webp'
import russiaImage from '@/assets/images/russia.webp'
import TrendingNewsItem, {
  type TrendingNewsItemData,
} from './trending-news-item'

const TRENDING_NEWS_ITEMS: TrendingNewsItemData[] = [
  {
    title: 'Russia & Ukraine War',
    description: "Marketing is evolving. It's chang...",
    image: russiaImage,
    imageAlt: 'Damaged building during conflict',
  },
  {
    title: 'Elon Musk bought Twitter',
    description: 'Twitter is the most useful social pl...',
    image: elonMuskImage,
    imageAlt: 'Elon Musk portrait',
  },
  {
    title: 'Fuel Crisis Everywhere',
    description: 'Due to covid situation in 2020 the...',
    image: fuelImage,
    imageAlt: 'Person refueling a car',
  },
]

export function TrendingNews() {
  return (
    <CardWrapper className='w-full'>
      <h2 className='mb-4 text-lg font-semibold capitalize leading-[133%] text-[#3B3B45] md:text-xl'>
        Trending News
      </h2>
      <div className='flex flex-col gap-3'>
        {TRENDING_NEWS_ITEMS.map((item) => (
          <TrendingNewsItem key={item.title} {...item} />
        ))}
      </div>
    </CardWrapper>
  )
}

export default TrendingNews
