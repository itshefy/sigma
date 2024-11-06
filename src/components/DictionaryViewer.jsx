import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import { Badge } from '../components/ui/badge';
import { SIGMA_DICTIONARY } from '../lib/dictionaries/sigma';

export const DictionaryViewer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Extract categories from dictionary
  const categories = [...new Set(
    Object.entries(SIGMA_DICTIONARY)
      .map(([key, value]) => {
        const comment = key.match(/\/\/ (.+)/);
        return comment ? comment[1] : 'אחר';
      })
  )];

  // Filter dictionary based on search and category
  const filteredDictionary = Object.entries(SIGMA_DICTIONARY)
    .filter(([key, value]) => {
      const matchesSearch = searchTerm === '' ||
        key.includes(searchTerm) ||
        value.includes(searchTerm);
      
      const matchesCategory = selectedCategory === 'all' ||
        key.includes(selectedCategory);
      
      return matchesSearch && matchesCategory;
    });

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-4 mb-4">
        <Input
          placeholder="חיפוש מילים..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
          dir="rtl"
        />
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        <Badge
          className={`cursor-pointer ${
            selectedCategory === 'all' ? 'bg-yellow-500' : ''
          }`}
          onClick={() => setSelectedCategory('all')}
        >
          הכל
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category}
            className={`cursor-pointer ${
              selectedCategory === category ? 'bg-yellow-500' : ''
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      <ScrollArea className="h-[400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDictionary.map(([hebrew, sigma], index) => (
            <motion.div
              key={hebrew}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-3 bg-white/30 dark:bg-gray-700/30 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium" dir="rtl">{hebrew}</span>
                <span className="text-yellow-600 dark:text-yellow-400">
                  {sigma}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};