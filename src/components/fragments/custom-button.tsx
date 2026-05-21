'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

/** Spinner matching design: circular ring, inherits color */
function ButtonSpinner({ className }: { className?: string }) {
  return (
    <span className={cn('inline-block size-4 shrink-0', className)} aria-hidden>
      <svg
        className='animate-spin'
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden
      >
        <circle
          cx='8'
          cy='8'
          r='7'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeDasharray='32'
          strokeDashoffset='8'
          opacity={0.25}
        />
        <circle
          cx='8'
          cy='8'
          r='7'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeDasharray='32'
          strokeDashoffset='24'
        />
      </svg>
    </span>
  )
}

export type CustomButtonVariant = 'solid' | 'outline' | 'dark' | 'auth'

export interface CustomButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'children'
> {
  asChild?: boolean
  children: React.ReactNode
  variant?: CustomButtonVariant
  iconPosition?: 'left' | 'right'
  showIcon?: boolean
  icon?: React.ReactNode
  loading?: boolean
  loadingText?: string
  className?: string
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const solidVariantClasses = cn(
  'rounded-[6px] font-semibold text-white',
  'bg-[#FF8600] hover:bg-[#E67800] active:bg-[#CC6B00]',
  'disabled:bg-[#ECEDED] disabled:text-[#C3C7CE] disabled:opacity-100 disabled:border-0',
  'focus-visible:ring-2 focus-visible:ring-[#FF8600] focus-visible:ring-offset-2',
)

const outlineVariantClasses = cn(
  'rounded-[6px] font-semibold',
  'border border-[#FF8600] bg-white text-[#FF8600]',
  'hover:bg-[#FF8600]/10 active:bg-[#FF8600]/15',
  'disabled:bg-[#F7F7F7] disabled:border-[#E0E0E0] disabled:text-[#B0B0B0] disabled:opacity-100',
  'focus-visible:ring-2 focus-visible:ring-[#FF8600] focus-visible:ring-offset-2',
)

const darkVariantClasses = cn(
  'rounded-[1.5rem] font-semibold text-white',
  'bg-[#101B33] hover:bg-[#062002] active:bg-[#041801]',
  'disabled:bg-[#E5E5E5] disabled:text-[#737373] disabled:border-0',
  'focus-visible:ring-2 focus-visible:ring-[#101B33] focus-visible:ring-offset-2',
)

/** @deprecated Use default `solid` — kept for existing auth screens */
const authVariantClasses = solidVariantClasses

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      children,
      asChild = false,
      variant = 'solid',
      iconPosition = 'right',
      showIcon = false,
      loading = false,
      loadingText,
      className,
      disabled,
      icon,
      size = 'default',
      ...props
    },
    ref,
  ) => {
    const isSolid = variant === 'solid'
    const isDark = variant === 'dark'
    const isOutline = variant === 'outline'
    const isAuth = variant === 'auth'

    const variantClasses = cn(
      isSolid && solidVariantClasses,
      isOutline && outlineVariantClasses,
      isDark && darkVariantClasses,
      isAuth && authVariantClasses,
      (isSolid || isAuth) && loading && 'bg-[#E67800]',
      isDark && loading && 'bg-[#041801]',
    )

    const iconColorClass =
      isSolid || isAuth
        ? 'text-white disabled:text-[#C3C7CE]'
        : isDark
          ? 'text-white disabled:text-[#737373]'
          : 'text-[#FF8600] disabled:text-[#B0B0B0]'

    const currentIcon = showIcon ? (
      loading ? (
        <ButtonSpinner className={iconColorClass} />
      ) : (
        icon || (
          <ChevronRight
            className={cn('size-4 shrink-0', iconColorClass)}
            strokeWidth={2.5}
            aria-hidden
          />
        )
      )
    ) : null

    return (
      <Button
        ref={ref}
        asChild={asChild}
        type={asChild ? undefined : 'button'}
        disabled={disabled || loading}
        className={cn(
          'gap-2 px-5 py-2.5 h-11 w-full rounded-[1.5rem] min-w-0',
          variantClasses,
          className,
        )}
        size={size}
        {...props}
      >
        {iconPosition === 'left' && currentIcon}
        {loading ? (
          <>
            {loadingText}
            <ButtonSpinner className={iconColorClass} />
          </>
        ) : (
          children
        )}
        {iconPosition === 'right' ? loading ? <></> : currentIcon : <></>}
      </Button>
    )
  },
)

CustomButton.displayName = 'CustomButton'

export { CustomButton }
