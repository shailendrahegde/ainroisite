import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { GithubLogo, LinkedinLogo, List, X, XLogo, ShareNetwork, Link as LinkIcon, Check, Brain, Key, ChartLineUp, UsersFour, TrendUp } from "@phosphor-icons/react"

// Google Analytics type declaration
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void
  }
}

interface Project {
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  image: string
}

interface BlogMeta {
  id: string
  title: string
  summary: string
  category: string
  readTime: string
  filename: string
  date: string
  thumbnail: string
}

// Category visual config for blog tile abstract backgrounds
const categoryVisuals: Record<string, { gradient: string, Icon: React.ComponentType<{ size?: number; weight?: string; style?: React.CSSProperties }> }> = {
  'AI Adoption': { gradient: 'linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(6,182,212,0.14) 100%)', Icon: Brain },
  'License Allocation': { gradient: 'linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(236,72,153,0.14) 100%)', Icon: Key },
  'ROI Analysis': { gradient: 'linear-gradient(135deg, rgba(6,182,212,0.18) 0%, rgba(59,130,246,0.14) 100%)', Icon: ChartLineUp },
  'Superusers': { gradient: 'linear-gradient(135deg, rgba(236,72,153,0.18) 0%, rgba(167,139,250,0.14) 100%)', Icon: UsersFour },
  'Investment Decisions': { gradient: 'linear-gradient(135deg, rgba(96,165,250,0.18) 0%, rgba(139,92,246,0.14) 100%)', Icon: TrendUp },
}
const defaultCategoryVisual = { gradient: 'linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(59,130,246,0.14) 100%)', Icon: Brain }

