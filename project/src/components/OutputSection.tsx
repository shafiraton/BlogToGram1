import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import OutputHeader from './OutputHeader';
import OutputContent from './OutputContent';
import EmptyState from './EmptyState';

type PostType = 'Single Image' | 'Video' | 'Carousel' | 'Story' | 'Reel';
type AIDAStage = 'Attention' | 'Interest' | 'Desire' | 'Action';

interface OutputSectionProps {
  hasGeneratedContent: boolean;
  selectedPostType: PostType | null;
  selectedStage: AIDAStage | null;
  generatedContent: string | null;
  isLoading: boolean;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function OutputSection({ 
  hasGeneratedContent, 
  selectedPostType, 
  selectedStage,
  generatedContent,
  isLoading 
}: OutputSectionProps) {
  const getOutputTitle = () => {
    if (!hasGeneratedContent) return "Let's get started!";
    if (!selectedPostType || !selectedStage) return 'Generated Ideas';

    const stageAction = {
      'Attention': 'to Grab Attention',
      'Interest': 'to Generate Interest',
      'Desire': 'to Create Desire',
      'Action': 'to Prompt Action'
    }[selectedStage];

    return `${selectedPostType} Idea ${stageAction}`;
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm"
    >
      <OutputHeader title={getOutputTitle()} />
      
      {!hasGeneratedContent ? (
        <EmptyState />
      ) : isLoading ? (
        <LoadingSpinner />
      ) : generatedContent ? (
        <div className="space-y-4">
          <OutputContent content={generatedContent} />
        </div>
      ) : null}
    </motion.div>
  );
}