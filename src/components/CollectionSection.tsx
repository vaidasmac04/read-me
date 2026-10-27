import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { AsyncData } from '../hooks/useAsyncData'

export function CollectionSection<T>({
  title,
  href,
  actionLabel,
  beforeContent,
  resource,
  items,
  emptyMessage,
  enableCardNavigation = false,
  children,
}: {
  title: string
  href?: string
  actionLabel?: string
  beforeContent?: ReactNode
  resource: AsyncData<T[]>
  items: T[]
  emptyMessage: string
  enableCardNavigation?: boolean
  children: (items: T[]) => ReactNode
}) {
  const cardsViewport = useRef<HTMLDivElement>(null)
  const [canScrollBackward, setCanScrollBackward] = useState(false)
  const [canScrollForward, setCanScrollForward] = useState(false)
  const itemCount = items.length

  useEffect(() => {
    if (!enableCardNavigation) return

    const viewport = cardsViewport.current
    if (!viewport) return

    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const updateScrollButtons = () => {
      const isVertical = mediaQuery.matches
      const maxOffset = Math.max(0, isVertical
        ? viewport.scrollHeight - viewport.clientHeight
        : viewport.scrollWidth - viewport.clientWidth)
      const offset = isVertical ? viewport.scrollTop : viewport.scrollLeft

      setCanScrollBackward(offset > 1)
      setCanScrollForward(offset < maxOffset - 1)
    }
    const resizeObserver = new ResizeObserver(updateScrollButtons)

    viewport.addEventListener('scroll', updateScrollButtons)
    mediaQuery.addEventListener('change', updateScrollButtons)
    resizeObserver.observe(viewport)
    if (viewport.firstElementChild) resizeObserver.observe(viewport.firstElementChild)
    updateScrollButtons()

    return () => {
      viewport.removeEventListener('scroll', updateScrollButtons)
      mediaQuery.removeEventListener('change', updateScrollButtons)
      resizeObserver.disconnect()
    }
  }, [enableCardNavigation, itemCount])

  function scrollCards(direction: -1 | 1) {
    const viewport = cardsViewport.current
    if (!viewport) return

    const isVertical = window.matchMedia('(max-width: 768px)').matches
    const track = viewport.firstElementChild
    const firstCard = track?.firstElementChild
    const cardSize = firstCard instanceof HTMLElement
      ? (isVertical ? firstCard.offsetHeight : firstCard.offsetWidth)
      : (isVertical ? viewport.clientHeight : viewport.clientWidth) * 0.85
    const gap = track instanceof HTMLElement
      ? Number.parseFloat(window.getComputedStyle(track).gap) || 0
      : 0
    const scrollDistance = cardSize + gap

    viewport.scrollBy({
      left: isVertical ? 0 : direction * scrollDistance,
      top: isVertical ? direction * scrollDistance : 0,
      behavior: 'smooth',
    })
  }

  return (
    <section className="content-section collection-section">
      <div className="section-heading section-heading-with-link">
        <p className="section-kicker">{title}</p>
        {href && actionLabel && (
          <a className="see-all-link" href={href}>{actionLabel}</a>
        )}
      </div>
      {beforeContent}
      {resource.isLoading && <p className="resource-message" role="status">Loading {title.toLowerCase()}...</p>}
      {resource.hasError && <p className="resource-message" role="alert">{title} could not be loaded.</p>}
      {!resource.isLoading && !resource.hasError && items.length === 0 && (
        <p className="resource-message">{emptyMessage}</p>
      )}
      {!resource.isLoading && !resource.hasError && items.length > 0 && (
        enableCardNavigation ? (
          <>
            <div className="collection-carousel">
              {items.length > 1 && (
                <button className="collection-carousel-button" type="button" aria-label={`Previous ${title.toLowerCase()} cards`} onClick={() => scrollCards(-1)} disabled={!canScrollBackward}>
                  <span className="carousel-chevron carousel-chevron-previous" aria-hidden="true" />
                </button>
              )}
              <div className="collection-carousel-viewport" ref={cardsViewport} role="region" aria-label={`${title} cards`} tabIndex={0}>
                {children(items)}
              </div>
              {items.length > 1 && (
                <button className="collection-carousel-button" type="button" aria-label={`Next ${title.toLowerCase()} cards`} onClick={() => scrollCards(1)} disabled={!canScrollForward}>
                  <span className="carousel-chevron carousel-chevron-next" aria-hidden="true" />
                </button>
              )}
            </div>
          </>
        ) : children(items)
      )}
    </section>
  )
}