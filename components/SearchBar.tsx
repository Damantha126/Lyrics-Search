
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto animate-slide-in">
      <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : 'scale-100'}`}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for lyrics..."
          className="w-full px-6 py-4 text-lg bg-white/10 border-2 border-white/20 rounded-xl 
                   backdrop-blur-md text-white placeholder-white/60 outline-none
                   transition-all duration-300 focus:bg-white/20 focus:border-white/40
                   shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
        />
        <button
          type="submit"
          className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 p-2 
                   hover:bg-white/20 rounded-full transition-all duration-300
                   active:scale-90"
        >
          <Search className="w-6 h-6 text-white" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

