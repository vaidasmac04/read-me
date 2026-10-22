import type { Trip } from '../data/tripsService'
import { getCountryFlagCode } from '../utils/countryFlagCodes'
import { formatDateRange, getDateRangeDurationDays, groupCitiesByDate } from '../utils/dateFormatting'

function TripCard({ trip }: { trip: Trip }) {
  const durationDays = getDateRangeDurationDays(trip.fromDate, trip.toDate)

  return (
    <article className="trip-card">
      <div className="trip-meta">
        <span className="trip-season">{trip.season} · {trip.region}</span>
      </div>
      <h3>
        {trip.country.map((country) => {
          const flagCode = getCountryFlagCode(country)

          return (
            <span className="trip-country" key={country}>
              {flagCode && <span className={`fi fi-${flagCode} trip-country-flag`} aria-hidden="true" />}
              {country}
            </span>
          )
        })}
      </h3>
      {trip.title && <p className="trip-title">{trip.title}</p>}
      <div className="trip-date-block">
        <p className="trip-date-range">{formatDateRange(trip.fromDate, trip.toDate)}</p>
        {durationDays !== null && (
          <p className="trip-duration">{durationDays} {durationDays === 1 ? 'day' : 'days'}</p>
        )}
      </div>
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
                    {city.name}{city.group && <> <small className="city-group-label">({city.group})</small></>}
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
      {trips.map((trip) => <TripCard key={`${trip.country.join('-')}-${trip.fromDate}`} trip={trip} />)}
    </div>
  )
}