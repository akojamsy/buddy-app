import { cn } from '#lib/utils'
import type { ReactNode } from 'react'

type AuthCardProps = {
  children: ReactNode
  className?: string
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        'w-full max-w-[30.563rem] rounded-[8px] bg-white px-8 py-9 lg:px-12.5 border border-[#DDE2E4] shadow-[10px_50px_50px_0_rgba(0,0,0,0.06)] ',
        className,
      )}
    >
      {children}
    </div>
  )
}
