# I Tracked Every Instruction I Gave to AI Coding Agents for 30 Days. Here's What I Found.

*By Shailendra Hegde | ROI Analysis | ~8 min read*

## TL;DR

**The question:** Where did the tokens go? After a month of constant AI-assisted building, I had output but no framework to quantify what I was actually getting.

**The method:** A deterministic formula anchored to four signals per session — conversation depth, logic lines of code, file reads/searches, and total tool invocations — validated against peer-reviewed productivity research (Cambon et al., Peng et al., Forsgren et al.).

**The result:** 20 hours of directed effort produced 105.5 hours of human effort equivalent — a 5.4× multiplier — across twelve professional roles, at a fraction of what a single hire would cost. Both GitHub Copilot and Claude delivered identical leverage ratios. The starkest difference between the two tools wasn't productivity — it was cognitive overhead.

---

There's a question I couldn't shake for weeks: where did the tokens go?

I was on my machine constantly — evenings, weekends, sometimes late nights — and I could feel the output accumulating. Files being written. Reports getting built. Ideas turning into working software. But I had no framework to answer the most basic question: what was I actually getting for this time? Was the leverage real, or was I just busy in a new way?

Intuitively, I knew I was doing work I'd never been able to do before. But intuition isn't a number. So I built one.

## Building a Measurement Framework

To understand leverage, I needed a baseline. What would it have taken a skilled human — someone at the peak of their domain — to do the same work without AI assistance?

I went to the research. There's a growing body of peer-reviewed work on LLM-assisted productivity: Cambon et al. (2023), Peng et al. (2023), Ziegler et al. (2024), Forsgren et al.'s SPACE framework. The consistent finding across these studies is that AI-assisted work completes **1.4–4× faster** than unassisted work.

I built a deterministic formula anchored to four signals per session:

- **Conversation depth** — substantive instruction turns
- **Logic lines of code** — Python, TypeScript, SQL, but not HTML or JSON, which correlate negatively with effort
- **File reads and searches** — captures investigation work that has real cost even when nothing gets written
- **Total tool invocations** — captures non-coding tasks like analysis and presentations where code output is near zero

These four signals produce a floor estimate. An AI then reads the full session transcript and applies semantic judgment, distinguishing a 200-line HTML scaffold from a 50-line algorithm that required real architectural thinking. I wasn't going for perfection — I was going for something more defensible than intuition. The [full methodology is documented here](https://github.com/microsoft/What-I-Did-Copilot/blob/main/docs/effort-estimation-methodology.md).

The result is a **human effort equivalent**: the hours a skilled professional would need to produce the same output, unassisted.

## Thirty Days of Data

Over March 10 to April 8, I harvested session data from GitHub Copilot and Claude Code across every project I worked on. The active engagement — time I was genuinely directing AI, not idle — came to just under 20 hours: about 7.5 hours in GitHub Copilot across 26 sessions, and 12.25 hours in Claude across 52 sessions.

**What those 20 hours produced: 105.5 hours of human effort equivalent.**

That's a **5.4× speed multiplier**. Both tools delivered essentially identical leverage — Copilot at 5.5×, Claude at 5.4× — which was itself a finding. The tools feel different to use; they perform the same in output.

At a conservative professional services rate of $72/hour, the work carried a **market value of approximately $7,600**. The combined tool cost for the month — seats and API usage — was a small fraction of that. The return on actual spend was well over 10×, and closer to 15× when you factor in API usage rather than seat cost alone.

## The Work I Couldn't Do Before

The most meaningful part of this isn't the speed. It's the scope.

Before AI coding tools, shipping anything — an analytics tool, a reporting dashboard, an internal prototype — meant navigating a sequence that looked roughly like this: research the space, interview users, get in the queue for a designer to create Figma mocks, then get in the queue for engineering help to build a prototype. Fight for resource allocation in a planning cycle. Wait. Chase dependencies. Watch the context decay between handoffs while the people involved worked on six other things.

