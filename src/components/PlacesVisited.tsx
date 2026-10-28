import { useState } from 'react'
import type { Trip } from '../data/tripsService'
import { getCountryFlagCode } from '../utils/countryFlagCodes'

function getPlacesByCountry(trips: Trip[]) {
  const placesByCountry = new Map<string, Set<string>>()

  for (const trip of trips) {
    for (const city of trip.cities) {
      const country = city.country.trim()
      const cityName = city.name.trim()
      if (!country || !cityName) continue

      const cities = placesByCountry.get(country) ?? new Set<string>()
      cities.add(cityName)
      placesByCountry.set(country, cities)
    }
  }

  return [...placesByCountry]
    .map(([country, cities]) => ({
      country,
      cities: [...cities].sort((first, second) => first.localeCompare(second)),
    }))
    .sort((first, second) => first.country.localeCompare(second.country))
}

export function PlacesVisited({ trips }: { trips: Trip[] }) {
  const countries = getPlacesByCountry(trips)
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null)

  if (countries.length === 0) return null
  const visibleCountries = expandedCountry
    ? countries.filter(({ country }) => country === expandedCountry)
    : countries

  return (
    <section className="content-section places-visited-section" aria-label="Places visited by country">
      <div className="places-visited-grid">
        {visibleCountries.map(({ country, cities }) => {
          const flagCode = getCountryFlagCode(country)

          return (
            <details className="places-country" key={country} open={expandedCountry === country}>
              <summary onClick={(event) => {
                event.preventDefault()
                setExpandedCountry((currentCountry) => currentCountry === country ? null : country)
              }}>
                {flagCode && <span className={`fi fi-${flagCode}`} aria-hidden="true" />}
                {country}
                <span className="places-country-toggle">
                  <span className="places-city-count">{cities.length} {cities.length === 1 ? 'city' : 'cities'}</span>
                  <span className="places-country-chevron" aria-hidden="true" />
                </span>
              </summary>
              <ul>
                {cities.map((city) => <li key={city}>{city}</li>)}
              </ul>
            </details>
          )
        })}
      </div>
    </section>
  )
}