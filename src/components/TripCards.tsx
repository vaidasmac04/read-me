import type { Trip } from '../data/tripsService'
import { formatDateRange, groupCitiesByDate } from '../utils/dateFormatting'

function TripCard({ trip }: { trip: Trip }) {
  return (
    <article className="trip-card">
      <span className="trip-season">{trip.season}</span>
      <h3>{trip.title}</h3>
      <p className="trip-date-range">{formatDateRange(trip.fromDate, trip.toDate)}</p>
      <details className="trip-cities">
        <summary>Details ({trip.cities.length} stops)</summary>
        <ul className="trip-city-list">
          {groupCitiesByDate(trip.cities).map((cityGroup) => {
            const { fromDate, toDate } = cityGroup[0]

            return (
              <li key={JSON.stringify([fromDate, toDate])}>
                <span className="city-date-range">{formatDateRange(fromDate, toDate)}</span>
                {cityGroup.map((city, index) => (
                  <span className="city-name" key={`${city.name}-${index}`}>
                    {city.name}
                  </span>
                ))}
              </li>
            )
          })}
        </ul>
      </details>
    </article>
  )
}

export function TripCards({ trips }: { trips: Trip[] }) {
  return (
    <div className="trip-grid">
      {trips.map((trip) => <TripCard key={trip.title} trip={trip} />)}
    </div>
  )
}