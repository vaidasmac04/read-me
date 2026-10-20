import type { Hike } from '../data/hikesService'
import { formatDate } from '../utils/dateFormatting'

function HikeCard({ hike }: { hike: Hike }) {
  return (
    <article className="entry-card hike-card">
      <h3>{hike.title}</h3>
      <p className="entry-date-range">{formatDate(hike.date)}</p>
      <p className="hike-location">{hike.city}, {hike.country}</p>
      <p className="hike-distance">{hike.distanceKm} km</p>
    </article>
  )
}

export function HikeCards({ hikes }: { hikes: Hike[] }) {
  return (
    <div className="hikes-grid">
      {hikes.map((hike) => <HikeCard key={`${hike.title}-${hike.date}`} hike={hike} />)}
    </div>
  )
}