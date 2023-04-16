import { TimedLyrics } from "../global/Interfaces"
import { convertSecondsToTimer, convertTimerToSeconds } from "../lib/format"
import IconPlay from "../assets/icons/Play.svg"

interface TimedLineProps {
  index: number
  line: TimedLyrics
  seekStartTime: (seconds: number) => void
}

export function TimedLine({ index, line, seekStartTime }: TimedLineProps) {
  return (
    <li className="timed__line">
      <button className="button" onClick={() => seekStartTime(line.start)}>
        <img src={IconPlay} alt="" />
      </button>
      <input
        type="text"
        value={convertSecondsToTimer(line.start)}
        onChange={(ev) => {
          console.log(convertTimerToSeconds(ev.target.value))
          seekStartTime(convertTimerToSeconds(ev.target.value))
        }}
      />
      <input type="text" value={convertSecondsToTimer(line.end)} />
      <div title={line.text}>{line.text}</div>
    </li>
  )
}
