"use client";
import React, { useState } from 'react';
import { Spotlight } from "@/components/ui/spotlight-new";
import SearchBar from "@/components/SearchBar";
import LyricsCard from '@/components/LyricsCard';
import { Toaster } from 'sonner';
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion"

interface LyricsData {
  title?: string;
  artist?: string;
  lyrics?: string;
  cover_image?: string;
  language?: string;
  msg?: string;
}

interface ApiResponse {
  status: {
    success: boolean;
    code: number;
    description: string;
  };
  result: LyricsData;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [lyrics, setLyrics] = useState<LyricsData | null>(null);

  const searchLyrics = async (query: string) => {
    setLoading(true);
    setLyrics(null);
    try {
      const response = await fetch(`https://sd-apis.vercel.app/lyrics?song=${encodeURIComponent(query)}`, {
        headers: {
          Accept: "application/json",
        },
      })
      //console.log(response.json());
      const data = await response.json();
      //console.log("data tik",data);
      
      if (data.status.success && data.result.lyrics) {
        setLyrics(data.result);
      } else {
        toast(data.result.msg || "No lyrics found for this song.",{});
      }
    } catch (error) {
      console.log(error)
      toast("Failed to fetch lyrics. Please try again.", {});
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-900 min-h-screen p-6 md:p-8">
      <Spotlight gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(195, 98%, 56%, 0.08) 0%, hsla(225, 100%, 60%, 0.02) 50%, hsla(230, 100%, 55%, 0) 80%)" />
      <div className="container mx-auto px-4 py-12 relative z-10">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#21d1fd] to-[#2158ff]">Lyrics</span>
        <span className="text-white"> Search</span>
        </h1>
        <p className="text-lg md:text-xl text-white/80">Find the lyrics to any song — any language in seconds</p>
        <SearchBar onSearch={searchLyrics} />
        <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-center py-12"
          >
            <div className="loader">
              <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-[#21d1fd] animate-spin"></div>
            </div>
          </motion.div>
        ) : lyrics ? (
          <LyricsCard
          title={lyrics.title || 'Unknown Title'}
          artist={lyrics.artist || 'Unknown Artist'}
          lyrics={lyrics.lyrics || 'No lyrics available'}
          coverImage={lyrics.cover_image || '/placeholder.svg'}
          language={lyrics.language || 'Unknown'}
          />
        ) : null}
      </AnimatePresence>
      </div>
      </div>
      <Toaster position="bottom-right" toastOptions={{
          classNames: {
            toast: 'backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl',
          },
        }} />
    </div>
  );
}
