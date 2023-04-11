import IconMagnifyingGlass from "../assets/icons/MagnifyingGlass.svg"
export function Home() {
  return (
    <div className="home">
      <header className="home__header">
        <h1 className="home__title">Caption Generator</h1>
        <h2 className="home__subtitle">
          Legende seus vídeos de maneira rápida e exporte como CRT
        </h2>
      </header>

      <main>
        <form className="home__form">
          <div className="text-field">
            <label className="text-field__label" htmlFor="url-input">
              URL do vídeo
            </label>
            <div className="text-field__input-wrapper">
              <input className="" id="url-input" type="url" />
            </div>
          </div>  

          <button className="button" type="submit">
            <span>Procurar</span>
            <img src={IconMagnifyingGlass} alt="" />
          </button>
        </form>
      </main>
    </div>
  )
}
