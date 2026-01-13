import { useState, useEffect, useMemo } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { GithubLogo, LinkedinLogo, List, X } from "@phosphor-icons/react"

interface Project {
  title: string
  description: string
  tags: string[]
  githubUrl: string
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
    githubUrl: "https://github.com/microsoft/M365-to-Copilot-Bridge",
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

  useEffect(() => {
    // Fetch blog manifest
    fetch("/blogs/manifest.json")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data)
        setLoading(false)
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

  return (
    <div id="spark-app" className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Tabs defaultValue="insights" className="w-full">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
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

        <main className="max-w-6xl mx-auto px-8 py-12">

          {/* Insights Tab */}
          <TabsContent value="insights" className="mt-0">
            {selectedBlog ? (
              <div className="max-w-4xl mx-auto">
                <button
                  onClick={() => {
                    setSelectedBlog(null)
                    setBlogContent("")
                  }}
                  className="mb-8 text-gray-600 hover:text-gray-900 text-base font-medium"
                >
                  ← Back to all posts
                </button>

                <article className="prose prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900
                  prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-0
                  prose-h2:text-2xl prose-h2:mb-5 prose-h2:mt-8
                  prose-h3:text-lg prose-h3:mb-4 prose-h3:mt-6 prose-h3:font-bold
                  prose-p:text-gray-800 prose-p:leading-7 prose-p:mb-6 prose-p:text-base
                  prose-strong:text-gray-900 prose-strong:font-bold
                  prose-ul:my-5 prose-ul:list-disc prose-ul:pl-6
                  prose-ol:my-5 prose-ol:list-decimal prose-ol:pl-6
                  prose-li:text-gray-800 prose-li:my-1 prose-li:leading-7
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:bg-blue-50 prose-blockquote:py-3 prose-blockquote:my-6 prose-blockquote:font-normal
                  prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{blogContent}</ReactMarkdown>
                </article>
              </div>
            ) : (
              <div className="flex gap-12">
                {/* Main Content - Blog List */}
                <div className="flex-1">
                  {loading ? (
                    <div className="text-center py-20 text-gray-500">Loading...</div>
                  ) : (
                    <div className="space-y-12">
                      {filteredBlogs.map((blog, index) => (
                        <article
                          key={blog.id}
                          onClick={() => setSelectedBlog(blog)}
                          className="cursor-pointer group pb-12 border-b border-gray-200 last:border-0"
                        >
                          <div className="flex gap-6">
                            {/* Date and Time */}
                            <div className="w-24 flex-shrink-0 text-sm text-gray-500">
                              <div>{blog.date}</div>
                              <div className="mt-4">{blog.readTime}</div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                              <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                {blog.title}
                              </h2>

                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="outline" className="text-xs uppercase font-normal border-blue-200 text-blue-700 bg-blue-50">
                                  {blog.category}
                                </Badge>
                              </div>

                              <p className="text-base text-gray-600 leading-relaxed">
                                {blog.summary}
                              </p>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Sidebar - Categories */}
                <aside className="w-48 flex-shrink-0">
                  <div className="sticky top-24">
                    <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Categories</h3>
                    <nav className="space-y-2">
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
              </div>
            )}
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="mt-0">
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Featured Projects</h2>
              <p className="text-lg text-gray-600 max-w-3xl">
                Explore projects that help organizations unlock the full potential of Copilot.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white border border-gray-200"
                >
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      {project.title}
                    </h3>

                    <p className="text-base text-gray-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
                    >
                      <GithubLogo size={20} weight="fill" />
                      View on GitHub →
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* About Us Tab */}
          <TabsContent value="about" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl font-bold mb-4 text-gray-900">About Us</h2>
                <p className="text-lg text-gray-600">
                  We are passionate about helping organizations unlock the full potential of AI and
                  Copilot through actionable insights, advanced analytics, and strategic guidance.
                </p>
              </div>

              <div className="space-y-10">
                {/* Shailendra */}
                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                        SH
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          Shailendra Hegde
                        </h3>
                        <p className="text-lg text-blue-600 font-semibold mb-3">
                          Principal Product Manager, Microsoft
                        </p>
                        <a
                          href="https://www.linkedin.com/in/shailendrahegde"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
                        >
                          <LinkedinLogo size={18} weight="fill" />
                          LinkedIn Profile
                        </a>
                      </div>
                    </div>

                    <div className="space-y-3 text-base text-gray-700 leading-relaxed">
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
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                        KM
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Keith McGrane</h3>
                        <p className="text-lg text-blue-600 font-semibold mb-3">
                          AI & Data Solutions Specialist
                        </p>
                        <a
                          href="https://www.linkedin.com/in/keith-mcgrane-46184029/?originalSubdomain=uk"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
                        >
                          <LinkedinLogo size={18} weight="fill" />
                          LinkedIn Profile
                        </a>
                      </div>
                    </div>

                    <div className="space-y-3 text-base text-gray-700 leading-relaxed">
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

      <footer className="border-t border-gray-200 mt-20 py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8 text-center text-sm text-gray-600">
          <p>© 2025 AInROI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
