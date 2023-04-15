interface UntimedLineProps {
  isSelected: boolean
  text: string
}
export function UntimedLine({ text, isSelected }: UntimedLineProps) {
  return (
    <li className={`raw__lyric ${isSelected ? "raw__lyric--selected" : ""}`}>
      {text}
    </li>
  )
}
