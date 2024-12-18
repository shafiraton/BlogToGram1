import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <motion.div
        className="relative w-16 h-16"
      >
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-full h-full rounded-full border-2 border-primary"
            style={{ borderRadius: '50%' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.8, 0.1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <span className="text-2xl">✨</span>
        </motion.div>
      </motion.div>
      <p className="text-gray-600 font-medium">Crafting your content...</p>
    </div>
  );
}