import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GithubLogo, Article, FileText } from "@phosphor-icons/react"
import { Skeleton } from "@/components/ui/skeleton"
import roiDoc from "@/assets/documents/ROI_demands_patience.docx"
import aiAdoptionDoc from "@/assets/documents/What_Early_AI_Adoption_Really_Looks_Like_in_the_Enterprise.docx"

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

const documentFiles = [
  { url: roiDoc, name: "ROI_demands_patience.docx", title: "ROI Demands Patience" },
  { url: aiAdoptionDoc, name: "What_Early_AI_Adoption_Really_Looks_Like_in_the_Enterprise.docx", title: "What Early AI Adoption Really Looks Like in the Enterprise" }
]

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

  useEffect(() => {
    async function loadDocuments() {
      setLoading(true)
      try {
        const loadedArticles: Article[] = []
        
        for (const doc of documentFiles) {
          try {
            const response = await fetch(doc.url)
            const blob = await response.blob()
            const arrayBuffer = await blob.arrayBuffer()
            const base64 = btoa(
              new Uint8Array(arrayBuffer).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
              )
            )

            const promptText = `You are extracting the exact text content from a Word document (.docx file).

The document is titled "${doc.title}".

I'm providing the document's base64 encoded content. Your task is to extract ALL the text exactly as it appears in the document, preserving:
- All paragraphs
- All line breaks
- All formatting structure
- All headings and subheadings
- All content without summarizing or changing anything

Return ONLY a valid JSON object with this exact structure:
{
  "title": "${doc.title}",
  "summary": "A brief 2-3 sentence summary of what the document is about",
  "category": "An appropriate category like 'ROI Analysis', 'AI Adoption', 'Enterprise Strategy', etc.",
  "readTime": "Estimated read time like '7 min read' based on word count",
  "content": "The COMPLETE document text with paragraphs separated by \\n\\n - extract EVERYTHING from the document"
}

Base64 document content: ${base64.substring(0, 50000)}`

            const result = await window.spark.llm(promptText, "gpt-4o", true)
            const articleData = JSON.parse(result)
            loadedArticles.push(articleData)
          } catch (error) {
            console.error(`Error processing ${doc.name}:`, error)
          }
        }
        
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
      <div className="container mx-auto px-4 py-12 md:px-8 md:py-16 lg:px-16 lg:py-20 max-w-[1600px]">
        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="mb-12 md:mb-16 h-12 px-2">
            <TabsTrigger value="insights" className="px-6 py-3 text-base">Insights</TabsTrigger>
            <TabsTrigger value="projects" className="px-6 py-3 text-base">Projects/Code</TabsTrigger>
            <TabsTrigger value="about" className="px-6 py-3 text-base">About Us</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="mt-0">
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
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card className="group cursor-pointer overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 hover:translate-y-[-2px] flex flex-col p-6">
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
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[85vh]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl md:text-3xl font-semibold pr-8">
                        {article.title}
                      </DialogTitle>
                      <div className="flex items-center gap-3 pt-2">
                        <Badge variant="secondary" className="bg-secondary text-foreground text-xs font-normal px-2.5 py-0.5 rounded-sm">
                          {article.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{article.readTime}</span>
                      </div>
                    </DialogHeader>
                    <ScrollArea className="mt-6 pr-4 max-h-[calc(85vh-180px)]">
                      <div className="prose prose-sm md:prose-base max-w-none text-foreground">
                        {article.content.split('\n').map((paragraph, idx) => (
                          <p key={idx} className="mb-4 leading-relaxed whitespace-pre-wrap">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
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
            <div className="mb-16 md:mb-20">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-foreground">
                About Us
              </h1>
              <p className="text-base md:text-lg text-foreground/80 max-w-4xl leading-relaxed">
                Learn more about our mission and what drives us to help organizations succeed with Copilot.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App