import { useState } from 'react';
import { marked } from 'marked';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface OutputContentProps {
  content: string;
}

interface Section {
  title: string;
  content: string;
}

export default function OutputContent({ content }: OutputContentProps) {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const parseSections = (content: string): Section[] => {
    const sections: Section[] = [];
    let currentTitle = '';
    let currentContent: string[] = [];

    content.split('\n').forEach(line => {
      if (line.startsWith('📊') || line.startsWith('📸') || 
          line.startsWith('💡') || line.startsWith('🎯')) {
        if (currentTitle) {
          sections.push({
            title: currentTitle,
            content: currentContent.join('\n')
          });
          currentContent = [];
        }
        currentTitle = line;
      } else if (line.trim() === '') {
        if (currentTitle && currentContent.length > 0) {
          sections.push({
            title: currentTitle,
            content: currentContent.join('\n')
          });
          currentContent = [];
          currentTitle = '';
        }
      } else {
        if (currentTitle) {
          currentContent.push(line);
        }
      }
    });

    // Add the last section if exists
    if (currentTitle && currentContent.length > 0) {
      sections.push({
        title: currentTitle,
        content: currentContent.join('\n')
      });
    }

    return sections;
  };

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const sections = parseSections(content);

  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleSection(section.title)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
            <motion.div
              animate={{ rotate: openSections[section.title] ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openSections[section.title] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-4 bg-white">
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: marked(section.content.split('\n').map(line => {
                        if (line.startsWith('•')) {
                          return `- ${line.substring(1)}`;
                        }
                        return line;
                      }).join('\n'))
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}