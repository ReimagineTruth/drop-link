// Define available sounds
export const sounds = {
  uiTap: '/sounds/ui-tap.wav',
  success: '/sounds/success.wav',
  error: '/sounds/error.wav',
  loadingComplete: '/sounds/success.wav', // Reuse success sound for loading complete
  notification: '/sounds/success.wav' // Reuse success sound for notifications
};

// Play sound function with error handling
export const playSound = (soundPath: string, volume: number = 0.5) => {
  try {
    // Check if Audio is available
    if (typeof Audio === 'undefined') {
      console.log('Audio not available in this environment');
      return;
    }
    
    const audio = new Audio(soundPath);
    audio.volume = Math.max(0, Math.min(1, volume)); // Clamp volume between 0 and 1
    
    // Handle audio play promise
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Audio playback failed:', error);
      });
    }
  } catch (error) {
    console.log('Sound initialization failed:', error);
  }
};
