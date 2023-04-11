import ReactPlayer from "react-player"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { VideoData } from "../global/Interfaces"
import { useEffect, useRef, useState } from "react"

import IconArrowLeft from "../assets/icons/ArrowLeft.svg"
import IconPause from "../assets/icons/Pause.svg"
import IconPlay from "../assets/icons/Play.svg"
import IconRewind from "../assets/icons/Rewind.svg"
import IconFastForward from "../assets/icons/FastForward.svg"
import { OnProgressProps } from "react-player/base"

export function Caption() {
  const navigate = useNavigate()
  const playerRef = useRef<ReactPlayer>(null)
  const playerRefBlurred = useRef<ReactPlayer>(null)

  const location = useLocation()
  const { videoData } = location.state.contentData
  const { lyricsData } = location.state.contentData

  const [playedSeconds, setPlayedSeconds] = useState<number>(0)

  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [cinematicMode, setCinematicMode] = useState<boolean>(true)

  const fastForwardVideo = () => {
    const newTime = playerRef.current?.getCurrentTime()! + 10
    playerRef.current?.seekTo(newTime)
    if (cinematicMode) playerRefBlurred.current?.seekTo(newTime)
  }

  const rewindVideo = () => {
    const newTime = playerRef.current?.getCurrentTime()! - 10
    playerRef.current?.seekTo(newTime)

    if (cinematicMode) playerRefBlurred.current?.seekTo(newTime)
  }

  const handlePlayingState = () => {
    setIsPlaying((prevState) => !prevState)
  }

  const handleProgress = (progress: OnProgressProps) => {
    setPlayedSeconds(progress.playedSeconds)
    // handleVerse(progress.playedSeconds)
  }

  const handleCinematicMode = () => {
    setCinematicMode((prevState) => !prevState)
  }


  return (
    <div className="lyrics-page">
      <header className="lyrics-page__header">
        <div className="lyrics-page__header-wrapper">
          <Link to={"/lyrics"} state={{ videoUrl: videoData.url }}>
            <button className="button" type="submit">
              <img src={IconArrowLeft} alt="" />
              <span>Voltar</span>
            </button>
          </Link>
        </div>

        <h1 className="lyrics-page__title">{}</h1>
        <div className="lyrics-page__header-wrapper"></div>
      </header>

      <main>
        <div className="player">
          <div className="player__video">
            <ReactPlayer
              ref={playerRef}
              url={videoData.url}
              playing={isPlaying}
              controls={false}
              pip={false}
              progressInterval={100}
              onProgress={handleProgress}
            />
            <div className="player__controls">
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
          <div className="player__captions">Lorem Ipsum</div>
          {cinematicMode && (
            <div className="player__blurred">
              <ReactPlayer
                ref={playerRefBlurred}
                url={videoData.url}
                playing={isPlaying}
                controls={false}
                muted={true}
              />
            </div>
          )}
        </div>
        <input
          type="checkbox"
          name=""
          id=""
          checked={cinematicMode}
          onChange={handleCinematicMode}
        />
      </main>
    </div>
  )
}
