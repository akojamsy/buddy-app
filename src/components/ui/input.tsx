import * as React from 'react'

import { cn } from '#lib/utils'

const inputIconDefaults = {
  field: 'size-[18px] shrink-0 text-[#A0A0AB]',
  label: 'size-4 shrink-0 text-[#A0A0AB]',
} as const

export type InputIconSlot = {
  /** Lucide icon, custom SVG component, or SVG element */
  icon: React.ComponentType<{ className?: string }> | React.ReactElement
  className?: string
  onClick?: () => void
  ariaLabel?: string
}

export type InputLabelIconSlot = InputIconSlot & {
  position?: 'left' | 'right'
}

function renderInputIcon(slot: InputIconSlot, defaultClassName: string) {
  const { icon, className } = slot

  if (React.isValidElement(icon)) {
    return React.cloneElement(icon, {
      className: cn(
        defaultClassName,
        className,
        (icon.props as { className?: string }).className,
      ),
      'aria-hidden':
        (icon.props as { 'aria-hidden'?: boolean })['aria-hidden'] ?? true,
    } as React.Attributes & { className?: string; 'aria-hidden'?: boolean })
  }

  const Icon = icon
  return <Icon className={cn(defaultClassName, className)} aria-hidden />
}

function renderLabelIcon(
  labelIcon: InputLabelIconSlot | undefined,
  position: 'left' | 'right',
) {
  if (!labelIcon || (labelIcon.position ?? 'right') !== position) return null

  return (
    <span className='inline-flex shrink-0'>
      {renderInputIcon(labelIcon, inputIconDefaults.label)}
    </span>
  )
}

export type InputProps = React.ComponentProps<'input'> & {
  label?: string
  floatingLabel?: boolean
  labelIcon?: InputLabelIconSlot
  leftIcon?: InputIconSlot
  rightIcon?: InputIconSlot
  wrapperClassName?: string
  labelClassName?: string
  error?: string
  isRequired?: boolean
  errorClassName?: string
  characterCount?: { current: number; max: number }
}

