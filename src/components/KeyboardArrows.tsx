import { KeyboardKey } from "./KeyboardKey"

interface KeyboardArrowsProps {
  label: string
  hideArrowUp?: boolean
  hideArrowDown?: boolean
  hideArrowLeft?: boolean
  hideArrowRight?: boolean
}
export function KeyboardArrows(key: KeyboardArrowsProps) {
  return (
    <div className="instructions__detail">
      <div className="instructions__keys">
        <div className="flex__col flex__col--centered">
          <KeyboardKey label="↑" isDisabled={key.hideArrowUp} />
          <div className="flex__row">
            <KeyboardKey label="←" isDisabled={key.hideArrowLeft} />
            <KeyboardKey label="↓" isDisabled={key.hideArrowDown} />
            <KeyboardKey label="→" isDisabled={key.hideArrowRight} />
          </div>
        </div>
      </div>
      <div className="instructions__label">{key.label}</div>
    </div>
  )
}
