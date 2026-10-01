export type DistanceName = 'Marathon' | 'Half Marathon' | null

export interface Run {
  name: string
  distanceName: DistanceName
  date: string
  distanceKm: number
  durationSeconds: number
}

function isIsoDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false

  const date = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value
}

function isRun(value: unknown): value is Run {
  if (typeof value !== 'object' || value === null) return false

  return (
    'name' in value &&
    typeof value.name === 'string' &&
    'distanceName' in value &&
    (value.distanceName === 'Marathon' ||
      value.distanceName === 'Half Marathon' ||
      value.distanceName === null) &&
    'date' in value &&
    isIsoDate(value.date) &&
    'distanceKm' in value &&
    typeof value.distanceKm === 'number' &&
    Number.isFinite(value.distanceKm) &&
    value.distanceKm > 0 &&
    'durationSeconds' in value &&
    typeof value.durationSeconds === 'number' &&
    Number.isInteger(value.durationSeconds) &&
    value.durationSeconds > 0
  )
}

export async function fetchRuns(): Promise<Run[]> {
  const response = await fetch(`${import.meta.env.BASE_URL}runs.json`)

  if (!response.ok) {
    throw new Error(`Could not load runs: ${response.status}`)
  }

  const data: unknown = await response.json()

  if (!Array.isArray(data) || !data.every(isRun)) {
    throw new Error('Runs data has an invalid format')
  }

  return data
}