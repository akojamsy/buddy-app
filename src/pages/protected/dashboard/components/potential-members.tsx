import { CardWrapper } from '@/components/fragments'
import { POTENTIAL_MEMBERS } from '@/utils/overview-data'
import { PotentialMemberItem } from './potential-member-item'

export function PotentialMembers() {
  return (
    <CardWrapper className='w-full rounded-[16px]'>
      <h2 className='mb-4 text-lg font-bold text-[#3B3B45] leading-[133%] md:text-xl'>
        Potential Members
      </h2>
      <div className='flex gap-2 overflow-x-auto [-ms-overflow-style:none] scrollbar-none sm:grid sm:grid-cols-5 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden'>
        {POTENTIAL_MEMBERS.map((member) => (
          <PotentialMemberItem key={member.id} {...member} />
        ))}
      </div>
    </CardWrapper>
  )
}
