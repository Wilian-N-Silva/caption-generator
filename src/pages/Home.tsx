import axios from "axios"
import { useEffect, useState } from "react"
import { RawLyrics, YouTubeOEmbed } from "../global/Interfaces"
import { Navigate, useNavigate } from "react-router-dom"

export function Home() {
  const navigate = useNavigate()
  const [videoUrl, setVideoUrl] = useState<string>(
    "https://www.youtube.com/watch?v=3wgGKpdv1t8"
  )
  const [videoId, setVideoId] = useState<string>("")
  const [videoData, setVideoData] = useState<YouTubeOEmbed>()
  const [lyrics, setLyrics] = useState<string>("")
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

        <form onSubmit={handleURLFormSubmit}>
          <div className="text-field">
            <label htmlFor="url-input">URL do vídeo</label>
            <input
              id="url-input"
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>
          <button type="submit">Procurar</button>
        </form>

        {videoData && (
          <div className="video-card">
            <div className="video-card__thumbnail">
              <img src={videoData.thumbnail_url} alt="" />
            </div>
            <div className="video-card__info">
              <h3 className="video-card__title">{videoData.title}</h3>
              <h4 className="video-card__channel">{videoData.author_name}</h4>
            </div>
          </div>
        )}

        {videoData && (
          <form onSubmit={handleLyricsSubmit}>
            <textarea
              name=""
              id=""
              cols={30}
              rows={10}
              onChange={(e) => setLyrics(e.target.value)}
              value={lyrics}
            />

            <button type="submit">Continuar</button>
          </form>
        )}
      </div>
    </div>
  )
}
