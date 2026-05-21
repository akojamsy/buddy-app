import { cn } from '#lib/utils'
import type { ReactNode } from 'react'

type AuthCardHeaderProps = {
  title: string
  description?: ReactNode
  className?: string
  titleClassName?: string
  descriptionClassName?: string
}

export function AuthCardHeader({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: AuthCardHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-3 mb-4', className)}>
      <h1
        className={cn(
          'text-2xl font-bold tracking-tight text-[#1D1D18]',
          titleClassName,
        )}
      >
        {title}
      </h1>
      {description ? (
        <p
          className={cn(
            'text-[13px] text-[#5B6871] tracking-[-0.45%]',
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
