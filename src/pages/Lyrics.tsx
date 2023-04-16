import ReactPlayer from "react-player"
import IconArrowLeft from "../assets/icons/ArrowLeft.svg"
import IconArrowRight from "../assets/icons/ArrowRight.svg"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { MOCK_INDEX, MOCK } from "../global/Mock"
import { RawCaptionData } from "../global/Interfaces"

export function Lyrics() {
  const navigate = useNavigate()

  const location = useLocation()
  const { videoUrl } = location.state
  const { videoJSONData } = location.state

  const [lyrics, setLyrics] = useState<string>(MOCK[MOCK_INDEX].lyrics)
  const [contentData, setContentData] = useState<RawCaptionData>()

  const splitAndSanitizeLyrics = () => {
    const splittedLyrics = lyrics.split("\n")
    const sanitizedLyrics = splittedLyrics.filter((line: string) => line)

    return sanitizedLyrics
  }

  const handleLyricFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    if (lyrics.length === 0) {
      alert("Digite o texto desejado")
      return
    }

    const lyricsArray = splitAndSanitizeLyrics()

    const content: RawCaptionData = {
      videoData: {
        url: videoUrl,
        title: videoJSONData.title,
        author_name: videoJSONData.author_name,
        thumbnail_url: videoJSONData.thumbnail_url,
      },
      lyricsData: lyricsArray,
    }

    setContentData(content)
    navigate("/caption", {
      state: { contentData: content },
    })
  }

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
        <ReactPlayer url={videoUrl} width={"100%"} />
        <form className="lyrics-page__form" onSubmit={handleLyricFormSubmit}>
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
