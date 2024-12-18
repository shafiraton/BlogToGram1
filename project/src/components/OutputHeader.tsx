import { SparklesIcon } from '@heroicons/react/24/outline';

interface OutputHeaderProps {
  title: string;
}

export default function OutputHeader({ title }: OutputHeaderProps) {
  return (
    <div className="flex items-center space-x-3 mb-4">
      <SparklesIcon className="h-6 w-6 text-primary" />
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    </div>
  );
}