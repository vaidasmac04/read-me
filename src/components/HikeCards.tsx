import type { Hike } from '../data/hikesService'
import { getCountryFlagCode } from '../utils/countryFlagCodes'
import { formatDate } from '../utils/dateFormatting'

function HikeCard({ hike }: { hike: Hike }) {
  const flagCode = getCountryFlagCode(hike.country)

  return (
    <article className="entry-card hike-card">
      <h3>{hike.title}</h3>
      <p className="entry-date-range">{formatDate(hike.date)}</p>
      <p className="hike-location">
        {flagCode && <span className={`fi fi-${flagCode} trip-country-flag`} aria-hidden="true" />}
        {flagCode && ' '}
        {hike.city}, {hike.country}
      </p>
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