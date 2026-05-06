import { useEvent } from 'expo';
import { useVideoPlayer } from 'expo-video';

interface UseVideoOptions {
  sourceUri: string;
  autoPlay?: boolean;
  loop?: boolean;
  shouldPlay?: boolean;
  muted?: boolean;
}

interface UseVideoControls {
  player: ReturnType<typeof useVideoPlayer>;
  isPlaying: boolean;
}

export const useCustomVideoPlayer = ({
  sourceUri,
  autoPlay = true,
  loop = true,
  shouldPlay,
  muted = false,
}: UseVideoOptions): UseVideoControls => {
  const playerInstance = useVideoPlayer(sourceUri, instance => {
    instance.loop = loop;

    if (autoPlay && sourceUri) {
      instance.play();
    }

    instance.muted = muted;
  });

  const { isPlaying } = useEvent(playerInstance, 'playingChange', {
    isPlaying: playerInstance.playing,
  });

  if (shouldPlay !== undefined) {
    if (shouldPlay && !isPlaying) {
      playerInstance.play();
    } else if (!shouldPlay && isPlaying) {
      playerInstance.pause();
    }
  }

  return {
    player: playerInstance,
    isPlaying,
  };
};
