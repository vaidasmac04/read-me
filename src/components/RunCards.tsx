import type { Run } from '../data/runsService'
import { formatDate, formatDuration, formatPace } from '../utils/dateFormatting'

function RunCard({ run }: { run: Run }) {
  return (
    <article className="entry-card run-card">
      <h3>{run.name}</h3>
      {run.distanceName && <span className="run-distance-name">{run.distanceName}</span>}
      <p className="entry-date-range">{formatDate(run.date)}</p>
      <p className="run-result">
        {run.distanceKm} km <span aria-hidden="true">·</span> {formatDuration(run.durationSeconds)}
      </p>
      <p className="run-pace">Pace: {formatPace(run.durationSeconds, run.distanceKm)}</p>
    </article>
  )
}

export function RunCards({ runs }: { runs: Run[] }) {
  return (
    <div className="runs-grid">
      {runs.map((run) => <RunCard key={`${run.name}-${run.date}`} run={run} />)}
    </div>
  )
}