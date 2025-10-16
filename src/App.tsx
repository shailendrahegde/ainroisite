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
    tags: ["Power BI"],
    githubUrl: "https://github.com/microsoft/DecodingSuperUsage",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop"
  },
  {
    title: "Copilot Chat Analytics",
    description: "Intelligence on free Chat and Agent usage.",
    tags: ["Power BI"],
    githubUrl: "https://github.com/microsoft/CopilotChatAnalytics",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop"
  },
  {
    title: "GitHub Copilot Impact",
    description: "A tribute to the magic of GitHub Copilot. Learn success patterns of GitHub Copilot use.",
    tags: ["Power BI"],
    githubUrl: "https://github.com/microsoft/GitHubCopilotImpact",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&sat=-100"
  },
  {
    title: "Portable Audit Exporter",
    description: "A powerful tool to export audit log files which you can use to run enterprise wide analytics.",
    tags: ["Powershell"],
    githubUrl: "https://github.com/microsoft/PAX",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop"
  }
]

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[oklch(0.15_0.05_280)] via-[oklch(0.18_0.06_285)] to-[oklch(0.12_0.04_275)] text-foreground">
      <div className="container mx-auto px-4 py-12 md:px-8 md:py-16 lg:px-16 lg:py-24">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            My Featured <span className="text-accent">Projects</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A selection of my work that demonstrates my skills in software engineering, from concept to deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden bg-card/60 backdrop-blur-xl border-border/50 hover:border-accent/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/20 flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <GithubLogo size={32} weight="fill" className="text-accent opacity-80" />
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl md:text-2xl font-semibold mb-3 tracking-tight">
                  {project.title}
                </h2>
                
                <p className="text-sm md:text-base text-card-foreground/80 mb-4 leading-relaxed flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="bg-muted/80 text-muted-foreground text-xs uppercase tracking-wider font-medium px-3 py-1"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-foreground transition-colors group/link mt-auto"
                >
                  <GithubLogo size={20} weight="fill" className="transition-transform group-hover/link:scale-110" />
                  <span>GitHub</span>
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