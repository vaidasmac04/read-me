import type { JobEntry } from '../data/jobsService'
import type { Hike } from '../data/hikesService'
import type { Run } from '../data/runsService'
import type { Trip } from '../data/tripsService'
import type { AsyncData } from '../hooks/useAsyncData'
import { CollectionSection } from '../components/CollectionSection'
import { CollectionStatistics } from '../components/CollectionStatistics'
import { HikeCards } from '../components/HikeCards'
import { JobCards } from '../components/JobCards'
import { RunCards } from '../components/RunCards'
import { TripCards } from '../components/TripCards'
import { sortHikesByDate, sortJobsByDate, sortRunsByDate, sortTripsByDate } from '../utils/collectionSorting'
import { getHikeStatistics, getLongestHikeStatistics, getRunBestResults, getRunDistanceCounts, getRunStatistics, getTripStatistics } from '../utils/collectionStatistics'

interface HomePageProps {
  jobsResource: AsyncData<JobEntry[]>
  hikesResource: AsyncData<Hike[]>
  runsResource: AsyncData<Run[]>
  tripsResource: AsyncData<Trip[]>
}

export function HomePage({ jobsResource, hikesResource, runsResource, tripsResource }: HomePageProps) {
  const jobs = sortJobsByDate(jobsResource.data)
  const hikes = sortHikesByDate(hikesResource.data)
  const runs = sortRunsByDate(runsResource.data)
  const trips = sortTripsByDate(tripsResource.data)

  return (
    <main className="page-shell">
      <header className="hero-section">
        <p className="eyebrow">Travelling • Coding • Running</p>
        <h1>Hi, I’m Vaidas</h1>
      </header>

      <section className="content-section about-section">
        <div className="section-heading">
          <p className="section-kicker">About Me</p>
          <h2>Life is better when you keep exploring</h2>
        </div>
      </section>

      <CollectionSection title="Jobs" href="#/jobs" actionLabel="See all jobs" resource={jobsResource} items={jobs} emptyMessage="No jobs to show yet." enableCardNavigation>
        {(entries) => <JobCards entries={entries} />}
      </CollectionSection>
      <CollectionSection
        title="Trips"
        href="#/trips"
        actionLabel="See all trips"
        resource={tripsResource}
        items={trips}
        emptyMessage="No trips to show yet."
        enableCardNavigation
        beforeContent={!tripsResource.isLoading && !tripsResource.hasError
          ? <CollectionStatistics
            label="Trip overview"
            heading="Overview"
            statistics={getTripStatistics(tripsResource.data)}
          />
          : null}
      >
        {(entries) => <TripCards trips={entries} />}
      </CollectionSection>
      <CollectionSection
        title="Hikes"
        href="#/hikes"
        actionLabel="See all hikes"
        resource={hikesResource}
        items={hikes}
        emptyMessage="No hikes to show yet."
        enableCardNavigation
        beforeContent={!hikesResource.isLoading && !hikesResource.hasError
          ? <>
            <CollectionStatistics
              label="Hike overview"
              heading="Overview"
              statistics={getHikeStatistics(hikesResource.data)}
            />
            <CollectionStatistics
              label="Hike records"
              heading="Records"
              statistics={getLongestHikeStatistics(hikesResource.data)}
            />
          </>
          : null}
      >
        {(entries) => <HikeCards hikes={entries} />}
      </CollectionSection>
      <CollectionSection
        title="Runs"
        href="#/runs"
        actionLabel="See all runs"
        resource={runsResource}
        items={runs}
        emptyMessage="No runs to show yet."
        enableCardNavigation
        beforeContent={!runsResource.isLoading && !runsResource.hasError
          ? <>
            <CollectionStatistics
              label="Run overview"
              heading="Overview"
              statistics={getRunStatistics(runsResource.data)}
            />
            <CollectionStatistics
              label="Run best results"
              heading="Best results"
              statistics={getRunBestResults(runsResource.data)}
            />
            <CollectionStatistics
              label="Run counts by distance"
              heading="Runs by distance"
              statistics={getRunDistanceCounts(runsResource.data)}
            />
          </>
          : null}
      >
        {(entries) => <RunCards runs={entries} />}
      </CollectionSection>
    </main>
  )
}