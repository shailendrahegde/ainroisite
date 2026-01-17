import { useState, useEffect, useMemo } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { GithubLogo, LinkedinLogo, List, X, XLogo, ShareNetwork, Link as LinkIcon, Check } from "@phosphor-icons/react"

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

const projects: Project[] = [
  {
    title: "Decoding Super Usage",
    description: "Learn what your best users of M365 Copilot do differently.",
    tags: ["Power BI", "Copilot Analytics"],
    githubUrl: "https://github.com/microsoft/DecodingSuperUsage",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop"
  },
  {
    title: "Chat & Agent Intelligence",
    description: "Intelligence on free Chat and Agent usage.",
    tags: ["Power BI", "Microsoft Purview"],
    githubUrl: "https://github.com/microsoft/CopilotChatAnalytics",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop"
  },
  {
    title: "GitHub Copilot Impact",
    description: "A tribute to the magic of GitHub Copilot. Learn success patterns of GitHub Copilot use.",
    tags: ["Power BI", "GitHub Usage Insights"],
    githubUrl: "https://github.com/microsoft/GitHubCopilotImpact",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&sat=-100"
  },
  {
    title: "AI in One",
    description: "Simplified single report that brings M365 Copilot, Free Chat and Agent usage in a single view.",
    tags: ["Power BI", "Copilot Analytics", "Microsoft Purview"],
    githubUrl: "https://github.com/microsoft/AI-in-One-Dashboard",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop"
  },
  {
    title: "M365 to Copilot Bridge",
    description: "Analyze M365 app usage to inform likelihood of Copilot Adoption",
    tags: ["Power BI", "Microsoft Graph"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&brightness=1.1"
  }
]

function App() {
  const [blogs, setBlogs] = useState<BlogMeta[]>([])
  const [selectedBlog, setSelectedBlog] = useState<BlogMeta | null>(null)
  const [blogContent, setBlogContent] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copiedBlogId, setCopiedBlogId] = useState<string | null>(null)

  useEffect(() => {
    // Fetch blog manifest
    fetch("/blogs/manifest.json")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data)
        setLoading(false)

        // Check if there's a blog ID in the URL
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

  useEffect(() => {
    if (selectedBlog) {
      // Fetch blog content
      fetch(`/blogs/${selectedBlog.filename}`)
        .then((res) => res.text())
        .then((text) => setBlogContent(text))
        .catch((err) => console.error("Error loading blog content:", err))

      // Add structured data for blog article
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": selectedBlog.title,
        "description": selectedBlog.summary,
        "image": selectedBlog.thumbnail,
        "datePublished": selectedBlog.date,
        "dateModified": selectedBlog.date,
        "author": [
          {
            "@type": "Person",
            "name": "Shailendra Hegde",
            "url": "https://www.linkedin.com/in/shailendrahegde"
          },
          {
            "@type": "Person",
            "name": "Keith McGrane",
            "url": "https://www.linkedin.com/in/keith-mcgrane-46184029"
          }
        ],
        "publisher": {
          "@type": "Organization",
          "name": "AInROI",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.ainroi.com/icon.svg"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://www.ainroi.com/?blog=${selectedBlog.id}`
        },
        "articleSection": selectedBlog.category,
        "keywords": ["AI adoption", "Enterprise AI", "Copilot", "AI analytics", selectedBlog.category]
      }

      // Inject structured data into head
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'blog-structured-data'
      script.textContent = JSON.stringify(structuredData)

      // Remove existing blog structured data if present
      const existing = document.getElementById('blog-structured-data')
      if (existing) {
        existing.remove()
      }

      document.head.appendChild(script)

      // Update page title and meta description
      document.title = `${selectedBlog.title} - AInROI`
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', selectedBlog.summary)
      }

      // Update canonical URL
      const canonical = document.querySelector('link[rel="canonical"]')
      if (canonical) {
        canonical.setAttribute('href', `https://www.ainroi.com/?blog=${selectedBlog.id}`)
      }

      // Track blog view in Google Analytics
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
      // Reset to homepage title and canonical when no blog selected
      document.title = 'AInROI - AI and Copilot Analytics'
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Enterprise AI insights informed by extensive building, deep customer listening, and advisory work—validated through analytics and real-world feedback from widely used projects with 1000+ downloads per week.')
      }
      const canonical = document.querySelector('link[rel="canonical"]')
      if (canonical) {
        canonical.setAttribute('href', 'https://www.ainroi.com/')
      }
      // Remove blog structured data
      const existing = document.getElementById('blog-structured-data')
      if (existing) {
        existing.remove()
      }
    }
  }, [selectedBlog])

  // Get unique categories and count
  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>()
    categoryMap.set("All", blogs.length)
    blogs.forEach((blog) => {
      categoryMap.set(blog.category, (categoryMap.get(blog.category) || 0) + 1)
    })
    return categoryMap
  }, [blogs])

  // Filter blogs by category
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

  return (
    <div id="spark-app" className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Tabs defaultValue="insights" className="w-full">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 md:py-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src="/icon.svg" alt="AInROI" className="w-8 h-8" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AInROI</h1>
              </div>

              {/* Desktop Navigation Tabs */}
              <TabsList className="hidden md:flex bg-gray-50 border border-gray-200 p-1 gap-1">
                <TabsTrigger value="insights" className="text-base px-6 py-2 data-[state=active]:bg-white">
                  Insights
                </TabsTrigger>
                <TabsTrigger value="projects" className="text-base px-6 py-2 data-[state=active]:bg-white">
                  Projects
                </TabsTrigger>
                <TabsTrigger value="about" className="text-base px-6 py-2 data-[state=active]:bg-white">
                  About Us
                </TabsTrigger>
              </TabsList>

              {/* Mobile Hamburger Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X size={24} className="text-gray-700" weight="bold" />
                ) : (
                  <List size={24} className="text-gray-700" weight="bold" />
                )}
              </button>
            </div>

            {/* Site Description */}
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-4xl">
              Enterprise AI insights informed by extensive building, deep customer listening, and advisory work—validated through analytics and real-world feedback from widely used projects with 1000+ downloads per week.
            </p>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
                <TabsList className="flex flex-col w-full gap-2 bg-transparent p-0">
                  <TabsTrigger
                    value="insights"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-base px-6 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white bg-gray-50 border border-gray-200"
                  >
                    Insights
                  </TabsTrigger>
                  <TabsTrigger
                    value="projects"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-base px-6 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white bg-gray-50 border border-gray-200"
                  >
                    Projects
                  </TabsTrigger>
                  <TabsTrigger
                    value="about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-base px-6 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white bg-gray-50 border border-gray-200"
                  >
                    About Us
                  </TabsTrigger>
                </TabsList>
              </div>
            )}
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-12">

          {/* Insights Tab */}
          <TabsContent value="insights" className="mt-0">
            {selectedBlog ? (
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <button
                    onClick={() => {
                      setSelectedBlog(null)
                      setBlogContent("")
                    }}
                    className="text-gray-600 hover:text-gray-900 text-sm md:text-base font-medium"
                  >
                    ← Back to all posts
                  </button>

                  {/* Share buttons for article */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs md:text-sm text-gray-500 mr-1">Share:</span>
                    <button
                      onClick={() => shareOnTwitter(selectedBlog)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Share on X/Twitter"
                    >
                      <XLogo size={18} className="text-gray-600" weight="fill" />
                    </button>
                    <button
                      onClick={() => shareOnLinkedIn(selectedBlog)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Share on LinkedIn"
                    >
                      <LinkedinLogo size={18} className="text-gray-600" weight="fill" />
                    </button>
                    <button
                      onClick={() => copyLink(selectedBlog.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Copy link"
                    >
                      {copiedBlogId === selectedBlog.id ? (
                        <Check size={18} className="text-green-600" weight="bold" />
                      ) : (
                        <LinkIcon size={18} className="text-gray-600" weight="bold" />
                      )}
                    </button>
                  </div>
                </div>

                <article className="max-w-none text-gray-800 [&>h1]:text-2xl md:[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mb-4 md:[&>h1]:mb-6 [&>h1]:mt-0 [&>h2]:text-xl md:[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mb-4 md:[&>h2]:mb-5 [&>h2]:mt-6 md:[&>h2]:mt-8 [&>h3]:text-base md:[&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mb-3 md:[&>h3]:mb-4 [&>h3]:mt-5 md:[&>h3]:mt-6 [&>p]:text-sm md:[&>p]:text-base [&>p]:leading-relaxed md:[&>p]:leading-7 [&>p]:mb-4 md:[&>p]:mb-6 [&>p]:text-gray-800 [&_strong]:font-bold [&_strong]:text-gray-900 [&>ul]:my-4 md:[&>ul]:my-5 [&>ul]:list-disc [&>ul]:pl-5 md:[&>ul]:pl-6 [&>ol]:my-4 md:[&>ol]:my-5 [&>ol]:list-decimal [&>ol]:pl-5 md:[&>ol]:pl-6 [&_li]:text-gray-800 [&_li]:my-1.5 md:[&_li]:my-2 [&_li]:leading-relaxed md:[&_li]:leading-7 [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-3 md:[&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-700 [&>blockquote]:bg-blue-50 [&>blockquote]:py-2 md:[&>blockquote]:py-3 [&>blockquote]:my-4 md:[&>blockquote]:my-6 [&_code]:text-blue-600 [&_code]:bg-blue-50 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs md:[&_code]:text-sm [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-3 md:[&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:my-4 md:[&>pre]:my-6 [&>pre]:text-xs md:[&>pre]:text-sm [&_a]:text-blue-600 [&_a]:no-underline hover:[&_a]:underline [&>table]:w-full [&>table]:my-4 md:[&>table]:my-6 [&>table]:border-collapse [&>table]:text-sm [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:px-2 md:[&_th]:px-4 [&_th]:py-1.5 md:[&_th]:py-2 [&_th]:text-left [&_th]:font-bold [&_td]:border [&_td]:border-gray-300 [&_td]:px-2 md:[&_td]:px-4 [&_td]:py-1.5 md:[&_td]:py-2">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{blogContent}</ReactMarkdown>
                </article>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                {/* Categories - Top on Mobile, Right Sidebar on Desktop */}
                <aside className="w-full md:w-48 md:order-2 md:flex-shrink-0">
                  <div className="md:sticky md:top-24">
                    <h3 className="text-base md:text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 md:mb-4">Categories</h3>

                    {/* Mobile: Horizontal scrolling chips */}
                    <nav className="flex md:hidden gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                      {Array.from(categories.entries()).map(([category, count]) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`flex-shrink-0 text-sm transition-all px-4 py-2 rounded-full whitespace-nowrap ${
                            selectedCategory === category
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-md"
                              : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                          }`}
                        >
                          {category} ({count})
                        </button>
                      ))}
                    </nav>

                    {/* Desktop: Vertical list */}
                    <nav className="hidden md:block space-y-2">
                      {Array.from(categories.entries()).map(([category, count]) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left text-sm transition-all px-3 py-2 rounded-lg ${
                            selectedCategory === category
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-md"
                              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                          }`}
                        >
                          {category} ({count})
                        </button>
                      ))}
                    </nav>
                  </div>
                </aside>

                {/* Main Content - Blog List */}
                <div className="flex-1 md:order-1">
                  {loading ? (
                    <div className="text-center py-20 text-gray-500">Loading...</div>
                  ) : (
                    <div className="space-y-8 md:space-y-12">
                      {filteredBlogs.map((blog, index) => (
                        <article
                          key={blog.id}
                          className="group pb-8 md:pb-12 border-b border-gray-200 last:border-0"
                        >
                          <div
                            onClick={() => setSelectedBlog(blog)}
                            className="cursor-pointer flex flex-col md:flex-row gap-3 md:gap-6"
                          >
                            {/* Date and Time - Desktop only (left column) */}
                            <div className="hidden md:flex md:w-24 md:flex-shrink-0 text-sm text-gray-500 flex-col">
                              <div>{blog.date}</div>
                              <div className="mt-4">{blog.readTime}</div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                {blog.title}
                              </h2>

                              {/* Date and Time - Mobile only (inline with content) */}
                              <div className="flex md:hidden items-center gap-3 text-xs text-gray-500 mb-3">
                                <span>{blog.date}</span>
                                <span>•</span>
                                <span>{blog.readTime}</span>
                              </div>

                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="outline" className="text-xs uppercase font-normal border-blue-200 text-blue-700 bg-blue-50">
                                  {blog.category}
                                </Badge>
                              </div>

                              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-3">
                                {blog.summary}
                              </p>
                            </div>
                          </div>

                          {/* Share buttons for preview */}
                          <div className="flex items-center gap-2 mt-3 ml-0 md:ml-[7.5rem]">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                shareOnTwitter(blog)
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Share on X/Twitter"
                            >
                              <XLogo size={14} weight="fill" />
                              <span className="hidden sm:inline">Share</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                shareOnLinkedIn(blog)
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Share on LinkedIn"
                            >
                              <LinkedinLogo size={14} weight="fill" />
                              <span className="hidden sm:inline">Share</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                copyLink(blog.id)
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Copy link"
                            >
                              {copiedBlogId === blog.id ? (
                                <>
                                  <Check size={14} weight="bold" className="text-green-600" />
                                  <span className="hidden sm:inline text-green-600">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <LinkIcon size={14} weight="bold" />
                                  <span className="hidden sm:inline">Copy link</span>
                                </>
                              )}
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="mt-0">
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900">Featured Projects</h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl">
                Explore projects that help organizations unlock the full potential of Copilot.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white border border-gray-200"
                >
                  <div className="relative h-24 md:h-28 overflow-hidden bg-gray-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardContent className="p-3 md:p-4">
                    <h3 className="text-base md:text-lg font-bold mb-1.5 md:mb-2 text-gray-900 line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3 md:mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-[10px] md:text-xs py-0 px-2">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-blue-600 text-xs md:text-sm font-medium hover:text-blue-700"
                      >
                        <GithubLogo size={16} weight="fill" className="md:w-4 md:h-4" />
                        View on GitHub →
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-gray-500 text-xs md:text-sm font-medium">
                        Coming soon
                      </span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* About Us Tab */}
          <TabsContent value="about" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 md:mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900">About Us</h2>
                <p className="text-base md:text-lg text-gray-600">
                  We are passionate about helping organizations unlock the full potential of AI and
                  Copilot through actionable insights, advanced analytics, and strategic guidance.
                </p>
              </div>

              <div className="space-y-6 md:space-y-10">
                {/* Shailendra */}
                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-5 md:p-8">
                    <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 mb-5 md:mb-6">
                      <img
                        src="/shailendra-hegde.png"
                        alt="Shailendra Hegde"
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
                          Shailendra Hegde
                        </h3>
                        <p className="text-base md:text-lg text-blue-600 font-semibold mb-2 md:mb-3">
                          Principal Product Manager, Microsoft
                        </p>
                        <a
                          href="https://www.linkedin.com/in/shailendrahegde"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm md:text-base text-gray-600 hover:text-gray-900"
                        >
                          <LinkedinLogo size={16} weight="fill" className="md:w-[18px] md:h-[18px]" />
                          LinkedIn Profile
                        </a>
                      </div>
                    </div>

                    <div className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-700 leading-relaxed">
                      <p>
                        Shailendra is a Product Manager at Microsoft, specializing in AI and Copilot
                        analytics. With a deep passion for data-driven insights, he helps organizations
                        measure and maximize the impact of their AI investments.
                      </p>
                      <p>
                        His work focuses on creating actionable analytics frameworks that help
                        enterprises understand usage patterns, adoption metrics, and ROI from Microsoft
                        365 Copilot, GitHub Copilot, and other AI solutions.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Keith */}
                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-5 md:p-8">
                    <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 mb-5 md:mb-6">
                      <img
                        src="https://unavatar.io/linkedin/keith-mcgrane-46184029"
                        alt="Keith McGrane"
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-600"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">Keith McGrane</h3>
                        <p className="text-base md:text-lg text-blue-600 font-semibold mb-2 md:mb-3">
                          AI & Data Solutions Specialist
                        </p>
                        <a
                          href="https://www.linkedin.com/in/keith-mcgrane-46184029/?originalSubdomain=uk"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm md:text-base text-gray-600 hover:text-gray-900"
                        >
                          <LinkedinLogo size={16} weight="fill" className="md:w-[18px] md:h-[18px]" />
                          LinkedIn Profile
                        </a>
                      </div>
                    </div>

                    <div className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-700 leading-relaxed">
                      <p>
                        Keith is an experienced AI and Data Solutions Specialist based in the UK, with
                        extensive expertise in helping organizations leverage artificial intelligence and
                        data analytics to drive business outcomes.
                      </p>
                      <p>
                        Keith brings a practical, results-oriented approach to AI transformation, helping
                        organizations navigate the complexities of enterprise AI deployment while
                        maintaining focus on real-world business impact and user adoption.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </main>
      </Tabs>

      <footer className="border-t border-gray-200 mt-12 md:mt-20 py-6 md:py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center text-xs md:text-sm text-gray-600 space-y-2">
          <p className="text-gray-500">
            The views and opinions expressed on this site are personal and do not represent the views of Microsoft Corporation or any other organization.
          </p>
          <p>© 2025 AInROI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
