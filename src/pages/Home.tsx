import axios from "axios"
import { useEffect, useState } from "react"
import { RawLyrics, YouTubeOEmbed } from "../global/Interfaces"
import { Navigate, useNavigate } from "react-router-dom"
import { VideoCard } from "../components/VideoCard"
import { mock } from "../global/Mock"

export function Home() {
  const MOCK_INDEX = 1;
  const navigate = useNavigate()
  // const [videoUrl, setVideoUrl] = useState<string>('')
  const [videoUrl, setVideoUrl] = useState<string>(mock[MOCK_INDEX].videoId)
  const [videoId, setVideoId] = useState<string>("")
  const [videoData, setVideoData] = useState<YouTubeOEmbed>()
  // const [lyrics, setLyrics] = useState<string>('')
  const [lyrics, setLyrics] = useState<string>(mock[MOCK_INDEX].lyrics)
  let rawLyricsData: RawLyrics = { videoId: "", lyrics: "" }

  const parseVideoUrl = (url: string) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[7].length == 11 ? match[7] : false
  }

  const fetchVideoData = (key: string) => {
    axios
      .get(
        `http://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${key}&format=json`
      )
      .then((response) => {
        setVideoData(response.data)
        console.log(response.data)
      })
  }

  const handleURLFormSubmit = (data: React.FormEvent<HTMLFormElement>) => {
    data.preventDefault()
    const isValid = parseVideoUrl(videoUrl)
    if (!isValid) return

    setVideoId(isValid.toString())
    fetchVideoData(isValid)
  }

  const handleNavigation = () => {
    navigate("/caption", { state: { rawLyricsData } })
  }

  const handleLyricsSubmit = (data: React.FormEvent<HTMLFormElement>) => {
    data.preventDefault()

    rawLyricsData = {
      videoId: videoId,
      lyrics: lyrics,
    }

    handleNavigation()
  }

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__heading">
          <h1 className="home__title">Caption Generator</h1>
          <h2 className="home__subtitle">
            Legende seus vídeos de maneira rápida e exporte como CRT
          </h2>
        </div>

        <form
          className="home__form flex__col flex__col--centered"
          onSubmit={handleURLFormSubmit}
        >
          <div className="text-field">
            <label htmlFor="url-input">URL do vídeo</label>
            <input
              id="url-input"
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>
          <button className="button" type="submit">
            Procurar
          </button>
        </form>

        {videoData && (
          <a
            className="home__card-link"
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <VideoCard {...videoData} />
          </a>
        )}

        {videoData && (
          <form
            className="home__form flex__col flex__col--centered"
            onSubmit={handleLyricsSubmit}
          >
            <div className="text-field">
              <label htmlFor="lyrics-input">Letra</label>
              <textarea
                name=""
                id="lyrics-input"
                cols={30}
                rows={10}
                onChange={(e) => setLyrics(e.target.value)}
                value={lyrics}
              />
            </div>
            <button className="button" type="submit">
              Continuar
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
