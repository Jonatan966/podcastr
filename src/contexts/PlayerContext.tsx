import { createContext, ReactNode, useState } from "react";
import { Episode } from "../interfaces/Episode";

type ContextEpisode = Pick<Episode, 'title' | 'members' | 'thumbnail' | 'duration' | 'url'>

interface PlayerContextData {
  episodeList: ContextEpisode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: ContextEpisode) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
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
  
  function play(episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  return (
    <PlayerContext.Provider value={{
      episodeList,
      currentEpisodeIndex,
      isPlaying,
      togglePlay,
      setPlayingState,
      play
    }}>
      {children}
    </PlayerContext.Provider>
  )
}