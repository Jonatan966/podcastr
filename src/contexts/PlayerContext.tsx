import { createContext, ReactNode, useContext, useState } from "react";
import { Episode } from "../interfaces/Episode";

type ContextEpisode = Pick<Episode, 'title' | 'members' | 'thumbnail' | 'duration' | 'url'>

interface PlayerContextData {
  episodeList: ContextEpisode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: ContextEpisode) => void;
  playList: (list: Episode[], index: number) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
  playNext: () => void;
  playPrevious: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  clearPlayerState: () => void;
  isShuffling: boolean;
  isLooping: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
}

interface PlayerContextProviderProps {
  children: ReactNode;
}

export const PlayerContext = createContext<PlayerContextData>(
  {} as PlayerContextData
)

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)
  
  function play(episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping)
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  function clearPlayerState() {
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }

  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

  function playNext() {
    if (isShuffling) {
      const nextRndomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRndomEpisodeIndex)
    }
    else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  return (
    <PlayerContext.Provider value={{
      episodeList,
      currentEpisodeIndex,
      isPlaying,
      togglePlay,
      setPlayingState,
      clearPlayerState,
      playList,
      playNext,
      playPrevious,
      hasNext,
      hasPrevious,
      play,
      toggleLoop,
      isLooping,
      toggleShuffle,
      isShuffling,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const playerContext = useContext(PlayerContext)

  return playerContext
}
