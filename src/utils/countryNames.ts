const countryAliases: Record<string, string> = {
  england: 'united kingdom',
}

export function normalizeCountryName(country: string): string {
  const normalizedCountry = country.trim().toLowerCase()
  return countryAliases[normalizedCountry] ?? normalizedCountry
}