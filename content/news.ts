import type { NewsArticle } from '@/types/content'
import ingested from '@/content/ingested.json'
import { newsBatchA } from '@/content/news/batch-a'
import { newsBatchB } from '@/content/news/batch-b'
import { newsBatchC } from '@/content/news/batch-c'
import { newsBatchD } from '@/content/news/batch-d'

export const news: NewsArticle[] = [
  ...(ingested as NewsArticle[]),
  ...newsBatchA,
  ...newsBatchB,
  ...newsBatchC,
  ...newsBatchD,
]
