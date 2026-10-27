import type { CollectionStatistic } from '../utils/collectionStatistics'

export function CollectionStatistics({
  label,
  heading,
  statistics,
}: {
  label: string
  heading?: string
  statistics: CollectionStatistic[]
}) {
  return (
    <section className="collection-statistics" aria-label={label}>
      {heading && <h3 className="collection-statistics-heading">{heading}</h3>}
      <dl>
        {statistics.map((statistic) => (
          <div key={statistic.label}>
            <dt>{statistic.label}</dt>
            <dd>{statistic.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}