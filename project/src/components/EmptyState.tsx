import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';

export default function EmptyState() {
  return (
    <div className="text-center py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <SparklesIcon className="h-10 w-10 text-primary/50 mx-auto" />
        <p className="text-gray-600">
          Enter your blog URL, select AIDA stage, and choose post type to generate ideas
        </p>
      </motion.div>
    </div>
  );
}