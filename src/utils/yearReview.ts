import type { Hike } from '../data/hikesService'
import type { Run } from '../data/runsService'
import type { Trip } from '../data/tripsService'

export interface YearReviewData {
  trips: Trip[]
  hikes: Hike[]
  runs: Run[]
  countries: string[]
  cities: string[]
  hikingDistanceKm: number
  runningDistanceKm: number
}

export function getAvailableReviewYears(trips: Trip[], hikes: Hike[], runs: Run[]): number[] {
  const years = new Set<number>()

  trips.forEach((trip) => {
    if (trip.fromDate) years.add(Number(trip.fromDate.slice(0, 4)))
  })
  hikes.forEach((hike) => years.add(Number(hike.date.slice(0, 4))))
  runs.forEach((run) => years.add(Number(run.date.slice(0, 4))))

  return [...years].sort((first, second) => second - first)
}

export function getYearReviewData(year: number, trips: Trip[], hikes: Hike[], runs: Run[]): YearReviewData {
  const yearPrefix = `${year}-`
  const yearTrips = trips.filter((trip) => trip.fromDate?.startsWith(yearPrefix))
  const yearHikes = hikes.filter((hike) => hike.date.startsWith(yearPrefix))
  const yearRuns = runs.filter((run) => run.date.startsWith(yearPrefix))
  const countries = [...new Set(yearTrips.flatMap((trip) => trip.country))]
    .sort((first, second) => first.localeCompare(second))
  const cities = [...new Set(yearTrips.flatMap((trip) => trip.cities.map((city) => city.name)))]
    .sort((first, second) => first.localeCompare(second))

  return {
    trips: yearTrips,
    hikes: yearHikes,
    runs: yearRuns,
    countries,
    cities,
    hikingDistanceKm: yearHikes.reduce((total, hike) => total + hike.distanceKm, 0),
    runningDistanceKm: yearRuns.reduce((total, run) => total + run.distanceKm, 0),
  }
}