import type { ReactNode } from 'react'
import type { Hike } from '../data/hikesService'
import type { JobEntry } from '../data/jobsService'
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

export type ArchiveCollection = 'jobs' | 'runs' | 'trips' | 'hikes'

interface ArchivePageProps {
  collection: ArchiveCollection
  jobsResource: AsyncData<JobEntry[]>
  hikesResource: AsyncData<Hike[]>
  runsResource: AsyncData<Run[]>
  tripsResource: AsyncData<Trip[]>
}

function ArchiveLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="page-shell archive-page">
      <header className="archive-header">
        <a className="back-home-link" href="#/">Back home</a>
        <p className="section-kicker">Archive</p>
        <h1>All {title}</h1>
      </header>
      {children}
    </main>
  )
}

export function ArchivePage({
  collection,
  jobsResource,
  hikesResource,
  runsResource,
  tripsResource,
}: ArchivePageProps) {
  if (collection === 'jobs') {
    const jobs = sortJobsByDate(jobsResource.data)
    return (
      <ArchiveLayout title="Jobs">
        <CollectionSection title="Jobs" resource={jobsResource} items={jobs} emptyMessage="No jobs to show yet.">
          {(entries) => <JobCards entries={entries} />}
        </CollectionSection>
      </ArchiveLayout>
    )
  }

  if (collection === 'runs') {
    const runs = sortRunsByDate(runsResource.data)
    return (
      <ArchiveLayout title="Runs">
        {!runsResource.isLoading && !runsResource.hasError && (
          <CollectionStatistics label="Run statistics" statistics={getRunStatistics(runs)} />
        )}
        <CollectionSection title="Runs" resource={runsResource} items={runs} emptyMessage="No runs to show yet.">
          {(entries) => <RunCards runs={entries} />}
        </CollectionSection>
      </ArchiveLayout>
    )
  }

  if (collection === 'hikes') {
    const hikes = sortHikesByDate(hikesResource.data)

    return (
      <ArchiveLayout title="Hikes">
        {!hikesResource.isLoading && !hikesResource.hasError && (
          <CollectionStatistics label="Hike statistics" statistics={getHikeStatistics(hikes)} />
        )}
        <CollectionSection title="Hikes" resource={hikesResource} items={hikes} emptyMessage="No hikes to show yet.">
          {(entries) => <HikeCards hikes={entries} />}
        </CollectionSection>
      </ArchiveLayout>
    )
  }

  const trips = sortTripsByDate(tripsResource.data)

  return (
    <ArchiveLayout title="Trips">
      {!tripsResource.isLoading && !tripsResource.hasError && (
        <CollectionStatistics label="Trip statistics" statistics={getTripStatistics(trips)} />
      )}
      <CollectionSection title="Trips" resource={tripsResource} items={trips} emptyMessage="No trips to show yet.">
        {(entries) => <TripCards trips={entries} />}
      </CollectionSection>
    </ArchiveLayout>
  )
}