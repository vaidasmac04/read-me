import type { CollectionStatistic } from '../utils/collectionStatistics'

export function CollectionStatistics({
  label,
  statistics,
}: {
  label: string
  statistics: CollectionStatistic[]
}) {
  return (
    <section className="collection-statistics" aria-label={label}>
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