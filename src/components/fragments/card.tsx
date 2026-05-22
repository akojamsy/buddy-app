import { cn } from '#lib/utils'
import type { ReactNode } from 'react'

export type CardWrapperProps = {
  children: ReactNode
  className?: string
}

export function CardWrapper({ children, className }: CardWrapperProps) {
  return (
    <div className={cn('w-full rounded-[12px] bg-white p-3 sm:p-5', className)}>
      {children}
    </div>
  )
}

export default CardWrapper