Each iteration required re-engaging a human who had limited tolerance for revision cycles and competing priorities. The gap between having an idea and having a working thing was measured in weeks, not hours — and the idea had to survive long enough to justify all of that overhead before you'd find out if it was even right.

What I shipped in this 30-day period: a fully instrumented analytics tool with HTML reporting, a reproducible Power BI reporting pipeline, effort measurement methodology grounded in academic research — none of these would have existed this month. Some would have taken quarters under the old model. A few would simply never have been approved for the investment.

The AI didn't just make me faster at the same work. It removed the dependencies entirely. No queue. No negotiation. No context loss between handoffs. The iteration cost dropped to near zero, which means the idea doesn't have to be perfect before you test it. You can find out quickly if it's wrong and adjust before anyone else is affected.

When I looked at the professional roles the AI effectively substituted across those 30 days, I counted twelve: Software Engineer, Data Analyst, Product Manager, DevOps Engineer, UX Designer and more. Not as metaphors — as billing-equivalent functions that showed up in the output. That's not a team I could have assembled on demand.

![Professional roles substituted across 30 days of AI-assisted work](/tokens-professional-roles.png)

## The New Skills Required

Here's where the narrative gets more honest.

When I classified every instruction I sent to a coding agent over 30 days, only about **45% was Building** — implementing features, writing code, scaffolding systems. The rest:

- **Refining** (polishing, adjusting, iterating on output): 20–21%
- **Researching** (comparing options, investigating failures): 11%
- **Delegating** (git operations, documentation, configuration): 9%
- **Course-correcting** (fixing wrong assumptions, redirecting after errors): 7–9%
- **Designing** (architecture decisions, direction-setting): 5–6%

That 9% course-correction rate on Claude and 7% on Copilot deserves attention. Errors are not edge cases in agentic coding — they are a structural part of the workflow. And when you add the 21% spent refining output, it becomes clear: **exercising quality judgment and taste is not optional overhead. It is the work.**

The AI generates; you curate, redirect, and decide what's good enough to keep. The humans who get the most from these tools are not the ones who write the best prompts — they're the ones who can recognize good output from mediocre output quickly and specify the gap precisely.

![Classification of instructions across 30 days — Building, Refining, Researching, Delegating, Course-correcting, Designing](/tokens-instruction-classification.png)

## The Part I Didn't Expect to Find

Here's the uncomfortable data point.

**27% of my Copilot sessions happened in the evenings and at night.** At the kids' soccer practice. During the swimming lesson. While dinner was on. I wasn't watching — I was providing instructions. I wasn't present — I was in a conversation with a coding agent.

That number matters because it doesn't show up in any productivity metric. The leverage calculation looks great. The output is real. But the 27% is a tax paid in a different currency — attention, presence, the half-watched soccer game. No dashboard captures that, which is exactly why it's worth naming.

I've thought carefully about why it happens, and I think it comes down to a specific feeling: the output always feels *so close*, but not quite there. One more refinement. One more polish. The perfectionist in you keeps reaching, because the distance between where it is and where you want it is always small and always bridgeable. That gap keeps you engaged. There's no natural stopping point because the work is never technically done — it's just a little short of good enough, and good enough keeps moving.

This is a new kind of interference, and it's different from answering late emails or checking Teams/Slack. It's cognitively absorbing in a way that passive consumption isn't. You're not scrolling — you're producing, deciding, steering. The presence cost is real. The family time definitely suffers.

What I'm taking from the data: having measured this, I'll do my best to limit the exposure. The goal is to let the business need drive urgency — not the proximity to completion. **Feeling close to finishing something is not a reason to keep going at 10pm.** The fact that one more instruction would make the chart look better is not a work emergency. The discipline is learning to close the laptop when the task isn't urgent, regardless of how near the finish line feels.

## Two Tools, Two Interaction Models — One Clear Winner on Experience

The starkest number in the 30-day data wasn't the leverage ratio. It was the interaction overhead.

Substantive instructions with descriptive prompts — the ones that actually advance the work — ran at **48 per hour on Copilot, 55 per hour on Claude**. Close. Both tools drive meaningful, focused collaboration at roughly the same rate.

