import { Card } from '@/components/ui/card'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/shared/lib/helpers/utils'
import { motion } from 'framer-motion'

interface RepoCardProps {
  name: string
  description: string
  stars: string
  owner: {
    login: string
    avatar_url: string
  }
  url: string
  category?: 'ml' | 'web' | 'mobile' | 'data' | 'cloud'
}

const categoryStyles = {
  ml: 'bg-[#FFF8F0]',
  web: 'bg-[#FFF8F0]',
  mobile: 'bg-[#FFF8F0]',
  data: 'bg-[#FFF8F0]',
  cloud: 'bg-[#FFF8F0]',
}

export const RepoCard = ({
  name,
  description,
  stars,
  owner,
  url,
  category = 'web',
}: RepoCardProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full h-full"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Card
          className={cn(
            'relative h-full overflow-hidden border border-[#00000010] rounded-3xl',
            'hover:shadow-sm w-full',
            categoryStyles[category]
          )}
        >
          <div className="p-4 md:p-6 flex flex-col min-h-[160px] md:min-h-[180px]">
            <div className="flex items-start justify-between mb-2 md:mb-3">
              <h2 className="text-lg md:text-xl font-semibold text-[#000000DE] line-clamp-1">
                {name}
              </h2>
              <div className="flex items-center gap-1 ml-2 shrink-0">
                <Star className="w-4 h-4 text-[#FFB800]" fill="currentColor" />
                <span className="text-sm font-medium text-[#000000DE]">
                  {stars}
                </span>
              </div>
            </div>

            <p className="text-[#00000099] text-sm md:text-base line-clamp-2 mb-3 md:mb-4 flex-grow">
              {description}
            </p>

            <div className="flex items-center gap-2 mt-auto">
              <div className="relative shrink-0">
                <Image
                  src={owner.avatar_url || '/placeholder.svg'}
                  alt={`${owner.login}'s avatar`}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </div>
              <span className="text-sm font-medium text-[#00000099] line-clamp-1">
                {owner.login}
              </span>
            </div>
          </div>
        </Card>
      </motion.div>
    </a>
  )
}
