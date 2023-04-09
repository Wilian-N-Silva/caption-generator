import { KeyboardKey } from "./KeyboardKey"

interface KeyboardArrowsProps {
  label: string
  showArrowUp?: boolean
  showArrowDown?: boolean
  showArrowLeft?: boolean
  showArrowRight?: boolean
}
export function KeyboardArrows(key: KeyboardArrowsProps) {
  return (
    <div className="instructions__detail">
      <div className="instructions__keys">
        <div className="flex__col flex__col--centered">
          <KeyboardKey label="↑" isDisabled={key.showArrowUp} />
          <div className="flex__row">
            <KeyboardKey label="←" isDisabled={key.showArrowLeft} />
            <KeyboardKey label="↓" isDisabled={key.showArrowDown} />
            <KeyboardKey label="→" isDisabled={key.showArrowRight} />
          </div>
        </div>
      </div>
      <div className="instructions__label">{key.label}</div>
    </div>
  )
}
