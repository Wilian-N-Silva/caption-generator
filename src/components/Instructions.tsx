import { KeyboardArrows } from "./KeyboardArrows"
import { KeyboardKey } from "./KeyboardKey"

export function Instructions() {
  return (
    <div className="instructions">
      <div className="instructions__detail">
        <div className="instructions__keys">
          <KeyboardKey label="P" />
        </div>
        <div className="instructions__label">Pausar</div>
      </div>

      <div className="instructions__detail">
        <div className="instructions__keys">
          <KeyboardKey label="Espaço" isSpacebar={true} />
        </div>
        <div className="instructions__label">Legendar</div>
      </div>
      <KeyboardArrows
        label={"Avançar / Retroceder vídeo"}
        showArrowUp={true}
        showArrowDown={true}
      />
      <KeyboardArrows
        label={"Próxima frase / Frase anterior"}
        showArrowLeft={true}
        showArrowRight={true}
      />
    </div>
  )
}
