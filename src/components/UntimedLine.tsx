interface UntimedLineProps {
  isSelected: boolean
  text: string
  onClick: () => void
}
export function UntimedLine({ text, isSelected, onClick }: UntimedLineProps) {
  return (
    <li
      className={`untimed__line ${isSelected ? "untimed__line--selected" : ""}`}
      onClick={onClick}
    >
      {text}
    </li>
  )
}
