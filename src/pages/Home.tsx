import { useState } from "react"
import IconMagnifyingGlass from "../assets/icons/MagnifyingGlass.svg"
import { mock } from "../global/Mock"
import { useNavigate } from "react-router-dom"

export function Home() {
  const MOCK_INDEX = 1
  const navigate = useNavigate()
  const [videoUrl, setVideoUrl] = useState<string>(mock[MOCK_INDEX].videoId)

  const validateYoutubeUrl = (url: string) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    return match
  }

  const handleURLFormSubmit = (data: React.FormEvent<HTMLFormElement>) => {
    data.preventDefault()

    const isValid = validateYoutubeUrl(videoUrl)
    if (!isValid) return

    const stateObj = {
      url: videoUrl,
    }

    navigate("/lyrics", { state: { videoUrl: videoUrl } })
  }

  return (
    <div className="home">
      <header className="home__header">
        <h1 className="home__title">Caption Generator</h1>
        <h2 className="home__subtitle">
          Legende seus vídeos de maneira rápida e exporte como CRT
        </h2>
      </header>

      <main>
        <form className="home__form" onSubmit={handleURLFormSubmit}>
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

          <button className="button" type="submit">
            <span>Procurar</span>
            <img src={IconMagnifyingGlass} alt="" />
          </button>
        </form>
      </main>
    </div>
  )
}
