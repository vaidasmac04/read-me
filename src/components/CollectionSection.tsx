import type { ReactNode } from 'react'
import type { AsyncData } from '../hooks/useAsyncData'

export function CollectionSection<T>({
  title,
  href,
  actionLabel,
  resource,
  items,
  emptyMessage,
  children,
}: {
  title: string
  href?: string
  actionLabel?: string
  resource: AsyncData<T[]>
  items: T[]
  emptyMessage: string
  children: (items: T[]) => ReactNode
}) {
  return (
    <section className="content-section collection-section">
      <div className="section-heading section-heading-with-link">
        <p className="section-kicker">{title}</p>
        {href && actionLabel && (
          <a className="see-all-link" href={href}>{actionLabel}</a>
        )}
      </div>
      {resource.isLoading && <p className="resource-message" role="status">Loading {title.toLowerCase()}...</p>}
      {resource.hasError && <p className="resource-message" role="alert">{title} could not be loaded.</p>}
      {!resource.isLoading && !resource.hasError && items.length === 0 && (
        <p className="resource-message">{emptyMessage}</p>
      )}
      {!resource.isLoading && !resource.hasError && items.length > 0 && children(items)}
    </section>
  )
}