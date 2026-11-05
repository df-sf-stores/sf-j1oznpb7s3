'use client'

import { clsx } from 'clsx'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useInView, useReducedMotion } from '@dripfunnel/storefront-core/theme'

export const Reveal = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const seen = useInView(ref, { once: true })
  const [armed, setArmed] = useState(false)
  useEffect(() => setArmed(true), [])
  const hidden = armed && !reduce && !seen
  return (
    <div ref={ref} className={clsx('[transition:opacity_600ms,transform_600ms]', hidden ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100')}>
      {children}
    </div>
  )
}
