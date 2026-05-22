import { Avatar, AvatarFallback, AvatarImage } from '#components/ui/avatar'
import { CustomButton } from './fragments'
import { LogoutIcon } from '@/assets/svg'

export function NavUser({
  user,
}: {
  user: {
    name: string
    role: string
    avatar: string
  }
}) {
  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className='px-4 pb-6'>
      <div className='relative mt-10 flex flex-col gap-3 rounded-[16px] bg-[#FFFFFF] px-4 pb-4 pt-[36px] shadow-[0_11px_56px_rgba(0,0,0,0.07)]'>
        <Avatar className='absolute -top-9 left-1/2 size-[72px] -translate-x-1/2 border-4 border-white'>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className='bg-[#E8E8ED] text-[#3B3B45]'>
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className='text-center font-lexend'>
          <p className='text-base font-semibold text-[#3B3B45]'>{user.name}</p>
          <p className='mt-0.5 text-sm text-[#818187]'>{user.role}</p>
        </div>

        <CustomButton
          variant='outline'
          className='flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-[12px] border-0 bg-[#FF860029] font-lexend text-[#FF8600] hover:bg-[#FF860033] active:bg-[#FF860040]'
          size='sm'
        >
          <LogoutIcon className='size-4 text-[#FF8600]' />
          <span className='text-sm font-semibold text-[#FF8600]'>Logout</span>
        </CustomButton>
      </div>
    </div>
  )
}
