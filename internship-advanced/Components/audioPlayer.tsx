"use client";

import { useState, useEffect, useRef } from "react";

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
  const [isImageLoading, setIsImageLoading] = useState(true);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((err) => console.error("Audio play blocked:", err));
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

  const skipAhead = () => {
    if (audioRef.current) {
      const newTime = Math.min(audioRef.current.currentTime + 10, duration);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipBack = () => {
    if (audioRef.current) {
      const newTime = Math.max(audioRef.current.currentTime - 10, 0);
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
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-40 py-4 mt-auto flex flex-col items-center justify-center bg-primary px-10 fixed bottom-0 left-0 z-100 md:justify-between md:flex-row md:h-20">
      <audio
        ref={audioRef}
        src={book.audioLink}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="flex gap-3 w-[calc(100%/3)]">
        <figure className="flex max-w-12">
          <figure className="w-12 h-12 min-w-12">
            {isImageLoading && (
              <div className="w-full h-full bg-gray-300"></div>
            )}
            {book.imageLink && (
              <img
                src={book.imageLink}
                className={`w-full h-full object-cover ${isImageLoading ? "hidden" : "block"}`}
                onLoad={() => setIsImageLoading(false)}
              />
            )}
          </figure>
        </figure>
        <div className="flex flex-col justify-center gap-1 text-sm text-white">
          {!book?.title ? (
            <>
              <div className="w-25 h-4 mb-2 bg-gray-300"></div>
              <div className="w-14 h-4 mb-2 bg-gray-300"></div>
            </>
          ) : (
            <>
              <div className="font-bold">{book.title}</div>
              <div className=" text-[#bac8ce]">{book.author}</div>
            </>
          )}
        </div>
      </div>
      <div className="w-[calc(100%/3)]">
        <div className="flex items-center justify-center gap-6">
          <button onClick={skipBack} className="cursor-pointer">
            <svg
              className="w-7 h-7"
              stroke="white"
              fill="white"
              strokeWidth="0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="white"
                strokeWidth="2"
                d="M3.11111111,7.55555556 C4.66955145,4.26701301 8.0700311,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 L12,22 C6.4771525,22 2,17.5228475 2,12 M2,4 L2,8 L6,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"
              ></path>
            </svg>
          </button>
          <button
            onClick={togglePlayPause}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white hover:opacity-90 transition-opacity duration-200 shadow-sm cursor-pointer"
          >
            {isPlaying ? (
              <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg
                className="w-10 h-10 fill-current ml-0.5"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button className="cursor-pointer" onClick={skipAhead}>
            <svg
              className="w-7 h-7"
              stroke="white"
              fill="white"
              strokeWidth="0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="white"
                strokeWidth="2"
                d="M20.8888889,7.55555556 C19.3304485,4.26701301 15.9299689,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 L12,22 C17.5228475,22 22,17.5228475 22,12 M22,4 L22,8 L18,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex gap-4 items-center w-[calc(100%/3)]">
        <span className="w-10 text-left select-none text-white">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={(e) => handleScrubChange(e.target.value)}
          className="flex-1 h-1.5 bg-[#BAC8CE] rounded-lg appearance-none cursor-pointer accent-white outline-none"
          style={{
            background: `linear-gradient(to right, #20ba68 0%, #20ba68 ${(currentTime / (duration || 1)) * 100}%, #BAC8CE ${(currentTime / (duration || 1)) * 100}%, #BAC8CE 100%)`,
          }}
        />
        <span className="w-10 text-right select-none text-white">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
