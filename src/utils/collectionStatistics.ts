import type { Hike } from '../data/hikesService'
import type { Run } from '../data/runsService'
import type { Trip } from '../data/tripsService'

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

export function getRunStatistics(runs: Run[]): CollectionStatistic[] {
  const totalDistanceKm = runs.reduce((total, run) => total + run.distanceKm, 0)

  return [
    { label: 'Total runs', value: runs.length },
    { label: 'Total distance', value: `${totalDistanceKm.toLocaleString(undefined, { maximumFractionDigits: 1 })} km` },
  ]
}