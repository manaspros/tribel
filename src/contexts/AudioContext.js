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

    setSounds({
      nature: natureSound,
      drums: drumsSound,
      museum: museumSound,
    });

    return () => {
      // Cleanup sounds on unmount using a local variable to avoid dependency issue
      const currentSounds = sounds;
      Object.values(currentSounds).forEach((sound) => {
        if (sound) {
          sound.pause();
          sound.currentTime = 0;
        }
      });
    };
  }, []); // Keep empty dependency array to run only on mount

  const playAmbientSound = (type) => {
    // Stop all currently playing sounds
    Object.values(sounds).forEach((sound) => {
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    });

    // Play the selected sound
    if (sounds[type] && !isMuted) {
      sounds[type]
        .play()
        .catch((err) => console.error("Audio playback error:", err));
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);

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

  return (
    <AudioContext.Provider value={{ playAmbientSound, toggleMute, isMuted }}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
