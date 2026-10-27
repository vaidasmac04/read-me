import type { Hike } from '../data/hikesService'
import type { Run } from '../data/runsService'
import type { Trip } from '../data/tripsService'
import { formatDuration } from './dateFormatting'

export interface CollectionStatistic {
  label: string
  value: string | number
}

export function getTripStatistics(trips: Trip[]): CollectionStatistic[] {
  const countryCount = new Set(
    trips.flatMap((trip) => trip.country.map((country) => country.trim().toLocaleLowerCase())),
  ).size
  const cityCount = new Set(
    trips.flatMap((trip) => trip.cities.map((city) => city.name.trim().toLocaleLowerCase())),
  ).size

  return [
    { label: 'Total trips', value: trips.length },
    { label: 'Countries visited', value: countryCount },
    { label: 'Cities visited', value: cityCount },
  ]
}

export function getHikeStatistics(hikes: Hike[]): CollectionStatistic[] {
  const totalDistanceKm = hikes.reduce((total, hike) => total + hike.distanceKm, 0)

  return [
    { label: 'Total hikes', value: hikes.length },
    { label: 'Total distance', value: `${totalDistanceKm.toLocaleString(undefined, { maximumFractionDigits: 1 })} km` },
  ]
}

export function getLongestHikeStatistics(hikes: Hike[]): CollectionStatistic[] {
  const longestHike = hikes.reduce<Hike | null>(
    (longest, hike) => !longest || hike.distanceKm > longest.distanceKm ? hike : longest,
    null,
  )

  return [{
    label: 'Longest hike',
    value: longestHike
      ? `${longestHike.distanceKm.toLocaleString(undefined, { maximumFractionDigits: 1 })} km`
      : '—',
  }]
}

export function getRunStatistics(runs: Run[]): CollectionStatistic[] {
  const totalDistanceKm = runs.reduce((total, run) => total + run.distanceKm, 0)
  return [
    { label: 'Total runs', value: runs.length },
    { label: 'Total distance', value: `${totalDistanceKm.toLocaleString(undefined, { maximumFractionDigits: 1 })} km` },
  ]
}

export function getRunBestResults(runs: Run[]): CollectionStatistic[] {
  const bestResult = (matches: (run: Run) => boolean): string => {
    const bestRun = runs
      .filter(matches)
      .reduce<Run | null>((best, run) => !best || run.durationSeconds < best.durationSeconds ? run : best, null)

    return bestRun ? formatDuration(bestRun.durationSeconds) : '—'
  }

  return [
    { label: '5 km best', value: bestResult((run) => run.distanceKm === 5) },
    { label: '10 km best', value: bestResult((run) => run.distanceKm === 10) },
    { label: 'Half marathon best', value: bestResult((run) => run.distanceName === 'Half Marathon' || run.distanceKm === 21.0975) },
    { label: 'Marathon best', value: bestResult((run) => run.distanceName === 'Marathon' || run.distanceKm === 42.195) },
  ]
}