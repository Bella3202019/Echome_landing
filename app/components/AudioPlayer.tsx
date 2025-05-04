"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/utils";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Initial setup for audio
  useEffect(() => {
    // Set audio state from localStorage if available
    const savedMuteState = localStorage.getItem('isMuted');
    if (savedMuteState !== null) {
      setIsMuted(savedMuteState === 'true');
    } else {
      // If no saved state, default to muted
      localStorage.setItem('isMuted', 'true');
    }
    
    // Setup audio element
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.loop = true;
      audioRef.current.muted = true; // Always start muted
      
      // Only attempt to play if explicitly unmuted
      if (!isMuted) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Autoplay prevented:", error);
          });
        }
      }
    }
  }, []);

  // Update audio when mute state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      localStorage.setItem('isMuted', isMuted.toString());
      
      // Only attempt to play when explicitly unmuted
      if (!isMuted && audioRef.current.paused) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Play prevented:", error);
          });
        }
      }
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    // If we're unmuting and the audio isn't playing yet, try to play it
    if (isMuted && audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(error => {
        console.log("Play prevented:", error);
      });
    }
  };

  return (
    <>
      {/* Audio Player */}
      <audio 
        ref={audioRef} 
        src="/assets/Echoed Serenity.mp3" 
        loop 
        muted={isMuted}
      />

      {/* Volume Toggle Button */}
      <button 
        onClick={toggleMute}
        className={cn(
          "fixed bottom-6 right-6 z-50",
          "w-12 h-12 rounded-full",
          "bg-black/30 backdrop-blur-sm",
          "flex items-center justify-center",
          "transition-all duration-300 hover:scale-110"
        )}
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
            <path d="M11 5 6 9H2v6h4l5 4V5Z"></path>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
            <path d="M11 5 6 9H2v6h4l5 4V5Z"></path>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
        )}
      </button>
    </>
  );
} 