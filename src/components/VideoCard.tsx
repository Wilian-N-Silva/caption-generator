import { YouTubeOEmbed } from "../global/Interfaces"

export function VideoCard({
  thumbnail_url,
  title,
  author_name,
}: YouTubeOEmbed) {
  return (
    <div className="video-card">
      <div className="video-card__thumbnail">
        <img src={thumbnail_url} alt="" />
      </div>
      <div className="video-card__info">
        <h3 className="video-card__title">{title}</h3>
        <h4 className="video-card__channel">{author_name}</h4>
      </div>
    </div>
  )
}
