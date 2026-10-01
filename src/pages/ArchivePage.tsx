import type { ReactNode } from 'react'
import type { JobEntry } from '../data/jobsService'
import type { Run } from '../data/runsService'
import type { Trip } from '../data/tripsService'
import type { AsyncData } from '../hooks/useAsyncData'
import { CollectionSection } from '../components/CollectionSection'
import { JobCards } from '../components/JobCards'
import { RunCards } from '../components/RunCards'
import { TripCards } from '../components/TripCards'
import { sortJobsByDate, sortRunsByDate, sortTripsByDate } from '../utils/collectionSorting'

export type ArchiveCollection = 'jobs' | 'runs' | 'trips'

interface ArchivePageProps {
  collection: ArchiveCollection
  jobsResource: AsyncData<JobEntry[]>
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
        <CollectionSection title="Runs" resource={runsResource} items={runs} emptyMessage="No runs to show yet.">
          {(entries) => <RunCards runs={entries} />}
        </CollectionSection>
      </ArchiveLayout>
    )
  }

  const trips = sortTripsByDate(tripsResource.data)
  return (
    <ArchiveLayout title="Trips">
      <CollectionSection title="Trips" resource={tripsResource} items={trips} emptyMessage="No trips to show yet.">
        {(entries) => <TripCards trips={entries} />}
      </CollectionSection>
    </ArchiveLayout>
  )
}