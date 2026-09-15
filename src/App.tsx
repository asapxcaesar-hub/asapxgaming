import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SiteShell } from '@/components/layout/SiteShell'
import { AboutPage } from '@/pages/AboutPage'
import { HomePage } from '@/pages/HomePage'
import { NewsArticlePage } from '@/pages/NewsArticlePage'
import { NewsListPage } from '@/pages/NewsListPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ReviewDetailPage } from '@/pages/ReviewDetailPage'
import { ReviewsListPage } from '@/pages/ReviewsListPage'

export default function App() {
  return (
    <BrowserRouter>
      <SiteShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nieuws" element={<NewsListPage />} />
          <Route path="/nieuws/:slug" element={<NewsArticlePage />} />
          <Route path="/reviews" element={<ReviewsListPage />} />
          <Route path="/reviews/:slug" element={<ReviewDetailPage />} />
          <Route path="/over" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </SiteShell>
    </BrowserRouter>
  )
}
