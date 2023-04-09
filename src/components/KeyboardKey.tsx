interface KeyboardKeyProps {
  label: string
  isSpacebar?: boolean
  isDisabled?: boolean
  isPressing?: boolean
}

export function KeyboardKey(key: KeyboardKeyProps) {
  return (
    <div
      className={`
      instructions__key-cap 
      ${key.isSpacebar ? "instructions__key-cap--space" : ""} 
      ${key.isDisabled ? "instructions__key-cap--disabled" : ""}
      ${key.isPressing ? "instructions__key-cap--pressing" : ""}
      `}
    >
      {key.label}
    </div>
  )
}
