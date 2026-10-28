import { ComposableMap, Geography, Geographies, Graticule, Sphere } from 'react-simple-maps'
import worldCountries from 'world-atlas/countries-110m.json?url'
import type { Trip } from '../data/tripsService'

const countryAliases: Record<string, string> = {
  england: 'united kingdom',
}

function normalizeCountryName(country: string): string {
  const normalizedCountry = country.trim().toLowerCase()
  return countryAliases[normalizedCountry] ?? normalizedCountry
}

export function TripsMap({ trips }: { trips: Trip[] }) {
  const visitedCountries = new Set(
    trips.flatMap((trip) => trip.country.map(normalizeCountryName)),
  )
  const visitedCountryNames = [...visitedCountries].sort()

  return (
    <section className="trips-map-section" aria-label="Visited countries map">
      <div className="trips-map-frame">
        <ComposableMap
          className="trips-map-svg"
          width={800}
          height={400}
          projection="geoNaturalEarth1"
          projectionConfig={{ scale: 145 }}
          role="img"
          aria-label={`World map. Visited countries: ${visitedCountryNames.join(', ')}`}
        >
          <Sphere fill="#f1f4ef" stroke="#d7dfd8" strokeWidth={0.8} />
          <Graticule stroke="#dce4de" strokeWidth={0.45} />
          <Geographies geography={worldCountries}>
            {({ geographies }) => geographies.map((geography) => {
              const countryName = geography.properties?.name
              const isVisited = typeof countryName === 'string'
                && visitedCountries.has(normalizeCountryName(countryName))

              return (
                <Geography
                  key={geography.rsmKey}
                  geography={geography}
                  className={`trips-map-country${isVisited ? ' is-visited' : ''}`}
                >
                  <title>{`${countryName ?? 'Unknown country'}${isVisited ? ' · Visited' : ''}`}</title>
                </Geography>
              )
            })}
          </Geographies>
        </ComposableMap>
      </div>
    </section>
  )
}