import { Check } from 'lucide-react'

const AUTH_FEATURES = [
  "Track real-time overview of company's financial performance.",
  'Track created projects budget against actual revenue and expenses.',
  'Highlighted reports on budget deficit and surplus, accounting dimensions, balance sheets and real-time sales margin estimation.',
] as const

export function FeatureList() {
  return (
    <ul className='flex max-w-[30.528rem] flex-col gap-8'>
      {AUTH_FEATURES.map((feature) => (
        <li key={feature} className='flex items-center gap-4'>
          <span
            className='mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#FF8600]'
            aria-hidden
          >
            <Check className='size-4 stroke-2 text-white' />
          </span>
          <p className='font-normal text-sm md:text-[18px] leading-[24px] tracking-[-0.011em] text-[#5B6871]'>
            {feature}
          </p>
        </li>
      ))}
    </ul>
  )
}
