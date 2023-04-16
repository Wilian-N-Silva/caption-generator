import { TimedLyrics } from "../global/Interfaces"
import { convertSecondsToTimer, convertTimerToSeconds } from "../lib/format"
import IconPlay from "../assets/icons/Play.svg"
import IconClose from "../assets/icons/x.svg"

interface TimedLineProps {
  index: number
  line: TimedLyrics
  seekStartTime: (seconds: number) => void
  changeTimedInput: (
    index: number,
    seconds: number,
    isStartTime: boolean
  ) => void
  handleLineDelete: (index: number) => void
}

export function TimedLine({
  index,
  line,
  seekStartTime,
  changeTimedInput,
  handleLineDelete,
}: TimedLineProps) {
  return (
    <li className="timed__line">
      <button
        className="button button__icon-play"
        onClick={() => seekStartTime(line.start)}
      >
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
      <div className="timed__text" title={line.text}>{line.text}</div>
      <button
        className="button button__icon timed__delete"
        onClick={(ev) => handleLineDelete(index)}
      >
        <img src={IconClose} alt="" />
      </button>
    </li>
  )
}
