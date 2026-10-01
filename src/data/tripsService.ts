export interface CityStay {
  name: string
  fromDate: string | null
  toDate: string | null
}

export interface Trip {
  title: string
  season: string
  fromDate: string | null
  toDate: string | null
  cities: CityStay[]
}

function isDateOrNull(value: unknown): value is string | null {
  if (value === null) return true
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false

  const date = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value
}

function isCityStay(value: unknown): value is CityStay {
  if (typeof value !== 'object' || value === null) return false

  return (
    'name' in value &&
    typeof value.name === 'string' &&
    'fromDate' in value &&
    isDateOrNull(value.fromDate) &&
    'toDate' in value &&
    isDateOrNull(value.toDate)
  )
}

function isTrip(value: unknown): value is Trip {
  if (typeof value !== 'object' || value === null) return false

  return (
    'title' in value &&
    typeof value.title === 'string' &&
    'season' in value &&
    typeof value.season === 'string' &&
    'fromDate' in value &&
    isDateOrNull(value.fromDate) &&
    'toDate' in value &&
    isDateOrNull(value.toDate) &&
    'cities' in value &&
    Array.isArray(value.cities) &&
    value.cities.every(isCityStay)
  )
}

export async function fetchTrips(): Promise<Trip[]> {
  const response = await fetch(`${import.meta.env.BASE_URL}trips.json`)

  if (!response.ok) {
    throw new Error(`Could not load trips: ${response.status}`)
  }

  const data: unknown = await response.json()

  if (!Array.isArray(data) || !data.every(isTrip)) {
    throw new Error('Trips data has an invalid format')
  }

  return data
}