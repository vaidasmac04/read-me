import type { ReactNode } from 'react'
import type { Hike } from '../data/hikesService'
import type { Run } from '../data/runsService'
import type { Trip } from '../data/tripsService'
import type { AsyncData } from '../hooks/useAsyncData'
import { CollectionStatistics } from '../components/CollectionStatistics'
import { HikeCards } from '../components/HikeCards'
import { PlacesVisited } from '../components/PlacesVisited'
import { RunCards } from '../components/RunCards'
import { TripCards } from '../components/TripCards'
import { sortHikesByDate, sortRunsByDate, sortTripsByDate } from '../utils/collectionSorting'
import { getAvailableReviewYears, getYearReviewData } from '../utils/yearReview'

interface YearReviewPageProps {
  year: number
  hikesResource: AsyncData<Hike[]>
  runsResource: AsyncData<Run[]>
  tripsResource: AsyncData<Trip[]>
}

function YearReviewSection({
  kicker,
  title,
  children,
}: {
  kicker: string
  title: string
  children: ReactNode
}) {
  return (
    <section className="content-section year-review-section">
      <div className="section-heading">
        <p className="section-kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

export function YearReviewPage({ year, hikesResource, runsResource, tripsResource }: YearReviewPageProps) {
  const resources = [hikesResource, runsResource, tripsResource]
  const isLoading = resources.some((resource) => resource.isLoading)
  const hasError = resources.some((resource) => resource.hasError)
  const availableYears = getAvailableReviewYears(tripsResource.data, hikesResource.data, runsResource.data)
  const review = getYearReviewData(year, tripsResource.data, hikesResource.data, runsResource.data)

  return (
    <main className="page-shell archive-page year-review-page">
      <header className="archive-header">
        <a className="back-home-link" href="#/">Back home</a>
        <p className="section-kicker">Year in review</p>
        <h1>{year}</h1>
      </header>

      {isLoading && <p className="resource-message" role="status">Loading year review...</p>}
      {hasError && <p className="resource-message" role="alert">Year review data could not be loaded.</p>}
      {!isLoading && !hasError && !availableYears.includes(year) && (
        <p className="resource-message">No year review is available for {year}.</p>
      )}
      {!isLoading && !hasError && availableYears.includes(year) && (
        <>
          <nav className="year-review-links year-review-navigation" aria-label="Available year reviews">
            {availableYears.map((availableYear) => (
              <a
                aria-current={availableYear === year ? 'page' : undefined}
                className="year-review-link"
                href={`#/years/${availableYear}`}
                key={availableYear}
              >
                {availableYear}
              </a>
            ))}
          </nav>

          <CollectionStatistics
            label={`${year} overview`}
            heading="At a glance"
            statistics={[
              { label: 'Trips', value: review.trips.length },
              { label: 'Countries', value: review.countries.length },
              { label: 'Cities', value: review.cities.length },
              { label: 'Hiking distance', value: `${review.hikingDistanceKm.toLocaleString(undefined, { maximumFractionDigits: 1 })} km` },
              { label: 'Running distance', value: `${review.runningDistanceKm.toLocaleString(undefined, { maximumFractionDigits: 1 })} km` },
            ]}
          />

          {review.trips.length > 0 && (
            <YearReviewSection kicker="Travel" title="Trips">
              <PlacesVisited trips={review.trips} selectedCountry={null} embedded />
              <TripCards trips={sortTripsByDate(review.trips)} />
            </YearReviewSection>
          )}
          {review.hikes.length > 0 && (
            <YearReviewSection kicker="Outdoors" title="Hikes">
              <HikeCards hikes={sortHikesByDate(review.hikes)} />
            </YearReviewSection>
          )}
          {review.runs.length > 0 && (
            <YearReviewSection kicker="Running" title="Races">
              <RunCards runs={sortRunsByDate(review.runs)} />
            </YearReviewSection>
          )}
        </>
      )}
    </main>
  )
}