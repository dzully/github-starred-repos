import { RepoList } from '@/features/repo-list'
import { motion } from 'framer-motion'

export const TrendingRepos = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center pb-4 mb-4 border-b md:border-b-0">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl font-bold text-gray-900"
        >
          Trending Repos
        </motion.h1>
      </div>
      <RepoList />
    </motion.div>
  )
}
