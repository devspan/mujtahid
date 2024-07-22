// app/components/HadithCard.tsx

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Share2, Bookmark } from 'lucide-react';
import { Hadith } from '@/app/mockData';

interface HadithCardProps {
  hadith: Hadith;
  onBookmark: (id: string) => void;
  isBookmarked: boolean;
  darkMode: boolean;
}

export const HadithCard: React.FC<HadithCardProps> = ({ hadith, onBookmark, isBookmarked, darkMode }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  const shareHadith = () => {
    // Implement sharing functionality
    alert('Sharing functionality to be implemented');
  };

  return (
    <Card className={`${darkMode ? 'bg-[#1e1e1e]' : 'bg-white'} border-none mb-4`}>
      <CardHeader>
        <CardTitle className="text-[#00755e] dark:text-[#009b77] flex items-center justify-between">
          <span className="flex items-center">
            <Book className="mr-2 h-5 w-5" />
            {hadith.source}
          </span>
          <div>
            <Button variant="ghost" size="sm" onClick={() => onBookmark(hadith.id)}>
              <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-[#009b77]' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm" onClick={shareHadith}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </CardTitle>
        <CardDescription>{hadith.narrator}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-right mb-2 text-[#333333] dark:text-[#e0e0e0] font-arabic">{hadith.text.arabic}</p>
        <p className={`mb-2 text-[#4a4a4a] dark:text-[#c0c0c0] ${expanded ? '' : 'line-clamp-3'}`}>{hadith.text.english}</p>
        {!expanded && (
          <Button variant="link" onClick={toggleExpand} className="p-0 h-auto text-[#00755e] dark:text-[#009b77]">
            Read more
          </Button>
        )}
        <div className="flex justify-between text-sm text-[#666666] dark:text-[#a0a0a0] mt-2">
          <span>{hadith.chapter}</span>
          <span>Grading: {hadith.grading}</span>
        </div>
      </CardContent>
    </Card>
  );
};