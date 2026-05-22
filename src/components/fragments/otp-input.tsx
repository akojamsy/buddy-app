import { InputOTP, InputOTPGroup, InputOTPSlot } from '#components/ui/input-otp'
import { cn } from '#lib/utils'

const OTP_LENGTH = 4

type OtpInputProps = {
  value: string
  onChange: (value: string) => void
  className?: string
}

const otpSlotClassName = cn(
  'size-[50px] rounded-[10px] border border-[#FF8600] bg-white shadow-none',
  'text-2xl font-bold text-[#5B6871]',
  'first:rounded-[10px] last:rounded-[10px] first:border-l',
  'border-y border-r border-[#FF8600]',
  'data-[active=true]:z-10 data-[active=true]:border-[#FF8600]',
  'data-[active=true]:ring-2 data-[active=true]:ring-[#FF8600] data-[active=true]:ring-offset-2',
  'data-[active=true]:ring-ring/0 dark:bg-white',
)

export function OtpInput({ value, onChange, className }: OtpInputProps) {
  return (
    <InputOTP
      maxLength={OTP_LENGTH}
      value={value}
      onChange={onChange}
      containerClassName={className}
    >
      <InputOTPGroup className='gap-3 lg:gap-6 rounded-none shadow-none'>
        {Array.from({ length: OTP_LENGTH }, (_, index) => (
          <InputOTPSlot
            key={index}
            index={index}
            className={otpSlotClassName}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}

export const OTP_DIGIT_COUNT = OTP_LENGTH
