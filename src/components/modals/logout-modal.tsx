import { CustomButton } from '@/components/fragments'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#components/ui/dialog'
import { clearStorageItem } from '#hooks/use-local-storage'
import { reset as resetAuth } from '@/redux/features/auth/authSlice'
import { reset as resetMessages } from '@/redux/features/messages/messagesSlice'
import { baseApi } from '@/redux/services/baseApi'
import { persistor, useAppDispatch } from '@/redux/store'
import routesPath from '@/utils/routes-path'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

type LogoutModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LogoutModal({ open, onOpenChange }: LogoutModalProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleConfirm = async () => {
    onOpenChange(false)

    dispatch(resetAuth())
    dispatch(resetMessages())
    dispatch(baseApi.util.resetApiState())
    Cookies.remove('token')
    clearStorageItem()

    await persistor.purge()

    navigate(routesPath.SIGNIN, { replace: true })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='gap-5 font-lexend sm:max-w-[400px]'>
        <DialogHeader className='flex-row items-center gap-0 pr-8'>
          <DialogTitle className='text-left text-base font-semibold text-[#3B3B45]'>
            Logout
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className='text-center text-sm text-[#5B6871] my-4'>
          Are you sure youo want to logout?
        </DialogDescription>

        <DialogFooter className='flex-row gap-3 sm:justify-end'>
          <DialogClose asChild>
            <CustomButton
              type='button'
              variant='outline'
              className='h-10 w-full min-w-[100px] rounded-[6px] sm:w-auto cursor-pointer'
            >
              Cancel
            </CustomButton>
          </DialogClose>
          <CustomButton
            type='button'
            className='h-10 w-full min-w-[100px] rounded-[6px] sm:w-auto cursor-pointer'
            onClick={handleConfirm}
          >
            Yes
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
