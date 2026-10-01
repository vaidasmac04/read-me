import { useEffect, useState } from 'react'
import { fetchJobs } from './data/jobsService'
import { fetchRuns } from './data/runsService'
import { fetchTrips } from './data/tripsService'
import { useAsyncData } from './hooks/useAsyncData'
import { ArchivePage, type ArchiveCollection } from './pages/ArchivePage'
import { HomePage } from './pages/HomePage'
import './App.css'

function getHashRoute(): string {
  return window.location.hash.slice(1) || '/'
}

function App() {
  const jobsResource = useAsyncData(fetchJobs, [])
  const runsResource = useAsyncData(fetchRuns, [])
  const tripsResource = useAsyncData(fetchTrips, [])
  const [route, setRoute] = useState(getHashRoute)

  useEffect(() => {
    const updateRoute = () => {
      setRoute(getHashRoute())
      window.scrollTo(0, 0)
    }

    window.addEventListener('hashchange', updateRoute)
    return () => window.removeEventListener('hashchange', updateRoute)
  }, [])

  const pageResources = { jobsResource, runsResource, tripsResource }

  if (route === '/') {
    return <HomePage {...pageResources} />
  }

  const collection = route.slice(1)
  if (collection === 'jobs' || collection === 'runs' || collection === 'trips') {
    return <ArchivePage collection={collection as ArchiveCollection} {...pageResources} />
  }

  return (
    <main className="page-shell archive-page">
      <header className="archive-header">
        <a className="back-home-link" href="#/">Back home</a>
        <p className="section-kicker">Not found</p>
        <h1>Page not found</h1>
      </header>
    </main>
  )
}

export default App
