'use client'

import { useState } from 'react'
import { TrendingRepos } from '@/widgets/trending-repos'
import { SettingsPage } from '@/widgets/settings-page'
import { Navigation } from '@/features/navigation'
import { AnimatePresence, motion } from 'framer-motion'

export const Home = () => {
  const [showSettings, setShowSettings] = useState(false)

  const toggleSettings = () => setShowSettings((prev) => !prev)
  const showTrending = () => setShowSettings(false)

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Static Sidebar for Desktop */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:block w-64 fixed top-0 left-0 bottom-0 border-r border-gray-200 overflow-y-auto"
      >
        <Navigation
          className="p-4 w-full"
          onSettingsClick={toggleSettings}
          onTrendingClick={showTrending}
          showSettings={showSettings}
        />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          <div className="container mx-auto p-4 md:p-6">
            <AnimatePresence mode="wait">
              {showSettings ? (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SettingsPage />
                </motion.div>
              ) : (
                <motion.div
                  key="trending"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TrendingRepos />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/80 backdrop-blur-md safe-area-pb"
        >
          <Navigation
            className="p-4"
            onSettingsClick={toggleSettings}
            onTrendingClick={showTrending}
            showSettings={showSettings}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default Home
