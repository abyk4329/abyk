import type { ReactNode } from 'react';
import { useState } from 'react';

interface NeuTabsProps {
  tabs: {
    label: string;
    content: ReactNode;
  }[];
}

export default function NeuTabs({ tabs }: NeuTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full" dir="rtl">
      {/* Tab Headers */}
      <div className="flex gap-1 mb-4 neu-inset-min rounded-lg p-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeTab === index
                ? 'neu-raised-min text-accent'
                : 'text-text/70 hover:text-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="neu-raised-min rounded-lg p-6">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
}
