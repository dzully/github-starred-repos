import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import { cn } from "@/shared/lib/helpers/utils"
import { motion } from "framer-motion"

interface RepoCardProps {
  name: string
  description: string
  stars: string
  owner: {
    name: string
    avatar: string
  }
  url: string
  category?: "ml" | "web" | "mobile" | "data" | "cloud"
}

const categoryStyles = {
  ml: "bg-gradient-to-br from-purple-100 to-purple-200",
  web: "bg-gradient-to-br from-orange-50 to-orange-100",
  mobile: "bg-gradient-to-br from-blue-50 to-blue-100",
  data: "bg-gradient-to-br from-green-50 to-green-100",
  cloud: "bg-gradient-to-br from-violet-100 to-violet-200",
}

export const RepoCard = ({ name, description, stars, owner, url, category = "web" }: RepoCardProps) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block h-full">
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card
          className={cn(
            "relative h-full overflow-hidden transition-all duration-300 border-0 rounded-3xl",
            "hover:shadow-lg min-w-[280px] flex-1",
            categoryStyles[category],
          )}
        >
          <div className="p-6 flex flex-col min-h-[200px]">
            {/* Header Section - Fixed Height */}
            <div className="flex items-start justify-between mb-4">
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="text-2xl font-bold text-gray-900"
              >
                {name}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="flex items-center gap-1 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full"
              >
                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                <span className="text-sm font-medium text-gray-700">{stars}</span>
              </motion.div>
            </div>

            {/* Description Section - Flexible Height */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="text-gray-700 line-clamp-2 mb-6"
            >
              {description}
            </motion.p>

            {/* Footer Section - Fixed Height, Always at Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="flex items-center gap-3 mt-auto"
            >
              <div className="relative">
                <Image
                  src={owner.avatar || "/placeholder.svg"}
                  alt={`${owner.name}'s avatar`}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              <span className="text-sm font-medium text-gray-600">{owner.name}</span>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </a>
  )
}

