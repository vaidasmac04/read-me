import type { JobEntry } from '../data/jobsService'
import { formatJobDateRange } from '../utils/dateFormatting'

function JobCard({ entry }: { entry: JobEntry }) {
  return (
    <article className="entry-card">
      <h3>{entry.company}</h3>
      <ul className="job-role-list">
        {entry.roles.map((role) => (
          <li key={`${role.title}-${role.fromDate}`}>
            <span className="job-role-title">{role.title}</span>
            <span className="job-role-dates">{formatJobDateRange(role.fromDate, role.toDate)}</span>
          </li>
        ))}
      </ul>
      <p className="entry-description">{entry.description}</p>
    </article>
  )
}

export function JobCards({ entries }: { entries: JobEntry[] }) {
  return (
    <div className="job-grid">
      {entries.map((entry) => (
        <JobCard key={`${entry.company}-${entry.roles[0].fromDate}`} entry={entry} />
      ))}
    </div>
  )
}