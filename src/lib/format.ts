import { TimedLyrics } from "../global/Interfaces"

export const secondsToISOPlayTime = (seconds: number) => {
  const formattedTime = new Date(seconds * 1000).toISOString().slice(11, 23)
  return formattedTime
}

export const formatToSRT = (index: number, line: TimedLyrics) => {
  const formattedLine = `${index} ${secondsToISOPlayTime(line.start)} --> ${secondsToISOPlayTime(line.end)} ${line.text}`
  return formattedLine
}
