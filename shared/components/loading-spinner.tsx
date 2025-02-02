import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-12 h-12 border-4',
}

export const LoadingSpinner = ({
  size = 'sm',
  className,
}: LoadingSpinnerProps) => {
  return (
    <div
      data-testid="loading-spinner"
      className={cn('flex justify-center items-center', className)}
    >
      <motion.div
        className={cn(
          'rounded-full border-primary/30 border-t-primary',
          sizeMap[size]
        )}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}
