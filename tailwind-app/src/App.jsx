import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/layout/SiteLayout'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import CategoriesPage from './pages/CategoriesPage'
import CategoryDetailPage from './pages/CategoryDetailPage'
import ContactPage from './pages/ContactPage'
import DisclaimerPage from './pages/DisclaimerPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import PostDetailPage from './pages/PostDetailPage'
import ProgressPage from './pages/ProgressPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import ScamWarningsPage from './pages/ScamWarningsPage'
import StartHerePage from './pages/StartHerePage'
import TermsAndConditionsPage from './pages/TermsAndConditionsPage'
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
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
