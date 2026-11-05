'use client'

import { clsx } from 'clsx'
import { useState } from 'react'
import { Image, Link, Price, useProducts, useStorefront, type ProductCard } from '@dripfunnel/storefront-core/theme'
import styles from '../../styles/carousel.module.css'

const slides = [
  { dot: 'carousel.featured.one.dot' },
  { dot: 'carousel.featured.two.dot' },
  { dot: 'carousel.featured.three.dot' },
  { dot: 'carousel.featured.four.dot' },
] as const

type Slide = (typeof slides)[number]

export const ProductCarousel = () => {
  const { store, locale, t } = useStorefront()
  const { products } = useProducts({ sort: 'newest', first: 4 })
  const [active, setActive] = useState(0)

  if (products.length === 0) return null

  const displayed = products.slice(0, slides.length)
  const current = displayed[active]

  return (
    <section className={styles.carousel} aria-roledescription={t('carousel.featured.label')}>
      {current ? (
        <>
          <div className={styles.stage}>
            <div className={styles.slide}>
              <Link href={current.href} className={styles.slideLink}>
                <div className={styles.slidePicture}>
                  {current.photo ? (
                    <Image image={current.photo} alt={current.photo.alt ?? current.name} ratio={1.35} sizes="(min-width: 900px) 100vw, 100vw" className={styles.slideImage} />
                  ) : (
                    <div className={styles.noPicture} />
                  )}
                </div>
                <div className={styles.slideInfo}>
                  <h3 className={styles.slideName}>{current.name}</h3>
                  {current.price ? (
                    <p className={styles.slidePrice}>
                      {current.from ? <span className={styles.from}>{t('shop.card.from')}</span> : null}
                      <Price money={current.price} compareAt={current.compareAt} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={styles.price} />
                    </p>
                  ) : null}
                </div>
              </Link>
            </div>
          </div>
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.arrow}
              aria-label={t('carousel.featured.previous')}
              onClick={() => setActive((active - 1 + displayed.length) % displayed.length)}
            >
              <svg className={styles.arrowIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className={styles.dots}>
              {slides.slice(0, displayed.length).map((slide, i) => (
                <button
                  key={i}
                  type="button"
                  className={clsx(styles.dot, i === active && styles.dotActive)}
                  aria-label={t(slide.dot)}
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
            <button
              type="button"
              className={styles.arrow}
              aria-label={t('carousel.featured.next')}
              onClick={() => setActive((active + 1) % displayed.length)}
            >
              <svg className={styles.arrowIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </>
      ) : null}
    </section>
  )
}
