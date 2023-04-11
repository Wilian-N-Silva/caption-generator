export function Home() {
  return (
    <div className="home">
      <header className="home__header">
        <h1 className="home__title">Caption Generator</h1>
        <h2 className="home__subtitle">
          Legende seus vídeos de maneira rápida e exporte como CRT
        </h2>
      </header>

      <form className="home__form">
        <div className="text-field">
          <label className="text-field__label" htmlFor="url-input">
            URL do vídeo
          </label>
          <input className="text-field__input" id="url-input" type="url" />
        </div>
        <button className="button" type="submit">
          Procurar
        </button>
      </form>
    </div>
  )
}
