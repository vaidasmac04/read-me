export function sortRunsByDate<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((first, second) => second.date.localeCompare(first.date))
}

function getJobRecency(roles: { toDate: string | null }[]): string {
  return roles.reduce((latest, role) => {
    const roleEnd = role.toDate ?? '9999-12'
    return roleEnd > latest ? roleEnd : latest
  }, '')
}

export function sortJobsByDate<T extends { roles: { toDate: string | null }[] }>(
  entries: T[],
): T[] {
  return [...entries].sort((first, second) =>
    getJobRecency(second.roles).localeCompare(getJobRecency(first.roles)),
  )
}

export function sortTripsByDate<T extends { fromDate: string | null; toDate: string | null }>(
  trips: T[],
): T[] {
  const getTripDate = (trip: T) => trip.toDate ?? trip.fromDate ?? ''
  return [...trips].sort((first, second) => getTripDate(second).localeCompare(getTripDate(first)))
}