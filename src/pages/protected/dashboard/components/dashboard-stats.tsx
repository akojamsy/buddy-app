import { PersonPlusIcon, TelescopeIcon, ThreadIcon } from '@/assets/svg'
import { StatCard } from '@/components/fragments'

export function DashboardStats() {
  return (
    <section className='w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      <StatCard
        value={51}
        label='Total Channels'
        icon={<TelescopeIcon className='size-5 text-[#00D5AA]' />}
        iconContainerClassName='bg-[#E0FAF5] '
        className='hover:bg-[#E0FAF5] transition-colors duration-300'
      />
      <StatCard
        value={125}
        label='New Members'
        icon={<PersonPlusIcon className='size-5 text-[#7B91F7]' />}
        iconContainerClassName='bg-[#EFF2FE]'
        className='hover:bg-[#EFF2FE] transition-colors duration-300'
      />
      <StatCard
        value={789}
        label='All Impressions'
        icon={<ThreadIcon className='size-5 text-[#FF8600]' />}
        iconContainerClassName='bg-[#FFF0E0]'
        className='hover:bg-[#FFF0E0] transition-colors duration-300'
      />
    </section>
  )
}
