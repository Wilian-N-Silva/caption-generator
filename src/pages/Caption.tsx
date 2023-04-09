import { useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { TimedLyrics } from "../global/Interfaces"
import { Instructions } from "../components/Instructions"
import { Player } from "../components/Player"
import ReactPlayer from "react-player"

export function Caption() {
  const location = useLocation()
  const { rawLyricsData } = location.state

  const [selectedIdx, setSelectedIdx] = useState<number>(0)
  const [videoId, setVideoId] = useState<string>("")
  const [lyricsArr, setLyricsArr] = useState<string[]>([])
  const [timedLyrics, setTimedLyrics] = useState<TimedLyrics[]>([])

  const handleLocationData = () => {
    const splittedLyrics = rawLyricsData.lyrics
      .split("\n")
      .filter((lyric: string) => lyric)

    console.log(splittedLyrics)

    setVideoId(rawLyricsData.videoId)
    setLyricsArr(splittedLyrics)
  }

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(ev)

    if (ev.code === "ArrowUp") {
      setSelectedIdx((prevIdx) =>
        prevIdx === null
          ? 0
          : (prevIdx - 1 + lyricsArr.length) % lyricsArr.length
      )
    } else if (ev.code === "ArrowDown") {
      setSelectedIdx((prevIdx) =>
        prevIdx === null ? 0 : (prevIdx + 1) % lyricsArr.length
      )
    } else if (ev.code === "Space") {
      if (selectedIdx !== null) {
        alert(`Índice: ${selectedIdx}, Texto: ${lyricsArr[selectedIdx]}`)
      }
    }
  }

  useEffect(() => {
    handleLocationData()
  }, [])

  return (
    <>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        onProgress={(progress) => console.log(progress)}
      />
      <Instructions />
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
