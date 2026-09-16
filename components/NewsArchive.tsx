'use client'

import { useMemo, useState } from 'react'
import { ArticleCard } from '@/components/ArticleCard'
import { EmptyState } from '@/components/EmptyState'
import { Button } from '@/components/ui/button'
import { newsFilters } from '@/data/site'
import { filterNews, coverForGame } from '@/lib/content'
import type { NewsFilter } from '@/types/content'
import { cn } from '@/lib/utils'

const PAGE = 4

export function NewsArchive() {
  const [filter, setFilter] = useState<NewsFilter>('All')
  const [visible, setVisible] = useState(PAGE)
  const items = useMemo(() => filterNews(filter), [filter])
  const shown = items.slice(0, visible)

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap gap-2">
        {newsFilters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setFilter(item)
              setVisible(PAGE)
            }}
            className={cn(
              'border border-line px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted',
              filter === item && 'border-accent bg-accent text-accent-ink',
            )}
          >
            {item}
          </button>
        ))}
      </div>
      {shown.length === 0 ? (
        <EmptyState
          title="No stories"
          detail="This filter has no pieces. Pick All or another desk."
          action={{
            label: 'Show all',
            onClick: () => {
              setFilter('All')
              setVisible(PAGE)
            },
          }}
        />
      ) : (
        <div className="grid gap-8">
          {shown.map((item, index) => (
            <ArticleCard
              key={item.slug}
              href={`/news/${item.slug}/`}
              kicker={item.category}
              title={item.title}
              excerpt={item.excerpt}
              date={item.publishedAt}
              coverLabel={item.coverLabel}
              coverSrc={coverForGame(item.gameSlug)}
              featured={index === 0 && filter === 'All'}
            />
          ))}
        </div>
      )}
      {visible < items.length ? (
        <Button
          type="button"
          variant="outline"
          onClick={() => setVisible((value) => value + PAGE)}
        >
          Load more
        </Button>
      ) : null}
    </div>
  )
}
