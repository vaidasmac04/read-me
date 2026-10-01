import type { JobEntry } from '../data/jobsService'
import type { Run } from '../data/runsService'
import type { Trip } from '../data/tripsService'
import type { AsyncData } from '../hooks/useAsyncData'
import { CollectionSection } from '../components/CollectionSection'
import { JobCards } from '../components/JobCards'
import { RunCards } from '../components/RunCards'
import { TripCards } from '../components/TripCards'
import { sortJobsByDate, sortRunsByDate, sortTripsByDate } from '../utils/collectionSorting'

interface HomePageProps {
  jobsResource: AsyncData<JobEntry[]>
  runsResource: AsyncData<Run[]>
  tripsResource: AsyncData<Trip[]>
}

export function HomePage({ jobsResource, runsResource, tripsResource }: HomePageProps) {
  const jobs = sortJobsByDate(jobsResource.data).slice(0, 3)
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
      <CollectionSection title="Trips" href="#/trips" actionLabel="See all trips" resource={tripsResource} items={trips} emptyMessage="No trips to show yet.">
        {(entries) => <TripCards trips={entries} />}
      </CollectionSection>
      <CollectionSection title="Runs" href="#/runs" actionLabel="See all runs" resource={runsResource} items={runs} emptyMessage="No runs to show yet.">
        {(entries) => <RunCards runs={entries} />}
      </CollectionSection>
    </main>
  )
}