const projects: Project[] = [
  {
    title: "Decoding Super Usage",
    description: "Learn what your best users of M365 Copilot do differently.",
    tags: ["Power BI", "Copilot Analytics"],
    githubUrl: "https://github.com/microsoft/DecodingSuperUsage",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop"
  },
  {
    title: "Superuser Impact",
    description: "Understand workpatterns and work impact of M365 Copilot Superusers",
    tags: ["Power BI", "Copilot Analytics"],
    githubUrl: "https://github.com/microsoft/superuserimpact",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&hue=240"
  },
  {
    title: "AI in One",
    description: "Simplified single report that brings M365 Copilot, Free Chat and Agent usage in a single view.",
    tags: ["Power BI", "Copilot Analytics", "Microsoft Purview"],
    githubUrl: "https://github.com/microsoft/AI-in-One-Dashboard",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop"
  },
  {
    title: "GitHub Copilot Impact",
    description: "A tribute to the magic of GitHub Copilot. Learn success patterns of GitHub Copilot use.",
    tags: ["Power BI", "GitHub Usage Insights"],
    githubUrl: "https://github.com/microsoft/GitHubCopilotImpact",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&sat=-100"
  },
  {
    title: "Chat & Agent Intelligence",
    description: "Intelligence on free Chat and Agent usage.",
    tags: ["Power BI", "Microsoft Purview"],
    githubUrl: "https://github.com/microsoft/CopilotChatAnalytics",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop"
  },
  {
    title: "M365 to Copilot Bridge",
    description: "Analyze M365 app usage to inform likelihood of Copilot Adoption",
    tags: ["Power BI", "Microsoft Graph"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&brightness=1.1"
  },
  {
    title: "Dash to Deck",
    description: "Convert any dashboard to a compelling exec ready presentation.",
    tags: ["Python", "Claude", "PowerBI"],
    githubUrl: "https://github.com/shailendrahegde/pbi-to-exec-deck",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop"
  }
]

// Inline Logo SVG component
function LogoSVG({ size = 42 }: { size?: number }) {
  return (
    <svg viewBox="0 0 42 42" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad1" x1="0" y1="0" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6"/>
          <stop offset="50%" stopColor="#8B5CF6"/>
          <stop offset="100%" stopColor="#EC4899"/>
        </linearGradient>
        <linearGradient id="logoGrad2" x1="10" y1="10" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA"/>
          <stop offset="100%" stopColor="#A78BFA"/>
        </linearGradient>
      </defs>
      <path d="M21 2 L36 9 L40 21 L36 33 L21 40 L6 33 L2 21 L6 9 Z"
            fill="none" stroke="url(#logoGrad1)" strokeWidth="1.5" opacity="0.6"/>
      <circle cx="21" cy="14" r="3" fill="url(#logoGrad2)"/>
      <circle cx="14" cy="26" r="2.5" fill="url(#logoGrad2)" opacity="0.8"/>
      <circle cx="28" cy="26" r="2.5" fill="url(#logoGrad2)" opacity="0.8"/>
      <line x1="21" y1="17" x2="14" y2="23.5" stroke="url(#logoGrad2)" strokeWidth="1" opacity="0.5"/>
      <line x1="21" y1="17" x2="28" y2="23.5" stroke="url(#logoGrad2)" strokeWidth="1" opacity="0.5"/>
      <line x1="14" y1="28.5" x2="28" y2="28.5" stroke="url(#logoGrad2)" strokeWidth="1" opacity="0.3"/>
      <circle cx="21" cy="14" r="5" fill="none" stroke="#60A5FA" strokeWidth="0.5" opacity="0.4">
        <animate attributeName="r" values="5;8;5" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="21" cy="32" r="1.5" fill="#F472B6" opacity="0.6"/>
      <circle cx="10" cy="18" r="1" fill="#06B6D4" opacity="0.5"/>
      <circle cx="32" cy="18" r="1" fill="#06B6D4" opacity="0.5"/>
    </svg>
  )
}

function App() {
  const [blogs, setBlogs] = useState<BlogMeta[]>([])
  const [selectedBlog, setSelectedBlog] = useState<BlogMeta | null>(null)
  const [blogContent, setBlogContent] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copiedBlogId, setCopiedBlogId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("insights")
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsAnimated, setStatsAnimated] = useState(false)
  const [statValues, setStatValues] = useState([0, 0, 0, 0])

  const baseUrl = import.meta.env.BASE_URL
  const keithAvatarSources = useMemo(
    () => [
      `${baseUrl}Keith-McGrane%20Pic.jpg`,
      `${baseUrl}Keith-McGrane%20Pic.png`,
      "https://unavatar.io/linkedin/keith-mcgrane-46184029",
    ],
    [baseUrl]
  )
  const [keithAvatarIndex, setKeithAvatarIndex] = useState(0)
  const [keithAvatarFailed, setKeithAvatarFailed] = useState(false)

  // Handle tab changes and update URL
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setMobileMenuOpen(false)
    if (value === 'projects') {
      window.history.replaceState(null, '', '#projects')
    } else if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle navigation to projects tab and project anchors
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        const hashId = hash.replace('#', '')
        if (hashId === 'projects') {
          setActiveTab('projects')
        } else {
          const projectIds = projects.map(p => p.title.toLowerCase().replace(/\s+/g, '-'))
          if (projectIds.includes(hashId)) {
            setActiveTab('projects')
            setTimeout(() => {
              const element = document.getElementById(hashId)
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }
            }, 300)
          }
        }
      }
    }
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  // Fetch blog manifest
  useEffect(() => {
    fetch("/blogs/manifest.json")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data)
        setLoading(false)
        const urlParams = new URLSearchParams(window.location.search)
        const blogId = urlParams.get('blog')
        if (blogId) {
          const blog = data.find((b: BlogMeta) => b.id === blogId)
          if (blog) {
            setSelectedBlog(blog)
          }
        }
      })
      .catch((err) => {
        console.error("Error loading blogs:", err)
        setLoading(false)
      })
  }, [])

  // Blog selection side effects
  useEffect(() => {
    if (selectedBlog) {
      fetch(`/blogs/${selectedBlog.filename}`)
        .then((res) => res.text())
        .then((text) => setBlogContent(text))
        .catch((err) => console.error("Error loading blog content:", err))

      const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": selectedBlog.title,
        "description": selectedBlog.summary,
        "image": selectedBlog.thumbnail,
        "datePublished": selectedBlog.date,
        "dateModified": selectedBlog.date,
        "author": [
          { "@type": "Person", "name": "Shailendra Hegde", "url": "https://www.linkedin.com/in/shailendrahegde" },
          { "@type": "Person", "name": "Keith McGrane", "url": "https://www.linkedin.com/in/keith-mcgrane-46184029" }
        ],
        "publisher": {
          "@type": "Organization",
          "name": "AInROI",
          "logo": { "@type": "ImageObject", "url": "https://www.ainroi.com/icon.svg" }
        },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.ainroi.com/?blog=${selectedBlog.id}` },
        "articleSection": selectedBlog.category,
        "keywords": ["AI adoption", "Enterprise AI", "Copilot", "AI analytics", selectedBlog.category]
      }

      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'blog-structured-data'
      script.textContent = JSON.stringify(structuredData)
      const existing = document.getElementById('blog-structured-data')
      if (existing) existing.remove()
      document.head.appendChild(script)

      document.title = `${selectedBlog.title} - AInROI`
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) metaDescription.setAttribute('content', selectedBlog.summary)
      const canonical = document.querySelector('link[rel="canonical"]')
      if (canonical) canonical.setAttribute('href', `https://www.ainroi.com/?blog=${selectedBlog.id}`)

      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'page_view', {
          page_title: selectedBlog.title,
          page_location: `https://www.ainroi.com/?blog=${selectedBlog.id}`,
          page_path: `/?blog=${selectedBlog.id}`
        })
        window.gtag('event', 'blog_view', {
          blog_title: selectedBlog.title,
          blog_category: selectedBlog.category,
          blog_id: selectedBlog.id
        })
      }
    } else {
      document.title = 'AInROI - AI and Copilot Analytics'
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) metaDescription.setAttribute('content', 'Enterprise AI insights informed by extensive building, deep customer listening, and advisory work\u2014validated through analytics and real-world feedback from widely used projects with 1000+ downloads per week.')
      const canonical = document.querySelector('link[rel="canonical"]')
      if (canonical) canonical.setAttribute('href', 'https://www.ainroi.com/')
      const existing = document.getElementById('blog-structured-data')
      if (existing) existing.remove()
    }
  }, [selectedBlog])

  // Header scroll + reading progress
  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 20)
      if (selectedBlog) {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0
        setReadingProgress(progress)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [selectedBlog])

  // Scroll-reveal animations via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.reveal-up, .reveal-scale')
      els.forEach(el => {
        if (!el.classList.contains('revealed')) {
          observer.observe(el)
        }
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [activeTab, selectedBlog, loading])

  // Animated stat counters
  useEffect(() => {
    if (statsAnimated || !statsRef.current) return
    const targets = [1000, 10, 95, 5]
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          setStatsAnimated(true)
          const duration = 1500
          const start = performance.now()
          function update(now: number) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setStatValues(targets.map(t => Math.round(t * eased)))
            if (progress < 1) requestAnimationFrame(update)
          }
          requestAnimationFrame(update)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })
    observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [statsAnimated])

  // Nav tab mouse tracking for radial glow
  const handleNavMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width * 100) + '%'
    const y = ((e.clientY - rect.top) / rect.height * 100) + '%'
    e.currentTarget.style.setProperty('--mouse-x', x)
    e.currentTarget.style.setProperty('--mouse-y', y)
  }, [])

  // Categories
  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>()
    categoryMap.set("All", blogs.length)
    blogs.forEach((blog) => {
      categoryMap.set(blog.category, (categoryMap.get(blog.category) || 0) + 1)
    })
    return categoryMap
  }, [blogs])

  const filteredBlogs = useMemo(() => {
    if (selectedCategory === "All") return blogs
    return blogs.filter((blog) => blog.category === selectedCategory)
  }, [blogs, selectedCategory])

  // Share functions
  const getBlogUrl = (blogId: string) => {
    return `${window.location.origin}${window.location.pathname}?blog=${blogId}`
  }

  const shareOnTwitter = (blog: BlogMeta) => {
    const url = getBlogUrl(blog.id)
    const text = `${blog.title} - ${blog.summary}`
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
  }

  const shareOnLinkedIn = (blog: BlogMeta) => {
    const url = getBlogUrl(blog.id)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
  }

  const copyLink = async (blogId: string) => {
    const url = getBlogUrl(blogId)
    try {
      await navigator.clipboard.writeText(url)
      setCopiedBlogId(blogId)
      setTimeout(() => setCopiedBlogId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // First blog as hero/featured card
  const heroBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null
  const gridBlogs = filteredBlogs.slice(1)

  // Markdown components for dark article styling
  let paragraphCount = 0
  const markdownComponents = {
    h2: ({ children, ...props }: any) => (
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginTop: '52px',
          marginBottom: '20px',
          letterSpacing: '-0.5px',
          paddingLeft: '16px',
          borderLeft: '3px solid',
          borderImage: 'linear-gradient(to bottom, var(--accent-blue), var(--accent-purple-light)) 1',
        }}
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3
        style={{
          fontSize: '18px',
          fontWeight: 600,
          color: '#E5E7EB',
          marginTop: '36px',
          marginBottom: '16px',
        }}
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }: any) => {
      paragraphCount++
      return (
        <p
          className={paragraphCount === 1 ? 'drop-cap' : ''}
          style={{
            fontSize: '16px',
            lineHeight: '1.85',
            color: '#C9CDD4',
            marginBottom: '24px',
          }}
          {...props}
        >
          {children}
        </p>
      )
    },
    strong: ({ children, ...props }: any) => (
      <strong style={{ color: '#F9FAFB' }} {...props}>{children}</strong>
    ),
    a: ({ children, href, ...props }: any) => (
      <a
        href={href}
        style={{
          color: 'var(--accent-blue-light)',
          textDecoration: 'none',
          borderBottom: '1px solid rgba(96,165,250,0.3)',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        target="_blank"
        rel="noopener noreferrer"
        onMouseOver={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-blue-light)';
          (e.currentTarget as HTMLElement).style.color = '#93C5FD';
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.3)';
          (e.currentTarget as HTMLElement).style.color = 'var(--accent-blue-light)';
        }}
        {...props}
      >
        {children}
      </a>
    ),
    table: ({ children, ...props }: any) => (
      <div style={{ overflowX: 'auto', margin: '36px 0' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
            fontSize: '14px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--border-subtle)',
          }}
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }: any) => (
      <th
        style={{
          background: 'rgba(59,130,246,0.08)',
          color: '#E5E7EB',
          fontWeight: 600,
          textAlign: 'left' as const,
          padding: '14px 18px',
          borderBottom: '1px solid var(--border-subtle)',
        }}
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td
        style={{
          padding: '14px 18px',
          borderBottom: '1px solid rgba(255,255,255,0.03)',
          color: '#C9CDD4',
          verticalAlign: 'top',
        }}
        {...props}
      >
        {children}
      </td>
    ),
    blockquote: ({ children, ...props }: any) => (
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(6,182,212,0.06), rgba(99,102,241,0.06))',
          border: '1px solid rgba(6,182,212,0.15)',
          borderRadius: '16px',
          padding: '32px',
          margin: '36px 0',
          position: 'relative' as const,
          overflow: 'hidden',
        }}
        {...props}
      >
        <div style={{
          position: 'absolute' as const,
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none' as const,
        }} />
        <div style={{
          fontSize: '12px',
          fontWeight: 700,
          textTransform: 'uppercase' as const,
          letterSpacing: '1.5px',
          color: 'var(--accent-cyan)',
          marginBottom: '18px',
          position: 'relative' as const,
        }}>
          TL;DR
        </div>
        <div style={{ position: 'relative' as const }}>{children}</div>
      </div>
    ),
    ul: ({ children, ...props }: any) => (
      <ul style={{ margin: '16px 0 24px', paddingLeft: '24px', listStyle: 'disc' }} {...props}>{children}</ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol style={{ margin: '16px 0 24px', paddingLeft: '24px', listStyle: 'decimal' }} {...props}>{children}</ol>
    ),
    li: ({ children, ...props }: any) => (
      <li style={{ marginBottom: '10px', color: '#C9CDD4', fontSize: '16px', lineHeight: '1.75' }} {...props}>{children}</li>
    ),
    code: ({ children, className, ...props }: any) => {
      const isInline = !className
      if (isInline) {
        return (
          <code style={{ color: 'var(--accent-blue-light)', background: 'rgba(59,130,246,0.1)', padding: '2px 6px', borderRadius: '4px', fontSize: '14px' }} {...props}>
            {children}
          </code>
        )
      }
      return <code className={className} {...props}>{children}</code>
    },
    pre: ({ children, ...props }: any) => (
      <pre style={{ background: '#0D1117', color: '#E6EDF3', padding: '20px', borderRadius: '12px', overflowX: 'auto', margin: '24px 0', fontSize: '14px', border: '1px solid var(--border-subtle)' }} {...props}>{children}</pre>
    ),
  }

  // Nav tab style helper
  const navTabStyle = (tabValue: string): React.CSSProperties => ({
    padding: '10px 28px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 500,
    color: activeTab === tabValue ? 'var(--text-primary)' : 'var(--text-muted)',
    cursor: 'pointer',
    transition: 'all 0.25s var(--ease-out)',
    border: 'none',
    background: activeTab === tabValue ? 'rgba(255,255,255,0.07)' : 'transparent',
    boxShadow: activeTab === tabValue ? '0 2px 12px rgba(0,0,0,0.3)' : 'none',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  })

  return (
    <div id="spark-app" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>

      {/* Reading progress bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '3px',
          zIndex: 200,
          background: 'transparent',
          pointerEvents: 'none',
          opacity: selectedBlog ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${readingProgress}%`,
            background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple), var(--accent-pink))',
            borderRadius: '0 2px 2px 0',
            boxShadow: '0 0 12px rgba(139, 92, 246, 0.5)',
            transition: 'width 0.05s linear',
          }}
        />
      </div>

      {/* Background glow orbs */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', width: '600px', height: '600px', borderRadius: '50%',
          filter: 'blur(120px)', opacity: 0.15,
          background: 'radial-gradient(circle, var(--accent-blue), transparent 70%)',
          top: '-200px', right: '-100px',
          animation: 'float 20s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
          filter: 'blur(120px)', opacity: 0.15,
          background: 'radial-gradient(circle, var(--accent-purple), transparent 70%)',
          top: '40%', left: '-150px',
          animation: 'float 20s ease-in-out infinite',
          animationDelay: '-7s',
        }} />
        <div style={{
          position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
          filter: 'blur(120px)', opacity: 0.15,
          background: 'radial-gradient(circle, var(--accent-cyan), transparent 70%)',
          bottom: '-100px', right: '20%',
          animation: 'float 20s ease-in-out infinite',
          animationDelay: '-14s',
        }} />
      </div>

      {/* Content wrapper */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">

          {/* Sticky header with glassmorphism */}
          <header
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 100,
              background: headerScrolled ? 'rgba(6, 11, 24, 0.92)' : 'rgba(6, 11, 24, 0.75)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              borderBottom: '1px solid var(--border-subtle)',
              transition: 'background 0.3s, box-shadow 0.3s',
              boxShadow: headerScrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
            }}
          >
            <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '16px 32px' }} className="flex items-center justify-between">
              {/* Logo */}
              <a
                href="/"
                className="flex items-center gap-3 no-underline"
                style={{ transition: 'transform 0.3s var(--ease-spring)' }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                onClick={(e) => {
                  e.preventDefault()
                  setSelectedBlog(null)
                  setBlogContent("")
                  setActiveTab("insights")
                  window.history.pushState(null, '', window.location.pathname)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <div style={{ position: 'relative', width: '42px', height: '42px', flexShrink: 0 }}>
                  <LogoSVG size={42} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1, color: 'var(--text-primary)' }}>
                    <span style={{ color: 'var(--accent-blue-light)' }}>AI</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 400, opacity: 0.5, fontSize: '18px' }}>n</span>
                    <span style={{ background: 'linear-gradient(135deg, var(--accent-purple-light), var(--accent-pink-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ROI</span>
                  </div>
                  <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Insights &middot; Analytics &middot; Impact
                  </div>
                </div>
              </a>

              {/* Desktop nav tabs */}
              <nav className="hidden md:flex" style={{
                gap: '2px',
                background: 'var(--bg-elevated)',
                borderRadius: '12px',
                padding: '4px',
                border: '1px solid var(--border-subtle)',
              }}>
                {(['insights', 'projects', 'about'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    onMouseMove={handleNavMouseMove}
                    style={navTabStyle(tab)}
                  >
                    {/* Radial glow pseudo-element done via inline background on hover */}
                    {tab === 'insights' ? 'Insights' : tab === 'projects' ? 'Projects' : 'About Us'}
                    {activeTab === tab && (
                      <span style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '50%',
                        height: '2px',
                        background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple-light))',
                        borderRadius: '2px',
                      }} />
                    )}
                  </button>
                ))}
              </nav>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg"
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)' }}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X size={24} weight="bold" />
                ) : (
                  <List size={24} weight="bold" />
                )}
              </button>
            </div>

            {/* Site description */}
            <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 32px 20px', fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.6, letterSpacing: '0.01em' }}>
              Enterprise AI insights informed by extensive building, deep customer listening, and advisory work—validated through analytics and real-world feedback from widely used projects with 1000+ downloads per week.
            </div>

            {/* Mobile nav menu */}
            {mobileMenuOpen && (
              <div className="md:hidden" style={{ padding: '0 32px 20px', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '16px' }}>
                  {(['insights', 'projects', 'about'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      style={{
                        width: '100%',
                        padding: '12px 20px',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: 500,
                        border: '1px solid var(--border-subtle)',
                        background: activeTab === tab
                          ? 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))'
                          : 'var(--bg-elevated)',
                        color: activeTab === tab ? '#E0E7FF' : 'var(--text-muted)',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      {tab === 'insights' ? 'Insights' : tab === 'projects' ? 'Projects' : 'About Us'}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </header>

          {/* Page Hero Section — only shown when not reading a blog and on insights tab */}
          {activeTab === 'insights' && !selectedBlog && (
            <section style={{
              position: 'relative',
              padding: '80px 32px 60px',
              maxWidth: '1152px',
              margin: '0 auto',
              textAlign: 'center',
              overflow: 'hidden',
            }}>
              {/* Decorative dot grid */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              {/* Eyebrow badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px 6px 8px',
                borderRadius: '100px',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                color: 'var(--accent-blue-light)',
                background: 'rgba(59,130,246,0.08)',
                border: '1px solid rgba(59,130,246,0.15)',
                marginBottom: '28px',
                animation: 'fadeInDown 0.8s var(--ease-smooth) both',
              }}>
                <span style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: 'var(--accent-blue-light)', position: 'relative', display: 'inline-block',
                }}>
                  <span style={{
                    position: 'absolute', inset: '-3px', borderRadius: '50%',
                    background: 'var(--accent-blue-light)',
                    animation: 'pulse-ring 2s var(--ease-out) infinite',
                    opacity: 0.4,
                  }} />
                </span>
                Enterprise AI Intelligence
              </div>

              {/* Headline */}
              <h1 style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 900,
                letterSpacing: '-2px',
                lineHeight: 1.05,
                color: 'var(--text-primary)',
                marginBottom: '24px',
                animation: 'fadeInUp 0.8s 0.1s var(--ease-smooth) both',
              }}>
                Turn AI adoption data into<br />
                <span className="gradient-text-animated">measurable business outcomes</span>
              </h1>

              {/* Subtitle */}
              <p style={{
                fontSize: 'clamp(16px, 2vw, 20px)',
                color: 'var(--text-muted)',
                maxWidth: '640px',
                margin: '0 auto 36px',
                lineHeight: 1.65,
                fontWeight: 400,
                animation: 'fadeInUp 0.8s 0.2s var(--ease-smooth) both',
              }}>
                Insights informed by extensive building, deep customer listening, and advisory work
                — validated through analytics and real-world feedback from widely used projects.
              </p>

              {/* Typing accent */}
              <div style={{
                display: 'inline-block',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--accent-cyan)',
                padding: '8px 16px',
                background: 'rgba(6,182,212,0.06)',
                border: '1px solid rgba(6,182,212,0.12)',
                borderRadius: '8px',
                marginBottom: '40px',
                animation: 'fadeInUp 0.8s 0.3s var(--ease-smooth) both',
              }}>
                &gt; analyzing 1000+ weekly downloads across enterprise AI tools
                <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--accent-cyan)', marginLeft: '2px' }}>|</span>
              </div>
            </section>
          )}

          {/* Stats bar — only when not reading a blog and on insights tab */}
          {activeTab === 'insights' && !selectedBlog && (
            <div
              ref={statsRef}
              className="reveal-up"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1px',
                maxWidth: '1152px',
                margin: '0 auto 64px',
                padding: '0 32px',
              }}
            >
              {[
                { value: statValues[0], suffix: '+', label: 'Weekly downloads' },
                { value: statValues[1], suffix: '', label: 'Published insights' },
                { value: statValues[2], suffix: '%', label: 'AI pilots fail to scale' },
                { value: statValues[3], suffix: 'x', label: 'Higher success with culture focus' },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: 'center',
                    padding: '32px 24px',
                    position: 'relative',
                    background: 'rgba(17,24,39,0.3)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: i === 0 ? '16px 0 0 16px' : i === 3 ? '0 16px 16px 0' : '0',
                    transition: 'all 0.4s var(--ease-out)',
                  }}
                  className="group"
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(17,24,39,0.6)'
                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(17,24,39,0.3)'
                    e.currentTarget.style.borderColor = 'var(--border-subtle)'
                  }}
                >
                  <div style={{
                    fontSize: '36px',
                    fontWeight: 900,
                    letterSpacing: '-1.5px',
                    lineHeight: 1,
                    marginBottom: '8px',
                    background: 'linear-gradient(135deg, var(--accent-blue-light), var(--accent-purple-light))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {stat.value.toLocaleString()}
                    <span style={{ fontSize: '20px', fontWeight: 700 }}>{stat.suffix}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, fontWeight: 500 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Labeled divider */}
          {activeTab === 'insights' && !selectedBlog && (
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              maxWidth: '1152px',
              margin: '64px auto',
              padding: '0 32px',
            }}>
              <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--border-subtle), transparent)' }} />
              <span style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                whiteSpace: 'nowrap',
              }}>
                Latest Insights
              </span>
              <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--border-subtle), transparent)' }} />
            </div>
          )}

          {/* Main content area */}
          <main style={{ maxWidth: '1152px', margin: '0 auto', padding: '48px 32px' }}>

            {/* INSIGHTS TAB */}
            <TabsContent value="insights" className="mt-0">
              {selectedBlog ? (
                /* Blog reader view */
                <div style={{ maxWidth: '768px', margin: '0 auto' }}>
                  {/* Reader hero */}
                  <div style={{ marginBottom: '48px', paddingBottom: '32px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <button
                      onClick={() => {
                        setSelectedBlog(null)
                        setBlogContent("")
                        setReadingProgress(0)
                        paragraphCount = 0
                        window.history.pushState(null, '', window.location.pathname)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '14px',
                        color: 'var(--text-dim)',
                        marginBottom: '32px',
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        fontFamily: 'inherit',
                        transition: 'all 0.2s',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = 'var(--accent-blue-light)'
                        const arrow = e.currentTarget.querySelector('.back-arrow') as HTMLElement
                        if (arrow) arrow.style.transform = 'translateX(-4px)'
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = 'var(--text-dim)'
                        const arrow = e.currentTarget.querySelector('.back-arrow') as HTMLElement
                        if (arrow) arrow.style.transform = 'translateX(0)'
                      }}
                    >
                      <span className="back-arrow" style={{ display: 'inline-block', transition: 'transform 0.3s var(--ease-spring)' }}>&larr;</span> Back to all posts
                    </button>

                    <div style={{
                      display: 'inline-block',
                      padding: '5px 14px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      background: 'rgba(59,130,246,0.15)',
                      color: 'var(--accent-blue-light)',
                      border: '1px solid rgba(59,130,246,0.25)',
                      marginBottom: '16px',
                    }}>
                      {selectedBlog.category}
                    </div>

                    <h1 style={{
                      fontSize: '38px',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      lineHeight: 1.15,
                      letterSpacing: '-1.2px',
                      marginBottom: '20px',
                    }}>
                      {selectedBlog.title}
                    </h1>

                    <div style={{ fontSize: '14px', color: 'var(--text-dim)', marginBottom: '8px' }}>
                      <strong style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>By Shailendra Hegde, Keith McGrane</strong>
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--text-dim)' }}>
                      {selectedBlog.date} &middot; {selectedBlog.readTime}
                    </div>

                    {/* Share buttons */}
                    <div className="flex items-center gap-2 mt-4">
                      <span style={{ fontSize: '13px', color: 'var(--text-dim)', marginRight: '4px' }}>Share:</span>
                      <button
                        onClick={() => shareOnTwitter(selectedBlog)}
                        style={{ padding: '8px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border-subtle)', cursor: 'pointer', transition: 'all 0.2s', color: 'var(--text-muted)' }}
                        title="Share on X/Twitter"
                        onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.color = 'var(--accent-purple-light)' }}
                        onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                      >
                        <XLogo size={16} weight="fill" />
                      </button>
                      <button
                        onClick={() => shareOnLinkedIn(selectedBlog)}
                        style={{ padding: '8px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border-subtle)', cursor: 'pointer', transition: 'all 0.2s', color: 'var(--text-muted)' }}
                        title="Share on LinkedIn"
                        onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.color = 'var(--accent-purple-light)' }}
                        onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                      >
                        <LinkedinLogo size={16} weight="fill" />
                      </button>
                      <button
                        onClick={() => copyLink(selectedBlog.id)}
                        style={{ padding: '8px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border-subtle)', cursor: 'pointer', transition: 'all 0.2s', color: 'var(--text-muted)' }}
                        title="Copy link"
                        onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.color = 'var(--accent-purple-light)' }}
                        onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                      >
                        {copiedBlogId === selectedBlog.id ? (
                          <Check size={16} weight="bold" style={{ color: '#34D399' }} />
                        ) : (
                          <LinkIcon size={16} weight="bold" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Article content */}
                  <article>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={markdownComponents}
                    >
                      {blogContent}
                    </ReactMarkdown>
                  </article>
                </div>
              ) : (
                /* Blog list view */
                <div>
                  {/* Filter chips */}
                  <div className="reveal-up" style={{ display: 'flex', gap: '8px', marginBottom: '48px', flexWrap: 'wrap' }}>
                    {Array.from(categories.entries()).map(([category, count]) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        style={{
                          padding: '8px 20px',
                          borderRadius: '24px',
                          fontSize: '13px',
                          fontWeight: 500,
                          border: `1px solid ${selectedCategory === category ? 'rgba(99,102,241,0.3)' : 'var(--border-medium)'}`,
                          background: selectedCategory === category
                            ? 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))'
                            : 'var(--bg-elevated)',
                          color: selectedCategory === category ? '#E0E7FF' : 'var(--text-muted)',
                          cursor: 'pointer',
                          transition: 'all 0.25s var(--ease-out)',
                          boxShadow: selectedCategory === category ? '0 0 24px rgba(59,130,246,0.15), inset 0 0 12px rgba(99,102,241,0.1)' : 'none',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                        onMouseOver={(e) => {
                          if (selectedCategory !== category) {
                            e.currentTarget.style.borderColor = 'rgba(59,130,246,0.25)'
                            e.currentTarget.style.color = 'var(--text-secondary)'
                            e.currentTarget.style.background = 'rgba(59,130,246,0.05)'
                          }
                        }}
                        onMouseOut={(e) => {
                          if (selectedCategory !== category) {
                            e.currentTarget.style.borderColor = 'var(--border-medium)'
                            e.currentTarget.style.color = 'var(--text-muted)'
                            e.currentTarget.style.background = 'var(--bg-elevated)'
                          }
                        }}
                      >
                        {category} ({count})
                      </button>
                    ))}
                  </div>

                  {loading ? (
                    <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>Loading...</div>
                  ) : (
                    <>
                      {/* Hero/featured card — first blog */}
                      {heroBlog && (
                        <div
                          className="reveal-scale"
                          onClick={() => {
                            setSelectedBlog(heroBlog)
                            window.history.pushState(null, '', `?blog=${heroBlog.id}`)
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }}
                          style={{
                            position: 'relative',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            marginBottom: '48px',
                            background: '#111827',
                            border: '1px solid var(--border-subtle)',
                            cursor: 'pointer',
                            transition: 'all 0.5s var(--ease-out)',
                            boxShadow: '0 4px 40px rgba(0,0,0,0.3)',
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.boxShadow = '0 4px 30px rgba(59,130,246,0.1), 0 0 0 1px rgba(59,130,246,0.1)'
                            e.currentTarget.style.transform = 'translateY(-2px)'
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.boxShadow = '0 4px 40px rgba(0,0,0,0.3)'
                            e.currentTarget.style.transform = 'translateY(0)'
                          }}
                        >
                          <img
                            src={heroBlog.thumbnail}
                            alt={heroBlog.title}
                            style={{
                              width: '100%',
                              height: '320px',
                              objectFit: 'cover',
                              display: 'block',
                              transition: 'transform 0.6s ease',
                              filter: 'brightness(0.85)',
                            }}
                          />
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(6,11,24,0.97) 0%, rgba(6,11,24,0.7) 35%, rgba(6,11,24,0.15) 100%)',
                          }} />
                          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px' }}>
                            <span style={{
                              display: 'inline-block',
                              padding: '5px 14px',
                              borderRadius: '8px',
                              fontSize: '11px',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              letterSpacing: '0.8px',
                              background: 'rgba(59,130,246,0.15)',
                              color: 'var(--accent-blue-light)',
                              border: '1px solid rgba(59,130,246,0.25)',
                              marginBottom: '16px',
                            }}>
                              {heroBlog.category}
                            </span>
                            <h2 style={{
                              fontSize: '32px',
                              fontWeight: 800,
                              color: 'var(--text-primary)',
                              lineHeight: 1.2,
                              marginBottom: '14px',
                              letterSpacing: '-0.7px',
                            }}>
                              {heroBlog.title}
                            </h2>
                            <p style={{ fontSize: '15px', color: '#9CA3AF', lineHeight: 1.65, maxWidth: '640px', marginBottom: '20px' }}>
                              {heroBlog.summary}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: 'var(--text-dim)' }}>
                              <span>By Shailendra Hegde, Keith McGrane</span>
                              <span>&middot;</span>
                              <span>{heroBlog.date}</span>
                              <span>&middot;</span>
                              <span>{heroBlog.readTime}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Section divider with diamond */}
                      {gridBlogs.length > 0 && (
                        <div style={{
                          position: 'relative',
                          height: '80px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <span style={{
                            position: 'absolute',
                            left: '10%',
                            right: '10%',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.3) 25%, rgba(139,92,246,0.5) 50%, rgba(99,102,241,0.3) 75%, transparent 100%)',
                          }} />
                          <span style={{
                            width: '8px',
                            height: '8px',
                            background: 'var(--accent-purple)',
                            transform: 'rotate(45deg)',
                            position: 'relative',
                            zIndex: 1,
                            boxShadow: '0 0 16px rgba(139,92,246,0.4)',
                          }} />
                        </div>
                      )}

                      {/* Blog grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
                        gap: '24px',
                      }}>
                        {gridBlogs.map((blog, index) => (
                          <div
                            key={blog.id}
                            className="reveal-up"
                            style={{
                              transitionDelay: `${index * 0.08}s`,
                            }}
                          >
                            <div
                              onClick={() => {
                                setSelectedBlog(blog)
                                window.history.pushState(null, '', `?blog=${blog.id}`)
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                              }}
                              style={{
                                background: 'var(--bg-surface)',
                                borderRadius: '16px',
                                border: '1px solid rgba(255,255,255,0.05)',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'all 0.4s var(--ease-out)',
                                backdropFilter: 'blur(8px)',
                                position: 'relative',
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.boxShadow = '0 4px 24px rgba(139,92,246,0.08), 0 0 0 1px rgba(139,92,246,0.08)'
                                e.currentTarget.style.transform = 'translateY(-2px)'
                                e.currentTarget.style.background = 'var(--bg-surface-hover)'
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.boxShadow = 'none'
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.background = 'var(--bg-surface)'
                              }}
                            >
                              {/* Abstract category gradient + icon */}
                              {(() => {
                                const vis = categoryVisuals[blog.category] || defaultCategoryVisual
                                const CategoryIcon = vis.Icon
                                return (
                                  <div style={{
                                    height: '80px',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    background: vis.gradient,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                    <CategoryIcon size={36} weight="duotone" style={{ color: 'rgba(255,255,255,0.10)' }} />
                                    {/* Top gradient accent line */}
                                    <div style={{
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                      right: 0,
                                      height: '2px',
                                      background: index % 3 === 0
                                        ? 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))'
                                        : index % 3 === 1
                                          ? 'linear-gradient(90deg, var(--accent-purple), var(--accent-pink))'
                                          : 'linear-gradient(90deg, var(--accent-cyan), var(--accent-blue))',
                                      opacity: 0,
                                      transition: 'opacity 0.4s',
                                    }}
                                      className="card-accent"
                                    />
                                    {/* Subtle bottom fade into card body */}
                                    <div style={{
                                      position: 'absolute',
                                      bottom: 0,
                                      left: 0,
                                      right: 0,
                                      height: '24px',
                                      background: 'linear-gradient(to bottom, transparent, var(--bg-surface))',
                                    }} />
                                  </div>
                                )
                              })()}

                              <div style={{ padding: '24px', position: 'relative', zIndex: 1 }}>
                                <span style={{
                                  display: 'inline-block',
                                  padding: '3px 10px',
                                  borderRadius: '6px',
                                  fontSize: '10px',
                                  fontWeight: 600,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px',
                                  background: 'rgba(139,92,246,0.12)',
                                  color: 'var(--accent-purple-light)',
                                  border: '1px solid rgba(139,92,246,0.18)',
                                  marginBottom: '14px',
                                }}>
                                  {blog.category}
                                </span>
                                <h3 style={{
                                  fontSize: '18px',
                                  fontWeight: 700,
                                  color: 'var(--text-primary)',
                                  lineHeight: 1.35,
                                  marginBottom: '10px',
                                  letterSpacing: '-0.3px',
                                }}>
                                  {blog.title}
                                </h3>
                                <p style={{
                                  fontSize: '14px',
                                  color: 'var(--text-muted)',
                                  lineHeight: 1.6,
                                  marginBottom: '18px',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                }}>
                                  {blog.summary}
                                </p>
                                <div style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  fontSize: '12px',
                                  color: 'var(--text-dim)',
                                }}>
                                  <span>{blog.date} &middot; {blog.readTime}</span>
                                  <span style={{ color: 'var(--accent-blue-light)', fontWeight: 500 }}>
                                    Read <span>&rarr;</span>
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Share buttons */}
                            <div className="flex items-center gap-2 mt-3">
                              <button
                                onClick={(e) => { e.stopPropagation(); shareOnTwitter(blog) }}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '12px', color: 'var(--text-dim)', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '8px', transition: 'color 0.2s' }}
                                title="Share on X/Twitter"
                              >
                                <XLogo size={14} weight="fill" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); shareOnLinkedIn(blog) }}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '12px', color: 'var(--text-dim)', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '8px', transition: 'color 0.2s' }}
                                title="Share on LinkedIn"
                              >
                                <LinkedinLogo size={14} weight="fill" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); copyLink(blog.id) }}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '12px', color: 'var(--text-dim)', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '8px', transition: 'color 0.2s' }}
                                title="Copy link"
                              >
                                {copiedBlogId === blog.id ? (
                                  <Check size={14} weight="bold" style={{ color: '#34D399' }} />
                                ) : (
                                  <LinkIcon size={14} weight="bold" />
                                )}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </TabsContent>

            {/* PROJECTS TAB */}
            <TabsContent value="projects" className="mt-0">
              <div style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.8px', marginBottom: '12px' }}>
                  Featured Projects
                </h2>
                <p style={{ fontSize: '16px', color: 'var(--text-muted)', maxWidth: '640px', lineHeight: 1.6 }}>
                  Open source self serve tools to help organizations maximize the full potential of Copilot.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                gap: '24px',
              }}>
                {projects.map((project, index) => (
                  <div
                    key={index}
                    id={project.title.toLowerCase().replace(/\s+/g, '-')}
                    className="reveal-up"
                    style={{
                      transitionDelay: `${index * 0.08}s`,
                      background: 'var(--bg-surface)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      overflow: 'hidden',
                      transition: 'all 0.4s var(--ease-out)',
                      backdropFilter: 'blur(8px)',
                      position: 'relative',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 24px rgba(59,130,246,0.08), 0 0 0 1px rgba(59,130,246,0.08)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    {/* Top accent line */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-blue))',
                      opacity: 0,
                      transition: 'opacity 0.4s',
                    }} />

                    {/* Image */}
                    <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, transparent 40%, rgba(17,24,39,0.9))',
                      }} />
                    </div>

                    {/* Body */}
                    <div style={{ padding: '24px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                        {project.title}
                      </h3>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '16px' }}>
                        {project.description}
                      </p>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} style={{
                            padding: '4px 12px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 500,
                            background: 'rgba(255,255,255,0.04)',
                            color: 'var(--text-muted)',
                            border: '1px solid var(--border-subtle)',
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '13px',
                            fontWeight: 500,
                            color: 'var(--accent-blue-light)',
                            textDecoration: 'none',
                            transition: 'all 0.3s var(--ease-out)',
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.color = '#93C5FD'; e.currentTarget.style.gap = '10px' }}
                          onMouseOut={(e) => { e.currentTarget.style.color = 'var(--accent-blue-light)'; e.currentTarget.style.gap = '6px' }}
                        >
                          <GithubLogo size={16} weight="fill" />
                          View on GitHub &rarr;
                        </a>
                      ) : (
                        <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-dim)' }}>
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Contributors section */}
              <div style={{ marginTop: '64px' }}>
                <div className="glass-surface" style={{ borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                    Built With Contributions From
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    Special thanks to Olivier Pecheux, Jordan King, Jennifer Stoll, Stephanie Downey, Luz Lorenz, Stephanie Smith, Brian Middendorf, and Fernando Manzano for their valuable contributions to these projects.
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* ABOUT US TAB */}
            <TabsContent value="about" className="mt-0">
              <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                {/* Work With Us */}
                <div style={{ marginBottom: '64px', paddingBottom: '48px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <h3 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '40px' }}>
                    Work With Us
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {/* Form */}
                    <div className="glass-surface" style={{ borderRadius: '16px', padding: '32px' }}>
                      <h4 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px' }}>
                        Send us a message
                      </h4>
                      <form action="https://api.web3forms.com/submit" method="POST" className="space-y-4" data-recaptcha="true">
                        <input type="hidden" name="access_key" value="228605c2-71af-4f86-8710-14cbde9dc57b" />
                        <input type="hidden" name="subject" value="New Contact Form Submission from AInROI" />
                        <input type="hidden" name="redirect" value="https://www.ainroi.com/?submitted=true" />
                        <input type="hidden" name="recaptcha_site_key" value="6LfaDWYsAAAAALv-6n_dEYjC4TO_OeeZvdgcai20" />
                        <div>
                          <label htmlFor="name" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>Name</label>
                          <input type="text" id="name" name="name" required placeholder="Your name"
                            style={{ width: '100%', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'rgba(255,255,255,0.04)', color: 'var(--text-primary)', padding: '12px 16px', fontSize: '14px', outline: 'none', fontFamily: 'inherit' }} />
                        </div>
                        <div>
                          <label htmlFor="email" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>Email</label>
                          <input type="email" id="email" name="email" required placeholder="your@email.com"
                            style={{ width: '100%', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'rgba(255,255,255,0.04)', color: 'var(--text-primary)', padding: '12px 16px', fontSize: '14px', outline: 'none', fontFamily: 'inherit' }} />
                        </div>
                        <div>
                          <label htmlFor="inquiry_type" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>Inquiry Type</label>
                          <select id="inquiry_type" name="inquiry_type" required
                            style={{ width: '100%', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'rgba(255,255,255,0.04)', color: 'var(--text-primary)', padding: '12px 16px', fontSize: '14px', outline: 'none', fontFamily: 'inherit' }}>
                            <option value="">Select an option</option>
                            <option value="analytics">Analytics suggestions</option>
                            <option value="opensource">Open source collaboration</option>
                            <option value="general">General inquiry</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="message" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>Message</label>
                          <textarea id="message" name="message" required rows={5} placeholder="Tell us more about your inquiry..."
                            style={{ width: '100%', borderRadius: '10px', border: '1px solid var(--border-medium)', background: 'rgba(255,255,255,0.04)', color: 'var(--text-primary)', padding: '12px 16px', fontSize: '14px', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }} />
                        </div>
                        <button type="submit"
                          style={{
                            width: '100%',
                            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
                            color: 'white',
                            padding: '14px',
                            borderRadius: '10px',
                            fontWeight: 600,
                            fontSize: '14px',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s var(--ease-out)',
                            fontFamily: 'inherit',
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.2)' }}
                          onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                        >
                          Send Message
                        </button>
                      </form>
                    </div>

                    {/* Info column */}
                    <div className="space-y-6">
                      <div className="glass-surface" style={{ borderRadius: '16px', padding: '32px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Quick Response</h4>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.6 }}>
                          We review all inquiries within 24 hours and typically respond with next steps within 48 hours.
                        </p>
                        <div style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
                          <p style={{ marginBottom: '8px' }}>Response time: 24-48 hours</p>
                          <p>Timezone: EST (UTC-5) & GMT</p>
                        </div>
                      </div>
                      <div className="glass-surface" style={{ borderRadius: '16px', padding: '32px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Connect on LinkedIn</h4>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                          Prefer a more direct connection? Reach out to us on LinkedIn.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <a href="https://www.linkedin.com/in/shailendrahegde" target="_blank" rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                              padding: '12px 16px', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
                              borderRadius: '10px', textDecoration: 'none', transition: 'all 0.2s',
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)' }}
                            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
                          >
                            <LinkedinLogo size={18} weight="fill" style={{ color: 'var(--accent-blue-light)' }} />
                            <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Message Shailendra</span>
                          </a>
                          <a href="https://www.linkedin.com/in/keith-mcgrane-46184029" target="_blank" rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                              padding: '12px 16px', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
                              borderRadius: '10px', textDecoration: 'none', transition: 'all 0.2s',
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)' }}
                            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
                          >
                            <LinkedinLogo size={18} weight="fill" style={{ color: 'var(--accent-blue-light)' }} />
                            <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Message Keith</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Bios */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20" style={{ maxWidth: '900px', margin: '0 auto' }}>
                  {/* Shailendra */}
                  <div className="flex flex-col items-center text-center group">
                    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '16px', width: '240px', height: '240px', marginBottom: '24px' }}>
                      <img src="/shailendra-hegde-new.jpg" alt="Shailendra Hegde"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                        className="group-hover:scale-[1.03]" />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(59,130,246,0.25) 0%, transparent 40%)' }} />
                    </div>
                    <div className="flex flex-col items-center flex-1">
                      <h3 className="gradient-text-animated" style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>
                        Shailendra Hegde
                      </h3>
                      <p style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '16px' }}>
                        Principal Product Manager, Microsoft
                      </p>
                      <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>Why I Do This Work</h4>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                          I've seen firsthand how AI can transform organizations—but only when teams can measure and understand its impact. My passion lies in bridging the gap between AI adoption and AI value, creating analytics frameworks that help enterprises turn Copilot investments into measurable business outcomes.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <span style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', borderRadius: '100px', fontSize: '12px', fontWeight: 500, background: 'rgba(59,130,246,0.12)', color: 'var(--accent-blue-light)', border: '1px solid rgba(59,130,246,0.2)' }}>
                          AI Analytics
                        </span>
                        <a href="https://www.linkedin.com/in/shailendrahegde" target="_blank" rel="noopener noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', textDecoration: 'none', fontSize: '13px', fontWeight: 500, transition: 'color 0.2s' }}
                          onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-blue-light)' }}
                          onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-dim)' }}
                        >
                          <LinkedinLogo size={18} weight="fill" />
                          <span>Connect on LinkedIn</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Keith */}
                  <div className="flex flex-col items-center text-center group">
                    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '16px', width: '240px', height: '240px', marginBottom: '24px' }}>
                      {!keithAvatarFailed ? (
                        <img
                          src={keithAvatarSources[keithAvatarIndex]}
                          alt="Keith McGrane"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                          className="group-hover:scale-[1.03]"
                          loading="lazy"
                          decoding="async"
                          onError={() => {
                            setKeithAvatarIndex((currentIndex) => {
                              const nextIndex = currentIndex + 1
                              if (nextIndex < keithAvatarSources.length) return nextIndex
                              setKeithAvatarFailed(true)
                              return currentIndex
                            })
                          }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-pink))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '72px', fontWeight: 800 }}>
                          KM
                        </div>
                      )}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(139,92,246,0.25) 0%, transparent 40%)' }} />
                    </div>
                    <div className="flex flex-col items-center flex-1">
                      <h3 style={{
                        fontSize: '26px', fontWeight: 800, marginBottom: '6px',
                        background: 'linear-gradient(135deg, var(--accent-purple-light), var(--accent-pink-light))',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      }}>
                        Keith McGrane
                      </h3>
                      <p style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '16px' }}>
                        AI & Data Solutions Specialist
                      </p>
                      <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>Why I Do This Work</h4>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                          AI transformation isn't about the technology—it's about the people and processes that make it work. I'm driven by helping organizations cut through the complexity and hype to find practical, results-driven approaches to AI deployment that deliver real-world business impact teams can see and stakeholders can trust.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <span style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', borderRadius: '100px', fontSize: '12px', fontWeight: 500, background: 'rgba(139,92,246,0.12)', color: 'var(--accent-purple-light)', border: '1px solid rgba(139,92,246,0.2)' }}>
                          Data Solutions
                        </span>
                        <a href="https://www.linkedin.com/in/keith-mcgrane-46184029" target="_blank" rel="noopener noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', textDecoration: 'none', fontSize: '13px', fontWeight: 500, transition: 'color 0.2s' }}
                          onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-purple-light)' }}
                          onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-dim)' }}
                        >
                          <LinkedinLogo size={18} weight="fill" />
                          <span>Connect on LinkedIn</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </main>

          {/* Newsletter CTA Section */}
          <section className="reveal-up" style={{
            position: 'relative',
            maxWidth: '1152px',
            margin: '80px auto',
            padding: '0 32px',
          }}>
            <div style={{
              position: 'relative',
              padding: '60px',
              borderRadius: '20px',
              background: 'rgba(17,24,39,0.5)',
              border: '1px solid rgba(99,102,241,0.15)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              overflow: 'hidden',
              textAlign: 'center',
            }}>
              {/* Decorative glow */}
              <div style={{
                position: 'absolute',
                top: '-100px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '600px',
                height: '400px',
                background: 'radial-gradient(ellipse, rgba(99,102,241,0.08), transparent 60%)',
                pointerEvents: 'none',
              }} />

              {/* Icon */}
              <div style={{
                width: '56px',
                height: '56px',
                margin: '0 auto 24px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
                border: '1px solid rgba(99,102,241,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
              }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--accent-purple-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>

              <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: '12px', position: 'relative', zIndex: 1 }}>
                Stay ahead of enterprise AI
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.65, position: 'relative', zIndex: 1 }}>
                Get new insights on AI adoption, license optimization, and ROI measurement
                delivered directly to your inbox. No spam, unsubscribe anytime.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                style={{ display: 'flex', gap: '12px', maxWidth: '440px', margin: '0 auto', position: 'relative', zIndex: 1, flexWrap: 'wrap', justifyContent: 'center' }}
              >
                <input
                  type="email"
                  placeholder="you@company.com"
                  aria-label="Email address"
                  style={{
                    flex: '1 1 240px',
                    padding: '14px 20px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-medium)',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'all 0.3s var(--ease-out)',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '14px 28px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    transition: 'all 0.3s var(--ease-out)',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.2)' }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  Subscribe
                </button>
              </form>
              <p style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '16px', position: 'relative', zIndex: 1 }}>
                Join 500+ enterprise AI leaders. Published bi-weekly.
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ position: 'relative', marginTop: '120px', padding: '0 32px' }}>
            {/* Gradient top border */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '10%',
              right: '10%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3) 20%, rgba(139,92,246,0.4) 50%, rgba(59,130,246,0.3) 80%, transparent)',
            }} />

            {/* Footer grid: 3-column (brand+social, Insights, Projects) - NO Company column */}
            <div style={{
              maxWidth: '1152px',
              margin: '0 auto',
              padding: '64px 0 48px',
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr 1fr',
              gap: '48px',
            }}
              className="footer-grid"
            >
              {/* Brand column */}
              <div>
                <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', textDecoration: 'none' }}
                  onClick={(e) => {
                    e.preventDefault()
                    setSelectedBlog(null)
                    setBlogContent("")
                    setActiveTab("insights")
                    window.history.pushState(null, '', window.location.pathname)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  <span style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>
                    <span style={{ color: 'var(--accent-blue-light)' }}>AI</span>
                    <span>n</span>
                    <span style={{ background: 'linear-gradient(135deg, var(--accent-purple-light), var(--accent-pink-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ROI</span>
                  </span>
                </a>
                <p style={{ fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: '280px', marginBottom: '20px' }}>
                  Enterprise AI insights informed by extensive building, deep customer listening, and advisory work.
                </p>
                {/* Social links */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a href="https://github.com/shailendrahegde" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                    style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      border: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.3s var(--ease-out)', color: 'var(--text-muted)', textDecoration: 'none',
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.color = 'var(--accent-purple-light)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    <GithubLogo size={16} weight="fill" />
                  </a>
                  <a href="https://www.linkedin.com/in/shailendrahegde" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn - Shailendra"
                    style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      border: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.3s var(--ease-out)', color: 'var(--text-muted)', textDecoration: 'none',
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.color = 'var(--accent-purple-light)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    <LinkedinLogo size={16} weight="fill" />
                  </a>
                  <a href="https://www.linkedin.com/in/keith-mcgrane-46184029" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn - Keith"
                    style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      border: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.3s var(--ease-out)', color: 'var(--text-muted)', textDecoration: 'none',
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.color = 'var(--accent-purple-light)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    <LinkedinLogo size={16} weight="fill" />
                  </a>
                </div>
              </div>

              {/* Insights column */}
              <div>
                <h4 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  Insights
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['AI Adoption', 'License Allocation', 'ROI Analysis', 'Superusers'].map((item) => (
                    <li key={item} style={{ marginBottom: '12px' }}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setActiveTab('insights')
                          setSelectedCategory(item)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        style={{ fontSize: '14px', color: 'var(--text-dim)', textDecoration: 'none', transition: 'all 0.2s', display: 'inline-block' }}
                        onMouseOver={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.transform = 'translateX(3px)' }}
                        onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-dim)'; e.currentTarget.style.transform = 'translateX(0)' }}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projects column */}
              <div>
                <h4 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  Projects
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    { name: 'AI in One', url: 'https://github.com/microsoft/AI-in-One-Dashboard' },
                    { name: 'Super Usage', url: 'https://github.com/microsoft/DecodingSuperUsage' },
                    { name: 'Chat Intelligence', url: 'https://github.com/microsoft/CopilotChatAnalytics' },
                    { name: 'GitHub', url: 'https://github.com/shailendrahegde' },
                  ].map((item) => (
                    <li key={item.name} style={{ marginBottom: '12px' }}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '14px', color: 'var(--text-dim)', textDecoration: 'none', transition: 'all 0.2s', display: 'inline-block' }}
                        onMouseOver={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.transform = 'translateX(3px)' }}
                        onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-dim)'; e.currentTarget.style.transform = 'translateX(0)' }}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer bottom bar */}
            <div style={{
              maxWidth: '1152px',
              margin: '0 auto',
              padding: '24px 0',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12px',
              color: '#2D3748',
              flexWrap: 'wrap',
              gap: '12px',
            }}>
              <span>&copy; 2026 AInROI. All rights reserved.</span>
              <span>Built with intention. Powered by insight.</span>
            </div>

            {/* Disclaimer */}
            <div style={{
              maxWidth: '1152px',
              margin: '0 auto',
              padding: '0 0 32px',
              fontSize: '11px',
              color: '#1E2938',
              lineHeight: 1.6,
              textAlign: 'center',
            }}>
              The views and opinions expressed on this site are personal and do not represent the views of Microsoft Corporation or any other organization.
            </div>
          </footer>

        </Tabs>
      </div>

      {/* Responsive footer grid style */}
      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  )
}

export default App
