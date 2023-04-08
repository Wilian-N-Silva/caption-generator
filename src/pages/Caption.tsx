import { useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { TimedLyrics } from "../global/Interfaces"

export function Caption() {
  const location = useLocation()

  const { rawLyricsData } = location.state

  const [videoId, setVideoId] = useState<string>("")
  const [lyricsArr, setLyricsArr] = useState<string[]>([])
  const [timedLyrics, setTimedLyrics] = useState<TimedLyrics[]>([])
  const ref = useRef<HTMLDivElement>(null)
  const [lyricIndex, setLyricIndex] = useState(0)

  const clearHighlight = () => {
    const highlighted = document.querySelector(".raw__lyric--selected")

    if (highlighted) {
      highlighted.classList.toggle("raw__lyric--selected")
    }
  }

  // const highlightForwards = () => {
  //   if (currentLetter >= LETTER_COUNT - 1) {
  //     currentLetter = 0
  //   } else {
  //     currentLetter++
  //   }
  //   navigateLyric()
  // }
  // const highlightBackwards = () => {
  //   if (currentLetter <= 0) {
  //     currentLetter = LETTER_COUNT - 1
  //   } else {
  //     currentLetter--
  //   }
  //   navigateLyric()
  // }

  const navigateLyric = () => {
    clearHighlight()

    // currentNode?.classList.toggle("raw__lyric--selected")
    const childrens = Array.from(ref.current!.children)
  
  }

  const handleRawLyricsEl = () => {
    setLyricIndex(0)
    navigateLyric()
  }

  const handleLocationData = () => {
    const splittedLyrics = rawLyricsData.lyrics.split("\n")

    setVideoId(rawLyricsData.videoId)
    setLyricsArr(splittedLyrics)

    handleRawLyricsEl()
  }

  useEffect(() => {
    handleLocationData()
  }, [])

  return (
    <>
      <div className="player"></div>
      <div className="instructions">
        <span>
          <kbd className="key">P</kbd> Pause
        </span>
        <span>
          <div className="col">
            <kbd className="key">↑</kbd>
            <div className="row">
              <kbd className="key key--disabled">←</kbd>
              <kbd className="key">↓</kbd>
              <kbd className="key key--disabled">→</kbd>
            </div>
          </div>
          Mover
        </span>
      </div>
      <div className="lyrics">
        <div ref={ref} className="raw">
          {lyricsArr.map((row, index) => {
            return (
              <div key={`raw_${index}`} className="raw__lyric">
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
