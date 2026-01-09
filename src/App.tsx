import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { GithubLogo, Article, ArrowLeft, TwitterLogo, LinkedinLogo, Link as LinkIcon, Check } from "@phosphor-icons/react"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

interface Project {
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  image: string
}

interface Article {
  title: string
  summary: string
  category: string
  readTime: string
  content: string
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
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    if (selectedArticle) {
      const url = window.location.href
      navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success("Link copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShareTwitter = () => {
    if (selectedArticle) {
      const url = window.location.href
      const text = `${selectedArticle.title} - ${selectedArticle.summary}`
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
    }
  }

  const handleShareLinkedIn = () => {
    if (selectedArticle) {
      const url = window.location.href
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
    }
  }

  useEffect(() => {
    async function loadDocuments() {
      setLoading(true)
      try {
        const loadedArticles: Article[] = [
          {
            title: "ROI Demands Patience",
            summary: "AI value unfolds in stages. Focusing on ROI prematurely can lead to missed opportunities. Here's what to focus on instead",
            category: "ROI Analysis",
            readTime: "5 min read",
            content: `AI ROI Is the Wrong First Question: Here’s What to Measure Instead
When organizations switch on new AI tech, the instinct is to look for hard proof of return on investment (ROI) almost immediately. A dashboard or a chart that goes up and to the right on a monetary measure. A before-and-after business case. But real ROI rarely shows up that neatly or that quickly. It is nuanced, shows up in different forms over time, and depends heavily on how people actually use the technology.
Before we can fairly judge ROI, we need a minimum level, and the right kind of, usage. In the early days of any AI journey, the most important signal is not immediate cost savings or revenue impact, but whether people are showing up, experimenting, and beginning to build habits around AI-powered work.
How AI Value Really Shows Up
Value from AI unfolds in stages. It may first appear as growing usage (new users and returning users), improving satisfaction, anecdotes and case studies (qualitative stories), time savings, and eventually as shifts in key performance indicators (KPIs) that lead to financial outcomes. We are likely to see meaningful results and patterns that tell us whether AI is valuable or not, if we align our measurement to this sequence. 
 Note that along the way, there are also powerful, but harder-to-measure benefits like giving people access to a new skill, a better starting point, or a thinking partner they never had before.
Value Measurement Journey
Deep usage. Great usage precedes great value. We must first ask “are users engaging with AI often enough for it to become part of how they work, not just an occasional experiment?” As a rough benchmark, look for patterns like 11–15 AI actions (any interaction with AI) per week for habit formation, or people returning to AI on 2–3 days each week.
Quality. Are AI outputs getting better over time as people learn how to prompt more effectively and as tech improve? Signals might include an increasing proportion of thumbs-up or positive ratings, and higher “return rates” where people come back to AI repeatedly for similar tasks.
Satisfaction. Do users feel that AI is genuinely improving their work? Ask directly: How many people believe AI has improved their work quality? Where are they finding the most success—summarization, redrafting, specific workflows, or routine tasks like status reports and emails?
Time savings. How much time is AI giving back to people? You can combine self-reported estimates (for example, “AI saves me X-Y mins per day, with 15 min intervals”) and usage based assistance (each action provides X mins of assistance). 
KPI improvement. Once usage, satisfaction, and quality signals are strong, you can begin to look for changes in concrete metrics. Use before-and-after comparisons for specific, predictable workflows or divisions where AI—often via agents—can consistently assist with well-defined tasks. Note that this approach is hard to scale and can only be done for proof of value and building executive confidence in specific divisions. We will cover this in a separate blog.
Financials. Over a longer horizon, improvements in productivity and quality can show up in financial metrics such as revenue per employee or cost per unit of work. Even then, remember that some of AI’s greatest benefits—like unlocking new skills or enabling work that simply wasn’t possible before—may not be fully visible in traditional financial reports.
Take Away: ROI Demands Patience
The sequence matters. First, make AI accessible and useful. Invest in education, coaching, and examples so employees feel confident and capable. Track deep usage, satisfaction, quality, and time savings as your early indicators. Only once those foundations are in place does it make sense to look for shifts in KPIs and, later, financial outcomes. In other words: don’t rush to measure AI ROI prematurely—build it, then measure it.
 

`
          },
          {
            title: "What Early AI Adoption Really Looks Like in the Enterprise",
            summary: "Early adoption is concentrated in few surfaces and within a small set of superusers, and this is ok",
            category: "AI Adoption",
            readTime: "7 min read",
            content: `What Early AI Adoption Really Looks Like in the Enterprise
The Reality: A Power-Law of AI Usage
In almost every organization, AI usage quickly settles into a power-law distribution. A small group of superusers drive a disproportionately high number of interactions, while most employees sit in a long tail of light or experimental use. These superusers matter, but if you lead IT or digital transformation, you also need to understand what “healthy” early adoption looks like across the broader population.
First 90–120 Days: What Good Engagement Looks Like
In the first three to four months after rolling out an AI solution, we typically see average weekly interactions in the 7–10 range per active user. That means a user is prompting, refining responses, or accepting AI-generated suggestions 7–10 times a week.
During this phase, two surfaces usually dominate:
•	Meeting platforms (automated notes, summaries, and actions)
•	General-purpose chat (Q&A, drafting, quick analysis)
This is both normal and desirable. These experiences deliver clear value, require almost no training, and match existing user behavior. Getting a quick answer, finding a doc or enterprise knowledge, and accessing meeting notes without attending a 60-minute call are intuitive, low-friction wins that are essential for habit formation.
Months 4–6: Expanding Surfaces and Confidence
As users gain familiarity and confidence, adoption grows along two dimensions. First, interactions on the initial, high-traffic surfaces continue to increase. Second, people begin to experiment with AI inside creator tools such as email, documents, and spreadsheets. Design tools tend to ramp more slowly as they demand new ways of working.
A key indicator to track at this stage is the number of apps or surfaces per active user. By around month six, a healthy pattern is for the average user to be using AI consistently in three to four surfaces, not just in meetings and chat.
What IT Leaders Should Do
If you are responsible for driving AI adoption, your early strategy should be about habit formation at scale, not chasing niche use cases. Start by making AI indispensable in one or two high-traffic, familiar experiences: meeting platforms and general-purpose chat. Make it easy to turn on, easy to try, and easy to see value within a week. Ensure that AI is able work well and isn’t blocked on technicalities like access to recordings or web-grounding.
Once those habits are in place and you see sustained interaction levels, focus on higher-value, specialized scenarios in email, documents, spreadsheets, and eventually design tools. At that point, your goal shifts from proving AI’s value to broadening where that value shows up—moving from a few superusers to a durable, organization-wide capability.
`
          }
        ]
        
        setArticles(loadedArticles)
      } catch (error) {
        console.error("Error loading documents:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDocuments()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 pt-8 pb-12 md:px-8 md:pt-12 md:pb-16 lg:px-16 lg:pt-16 lg:pb-20 max-w-[1600px]">
        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="mb-12 md:mb-16 h-12 px-2 gap-6">
            <TabsTrigger value="insights" className="px-6 py-3 text-base">Insights</TabsTrigger> 
            <TabsTrigger value="projects" className="px-6 py-3 text-base">Projects/Code</TabsTrigger>                                                                                                         
            <TabsTrigger value="about" className="px-6 py-3 text-base">About Us</TabsTrigger>    
          </TabsList>          <TabsContent value="insights" className="mt-0">
            {selectedArticle ? (
              <div className="max-w-4xl mx-auto">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedArticle(null)}
                  className="mb-8 -ml-2 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Back to all insights
                </Button>

                <article className="prose prose-lg max-w-none">
                  <div className="flex items-center gap-3 mb-6">
                    <Badge variant="secondary" className="bg-secondary text-foreground text-sm font-normal px-3 py-1 rounded-sm">
                      {selectedArticle.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{selectedArticle.readTime}</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
                    {selectedArticle.title}
                  </h1>

                  <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                    {selectedArticle.summary}
                  </p>

                  <div className="flex items-center gap-3 mb-12 pb-8 border-b border-border">
                    <span className="text-sm font-medium text-muted-foreground mr-2">Share:</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShareTwitter}
                      className="gap-2"
                    >
                      <TwitterLogo size={18} weight="fill" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShareLinkedIn}
                      className="gap-2"
                    >
                      <LinkedinLogo size={18} weight="fill" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyLink}
                      className="gap-2"
                    >
                      {copied ? <Check size={18} weight="bold" /> : <LinkIcon size={18} />}
                      {copied ? "Copied!" : "Copy Link"}
                    </Button>
                  </div>

                  <div className="text-base text-foreground/90 leading-relaxed space-y-6">
                    {selectedArticle.content.split('\n').map((paragraph, idx) => (
                      paragraph.trim() ? (
                        <p key={idx} className="whitespace-pre-wrap">
                          {paragraph}
                        </p>
                      ) : null
                    ))}
                  </div>
                </article>
              </div>
            ) : (
              <>
            <div className="mb-16 md:mb-20">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-foreground">
                Insights
              </h1>
              <p className="text-base md:text-lg text-foreground/80 max-w-4xl leading-relaxed">
                Discover actionable insights and analytics to drive your Copilot success.
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {[1, 2].map((i) => (
                  <Card key={i} className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Skeleton className="h-12 w-12 rounded-lg" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-24 mb-2" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-7 w-full mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {articles.map((article, index) => (
                <Card 
                  key={index}
                  onClick={() => setSelectedArticle(article)}
                  className="group cursor-pointer overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 hover:translate-y-[-2px] flex flex-col p-6"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Article size={24} weight="duotone" className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <Badge variant="secondary" className="bg-secondary text-foreground text-xs font-normal px-2.5 py-0.5 rounded-sm mb-2">
                        {article.category}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{article.readTime}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                    {article.title}
                  </h3>
                  
                  <p className="text-sm text-foreground/70 leading-relaxed flex-1 mb-4">
                    {article.summary}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:text-primary/80 transition-colors mt-auto">
                    <span>Read full article</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5">
                      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Card>
              ))}
            </div>
            )}
            </>
            )}
          </TabsContent>


          <TabsContent value="projects" className="mt-0">
            <div className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 text-foreground">
                Featured assets
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
                Explore projects that help organizations unlock the full potential of Copilot through actionable insights and advanced analytics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 hover:translate-y-[-2px] flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden bg-secondary">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full p-2 shadow-sm">
                      <GithubLogo size={20} weight="fill" className="text-foreground/70" />
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h2 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                      {project.title}
                    </h2>
                    
                    <p className="text-sm text-foreground/70 mb-4 leading-relaxed flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="bg-secondary text-foreground text-xs font-normal px-2.5 py-0.5 rounded-sm"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-auto"
                      >
                        <span>View on GitHub</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5">
                          <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground mt-auto">
                        Coming soon
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 md:mb-16">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-foreground">
                  About Us
                </h1>
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                  We are passionate about helping organizations unlock the full potential of AI and Copilot through actionable insights, advanced analytics, and strategic guidance.
                </p>
              </div>

              <div className="space-y-12">
                <div className="border-b border-border pb-12">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl font-bold text-primary">SH</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                        Shailendra Hegde
                      </h2>
                      <p className="text-lg text-primary font-medium mb-3">
                        Principal Product Manager, Microsoft
                      </p>
                      <a
                        href="https://www.linkedin.com/in/shailendrahegde"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <LinkedinLogo size={20} weight="fill" />
                        View LinkedIn Profile
                      </a>
                    </div>
                  </div>
                  
                  <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed space-y-4">
                    <p>
                      Shailendra is a Product Manager at Microsoft, specializing in AI and Copilot analytics. With a deep passion for data-driven insights, he helps organizations measure and maximize the impact of their AI investments.
                    </p>
                    <p>
                      His work focuses on creating actionable analytics frameworks that help enterprises understand usage patterns, adoption metrics, and ROI from Microsoft 365 Copilot, GitHub Copilot, and other AI solutions. Through innovative Power BI dashboards and analytical tools, Shailendra enables organizations to decode what their best users do differently and apply those insights at scale.
                    </p>
                    
                  </div>
                </div>

                <div className="pb-12">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl font-bold text-primary">KM</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                        Keith McGrane
                      </h2>
                      <p className="text-lg text-primary font-medium mb-3">
                        AI & Data Solutions Specialist
                      </p>
                      <a
                        href="https://www.linkedin.com/in/keith-mcgrane-46184029/?originalSubdomain=uk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <LinkedinLogo size={20} weight="fill" />
                        View LinkedIn Profile
                      </a>
                    </div>
                  </div>
                  
                  <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed space-y-4">
                    <p>
                      Keith is an experienced AI and Data Solutions Specialist based in the UK, with extensive expertise in helping organizations leverage artificial intelligence and data analytics to drive business outcomes.
                    </p>
                    <p>
                      With a strong background in enterprise technology solutions, Keith specializes in designing and implementing AI-powered analytics systems that deliver measurable value. His work spans across strategic planning, technical implementation, and organizational change management to ensure successful AI adoption.
                    </p>
                    <p>
                      Keith brings a practical, results-oriented approach to AI transformation, helping organizations navigate the complexities of enterprise AI deployment while maintaining focus on real-world business impact and user adoption.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-secondary/50 rounded-lg border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Our Mission
                </h3>
                <p className="text-base text-foreground/80 leading-relaxed">
                  We believe that AI adoption is not just about technology—it's about people, processes, and measurable outcomes. Our mission is to empower organizations with the insights and tools they need to drive meaningful AI adoption, build sustainable habits, and achieve long-term ROI from their Copilot investments.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App
