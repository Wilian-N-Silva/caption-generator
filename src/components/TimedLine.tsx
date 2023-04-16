import { TimedLyrics } from "../global/Interfaces"
import { convertSecondsToTimer, convertTimerToSeconds } from "../lib/format"
import IconPlay from "../assets/icons/Play.svg"

interface TimedLineProps {
  index: number
  line: TimedLyrics
  seekStartTime: (seconds: number) => void
  changeTimedInput: (
    index: number,
    seconds: number,
    isStartTime: boolean
  ) => void
}

export function TimedLine({
  index,
  line,
  seekStartTime,
  changeTimedInput,
}: TimedLineProps) {
  return (
    <li className="timed__line">
      <button className="button" onClick={() => seekStartTime(line.start)}>
        <img src={IconPlay} alt="" />
      </button>
      <input
        type="text"
        value={convertSecondsToTimer(line.start)}
        onChange={(ev) =>
          changeTimedInput(index, convertTimerToSeconds(ev.target.value), true)
        }
      />
      <input
        type="text"
        value={convertSecondsToTimer(line.end)}
        onChange={(ev) =>
          changeTimedInput(index, convertTimerToSeconds(ev.target.value), false)
        }
      />
      <div title={line.text}>{line.text}</div>
    </li>
  )
}
