export interface Hike {
  title: string
  city: string
  country: string
  date: string
  distanceKm: number
}

function isIsoDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false

  const date = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value
}

function isHike(value: unknown): value is Hike {
  if (typeof value !== 'object' || value === null) return false

  return (
    'title' in value &&
    typeof value.title === 'string' &&
    'city' in value &&
    typeof value.city === 'string' &&
    'country' in value &&
    typeof value.country === 'string' &&
    'date' in value &&
    isIsoDate(value.date) &&
    'distanceKm' in value &&
    typeof value.distanceKm === 'number' &&
    Number.isFinite(value.distanceKm) &&
    value.distanceKm > 0
  )
}

export async function fetchHikes(): Promise<Hike[]> {
  const response = await fetch(`${import.meta.env.BASE_URL}hikes.json`)

  if (!response.ok) {
    throw new Error(`Could not load hikes: ${response.status}`)
  }

  const data: unknown = await response.json()

  if (!Array.isArray(data) || !data.every(isHike)) {
    throw new Error('Hikes data has an invalid format')
  }

  return data
}