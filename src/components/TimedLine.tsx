import { TimedLyrics } from "../global/Interfaces"
import { secondsToISOPlayTime } from "../lib/format"
import IconPlay from "../assets/icons/Play.svg"

interface TimedLineProps {
  line: TimedLyrics
  seekStartTime: (seconds: number) => void
}

export function TimedLine({ line, seekStartTime }: TimedLineProps) {
  return (
    <li className="timed__line">
      <button className="button" onClick={() => seekStartTime(line.start)}>
        <img src={IconPlay} alt="" />
      </button>
      <input type="text" value={secondsToISOPlayTime(line.start)} />
      <input type="text" value={secondsToISOPlayTime(line.end)} />
      <div>{line.text}</div>
    </li>
  )
}