function Input({
  className,
  type,
  label,
  floatingLabel = false,
  labelIcon,
  leftIcon,
  rightIcon,
  wrapperClassName,
  labelClassName,
  errorClassName,
  error,
  characterCount,
  isRequired = false,
  id: idProp,
  placeholder,
  value,
  defaultValue,
  onFocus,
  onBlur,
  onChange,
  ...props
}: InputProps) {
  const generatedId = React.useId()
  const errorId = `${generatedId}-error`
  const [focused, setFocused] = React.useState(false)
  const [uncontrolledValue, setUncontrolledValue] = React.useState(
    () => defaultValue?.toString() ?? '',
  )

  const isControlled = value !== undefined
  const currentValue = isControlled
    ? (value?.toString() ?? '')
    : uncontrolledValue
  const hasValue = currentValue.trim().length > 0
  const isActive = focused || hasValue

  const floatingText = label ?? placeholder ?? ''
  const useFloating = floatingLabel && Boolean(floatingText)
  const inputPlaceholder =
    useFloating && label ? placeholder : useFloating ? undefined : placeholder
  const useStaticLabel = Boolean(label) && !useFloating

  const hasIcons = Boolean(leftIcon || rightIcon)
  const hasError = Boolean(error)
  const hasWrapper =
    hasIcons ||
    useStaticLabel ||
    useFloating ||
    hasError ||
    Boolean(characterCount)
  const showCharacterCount = Boolean(characterCount) && hasValue
  const showFooter = hasError || showCharacterCount

  const inputId = idProp ?? (hasWrapper ? generatedId : undefined)

  const inputClassName = cn(
    'h-10 w-full min-w-0 rounded-[6px] border border-[#DDE2E4] bg-white py-1 text-sm text-[#3B3B45] placeholder:text-[#5B6871] shadow-none ring-0 transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive dark:bg-input/30 dark:aria-invalid:border-destructive/50',
    hasError && 'border-destructive',
    !hasError && useFloating && isActive && 'border-[#FF8600]',
    !hasError &&
      !useFloating &&
      'border-[#DDE2E4] focus-visible:border-[#FF8600] focus-visible:ring-0',
    !hasError && useFloating && !isActive && 'border-[#DDE2E4]',
    leftIcon ? 'pl-10' : 'pl-3',
    rightIcon ? 'pr-10' : 'pr-3',
    className,
  )

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true)
    onFocus?.(event)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false)
    onBlur?.(event)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledValue(event.target.value)
    }
    onChange?.(event)
  }

  const inputElement = (
    <input
      type={type}
      id={inputId}
      data-slot='input'
      className={inputClassName}
      placeholder={inputPlaceholder}
      value={value}
      defaultValue={isControlled ? undefined : defaultValue}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      aria-invalid={hasError || undefined}
      aria-describedby={hasError ? errorId : undefined}
      {...props}
    />
  )

  if (!hasWrapper) {
    return (
      <input
        type={type}
        id={idProp}
        data-slot='input'
        className={cn(
          'h-9 w-full min-w-0 rounded-[6px] border border-[#DDE2E4] bg-transparent px-2.5 py-1 text-base shadow-xs ring-0 transition-colors outline-none placeholder:text-[#5B6871] focus-visible:border-[#FF8600] focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        {...props}
      />
    )
  }

  return (
    <div className={cn('flex w-full flex-col gap-1.5', wrapperClassName)}>
      {useFloating && (
        <label
          htmlFor={inputId}
          className={cn(
            'flex items-center gap-1.5 text-sm font-medium text-[#3B3B45]',
            labelClassName,
          )}
        >
          {renderLabelIcon(labelIcon, 'left')}
          <span>{floatingText}</span>
          {isRequired && (
            <span className='text-destructive' aria-hidden>
              *
            </span>
          )}
          {renderLabelIcon(labelIcon, 'right')}
        </label>
      )}

      {useStaticLabel && (
        <label
          htmlFor={inputId}
          className={cn(
            'flex items-center gap-1.5 text-sm font-medium text-[#3B3B45]',
            labelClassName,
          )}
        >
          {renderLabelIcon(labelIcon, 'left')}
          <span>{label}</span>
          {isRequired && (
            <span className='text-destructive' aria-hidden>
              *
            </span>
          )}
          {renderLabelIcon(labelIcon, 'right')}
        </label>
      )}

      <div className='relative'>
        {leftIcon && (
          <span className='pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center'>
            {renderInputIcon(leftIcon, inputIconDefaults.field)}
          </span>
        )}
        {inputElement}
        {rightIcon &&
          (rightIcon.onClick ? (
            <button
              type='button'
              tabIndex={0}
              className='absolute top-1/2 right-3 flex -translate-y-1/2 cursor-pointer items-center text-[#A0A0AB] transition-colors hover:text-[#5B6871]'
              onClick={rightIcon.onClick}
              aria-label={rightIcon.ariaLabel ?? 'Toggle field action'}
            >
              {renderInputIcon(rightIcon, inputIconDefaults.field)}
            </button>
          ) : (
            <span className='pointer-events-none absolute top-1/2 right-3 flex -translate-y-1/2 items-center'>
              {renderInputIcon(rightIcon, inputIconDefaults.field)}
            </span>
          ))}
      </div>

      {showFooter && (
        <div className='flex items-center justify-between gap-2'>
          <div className='min-w-0 flex-1'>
            {hasError && (
              <p
                id={errorId}
                role='alert'
                className={cn('text-sm text-destructive', errorClassName)}
              >
                {error}
              </p>
            )}
          </div>
          {showCharacterCount && characterCount && (
            <p
              className='shrink-0 text-[13px] text-[#A0A0AB] tracking-[-0.45%]'
              aria-live='polite'
            >
              {characterCount.current} / {characterCount.max}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export { Input }
