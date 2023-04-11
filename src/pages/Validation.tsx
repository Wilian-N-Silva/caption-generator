import ReactPlayer from "react-player"
import IconArrowLeft from "../assets/icons/ArrowLeft.svg"
import IconArrowRight from "../assets/icons/ArrowRight.svg"
export function Validation() {
  return (
    <div className="validation">
      <header className="validation__header">
        <button className="button" type="submit">
          <span>Voltar</span>
          <img src={IconArrowLeft} alt="" />
        </button>
        <h1>Lorem Ipsum da Silva Sauro</h1>
      </header>

      <main>
        <ReactPlayer url={"https://www.youtube.com/watch?v=UiSB2Fbw9gs"} />
        <form className="home__form">
          <div className="text-field">
            <label className="text-field__label" htmlFor="url-input">
              Letra
            </label>
            <div className="text-field__input-wrapper text-field__input-wrapper--resizable">
              <textarea name="" id="" cols={30} rows={10}></textarea>
            </div>
          </div>

          <button className="button" type="submit">
            <span>Continuar</span>
            <img src={IconArrowRight} alt="" />
          </button>
        </form>
      </main>
    </div>
  )
}
