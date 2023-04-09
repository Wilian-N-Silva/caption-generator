import axios from "axios"
import { useEffect, useState } from "react"
import { RawLyrics, YouTubeOEmbed } from "../global/Interfaces"
import { Navigate, useNavigate } from "react-router-dom"
import { VideoCard } from "../components/VideoCard"

const example: RawLyrics = {
  videoId: "https://www.youtube.com/watch?v=3wgGKpdv1t8",
  lyrics: `We were made out of lightning
Sufferin' pain we should see by now
And we were burnt down like Catholics
On a winter road, never so cold

And I abandon my family
In a fit of rage, in a fit of want for you
Cause there's nothing else to do when you're confused
When you're confused

You coddle, and you're cat-like
I am scared
Your bald tongue, your right hand, your last piece
And I never really knew, who'd you see
It's okay, it's okay, it's okay

Now I, I keep it inside of me
Hoping you one day will let me go
It's the end, it's nothing I ended
So grab your arms, and dive into the night, into the night

I am not your savior
I'm just a friend keeping you alive
And eye sight proves that you're haunted
The same way that you speak all the time`,
}

export function Home() {
  const navigate = useNavigate()
  const [videoUrl, setVideoUrl] = useState<string>(example.videoId)
  const [videoId, setVideoId] = useState<string>("")
  const [videoData, setVideoData] = useState<YouTubeOEmbed>()
  const [lyrics, setLyrics] = useState<string>(example.lyrics)
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
          <a className="home__card-link" href={videoUrl} target="_blank" rel="noopener noreferrer">
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
