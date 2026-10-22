const countryFlagCodes: Record<string, string> = {
  England: 'gb-eng',
  Estonia: 'ee',
  Finland: 'fi',
  Greece: 'gr',
  Italy: 'it',
  Japan: 'jp',
  Latvia: 'lv',
  Lithuania: 'lt',
  Norway: 'no',
  Poland: 'pl',
  Spain: 'es',
  Sweden: 'se',
}

export function getCountryFlagCode(country: string): string | undefined {
  return countryFlagCodes[country]
}