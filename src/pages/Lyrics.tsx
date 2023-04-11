import ReactPlayer from "react-player"
import IconArrowLeft from "../assets/icons/ArrowLeft.svg"
import IconArrowRight from "../assets/icons/ArrowRight.svg"
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { mock } from "../global/Mock"

export function Lyrics() {
  const MOCK_INDEX = 1

  const location = useLocation()
  const { videoUrl } = location.state
  const { videoData } = location.state

  const [lyrics, setLyrics] = useState<string>(mock[MOCK_INDEX].lyrics)

  const handleLocationData = () => {
    console.log(videoUrl)
    console.log(videoUrl, videoData)
  }

  useEffect(() => {
    handleLocationData()
  }, [videoUrl])

  return (
    <div className="lyrics-page">
      <header className="lyrics-page__header">
        <div className="lyrics-page__header-wrapper">
          <Link to={"/"}>
            <button className="button" type="submit">
              <img src={IconArrowLeft} alt="" />
              <span>Voltar</span>
            </button>
          </Link>
        </div>

        <h1 className="lyrics-page__title">
          Confirme o vídeo e digite a texto para continuar
        </h1>
        <div className="lyrics-page__header-wrapper"></div>
      </header>

      <main>
        <ReactPlayer url={"https://www.youtube.com/watch?v=UiSB2Fbw9gs"} />
        <form className="lyrics-page__form">
          <div className="text-field">
            <label className="text-field__label" htmlFor="url-input">
              Letra
            </label>
            <div className="text-field__input-wrapper text-field__input-wrapper--resizable">
              <textarea
                name=""
                id=""
                cols={30}
                rows={10}
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
              ></textarea>
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
