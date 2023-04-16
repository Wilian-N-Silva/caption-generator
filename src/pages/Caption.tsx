import ReactPlayer from "react-player"
import { Link, useLocation, useNavigate } from "react-router-dom"

import {
  CustomPlayerProps,
  RequestBodyProps,
  TimedLyrics,
} from "../global/Interfaces"
import { useEffect, useRef, useState } from "react"

import IconArrowLeft from "../assets/icons/ArrowLeft.svg"

import { OnProgressProps } from "react-player/base"
import { Instructions } from "../components/Instructions"
import axios from "axios"
import { api } from "../lib/axios"
import { CustomPlayer } from "../components/CustomPlayer"
import { UntimedLine } from "../components/UntimedLine"
import { TimedLine } from "../components/TimedLine"

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

  const [isPressingSpace, setIsPressingSpace] = useState<boolean>(false)

  const fastForwardVideo = () => {
    const newTime = playerRef.current?.getCurrentTime()! + 10
    playerRef.current?.seekTo(newTime)
    if (cinematicMode) playerRefBlurred.current?.seekTo(newTime)
  }

  const handleUntimedLineClick = (index: number) => setSelectedIndex(index)

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

  const handleSeekStartTime = (seconds: number) => {
    playerRef.current?.seekTo(seconds)
    if (!isPlaying) setIsPlaying(true)
  }

  const handleIncomingData = () => {
    setLyricsArray(lyricsData)
  }

  const handleKeyUp = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.code === "Space") {
      setIsPressingSpace(false)

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
          setIsPressingSpace(true)
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

  const handleSRTRequest = () => {
    const requestData: RequestBodyProps = {
      fileFormat: "srt",
      captions: timedLyrics,
    }

    const downloadFile = async (fileUrl: string, fileData: string) => {
      const response = await axios({
        url: fileUrl,
        method: "GET",
        responseType: "blob",
      })

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = downloadUrl
      link.setAttribute("download", fileData)
      document.body.appendChild(link)
      link.click()
    }

    api.post("/export", requestData).then((response) => {
      downloadFile(
        `${response.config.baseURL}/public/${response.data}`,
        response.data
      )
    })
  }

  useEffect(() => {
    handleIncomingData()
  }, [])

  return (
    <div className="caption-page">
      <header className="caption-page__header">
        <div className="caption-page__header-wrapper">
          <Link to={"/lyrics"} state={{ videoUrl: videoData.url }}>
            <button className="button" type="submit">
              <img src={IconArrowLeft} alt="" />
              <span>Voltar</span>
            </button>
          </Link>
        </div>

        <h1 className="caption-page__title">{}</h1>
        <div className="caption-page__header-wrapper"></div>
      </header>

      <main>
        <div className="row">
          <CustomPlayer
            playerRef={playerRef}
            playerRefBlurred={playerRefBlurred}
            currentTime={playedSeconds}
            setIsPlaying={setIsPlaying}
            videoData={videoData}
            cinematicMode={cinematicMode}
            fastForwardVideo={fastForwardVideo}
            rewindVideo={rewindVideo}
            handlePlayingState={handlePlayingState}
            handleProgress={handleProgress}
            isPlaying={isPlaying}
            currentCaption={
              isPressingSpace ? lyricsArray[selectedIndex] : verse
            }
          />
          <Instructions isPressingSpace={isPressingSpace} />
        </div>
        <div className="row">
          <div
            className="untimed"
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            tabIndex={0}
          >
            <ul
              className="untimed__container"
              onKeyDown={(ev) => handleKeyDown}
              tabIndex={0}
            >
              {lyricsArray.map((line, index) => {
                return (
                  <UntimedLine
                    key={index}
                    text={line}
                    isSelected={index === selectedIndex}
                    onClick={() => handleUntimedLineClick(index)}
                  />
                )
              })}
            </ul>
          </div>

          <div className="timed col">
            <ul className="timed__container">
              {timedLyrics.map((line, index) => {
                return (
                  // <li key={`timed_${index}`} className="timed__lyric">
                  //   {formatToSRT(index + 1, line)}
                  // </li>
                  <TimedLine
                    key={index}
                    line={line}
                    seekStartTime={handleSeekStartTime}
                  />
                )
              })}
            </ul>
            <button className="button" onClick={handleSRTRequest}>
              Baixar SRT
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
