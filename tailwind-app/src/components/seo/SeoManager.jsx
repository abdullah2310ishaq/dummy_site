import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { blogPosts } from '../../data/blogPosts'

const SITE_NAME = 'Online Earning Guide'
const SITE_URL = 'https://www.onlineearningguide.net'
const DEFAULT_TITLE = 'Online Earning Guide - Real Methods for Beginners'
const DEFAULT_DESCRIPTION =
  'Online Earning Guide shares practical, beginner-friendly online earning guides for 2026 and beyond.'

function setMetaTag(selector, attributes) {
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    document.head.appendChild(tag)
  }
  Object.entries(attributes).forEach(([key, value]) => {
    tag.setAttribute(key, value)
  })
}

function setCanonical(url) {
  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', url)
}

function getPageMeta(pathname) {
  const byPath = {
    '/': {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
    },
    '/blog': {
      title: 'Blog - Practical Online Earning Articles',
      description: 'Read practical online earning guides focused on beginner-friendly actions and realistic results.',
    },
    '/about': {
      title: 'About Us - Online Earning Guide',
      description: 'Learn about Online Earning Guide and what we publish.',
    },
    '/contact': {
      title: 'Contact Us - Online Earning Guide',
      description: 'Contact Online Earning Guide for questions, feedback, or business inquiries.',
    },
    '/privacy-policy': {
      title: 'Privacy Policy - Online Earning Guide',
      description: 'Read how Online Earning Guide collects, uses, and protects visitor information.',
    },
    '/terms-and-conditions': {
      title: 'Terms and Conditions - Online Earning Guide',
      description: 'Review the terms and conditions for using the Online Earning Guide website.',
    },
    '/disclaimer': {
      title: 'Disclaimer - Online Earning Guide',
      description: 'Read the earnings, affiliate, and external links disclaimer for Online Earning Guide.',
    },
    '/sitemap': {
      title: 'HTML Sitemap - Online Earning Guide',
      description: 'Browse all key pages of Online Earning Guide from one HTML sitemap.',
    },
  }

  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '')
    const post = blogPosts.find((item) => item.slug === slug)
    if (post) {
      return {
        title: `${post.title} - ${SITE_NAME}`,
        description: post.excerpt,
      }
    }
  }

  return byPath[pathname] ?? { title: SITE_NAME, description: DEFAULT_DESCRIPTION }
}

export default function SeoManager() {
  const location = useLocation()

  useEffect(() => {
    const { pathname } = location
    const { title, description } = getPageMeta(pathname)
    const canonical = `${SITE_URL}${pathname === '/' ? '/' : pathname}`

    document.title = title
    setCanonical(canonical)

    setMetaTag('meta[name="description"]', { name: 'description', content: description })
    setMetaTag('meta[property="og:title"]', { property: 'og:title', content: title })
    setMetaTag('meta[property="og:description"]', { property: 'og:description', content: description })
    setMetaTag('meta[property="og:url"]', { property: 'og:url', content: canonical })
    setMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
    setMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
  }, [location])

  return null
}
