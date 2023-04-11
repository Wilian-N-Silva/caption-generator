import { useState } from "react"
import IconMagnifyingGlass from "../assets/icons/MagnifyingGlass.svg"
import IconSpinnerGap from "../assets/icons/SpinnerGap.svg"
import { MOCK_INDEX, mock } from "../global/Mock"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export function Home() {
  const [videoUrl, setVideoUrl] = useState<string>(mock[MOCK_INDEX].videoId)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const fetchVideoData = () => {
    setIsLoading(true)
    axios
      .get(`http://www.youtube.com/oembed?url=${videoUrl}&format=json`)
      .then((response) => {
        navigate("/lyrics", {
          state: { videoUrl: videoUrl, videoJSONData: response.data },
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const validateYoutubeUrl = (url: string) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    return match
  }

  const handleURLFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const isValid = validateYoutubeUrl(videoUrl)

    if (!isValid) {
      alert("URL Inválida")
      return
    }

    fetchVideoData()
  }

  return (
    <div className="home-page">
      <header className="home-page__header">
        <h1 className="home-page__title">Caption Generator</h1>
        <h2 className="home-page__subtitle">
          Legende seus vídeos de maneira rápida e exporte como SRT
        </h2>
      </header>
      <main>
        <form className="home-page__form" onSubmit={handleURLFormSubmit}>
          <div className="text-field">
            <label className="text-field__label" htmlFor="url-input">
              URL do vídeo
            </label>
            <div className="text-field__input-wrapper">
              <input
                id="url-input"
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </div>
          </div>

          <button
            className={`button ${isLoading ? "button--loading" : ""}`}
            type="submit"
          >
            <span>{isLoading ? "Procurando" : "Procurar"}</span>
            <img
              src={isLoading ? IconSpinnerGap : IconMagnifyingGlass}
              alt=""
            />
          </button>
        </form>
      </main>
    </div>
  )
}
