import IconArrowLeft from "../assets/icons/ArrowLeft.svg"
import { TimedLyrics, VideoData, CustomPlayerProps } from "../global/Interfaces"
import IconPause from "../assets/icons/Pause.svg"
import IconPlay from "../assets/icons/Play.svg"
import IconRewind from "../assets/icons/Rewind.svg"
import IconFastForward from "../assets/icons/FastForward.svg"
import YouTubePlayer from "react-player/youtube"
import ReactPlayer from "react-player"
import { OnProgressProps } from "react-player/base"
import { convertSecondsToTimer } from "../lib/format"

export function CustomPlayer({
  playerRef,
  playerRefBlurred,
  currentTime,
  videoData,
  cinematicMode,
  isPlaying,
  setIsPlaying,
  handleProgress,
  rewindVideo,
  fastForwardVideo,
  handlePlayingState,
  currentCaption,
}: CustomPlayerProps) {
  return (
    <div className="player">
      <div className="player__video">
        <ReactPlayer
          ref={playerRef}
          url={videoData.url}
          playing={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          controls={false}
          pip={false}
          progressInterval={100}
          onProgress={handleProgress}
          onEnded={() => setIsPlaying(false)}
          config={{
            youtube: {
              embedOptions: { modestbranding: 1 },
            },
          }}
        />
        <div className="player__controls">
          <span>{convertSecondsToTimer(currentTime)}</span>
          <button onClick={rewindVideo}>
            <img src={IconRewind} alt="" />
          </button>
          <button onClick={handlePlayingState}>
            <img src={isPlaying ? IconPause : IconPlay} alt="" />
          </button>
          <button onClick={fastForwardVideo}>
            <img src={IconFastForward} alt="" />
          </button>
        </div>
      </div>
      <div className="player__captions">{currentCaption}</div>
      {cinematicMode && (
        <div className="player__blurred">
          <ReactPlayer
            ref={playerRefBlurred}
            url={`${videoData.url}&vq=small`}
            playing={isPlaying}
            controls={true}
            muted={true}
          />
        </div>
      )}
    </div>
  )
}