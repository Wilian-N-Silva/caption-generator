import ReactPlayer from "react-player"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { TimedLyrics, VideoData } from "../global/Interfaces"
import { useEffect, useRef, useState } from "react"

import IconArrowLeft from "../assets/icons/ArrowLeft.svg"
import IconPause from "../assets/icons/Pause.svg"
import IconPlay from "../assets/icons/Play.svg"
import IconRewind from "../assets/icons/Rewind.svg"
import IconFastForward from "../assets/icons/FastForward.svg"
import { OnProgressProps } from "react-player/base"
import YouTubePlayer from "react-player/youtube"

export function Caption() {
  const navigate = useNavigate()
  const playerRef = useRef<ReactPlayer>(null)
  const playerRefBlurred = useRef<ReactPlayer>(null)

  const location = useLocation()
  const { videoData } = location.state.contentData
  const { lyricsData } = location.state.contentData

  const [playedSeconds, setPlayedSeconds] = useState<number>(0)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [verse, setVerse] = useState<string | null>()

  const [lyricsArray, setLyricsArray] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [cinematicMode, setCinematicMode] = useState<boolean>(true)

  const [timedLyrics, setTimedLyrics] = useState<TimedLyrics[]>([])
  const [captionTimestampStart, setCaptionTimestampStart] = useState<number>(0)

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

  const previousCaptionIndex = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === null
        ? 0
        : (prevIndex - 1 + lyricsArray.length) % lyricsArray.length
    )
  }
  const nextCaptionIndex = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === null ? 0 : (prevIndex + 1) % lyricsArray.length
    )
  }

  const handlePlayingState = () => {
    setIsPlaying((prevState) => !prevState)
  }

  const handleProgress = (progress: OnProgressProps) => {
    setPlayedSeconds(progress.playedSeconds)
    handleVerse(progress.playedSeconds)
  }

  const handleCinematicMode = () => {
    setCinematicMode((prevState) => !prevState)
  }

  const handleIncomingData = () => {
    setLyricsArray(lyricsData)
  }

  const formatToSRT = (index: number, line: TimedLyrics) =>
    `${index} 00:${secondsToISOPlayTime(
      line.start
    )} --> 00:${secondsToISOPlayTime(line.end)} ${line.text}`


  const secondsToISOPlayTime = (seconds: number) => {
    const formattedTime = new Date(seconds * 1000).toISOString().slice(14, 23)
    return formattedTime
  }

  const handleKeyUp = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.code === "Space") {
      const timed: TimedLyrics = {
        text: lyricsArray[selectedIndex],
        start: captionTimestampStart,
        end: playedSeconds,
      }
      const newData = [...timedLyrics, timed]
      setTimedLyrics(newData)
      nextCaptionIndex()
    }
  }

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    ev.preventDefault()
    switch (ev.code) {
      case "ArrowUp":
        previousCaptionIndex()
        break
      case "ArrowDown":
        nextCaptionIndex()
        break
      case "ArrowLeft":
        rewindVideo()
        break
      case "ArrowRight":
        fastForwardVideo()
        break
      case "KeyP":
        setIsPlaying((prevState) => !prevState)
        break
      case "Space":
        if (selectedIndex !== null && !ev.repeat) {
          // setIsPressingSpace(true)
          setCaptionTimestampStart(playedSeconds)
        }
        break
      default:
        break
    }
  }

  const handleVerse = (seconds: number) => {
    const legenda = timedLyrics.find(
      (caption) => caption.start <= seconds && caption.end >= seconds
    )

    if (!legenda) {
      setVerse("")
      return
    }
    setVerse(legenda.text)
  }

  useEffect(() => {
    handleIncomingData()
  }, [])

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
        <div className="col">
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
                config={{
                  youtube: {
                    embedOptions: { modestbranding: 1 },
                  },
                }}
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
            <div className="player__captions">{verse}</div>
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

          <div
            className=""
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            tabIndex={0}
          >
            <ul onKeyDown={(ev) => handleKeyDown} tabIndex={0}>
              {lyricsArray.map((line, index) => {
                return (
                  <li
                    key={`raw_${index}`}
                    className={`raw__lyric ${
                      index === selectedIndex ? "raw__lyric--selected" : ""
                    }`}
                  >
                    {line}
                  </li>
                )
              })}
            </ul>
            <ul>
              {timedLyrics.map((line, index) => {
                return (
                  <li key={`timed_${index}`} className="timed__lyric">
                    {formatToSRT(index + 1, line)}
                  </li>
                )
              })}
            </ul>
          </div>
          <input
            type="checkbox"
            name=""
            id=""
            checked={cinematicMode}
            onChange={handleCinematicMode}
          />
        </div>
      </main>
    </div>
  )
}
