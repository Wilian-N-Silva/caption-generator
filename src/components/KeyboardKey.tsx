interface KeyboardKeyProps {
  label: string
  isSpacebar?: boolean
  isDisabled?: boolean
}

export function KeyboardKey(key: KeyboardKeyProps) {
  return (
    <div
      className={`
      instructions__key-cap 
      ${key.isSpacebar ? "instructions__key-cap--space" : ""} 
      ${key.isDisabled ? "instructions__key-cap--disabled" : ""}
      `}
    >
      {key.label}
    </div>
  )
}
