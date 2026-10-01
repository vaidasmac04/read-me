import type { CityStay } from '../data/tripsService'

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00.000Z`))
}

export function formatJobDateRange(fromDate: string, toDate: string | null): string {
  const formatMonth = (yearMonth: string) => {
    const [year, month] = yearMonth.split('-').map(Number)

    return new Intl.DateTimeFormat('en-GB', {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(Date.UTC(year, month - 1, 1)))
  }

  return `${formatMonth(fromDate)} – ${toDate ? formatMonth(toDate) : 'Now'}`
}

export function formatDateRange(fromDate: string | null, toDate: string | null): string {
  if (fromDate && toDate) return `${formatDate(fromDate)} – ${formatDate(toDate)}`
  if (fromDate) return `From ${formatDate(fromDate)}`
  if (toDate) return `Until ${formatDate(toDate)}`
  return 'Dates not added'
}

export function formatDuration(durationSeconds: number): string {
  const hours = Math.floor(durationSeconds / 3600)
  const minutes = Math.floor((durationSeconds % 3600) / 60)
  const seconds = durationSeconds % 60

  return [hours, minutes, seconds]
    .map((part) => String(part).padStart(2, '0'))
    .join(':')
}

export function formatPace(durationSeconds: number, distanceKm: number): string {
  const paceSeconds = Math.round(durationSeconds / distanceKm)
  const minutes = Math.floor(paceSeconds / 60)
  const seconds = paceSeconds % 60

  return `${minutes}:${String(seconds).padStart(2, '0')} min/km`
}

export function groupCitiesByDate(cities: CityStay[]): CityStay[][] {
  const groups = new Map<string, CityStay[]>()

  for (const city of cities) {
    const dateKey = JSON.stringify([city.fromDate, city.toDate])
    const group = groups.get(dateKey)

    if (group) group.push(city)
    else groups.set(dateKey, [city])
  }

  return Array.from(groups.values())
}