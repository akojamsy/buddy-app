import { cn } from '#lib/utils'

export type TrendingNewsItemData = {
  title: string
  description: string
  image: string
  imageAlt: string
}

export default function TrendingNewsItem({
  title,
  description,
  image,
  imageAlt,
  className,
}: TrendingNewsItemData & { className?: string }) {
  return (
    <article
      className={cn(
        'group flex cursor-pointer items-center gap-2 rounded-[12px] border border-[#F1F1F1] bg-white p-3',
        className,
      )}
    >
      <img
        src={image}
        alt={imageAlt}
        width={48}
        height={48}
        className='size-[48px] shrink-0 rounded-[8px] object-cover'
      />
      <div className='min-w-0 flex-1'>
        <h3 className='text-sm font-semibold leading-[100%] text-[#3B3B45] group-hover:underline'>
          {title}
        </h3>
        <p className='mt-1 line-clamp-1 text-xs font-light leading-[140%] text-[#A3A3A6] group-hover:underline'>
          {description}
        </p>
      </div>
    </article>
  )
}
