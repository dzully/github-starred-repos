import { cn } from "@/shared/lib/helpers/utils"
import { Button } from "@/components/ui/button"
import { Settings, Star } from "lucide-react"
import { motion } from "framer-motion"

interface NavigationProps {
  className?: string
  onSettingsClick: () => void
  onTrendingClick: () => void
  showSettings: boolean
}

export const Navigation = ({ className, onSettingsClick, onTrendingClick, showSettings }: NavigationProps) => {
  return (
    <nav className={cn("flex md:flex-col justify-between md:justify-start gap-4", className)}>
      {/* Mobile and Desktop have different styles */}
      <div className="flex md:flex-col w-full gap-4">
        {/* Trending Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 md:flex-initial">
          <Button
            variant="ghost"
            className={cn(
              "w-full h-auto md:h-10 py-2 md:py-2 px-4",
              "flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-2",
              "hover:bg-gray-100/50",
              !showSettings ? "text-blue-500 md:text-primary" : "text-gray-400 hover:text-gray-900",
            )}
            onClick={onTrendingClick}
          >
            <Star
              className={cn(
                "w-7 h-7 md:w-5 md:h-5 transition-colors duration-200",
                !showSettings && "fill-blue-500 md:fill-primary",
              )}
            />
            <span className="text-xs md:text-sm font-medium">Trending</span>
            {!showSettings && (
              <motion.div
                layoutId="activeTab"
                className="hidden md:block absolute inset-0"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <div className="hidden md:block absolute inset-0 bg-primary/10 rounded-lg" />
                <div className="absolute inset-0 rounded-lg bg-primary/20 blur-xl opacity-50 hidden md:block" />
              </motion.div>
            )}
          </Button>
        </motion.div>

        {/* Settings Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 md:flex-initial">
          <Button
            variant="ghost"
            className={cn(
              "w-full h-auto md:h-10 py-2 md:py-2 px-4",
              "flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-2",
              "hover:bg-gray-100/50",
              showSettings ? "text-blue-500 md:text-primary" : "text-gray-400 hover:text-gray-900",
            )}
            onClick={onSettingsClick}
          >
            <Settings
              className={cn(
                "w-7 h-7 md:w-5 md:h-5 transition-colors duration-200",
                showSettings && "fill-blue-500 md:fill-primary",
              )}
            />
            <span className="text-xs md:text-sm font-medium">Settings</span>
            {showSettings && (
              <motion.div
                layoutId="activeTab"
                className="hidden md:block absolute inset-0"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <div className="hidden md:block absolute inset-0 bg-primary/10 rounded-lg" />
                <div className="absolute inset-0 rounded-lg bg-primary/20 blur-xl opacity-50 hidden md:block" />
              </motion.div>
            )}
          </Button>
        </motion.div>
      </div>
    </nav>
  )
}

