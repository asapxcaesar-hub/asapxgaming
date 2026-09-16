import type { NewsArticle } from '@/types/content'
import ingested from '@/content/ingested.json'
import { newsBatchA } from '@/content/news/batch-a'

export const news: NewsArticle[] = [...(ingested as NewsArticle[]), ...newsBatchA]
