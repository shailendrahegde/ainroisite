import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GithubLogo } from "@phosphor-icons/react"

interface Project {
  title: string
  description: string
  tags: string[]
  githubUrl: string
  image: string
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
    title: "Portable Audit Exporter",
    description: "A powerful tool to export audit log files which you can use to run enterprise wide analytics.",
    tags: ["Powershell"],
    githubUrl: "https://github.com/microsoft/PAX",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop"
  },
  {
    title: "AI in One",
    description: "Simplified single report brings M365 Copilot, Free Chat and Agent usage in a single view.",
    tags: ["Power BI", "Copilot Analytics", "Microsoft Purview"],
    githubUrl: "https://github.com/microsoft/AIinOne",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop"
  }
]

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 md:px-8 md:py-16 lg:px-16 lg:py-20">
        <div className="mb-16 md:mb-20">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
            Who we are
          </h1>
          <p className="text-base md:text-lg text-foreground/80 max-w-4xl leading-relaxed">
            We champion your Copilot success by turning telemetry and organizational context into clear decisions: what's working, where to deploy, how to drive adoption, and how to measure impact.
          </p>
        </div>

        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 text-foreground">
            Featured Assets
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
            Explore projects that help organizations unlock the full potential of Copilot through actionable insights and advanced analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
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
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App