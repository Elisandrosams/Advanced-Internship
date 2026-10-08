'use client';
import { useState, useEffect } from 'react';

export function useAudioDuration(audioUrl: string | undefined | null) {
  const [duration, setDuration] = useState<string>("00:00");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    
    if (!audioUrl) {
      setDuration("00:00");
      setLoading(false);
      return;
    }

    setLoading(true);
    const audio = new Audio(audioUrl);

    const handleLoadedMetadata = () => {
      const totalSeconds = audio.duration;
      
      if (!isNaN(totalSeconds)) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        setDuration(formattedTime);
      }
      setLoading(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audioUrl]);

  return { duration, loading };
}
