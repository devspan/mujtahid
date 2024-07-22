// app/page.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HadithCard } from '@/components/HadithCard';
import { sampleHadith, Hadith, sources, narrators, gradings } from './mockData';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [filteredHadiths, setFilteredHadiths] = useState(sampleHadith);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sourceFilter, setSourceFilter] = useState('all');
  const [narratorFilter, setNarratorFilter] = useState('all');
  const [gradingFilter, setGradingFilter] = useState('all');

  const itemsPerPage = 5;

  useEffect(() => {
    filterHadiths();
  }, [searchTerm, sourceFilter, narratorFilter, gradingFilter]);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const filterHadiths = () => {
    let filtered = sampleHadith.filter(hadith =>
      hadith.text.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hadith.text.arabic.includes(searchTerm)
    );

    if (sourceFilter && sourceFilter !== 'all') filtered = filtered.filter(h => h.source === sourceFilter);
    if (narratorFilter && narratorFilter !== 'all') filtered = filtered.filter(h => h.narrator === narratorFilter);
    if (gradingFilter && gradingFilter !== 'all') filtered = filtered.filter(h => h.grading === gradingFilter);

    setFilteredHadiths(filtered);
    setCurrentPage(1);
  };

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const paginatedHadiths = filteredHadiths.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-[#121212] text-[#333333] dark:text-[#e0e0e0] transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-12">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/api/placeholder/128/128" alt="Mujtahid Logo" />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              <h1 className="text-4xl font-bold text-[#00755e] dark:text-[#009b77]">Mujtahid</h1>
            </div>
            <div className="flex items-center space-x-4">
              {darkMode ? <Moon className="h-5 w-5 text-[#009b77]" /> : <Sun className="h-5 w-5 text-[#00755e]" />}
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
              <span>Dark Mode</span>
            </div>
          </header>

          <div className="mb-8 max-w-2xl mx-auto">
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-[#1e1e1e] rounded-full shadow-md p-1">
              <Input 
                type="text" 
                placeholder="Search for a Hadith..." 
                className="flex-grow border-none focus:ring-0 bg-transparent placeholder-gray-500 dark:placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button className="bg-[#00755e] dark:bg-[#009b77] hover:bg-[#005c4b] dark:hover:bg-[#007a5e] text-white rounded-full">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-4">
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                {sources.map(source => (
                  <SelectItem key={source} value={source}>{source}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={narratorFilter} onValueChange={setNarratorFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Narrator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Narrators</SelectItem>
                {narrators.map(narrator => (
                  <SelectItem key={narrator} value={narrator}>{narrator}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={gradingFilter} onValueChange={setGradingFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Grading" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Gradings</SelectItem>
                {gradings.map(grading => (
                  <SelectItem key={grading} value={grading}>{grading}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="browse" className="mb-8">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-[#1e1e1e]">
              <TabsTrigger value="browse">Browse Hadiths</TabsTrigger>
              <TabsTrigger value="analyze">Narrator Analysis</TabsTrigger>
              <TabsTrigger value="verify">Chain Verification</TabsTrigger>
            </TabsList>
            <TabsContent value="browse">
              <div className="grid gap-6">
                {paginatedHadiths.map((hadith: Hadith) => (
                  <HadithCard 
                    key={hadith.id} 
                    hadith={hadith} 
                    onBookmark={toggleBookmark}
                    isBookmarked={bookmarks.includes(hadith.id)}
                    darkMode={darkMode}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <Button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                >
                  Previous
                </Button>
                <span>Page {currentPage} of {Math.ceil(filteredHadiths.length / itemsPerPage)}</span>
                <Button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredHadiths.length / itemsPerPage)))}
                  disabled={currentPage === Math.ceil(filteredHadiths.length / itemsPerPage)}
                  variant="outline"
                >
                  Next
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="analyze">
              <Card className="bg-white dark:bg-[#1e1e1e] border-none">
                <CardHeader>
                  <CardTitle className="text-[#00755e] dark:text-[#009b77]">Narrator Analysis</CardTitle>
                  <CardDescription>Investigate the biographies and credibility of narrators</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-[#00755e] text-[#00755e] dark:border-[#009b77] dark:text-[#009b77] hover:bg-gray-100 dark:hover:bg-[#2a2a2a]">
                    Analyze Narrators
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="verify">
              <Card className="bg-white dark:bg-[#1e1e1e] border-none">
                <CardHeader>
                  <CardTitle className="text-[#00755e] dark:text-[#009b77]">Chain Verification</CardTitle>
                  <CardDescription>Verify the authenticity of Hadith chains</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-[#00755e] text-[#00755e] dark:border-[#009b77] dark:text-[#009b77] hover:bg-gray-100 dark:hover:bg-[#2a2a2a]">
                    Verify Chains
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
            <p>© 2024 Mujtahid. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}