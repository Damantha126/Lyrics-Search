import React, { useState } from 'react';
import { toast } from "sonner"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LyricsCardProps {
  title: string;
  artist: string;
  lyrics: string;
  coverImage: string;
  language: string;
}

const LyricsCard = ({ title, artist, lyrics, coverImage, language }: LyricsCardProps) => {
  const [copying, setCopying] = useState(false)

  // Function to copy lyrics to clipboard
  const copyLyrics = async () => {
    if (!lyrics) return;

    setCopying(true);
    try {
      await navigator.clipboard.writeText(lyrics);
      toast.success(`Lyrics for "${title}" by ${artist} copied to clipboard.`, {
        className: "bg-white/10 backdrop-blur-md border-white/20 text-white",
      });
    } catch (err) {
      console.log(err);
      const textArea = document.createElement("textarea");
      textArea.value = lyrics;
      textArea.style.position = "fixed"; // Prevent scrolling
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand("copy"); // Legacy method
        toast.success(`Lyrics for "${title}" by ${artist} copied to clipboard.`, {
          className: "bg-white/10 backdrop-blur-md border-white/20 text-white",
        });
      } catch (err) {
        console.log(err);
        toast.error("Could not copy lyrics to clipboard. Please try again.", {
          className: "bg-white/10 backdrop-blur-md border-white/20 text-white",
        });
      } finally {
        document.body.removeChild(textArea);
      }
    } finally {
      // Reset the copying state after a short delay for button animation
      setTimeout(() => setCopying(false), 2000);
    }
  }


  return (
    <div className="relative overflow-hidden backdrop-blur-xl bg-white/10 border-2 border-white/20 rounded-2xl p-6 
                    shadow-[0_8px_30px_rgb(0,0,0,0.12)] animate-slide-up
                    hover:bg-white/12 transition-all duration-300 text-white">

      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
          <img
            src={coverImage}
            alt={`${title} by ${artist}`}
            className="w-full h-full rounded-lg object-cover shadow-lg 
                     transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
        </div>

        <div className="flex-1 space-y-4 text-left relative">
          {/* Copy Button at Top-Right */}
          <Button 
            onClick={copyLyrics}
            className='cursor-pointer absolute top-0 right-0 px-3 py-1 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all duration-300'
            disabled={copying}>
            <Copy /> Copy Lyrics
          </Button>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 animate-slide-in">{title}</h2>
            <p className="text-white/80 text-lg mb-2 animate-slide-in" style={{ animationDelay: '0.1s' }}>{artist}</p>
            <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-sm text-white/90 mb-4"
              style={{ animationDelay: '0.2s' }}>
              {language}
            </div>
          </div>

          <div className="prose prose-invert max-w-none animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <p className="whitespace-pre-line leading-relaxed text-white">{lyrics}</p>
          </div>
        </div>
      </div>

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
};

export default LyricsCard;

