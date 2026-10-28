import { ComposableMap, Geography, Geographies, Graticule, Sphere } from 'react-simple-maps'
import worldCountries from 'world-atlas/countries-110m.json?url'
import type { Trip } from '../data/tripsService'

export function TripsMap({
  trips,
  selectedCountry,
  onCountrySelect,
}: {
  trips: Trip[]
  selectedCountry: string | null
  onCountrySelect: (country: string) => void
}) {
  const visitedCountries = new Set(trips.flatMap((trip) => trip.country))
  const visitedCountryNames = [...visitedCountries].sort()
  const tripCountsByCountry = new Map<string, number>()

  trips.forEach((trip) => {
    new Set(trip.country).forEach((country) => {
      tripCountsByCountry.set(country, (tripCountsByCountry.get(country) ?? 0) + 1)
    })
  })

  return (
    <section className="trips-map-section" aria-label="Visited countries map">
      <div className="trips-map-frame">
        <ComposableMap
          className="trips-map-svg"
          width={800}
          height={400}
          projection="geoNaturalEarth1"
          projectionConfig={{ scale: 145 }}
          role="group"
          aria-label={`World map. Visited countries: ${visitedCountryNames.join(', ')}`}
        >
          <Sphere fill="#f1f4ef" stroke="#d7dfd8" strokeWidth={0.8} />
          <Graticule stroke="#dce4de" strokeWidth={0.45} />
          <Geographies geography={worldCountries}>
            {({ geographies }) => geographies.map((geography) => {
              const countryName = geography.properties?.name
              const isVisited = typeof countryName === 'string' && visitedCountries.has(countryName)
              const isSelected = countryName === selectedCountry
              const tripCount = typeof countryName === 'string' ? tripCountsByCountry.get(countryName) ?? 0 : 0
              const label = `${countryName ?? 'Unknown country'}: ${tripCount} ${tripCount === 1 ? 'trip' : 'trips'}`

              return (
                <Geography
                  key={geography.rsmKey}
                  geography={geography}
                  className={`trips-map-country${isVisited ? ' is-visited is-selectable' : ''}${isSelected ? ' is-selected' : ''}`}
                  role={isVisited ? 'button' : undefined}
                  tabIndex={isVisited ? 0 : undefined}
                  aria-label={isVisited ? `${label}. Activate to filter trips.` : undefined}
                  aria-pressed={isVisited ? isSelected : undefined}
                  onClick={isVisited && typeof countryName === 'string' ? () => onCountrySelect(countryName) : undefined}
                  onKeyDown={isVisited && typeof countryName === 'string'
                    ? (event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        onCountrySelect(countryName)
                      }
                    }
                    : undefined}
                >
                  <title>{label}</title>
                </Geography>
              )
            })}
          </Geographies>
        </ComposableMap>
      </div>
    </section>
  )
}