But when you include trivial interactions — confirmations, permission approvals, tool-use gates — the picture diverges sharply. **Copilot's total barely moves: 48 to 49.** Trivials are essentially noise-free. **Claude's total rises to around 70 per hour** — almost 40% more total interactions than its substantive rate alone.

This is the cost of Claude Code's safety model — prompting for confirmation on file reads, bash executions, and tool invocations. Each confirmation costs only a few seconds, but the cumulative effect is a different cognitive contract: you're periodically pulled back into a gatekeeper role rather than staying in the flow of directing work. I'm aware that `--dangerously-skip-permissions` exists. I won't use it. I triggered a security incident with that flag once, and that was enough. It's not a setting I'm willing to normalize.

Copilot simply doesn't impose this. The difference between 49 total interactions per hour on Copilot and ~70 on Claude isn't catastrophic — but it's real enough to shape when and how I reach for each tool.

This explains the time-of-day pattern exactly. Nearly all of my Claude interactions happened during business hours and early afternoons, when I had the focused attention to supervise long autonomous runs. Copilot claimed the evenings — its low-friction model is genuinely compatible with lower attention states and split presence.

![Substantive vs total interactions per hour — Copilot vs Claude](/tokens-interaction-overhead.png)

## What I Learned About My Own Routing Logic

The last thing the data revealed was something I didn't know about myself: I had developed an **implicit routing strategy** between the two tools. I wasn't consciously choosing — but the classification data made the pattern visible.

**Design decisions went to Claude.** When I needed to make architectural choices, UX design choices, define methodology, or settle direction, Claude got the session. Its "Designing" classification ran at 6% vs Copilot's 4%, and the goals confirm it — formula overhauls, multi-signal estimation frameworks, strategic synthesis.

**Research and exploration went to Copilot.** When I didn't yet know what I was building, or needed to compare approaches and investigate the unknown, Copilot's Research rate (14%) was nearly double Claude's (8%). This is counterintuitive given how strong Claude's plan mode is and I will examine this further.

**Complex sustained execution went to Claude.** Large builds, multi-file refactors, anything requiring deep context across many files. The session length and cache usage tells the story: long, context-heavy runs that earned their overhead.

**Delegation went to Copilot.** Git operations, README updates, configuration changes, package installs. Routine tasks that don't warrant a long agentic session and where the approval friction of Claude would cost more than the task is worth.

None of this was a rule I wrote down. It was behavior the data surfaced.

## What This Means

I set out to answer a simple question — where did the tokens go? — and ended up with something more layered.

The **leverage is real**: 105 hours of equivalent output from 20 hours of directed effort, across twelve professional roles, on twenty projects — worth approximately $7,600 at market rate, for a tool spend that's a rounding error by comparison.

The **independence is real**: work that used to require queues, negotiations, handoffs, and months is now a directed session. The dependency on headcount, budget cycles, and other people's tolerance for iteration is largely gone.

And the **cost is real too** — not just API use, but the attention cost, the late nights, the soccer practices watched from the corner of one eye. The output being perpetually close-but-not-finished is not a reason to keep going. The business need is. That's the boundary I'm working on now.

The AI didn't make me more efficient in the way a faster car makes you a better driver. It changed what kind of work was possible, what kind of skills it requires to direct it well, and what kind of discipline it demands to use without letting it consume everything adjacent to it.

That's a more interesting story than 5×. And it's the one the data actually tells.

---

*P.S. If you want to understand your own journey — what you built, how you built it, and what the leverage actually looks like — [What-I-Did-Copilot](https://github.com/microsoft/What-I-Did-Copilot) and [What-I-Did-Claude](https://github.com/shailendrahegde/What-I-Did-Claude) will do that for each tool individually. If you use both and want to compare and contrast how your collaboration with each shapes your output, [What-I-Did-AI](https://github.com/shailendrahegde/What-I-Did-AI) is built for exactly that.*
