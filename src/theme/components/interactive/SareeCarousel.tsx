'use client'

import { clsx } from 'clsx'
import { useState } from 'react'
import { Image, Link, Price, useProducts, useStorefront, type ProductCard } from '@dripfunnel/storefront-core/theme'
import styles from '../../styles/sareeCarousel.module.css'

const slides = [
  { dot: 'carousel.featured.one.dot' },
  { dot: 'carousel.featured.two.dot' },
  { dot: 'carousel.featured.three.dot' },
  { dot: 'carousel.featured.four.dot' },
  { dot: 'carousel.featured.five.dot' },
  { dot: 'carousel.featured.six.dot' },
] as const

type Slide = (typeof slides)[number]

export const SareeCarousel = () => {
  const { store, locale, t } = useStorefront()
  const { products } = useProducts({ sort: 'newest', first: 6 })
  const [active, setActive] = useState(0)

  if (products.length === 0) return null

  const displayed = products.slice(0, slides.length)
  const current = displayed[active]

  return (
    <div className={styles.carousel} aria-roledescription={t('carousel.featured.label')}>
      {current ? (
        <>
          <div className={styles.grid}>
            {displayed.map((product, i) => (
              <div key={product.id} className={clsx(styles.card, i === active && styles.cardActive)}>
                <Link href={product.href} className={styles.cardLink}>
                  <div className={styles.cardPicture}>
                    {product.photo ? (
                      <Image image={product.photo} alt={product.photo.alt ?? product.name} ratio={0.8} sizes="(min-width: 900px) 20vw, 50vw" className={styles.cardImage} />
                    ) : (
                      <span className={styles.noPicture}>{t('shop.card.noPicture')}</span>
                    )}
                  </div>
                  <h3 className={styles.cardName}>{product.name}</h3>
                  {product.price ? (
                    <p className={styles.cardPrice}>
                      {product.from ? <span className={styles.from}>{t('shop.card.from')}</span> : null}
                      <Price money={product.price} compareAt={product.compareAt} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={styles.price} />
                    </p>
                  ) : null}
                </Link>
              </div>
            ))}
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
    </div>
  )
}
