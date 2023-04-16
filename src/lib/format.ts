import { TimedLyrics } from "../global/Interfaces"
export const formatToSRT = (index: number, line: TimedLyrics) => {
  const formattedLine = `${index} ${convertSecondsToTimer(
    line.start
  )} --> ${convertSecondsToTimer(line.end)} ${line.text}`
  return formattedLine
}

export const convertTimerToSeconds = (formatted: string) => {
  var splitted = formatted.split(":")
  var HH = parseInt(splitted[0])
  var MM = parseInt(splitted[1])
  var SS = parseInt(splitted[2].split(".")[0])
  var ms = parseInt(splitted[2].split(".")[1])
  var timeInSeconds = HH * 3600 + MM * 60 + SS + ms / 1000
  return timeInSeconds
}

export const convertSecondsToTimer = (seconds: number) => {
  var HH = Math.floor(seconds / 3600)
  var MM = Math.floor((seconds - HH * 3600) / 60)
  var SS = Math.floor(seconds - HH * 3600 - MM * 60)
  var ms = Math.floor((seconds - Math.floor(seconds)) * 1000)

  var formattedTime =
    HH.toString().padStart(2, "0") +
    ":" +
    MM.toString().padStart(2, "0") +
    ":" +
    SS.toString().padStart(2, "0") +
    "." +
    ms.toString().padStart(3, "0")

  return formattedTime
}
