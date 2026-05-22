import { CardWrapper } from '@/components/fragments'
import { TRENDING_POSTS } from '@/utils/overview-data'
import { TrendingPostItem } from './trending-post-item'

export function TrendingPosts() {
  return (
    <CardWrapper className='w-full rounded-[16px] lg:max-h-[274px] sm:p-6'>
      <h2 className='mb-4 text-lg font-bold text-[#3B3B45] leading-[133%] md:text-xl'>
        Trending Posts
      </h2>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4'>
        {TRENDING_POSTS.map((post) => (
          <TrendingPostItem key={post.title} {...post} />
        ))}
      </div>
    </CardWrapper>
  )
}
