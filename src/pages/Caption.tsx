import { useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { TimedLyrics } from "../global/Interfaces"
import { Instructions } from "../components/Instructions"
import { Player } from "../components/Player"
import ReactPlayer from "react-player"

export function Caption() {
  const location = useLocation()
  const playerRef = useRef<ReactPlayer>(null)
  
  const { rawLyricsData } = location.state

  const [selectedIdx, setSelectedIdx] = useState<number>(0)
  const [videoId, setVideoId] = useState<string>("")
  const [lyricsArr, setLyricsArr] = useState<string[]>([])
  const [timedLyrics, setTimedLyrics] = useState<TimedLyrics[]>([])
  const [playedSeconds, setPlayedSeconds] = useState<number>(0)
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false)

  const handleLocationData = () => {
    const splittedLyrics = rawLyricsData.lyrics
      .split("\n")
      .filter((lyric: string) => lyric)
    setVideoId(rawLyricsData.videoId)
    setLyricsArr(splittedLyrics)
  }

  const secondsToISOPlayTime = (seconds: number) => {
    const formattedTime = new Date(seconds * 1000).toISOString().slice(14, 23)
    return formattedTime
  }

  const previousCaptionIndex = () => {
    setSelectedIdx((prevIdx) =>
      prevIdx === null ? 0 : (prevIdx - 1 + lyricsArr.length) % lyricsArr.length
    )
  }
  const nextCaptionIndex = () => {
    setSelectedIdx((prevIdx) =>
      prevIdx === null ? 0 : (prevIdx + 1) % lyricsArr.length
    )
  }

  const rewindVideo = () => {
    const newTime = playerRef.current?.getCurrentTime()! - 10
    playerRef.current?.seekTo(newTime)
  }

  const fastForwardVideo = () => {
    const newTime = playerRef.current?.getCurrentTime()! + 10
    playerRef.current?.seekTo(newTime)
  }

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    switch (ev.code) {
      case "ArrowUp":
        previousCaptionIndex()
        break
      case "ArrowDown":
        nextCaptionIndex()
      case "ArrowLeft":
        rewindVideo()
        break
      case "ArrowRight":
        fastForwardVideo()
        break
      case "KeyP":
        setIsPlayingVideo((prevState) => !prevState)
        break
      case "Space":
        if (selectedIdx !== null) {
          alert(`Índice: ${selectedIdx}, Texto: ${lyricsArr[selectedIdx]}`)
          nextCaptionIndex()
        }
        break
    }
  }

  useEffect(() => {
    handleLocationData()
  }, [])

  return (
    <>
      <ReactPlayer
        ref={playerRef}
        url={`https://www.youtube.com/watch?v=${videoId}`}
        playing={isPlayingVideo}
        onProgress={(progress) => {
          setPlayedSeconds(progress.playedSeconds)
        }}
      />
      <Instructions />
      {secondsToISOPlayTime(playedSeconds)}
      <div className="lyrics">
        <div className="raw" onKeyDown={handleKeyDown} tabIndex={0}>
          {lyricsArr.map((row, index) => {
            return (
              <div
                key={`raw_${index}`}
                className={`raw__lyric ${
                  index === selectedIdx ? "raw__lyric--selected" : ""
                }`}
              >
                {row}
              </div>
            )
          })}
        </div>
        <div className="timed">
          {timedLyrics.map((row, index) => {
            return (
              <div
                key={`timed_${index}`}
                className="timed__lyric"
              >{`${row.start} - ${row.end} -- ${row.text}`}</div>
            )
          })}
        </div>
      </div>
    </>
  )
}
