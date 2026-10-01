export interface JobRole {
  title: string
  fromDate: string
  toDate: string | null
}

export interface JobEntry {
  company: string
  description: string
  roles: JobRole[]
}

function isYearMonth(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(value)
}

function isJobRole(value: unknown): value is JobRole {
  if (typeof value !== 'object' || value === null) return false

  return (
    'title' in value &&
    typeof value.title === 'string' &&
    'fromDate' in value &&
    isYearMonth(value.fromDate) &&
    'toDate' in value &&
    (value.toDate === null || isYearMonth(value.toDate))
  )
}

function isJobEntry(value: unknown): value is JobEntry {
  if (typeof value !== 'object' || value === null) return false

  return (
    'company' in value &&
    typeof value.company === 'string' &&
    'description' in value &&
    typeof value.description === 'string' &&
    'roles' in value &&
    Array.isArray(value.roles) &&
    value.roles.length > 0 &&
    value.roles.every(isJobRole)
  )
}

export async function fetchJobs(): Promise<JobEntry[]> {
  const response = await fetch(`${import.meta.env.BASE_URL}jobs.json`)

  if (!response.ok) {
    throw new Error(`Could not load jobs: ${response.status}`)
  }

  const data: unknown = await response.json()

  if (!Array.isArray(data) || !data.every(isJobEntry)) {
    throw new Error('Jobs data has an invalid format')
  }

  return data
}