import { motion } from "framer-motion"

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <motion.div
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </div>
  )
}

