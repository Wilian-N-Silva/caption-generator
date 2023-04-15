import ReactPlayer from "react-player"
import { OnProgressProps } from "react-player/base"

export interface YouTubeOEmbed {
  title: string
  author_name: string
  author_url: string
  type: string
  height: number
  width: number
  version: string
  provider_name: string
  provider_url: string
  thumbnail_height: number
  thumbnail_width: number
  thumbnail_url: string
  html: string
}

export interface RawLyrics {
  videoId: string
  lyrics: string
}

export interface RawCaptionData {
  videoData: VideoData
  lyricsData: string[]
}

export interface VideoData {
  url: string
  title: string
  author_name: string
  thumbnail_url: string
}

export interface TimedLyrics {
  start: number
  end: number
  text: string
}
export interface RequestBodyProps {
  fileFormat: string
  captions: TimedLyrics[]
}

export interface CustomPlayerProps {
  playerRef: React.RefObject<ReactPlayer>
  playerRefBlurred: React.RefObject<ReactPlayer>
  videoData: VideoData
  currentTime: number
  isPlaying: boolean
  cinematicMode: boolean
  setIsPlaying: (isPlaying: boolean) => void
  handleProgress: (progress: OnProgressProps) => void
  rewindVideo: () => void
  fastForwardVideo: () => void
  handlePlayingState: () => void
  currentCaption: string | null | undefined
}
