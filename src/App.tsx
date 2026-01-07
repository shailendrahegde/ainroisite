import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GithubLogo, Article } from "@phosphor-icons/react"

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

const articles: Article[] = [
  {
    title: "Decoding Super Usage: What Your Best Copilot Users Do Differently",
    summary: "Discover the patterns and behaviors that distinguish high-impact Copilot users from the rest. Learn how to identify super users in your organization and replicate their success strategies.",
    category: "Copilot Analytics",
    readTime: "8 min read",
    content: `Introduction

Understanding what separates high-performing Copilot users from the rest is crucial for driving adoption and maximizing ROI. Through extensive analysis of usage patterns across organizations, we've identified key behaviors and practices that distinguish "super users" from typical users.

What Defines a Super User?

Super users aren't just people who use Copilot frequently—they're individuals who leverage the tool strategically to amplify their productivity. These users demonstrate:

• Consistent daily engagement across multiple Microsoft 365 applications
• Higher acceptance rates for Copilot suggestions (often 40%+ higher than average)
• Strategic use of prompts that align with their workflow needs
• Active exploration of new Copilot features and capabilities
• Integration of Copilot into critical business processes

Key Behavioral Patterns

1. Strategic Prompt Engineering
Super users have developed an intuitive understanding of how to craft effective prompts. They:
- Start with clear, specific instructions
- Provide relevant context upfront
- Iterate on prompts rather than abandoning unsuccessful attempts
- Save and reuse effective prompt patterns

2. Cross-Application Integration
Rather than using Copilot in isolation, super users integrate it across their workflow:
- Teams for meeting summaries and action items
- Outlook for email drafting and prioritization
- Word for content creation and editing
- Excel for data analysis and visualization
- PowerPoint for presentation development

3. Iterative Learning
Super users treat Copilot as a collaborative partner:
- They review and refine Copilot outputs
- They experiment with different approaches
- They share successful patterns with colleagues
- They provide feedback to improve results

Identifying Super Users in Your Organization

Use these metrics to identify your super users:

Active Days: Users engaging with Copilot 4+ days per week
Acceptance Rate: Suggestion acceptance above 60%
Feature Breadth: Regular use across 3+ M365 applications
Prompt Quality: Average prompt length of 15+ words with context

Replicating Success

To help other users achieve super user status:

1. Create a mentorship program pairing super users with newer users
2. Document and share effective prompt patterns
3. Highlight use cases that demonstrate high-value applications
4. Provide training focused on practical scenarios
5. Celebrate and recognize effective Copilot usage

Measuring Impact

Track these KPIs to measure the growth of your super user population:
- Percentage of users meeting super user criteria
- Month-over-month growth in average acceptance rates
- Expansion of Copilot use across different applications
- Time saved per user based on telemetry data
- Quality improvements in deliverables

Conclusion

Super users aren't born—they're developed through strategic use, continuous learning, and organizational support. By understanding what makes them successful, you can create pathways for all users to achieve similar results, ultimately maximizing your Copilot investment and transforming how work gets done in your organization.`
  },
  {
    title: "From Insights to Impact: Building a Data-Driven Copilot Strategy",
    summary: "Transform raw telemetry into actionable adoption strategies. Learn how to use analytics to guide deployment decisions, measure ROI, and drive meaningful organizational change with Copilot.",
    category: "Adoption Strategy",
    readTime: "10 min read",
    content: `The Challenge of Copilot Analytics

Organizations investing in Microsoft 365 Copilot generate massive amounts of telemetry data. The challenge isn't collecting data—it's transforming that data into actionable insights that drive adoption, optimize deployment, and demonstrate clear ROI.

The Data-Driven Adoption Framework

A successful Copilot strategy requires moving through four distinct phases:

Phase 1: Data Foundation
Establish robust data collection and analysis infrastructure:
- Configure Microsoft 365 usage reports
- Set up Microsoft Purview audit logging
- Implement Power BI dashboards for real-time visibility
- Create baseline metrics for comparison

Phase 2: Insight Generation
Transform raw data into meaningful insights:
- Identify usage patterns across departments and roles
- Analyze acceptance rates and feature adoption
- Segment users by engagement level
- Discover friction points and barriers to adoption

Phase 3: Strategy Development
Use insights to inform strategic decisions:
- Prioritize high-impact use cases
- Target deployment to ready user groups
- Allocate training resources effectively
- Address specific adoption barriers

Phase 4: Continuous Optimization
Create feedback loops for ongoing improvement:
- Monitor KPIs against targets
- Adjust strategies based on outcomes
- Scale successful pilots organization-wide
- Iterate on training and support

Essential Analytics for Decision-Making

Deployment Planning
Use these metrics to guide rollout decisions:
- M365 app usage by department
- Collaboration patterns and team structures
- User readiness scores based on current behaviors
- Technical environment compatibility

Adoption Monitoring
Track these indicators during rollout:
- Daily active users (DAU) and monthly active users (MAU)
- Feature utilization across applications
- User engagement trends over time
- Geographic and departmental adoption rates

ROI Measurement
Demonstrate value through:
- Time savings per user per week
- Document creation and editing efficiency gains
- Meeting productivity improvements
- User satisfaction and sentiment scores

Turning Insights into Action

From Data to Decisions
Example: Your analytics reveal that the Marketing department has 80% adoption while Finance sits at 20%.

Poor Response: "Finance needs more training."
Data-Driven Response: 
- Investigate: What M365 apps does Finance use most?
- Analyze: What workflows could Copilot enhance?
- Target: Create Finance-specific use cases and prompts
- Deploy: Run focused pilot with Finance power users
- Measure: Track adoption improvements week over week

Building Your Analytics Stack

Recommended tools and approaches:

Core Analytics Platform:
- Power BI for visualization and reporting
- Microsoft Purview for detailed audit logs
- Microsoft Graph API for custom analytics
- Azure Data Lake for advanced analysis

Key Reports to Build:
1. Executive Dashboard - High-level adoption metrics
2. Department Deep Dive - Team-specific insights
3. User Journey Analysis - Individual engagement patterns
4. ROI Calculator - Business impact metrics
5. Trend Analysis - Historical comparisons

Creating a Culture of Data-Driven Decision Making

Leadership Alignment
- Share insights regularly with executives
- Connect metrics to business outcomes
- Use data to justify additional investment
- Celebrate wins with quantitative evidence

Team Empowerment
- Give managers access to team dashboards
- Train champions on data interpretation
- Enable self-service analytics for key stakeholders
- Create feedback channels for data-driven improvements

Common Pitfalls to Avoid

1. Vanity Metrics: Focus on metrics that drive decisions, not just impressive numbers
2. Analysis Paralysis: Start with core metrics and expand gradually
3. Static Reporting: Build dashboards that update automatically
4. Ignoring Qualitative Data: Combine analytics with user feedback
5. Lack of Action: Ensure every insight has a corresponding action plan

Success Story Framework

Use this template to communicate wins:
1. Baseline: Where we started (with data)
2. Insight: What the data revealed
3. Action: Strategy we implemented
4. Impact: Results achieved (with metrics)
5. Next Steps: How we're scaling success

Conclusion

The most successful Copilot deployments aren't driven by instinct—they're powered by data. By building a robust analytics foundation, generating actionable insights, and creating a culture of data-driven decision making, organizations can transform Copilot from a productivity tool into a strategic asset that delivers measurable business value.

Start small, measure everything, and let the data guide your path to Copilot success.`
  },
  {
    title: "The Analytics Playbook: Essential Metrics for Copilot Success",
    summary: "Master the key performance indicators that matter for Copilot adoption. From engagement rates to productivity gains, learn which metrics to track and how to interpret them for maximum impact.",
    category: "Best Practices",
    readTime: "7 min read",
    content: `Why Metrics Matter

You can't improve what you don't measure. For Microsoft 365 Copilot deployments, the right metrics provide visibility into adoption patterns, identify opportunities for improvement, and demonstrate return on investment to stakeholders.

The Copilot Metrics Hierarchy

Think of your metrics in three tiers:

Tier 1: Foundation Metrics (Track Weekly)
These core indicators provide a pulse check on basic adoption:
- Total Copilot-enabled users
- Daily Active Users (DAU)
- Monthly Active Users (MAU)
- DAU/MAU ratio (stickiness)

Tier 2: Engagement Metrics (Track Daily)
These reveal how users interact with Copilot:
- Average sessions per user
- Features used per session
- Suggestion acceptance rate
- Cross-application usage
- Prompt quality scores

Tier 3: Impact Metrics (Track Monthly)
These demonstrate business value:
- Time saved per user
- Document creation efficiency
- Meeting productivity improvements
- User satisfaction scores
- Cost per productive user

Deep Dive: Essential Metrics Explained

1. Daily Active Users (DAU)
What it measures: Number of users engaging with Copilot each day
Why it matters: Indicates daily engagement and habit formation
Target: 60%+ of enabled users within 90 days
Red flag: DAU declining week-over-week

2. Acceptance Rate
What it measures: Percentage of Copilot suggestions accepted by users
Why it matters: Indicates relevance and quality of Copilot outputs
Target: 45-65% (varies by application)
Red flag: Rates below 30% suggest poor prompt quality or misaligned use cases

3. Feature Breadth
What it measures: Number of different Copilot features a user engages with
Why it matters: Shows depth of adoption beyond basic features
Target: 3+ features per user
Red flag: Users stuck on single feature may need training

4. Time to First Value
What it measures: Days from license assignment to first meaningful use
Why it matters: Faster activation indicates effective onboarding
Target: <7 days
Red flag: 30+ days suggests onboarding issues

5. Power User Ratio
What it measures: Percentage of users meeting "super user" criteria
Why it matters: Power users drive ROI and advocate for adoption
Target: 20-30% of user base
Red flag: <10% after 90 days indicates training gaps

Application-Specific Metrics

Microsoft Teams
- Messages drafted with Copilot
- Meeting summaries generated
- Action items extracted
- Recap views and engagement

Outlook
- Emails drafted/refined with Copilot
- Email summaries created
- Scheduling optimizations
- Follow-up suggestions accepted

Word
- Documents created with Copilot
- Content generation requests
- Editing and rewriting usage
- Formatting improvements

Excel
- Formulas generated
- Data analysis requests
- Chart and visualization creation
- Insight discoveries

PowerPoint
- Presentations created from prompts
- Slide generation requests
- Design improvements applied
- Content summarization

Setting Up Your Measurement System

Step 1: Establish Baselines
Before measuring Copilot impact, document:
- Current productivity metrics
- Average task completion times
- User satisfaction scores
- Document quality benchmarks

Step 2: Define Success Criteria
Set clear targets for:
- Adoption rates at 30/60/90 days
- Engagement thresholds
- ROI milestones
- User satisfaction goals

Step 3: Create Dashboards
Build views for different audiences:
- Executive: High-level KPIs and ROI
- IT/Admin: Technical metrics and issues
- Managers: Team adoption and engagement
- Champions: Usage patterns and opportunities

Step 4: Schedule Reviews
Establish regular cadence:
- Daily: Monitor active users and critical issues
- Weekly: Review engagement trends
- Monthly: Analyze impact metrics and ROI
- Quarterly: Strategic review and goal adjustment

Interpreting Your Data

Good Adoption Pattern:
- Steady DAU growth week-over-week
- Increasing acceptance rates over time
- Growing feature breadth per user
- Rising power user percentage

Warning Signs:
- Declining DAU after initial spike
- Low or decreasing acceptance rates
- Single-feature dependency
- High variance across departments

Leading vs. Lagging Indicators

Leading Indicators (Predict future success):
- Training completion rates
- Champion engagement levels
- Prompt quality scores
- Feature exploration rate

Lagging Indicators (Confirm past success):
- Time savings achieved
- User satisfaction scores
- Cost per productive user
- Business outcome improvements

Benchmarking Your Performance

Early Stage (0-90 days):
- DAU: 40-60% of enabled users
- Acceptance Rate: 35-50%
- Features per user: 2-3

Mature Stage (90+ days):
- DAU: 60-80% of enabled users
- Acceptance Rate: 50-70%
- Features per user: 4+
- Power users: 25-35%

Action-Oriented Reporting

Transform metrics into action:

Instead of: "Acceptance rate is 32%"
Report: "Acceptance rate is 32%, below our 45% target. We're implementing targeted prompt training for the 3 lowest-performing teams and expect to reach 40% within 30 days."

Creating Your Analytics Playbook

Your playbook should include:

1. Metric Definitions: Clear explanation of what each metric measures
2. Data Sources: Where to find the data
3. Collection Frequency: How often to update
4. Visualization Standards: Consistent chart types and formats
5. Threshold Values: What's good, concerning, or critical
6. Action Triggers: What to do when metrics hit certain levels
7. Stakeholder Reports: Who needs what data and when

Conclusion

The right metrics transform Copilot from an expense into a strategic investment. By tracking the metrics that matter, interpreting them correctly, and taking action based on insights, you'll drive adoption, demonstrate value, and continuously improve your Copilot program.

Start with foundation metrics, expand to engagement tracking, and ultimately measure business impact. Your analytics playbook will become the roadmap to Copilot success.`
  }
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
    title: "Portable Audit Exporter",
    description: "A powerful tool to export audit log files which you can use to run enterprise wide analytics.",
    tags: ["Powershell"],
    githubUrl: "https://github.com/microsoft/PAX",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop"
  },
  {
    title: "AI in One",
    description: "Simplified single report that brings M365 Copilot, Free Chat and Agent usage in a single view.",
    tags: ["Power BI", "Copilot Analytics", "Microsoft Purview"],
    githubUrl: "https://github.com/microsoft/AI-in-One-Dashboard",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop"
  },
  {
    title: "Causal Inference",
    description: "Move beyond correlation to causation. What impact is high usage of Copilot having?",
    tags: ["Python", "Copilot Analytics"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&brightness=0.9"
  },
  {
    title: "M365 to Copilot Bridge",
    description: "Analyze M365 app usage to inform likelihood of Copilot Adoption",
    tags: ["Power BI", "Microsoft Graph"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&brightness=1.1"
  }
]

function App() {
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
          </TabsContent>

          <TabsContent value="projects" className="mt-0">
            <div className="mb-16 md:mb-20">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-foreground">
                Who we are
              </h1>
              <p className="text-base md:text-lg text-foreground/80 max-w-4xl leading-relaxed">
                We champion your Copilot success by turning telemetry and organizational context into clear decisions: what's working, where to deploy, how to drive adoption, and how to measure impact.
              </p>
            </div>

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