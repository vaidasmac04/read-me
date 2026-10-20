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
import { getHikeStatistics, getRunStatistics, getTripStatistics } from '../utils/collectionStatistics'

interface HomePageProps {
  jobsResource: AsyncData<JobEntry[]>
  hikesResource: AsyncData<Hike[]>
  runsResource: AsyncData<Run[]>
  tripsResource: AsyncData<Trip[]>
}

export function HomePage({ jobsResource, hikesResource, runsResource, tripsResource }: HomePageProps) {
  const jobs = sortJobsByDate(jobsResource.data).slice(0, 3)
  const hikes = sortHikesByDate(hikesResource.data).slice(0, 3)
  const runs = sortRunsByDate(runsResource.data).slice(0, 3)
  const trips = sortTripsByDate(tripsResource.data).slice(0, 3)

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

      <CollectionSection title="Jobs" href="#/jobs" actionLabel="See all jobs" resource={jobsResource} items={jobs} emptyMessage="No jobs to show yet.">
        {(entries) => <JobCards entries={entries} />}
      </CollectionSection>
      <CollectionSection
        title="Trips"
        href="#/trips"
        actionLabel="See all trips"
        resource={tripsResource}
        items={trips}
        emptyMessage="No trips to show yet."
        beforeContent={!tripsResource.isLoading && !tripsResource.hasError
          ? <CollectionStatistics label="Trip statistics" statistics={getTripStatistics(tripsResource.data)} />
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
        beforeContent={!hikesResource.isLoading && !hikesResource.hasError
          ? <CollectionStatistics label="Hike statistics" statistics={getHikeStatistics(hikesResource.data)} />
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
        beforeContent={!runsResource.isLoading && !runsResource.hasError
          ? <CollectionStatistics label="Run statistics" statistics={getRunStatistics(runsResource.data)} />
          : null}
      >
        {(entries) => <RunCards runs={entries} />}
      </CollectionSection>
    </main>
  )
}