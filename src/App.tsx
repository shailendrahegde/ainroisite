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
        const loadedArticles: Article[] = [
          {
            title: "ROI Demands Patience",
            summary: "Understanding the long-term value proposition of AI investments requires patience and strategic planning. This article explores why immediate returns shouldn't be the only metric for success.",
            category: "ROI Analysis",
            readTime: "5 min read",
            content: `ROI Demands Patience

In the rapidly evolving landscape of artificial intelligence, organizations often rush to measure return on investment (ROI) immediately after implementation. However, this approach can lead to premature conclusions and missed opportunities.

The True Timeline of AI ROI

Unlike traditional software implementations, AI and machine learning solutions require time to:
• Learn from organizational data
• Adapt to user behaviors
• Optimize workflows
• Build user confidence and adoption

Research shows that meaningful ROI from AI investments typically emerges 12-18 months after deployment. This timeline accounts for the learning curve, both for the technology and the users who interact with it.

Building the Foundation

Early stages of AI adoption should focus on:
1. Establishing baseline metrics
2. Training users effectively
3. Gathering quality feedback
4. Iterating on implementation strategies

Organizations that rush to measure ROI in the first few months often miss the transformative changes happening beneath the surface. User behavior shifts, process improvements, and cultural changes take time to manifest in measurable outcomes.

The Patience Paradox

While executives demand quick wins, the most successful AI implementations are those that balance short-term demonstrations of value with long-term strategic vision. This means:
• Celebrating small victories
• Communicating progress transparently
• Maintaining realistic expectations
• Investing in continuous improvement

Case Studies in Patience

Organizations that have allowed their AI investments to mature report significantly higher satisfaction and ROI. One enterprise software company found that their Copilot implementation showed modest 15% productivity gains in month three, but by month twelve, that number had grown to 47%.

Another financial services firm discovered that early adoption rates of 23% grew to 76% once users had time to discover features organically and share best practices with colleagues.

Measuring What Matters

Rather than fixating on immediate ROI, consider tracking:
• User engagement trends
• Quality of outputs over time
• Time saved on specific tasks
• Employee satisfaction scores
• Innovation metrics

These indicators often predict long-term ROI more accurately than early financial metrics.

The Strategic Imperative

Patience in AI adoption isn't just about waiting—it's about strategic investment in:
• Comprehensive training programs
• Change management initiatives
• Feedback loops and iteration
• Cultural transformation

Organizations that treat AI adoption as a journey rather than a destination consistently outperform those seeking instant gratification.

Conclusion

ROI from AI investments demands patience, but that patience pays dividends. By focusing on sustainable adoption, continuous learning, and long-term strategic value, organizations position themselves to reap the full benefits of their AI investments. The question isn't whether AI will deliver ROI, but whether organizations will give it the time it needs to flourish.`
          },
          {
            title: "What Early AI Adoption Really Looks Like in the Enterprise",
            summary: "A practical look at the realities of enterprise AI adoption, including challenges, surprises, and lessons learned from organizations at the forefront of AI transformation.",
            category: "AI Adoption",
            readTime: "7 min read",
            content: `What Early AI Adoption Really Looks Like in the Enterprise

The narrative around AI adoption often focuses on dramatic success stories and revolutionary transformations. But what does early AI adoption actually look like in the enterprise? The reality is more nuanced—and more interesting—than most headlines suggest.

The Reality Check

Early AI adoption doesn't look like sci-fi movies. It looks like:
• A marketing team using Copilot to draft email campaigns
• Developers leveraging GitHub Copilot for boilerplate code
• Analysts using AI to summarize lengthy reports
• HR teams automating routine correspondence

These may seem mundane, but they represent the foundation of transformative change.

The Adoption Curve Isn't Smooth

Enterprise AI adoption follows a pattern that surprises many leaders:

Week 1-2: Excitement and experimentation
Everyone wants to try the new tool. Usage spikes. Feedback is enthusiastic but superficial.

Week 3-6: The trough of disillusionment
Reality sets in. Some users abandon the tool. Others struggle to find relevant use cases. Leadership questions the investment.

Week 7-12: The emergence of champions
A subset of users discovers genuine value. They become advocates. Usage patterns stabilize but concentrate among power users.

Month 4-6: The second wave
Champions share best practices. Skeptics see real examples. Adoption broadens. Organizational processes begin to shift.

Month 7-12: Integration and transformation
AI tools become embedded in workflows. New use cases emerge. The organization starts to reimagine processes around AI capabilities.

The Unexpected Champions

Early AI adopters often aren't who you'd expect. While technical teams show initial enthusiasm, the most creative and sustained adoption often comes from:
• Executive assistants who master scheduling and communication tasks
• Customer service representatives who leverage AI for response quality
• Project managers who use AI for documentation and tracking
• Sales professionals who automate proposal generation

These users find immediate, practical value and build AI into their daily workflows.

The Challenges Nobody Talks About

Beyond technical implementation, early AI adoption surfaces unexpected challenges:

Identity and Value Concerns
Some employees worry that AI assistance diminishes their professional identity. "If AI can do my job, what's my value?" This requires sensitive change management and reframing AI as an amplifier of human capability.

Quality Anxiety
Early adopters often spend as much time reviewing AI outputs as they would have spent creating content from scratch. Building trust in AI outputs is a gradual process.

The "AI Did It" Problem
Attribution becomes murky. When AI assists with analysis or content creation, how do organizations credit work? This affects performance reviews, recognition, and career development.

Feature Overload
Modern AI tools offer dozens of capabilities. Users often feel overwhelmed and retreat to basic functions—or stop using the tool entirely. Focused training on specific use cases proves more effective than comprehensive overviews.

What Success Actually Looks Like

Successful early AI adoption has specific markers:

Metric Evolution
Organizations shift from measuring "number of AI interactions" to tracking "AI-assisted outcomes" and "time saved on specific workflows."

Organic Discovery
Users find applications beyond those suggested in training. This organic exploration indicates genuine engagement.

Peer-to-Peer Learning
Champions emerge who teach colleagues. This social learning proves more effective than formal training.

Process Redesign Conversations
Teams begin asking, "How should we restructure this workflow given AI capabilities?" This indicates strategic thinking beyond tool adoption.

Lessons from the Front Lines

Organizations leading AI adoption share common insights:

Start Narrow, Then Expand
Rather than rolling out AI tools organization-wide, pilot with specific teams and use cases. Build from success stories.

Invest in Champions
Identify early adopters and invest in their development. Make them AI advocates with dedicated time for exploration and teaching.

Measure Differently
Traditional productivity metrics often miss AI's impact. Develop new KPIs that capture quality improvements, creative output, and strategic work time.

Accept the Messy Middle
The period between initial excitement and sustained adoption is uncomfortable. Leadership commitment during this phase determines success.

Celebrate Small Wins
Don't wait for transformation to celebrate. Highlight individual productivity gains, quality improvements, and innovative use cases.

The Cultural Shift

Perhaps the most significant aspect of early AI adoption is cultural:
• From "I need to know everything" to "I need to know how to ask the right questions"
• From "My value is in execution" to "My value is in judgment and creativity"  
• From "Technology should be invisible" to "Technology is a collaborative partner"

These shifts happen slowly, through hundreds of small interactions and realizations.

Looking Forward

Early AI adoption in the enterprise is simultaneously more mundane and more profound than expected. It's not about dramatic overnight transformation—it's about daily choices to engage with AI tools, persistent experimentation, and gradual workflow evolution.

Organizations succeeding with AI aren't necessarily the most technically sophisticated. They're the ones creating space for experimentation, supporting champions, accepting the messy middle of adoption, and maintaining long-term commitment despite short-term uncertainty.

The future of work isn't arriving in a single moment. It's being built in thousands of small interactions between humans and AI, each one teaching both parties how to work together more effectively. That's what early AI adoption really looks like—and it's more revolutionary than any headline suggests.`
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
                        {article.content ? (
                          article.content.split('\n').map((paragraph, idx) => (
                            <p key={idx} className="mb-4 leading-relaxed whitespace-pre-wrap">
                              {paragraph}
                            </p>
                          ))
                        ) : (
                          <p className="text-muted-foreground">Content could not be loaded.</p>
                        )}
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