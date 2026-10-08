"use client"

import { useState, useEffect, useRef } from 'react';

interface Book {
  audioLink: string;
  imageLink: string;
  title: string;
  author: string;
}

interface CustomPlayerProps {
  book: Book;
}

export default function audioPlayer({ book }: CustomPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.error("Audio play blocked:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleScrubChange = (value: string) => {
    if (audioRef.current) {
      const newTime = parseFloat(value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, [book]);

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-20 mt-auto flex items-center justify-between bg-primary px-10 fixed bottom-0 left-0 z-100">
          <audio
        ref={audioRef}
        src={book.audioLink}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
          <div className="flex gap-3 w-calc(100% / 3)">
            <figure className="flex max-w-12">
              <figure className="w-12 h-12 min-w-12">
                <img src={book.imageLink} className="w-full h-full" />
              </figure>
            </figure>
            <div className="flex flex-col justify-center gap-1 text-sm text-white">
              <div className="font-bold">{book.title}</div>
              <div className=" text-[#bac8ce]">{book.author}</div>
            </div>
          </div>
          <div className="w-calc(100% / 3)">
            <div className="flex items-center justify-center gap-6">
                <button
          onClick={togglePlayPause}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white hover:opacity-90 transition-opacity duration-200 shadow-sm cursor-pointer"
        >
          {isPlaying ? (
            <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="w-10 h-10 fill-current ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
            </div>
          </div>
          <div className="flex gap-4 items-center w-calc(100% / 3)">
          <span className="w-10 text-left select-none text-white">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={(e) => handleScrubChange(e.target.value)}
            className="flex-1 h-1.5 bg-[#BAC8CE] rounded-lg appearance-none cursor-pointer accent-white outline-none"
            style={{
              background: `linear-gradient(to right, #20ba68 0%, #20ba68 ${(currentTime / (duration || 1)) * 100}%, #BAC8CE ${(currentTime / (duration || 1)) * 100}%, #BAC8CE 100%)`
            }}
          />
          <span className="w-10 text-right select-none text-white">{formatTime(duration)}</span>
          </div>
         
        </div>
  );
}