import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/layout/SiteLayout'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import CategoriesPage from './pages/CategoriesPage'
import CategoryDetailPage from './pages/CategoryDetailPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import PostDetailPage from './pages/PostDetailPage'
import ProgressPage from './pages/ProgressPage'
import ScamWarningsPage from './pages/ScamWarningsPage'
import StartHerePage from './pages/StartHerePage'
import ComparePage from './pages/ComparePage'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/start-here" element={<StartHerePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:slug" element={<CategoryDetailPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<PostDetailPage />} />
        <Route path="/scam-warnings" element={<ScamWarningsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
