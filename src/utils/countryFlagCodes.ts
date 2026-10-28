const countryFlagCodes: Record<string, string> = {
  Estonia: 'ee',
  Finland: 'fi',
  Greece: 'gr',
  Italy: 'it',
  Japan: 'jp',
  Latvia: 'lv',
  Lithuania: 'lt',
  Norway: 'no',
  Poland: 'pl',
  'United Kingdom': 'gb',
  Spain: 'es',
  Sweden: 'se',
  Ukraine: 'ua',
}

export function getCountryFlagCode(country: string): string | undefined {
  return countryFlagCodes[country]
}