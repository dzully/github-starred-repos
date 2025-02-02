import { cn } from '@/shared/lib/helpers/utils'
import { Button } from '@/components/ui/button'
import { Settings, Star } from 'lucide-react'
import { motion } from 'framer-motion'

interface NavigationProps {
  className?: string
  onSettingsClick: () => void
  onTrendingClick: () => void
  showSettings: boolean
}

export const Navigation = ({
  className,
  onSettingsClick,
  onTrendingClick,
  showSettings,
}: NavigationProps) => {
  return (
    <nav
      className={cn(
        'flex md:flex-col justify-between md:justify-start gap-4',
        className
      )}
    >
      <div className="flex md:flex-col w-full gap-4">
        {/* Trending Button */}
        <div className="flex-1 md:flex-initial">
          <Button
            variant="ghost"
            className={cn(
              'w-full h-auto md:h-10 py-2 md:py-2 px-4',
              'flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-2',
              'hover:bg-gray-100/50 transition-colors duration-200',
              !showSettings
                ? 'text-blue-500 md:text-primary'
                : 'text-gray-400 hover:text-gray-900'
            )}
            onClick={onTrendingClick}
          >
            <Star
              className={cn(
                'w-7 h-7 md:w-5 md:h-5 transition-colors duration-200',
                !showSettings && 'fill-blue-500 md:fill-primary'
              )}
            />
            <span className="text-xs md:text-sm font-medium">Trending</span>
          </Button>
        </div>

        {/* Settings Button */}
        <div className="flex-1 md:flex-initial">
          <Button
            variant="ghost"
            className={cn(
              'w-full h-auto md:h-10 py-2 md:py-2 px-4',
              'flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-2',
              'hover:bg-gray-100/50 transition-colors duration-200',
              showSettings
                ? 'text-blue-500 md:text-primary'
                : 'text-gray-400 hover:text-gray-900'
            )}
            onClick={onSettingsClick}
          >
            <Settings
              className={cn(
                'w-7 h-7 md:w-5 md:h-5 transition-colors duration-200',
                showSettings && 'fill-blue-500 md:fill-primary'
              )}
            />
            <span className="text-xs md:text-sm font-medium">Settings</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}
