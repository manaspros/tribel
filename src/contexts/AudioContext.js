import React, { createContext, useState, useContext, useEffect } from "react";

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

const AudioProvider = ({ children }) => {
  const [sounds, setSounds] = useState({
    nature: null,
    drums: null,
    museum: null,
  });

  const [isMuted, setIsMuted] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    // Load all audio files - using relative paths to public directory
    const natureSound = new Audio("./assets/audio/nature-ambience.mp3");
    natureSound.loop = true;
    natureSound.volume = 0.4;

    const drumsSound = new Audio("./assets/audio/tribal-drums.mp3");
    drumsSound.loop = true;
    drumsSound.volume = 0.5;

    const museumSound = new Audio("./assets/audio/museum-ambience.mp3");
    museumSound.loop = true;
    museumSound.volume = 0.3;

    // Create the sounds object
    const newSounds = {
      nature: natureSound,
      drums: drumsSound,
      museum: museumSound,
    };

    setSounds(newSounds);

    // Add event listener for user interaction
    const handleUserInteraction = () => {
      setUserInteracted(true);
      // Remove event listeners after first interaction
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);

    return () => {
      // Cleanup sounds using the reference to newSounds instead of sounds state
      Object.values(newSounds).forEach((sound) => {
        if (sound) {
          sound.pause();
          sound.currentTime = 0;
        }
      });

      // Remove event listeners
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, []); // Keep empty dependency array to run only on mount

  const playAmbientSound = (type) => {
    // If user hasn't interacted, store the sound type to play later
    if (!userInteracted) {
      return;
    }

    // Stop all currently playing sounds
    Object.values(sounds).forEach((sound) => {
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    });

    // Play the selected sound if not muted
    if (sounds[type] && !isMuted) {
      sounds[type]
        .play()
        .catch((err) => console.error("Audio playback error:", err));
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);

    // If user toggles mute, consider it an interaction
    setUserInteracted(true);

    Object.values(sounds).forEach((sound) => {
      if (sound) {
        if (!isMuted) {
          sound.pause();
        } else if (sound.paused && sound.currentTime > 0) {
          sound
            .play()
            .catch((err) => console.error("Audio playback error:", err));
        }
      }
    });
  };

  // Add a method to play sound after user interaction
  const attemptPlayOnInteraction = (type) => {
    if (userInteracted && sounds[type] && !isMuted) {
      playAmbientSound(type);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        playAmbientSound,
        toggleMute,
        isMuted,
        userInteracted,
        attemptPlayOnInteraction,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
