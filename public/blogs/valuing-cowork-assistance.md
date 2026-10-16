# Valuing Cowork Assistance: Why Measuring AI Value Has to Move From Prompts to Tasks

*By Shailendra Hegde, Keith McGrane | ROI Analysis | ~5 min read*

## TL;DR

**The problem:** Licenses tell you whether AI is turned on, and prompts tell you whether it's used. But when an assistant like Cowork orchestrates an entire task end to end, counting prompts no longer captures the value being delivered.

**The solution:** Organize activity around **intent**. Group work into discrete tasks across eight categories, deconstruct each task into the activities a capable person would perform, and anchor the time saved in published productivity research as a conservative, typical, and optimistic range.

**The impact:** A measurement approach that scores the connected flow of work rather than a string of one-off interactions, capturing what actually separates an agent from a chatbot.

## How We Measure AI Value Has Had to Evolve

We have been on a journey to help users understand the value of AI. First we asked, **did people turn it on?** That's answered by licenses and seats. Then, **are they using it?** That's informed by prompts, frequency, and active days. These two are necessary but not sufficient conditions to realize value from AI.

While we do this, there is a deeper shift in the interaction pattern itself.

Base or commodity AI assistants today work in a **chat rhythm**. You type a prompt, you get a response, and then you do it again. Even at its best, this is prompt → response → active steering: the assistant handles one turn, and you remain the orchestrator. You decide the next step, re-prompt, copy results between tools, and stitch the pieces into a finished product. The AI is a capable helper on each turn, but the end-to-end work still runs through you. In that world, counting prompts is an important proxy, because each prompt really is one discrete assist attempt.

Cowork breaks that rhythm. You set the **intent** — the goal for the whole task — and Cowork orchestrates the steps end to end: planning the work, gathering the inputs, running the tools, and producing the deliverables, largely on its own. You steer at the level of the goal, not intermediate steps. **The unit of work is no longer a single turn — it's an entire task.**

That is why the measurement had to change. You can't capture end-to-end orchestration by counting prompts. Doing it fairly means moving from counting interactions to understanding the work itself — and here's our first attempt to refine our thinking along this continuum.

## Start With Intent

The methodology begins with a simple reframe: organize activity around what the user was trying to accomplish, not the individual prompts or clicks it took to get there. Work is grouped into discrete tasks, each defined by its goal — build a customer proposal, analyze last quarter's numbers, prep for a meeting.

Every task is sorted into one of eight categories, so different kinds of work can be compared:

1. **Analysis & Research**
2. **Document & Content Creation**
3. **Email Workflows**
4. **Meeting Workflows**
5. **Communication Workflows**
6. **Specialized Workflows**
7. **Write or Debug Code**
8. **General Assistance**

This is the unit that means something to the business, because it maps to real outcomes rather than tool telemetry.

## Deconstruct Each Task Into Its Typical Activities

Once a task is identified, it's broken down into the typical activities it normally requires — the steps a capable person would actually perform to finish it.

Take document and content creation. On the surface it's "write something." Underneath, a typical task looks more like:

- **Initial draft**: Gather relevant material, set up the context, build the body, tables, and visuals
- **Polish and edit**: Rewrite specific parts and refine the content
- **Format**: Apply structure, styling, tables/visuals, and consistency
- **Revise and finalize**: Turn it into a deliverable that's ready to send

Deconstructing the task this way presents a concrete, inspectable picture of the work involved — and it's the same lens whether the task is a proposal, a memo, or a briefing.

## Pre-AI vs. Post-AI

In an unassisted world, a person carried each of those steps — switching apps, hunting for inputs, drafting, reformatting. With Cowork, the human sets the intent, and the assistant orchestrates the steps hands-free.

To value that fairly, each category's time is anchored in published productivity research (studies from Stanford, Microsoft Research, NBER, and Forrester) and expressed as a range: **conservative, typical, and optimistic** minutes saved per task. Deconstructing a task into its steps is what lets the model explain *why* a particular number was chosen. Two examples:

### Example 1 — Content Creation

A typical document task is credited with roughly **24 minutes saved** (range 12–42). Why 24 and not 5? Because the model reflects what an unassisted professional actually does end to end: read the necessary source documents, then structure, pen the initial draft, review, and polish. Each of those steps has measured and published anchors for assistance — see this example [study](https://microsoft.github.io/nfw-reader/posts/causal-impact-copilot). Cowork runs most of those steps on its own, so the credited time reflects the sum of assistance across all of those activities — what a real authoring effort would entail.

### Example 2 — Analysis & Research

This is the heaviest category — about **67 minutes of expert time saved per task**, ranging from 30 up to 92. It's so high because "research" isn't a single skill. It's a complex interplay of distinct cognitive skills, and each one is expensive on its own.

The band is anchored in the Stanford–World Bank study (Hartley et al., 2025), which timed U.S. professionals performing 18 kinds of work with and without AI. Several of those are exactly the skills a real research task strings together:

- **Active learning**: Reading and absorbing new source material
- **Critical thinking**: Weighing evidence and catching what doesn't hold up
- **Complex problem solving**: Reasoning to a defensible conclusion
- **Judgment and decision-making**: Landing on a recommendation

The typical 67-minute figure is a blend of these research-adjacent skills — which is why a single research task is valued far above a quick email or a routine doc.

## Where Hands-Free Orchestration Compounds

This is exactly where the agentic model pulls away. Cowork doesn't perform one of these steps and stop — it chains them into one connected flow, carrying context forward from each step to the next without the person re-briefing it at each handoff.

Because the methodology scores that connected flow and interplay rather than a string of one-off interactions, it captures what actually separates an agent from a chatbot: **not a better answer to a single prompt, but an entire task carried end to end.**

## Bottom Line: Measure the Work, Not the Prompts

We are at the beginning stages of understanding how to value AI assistance. As assistants move from answering turns to orchestrating tasks, our measurement has to move with them — from counting interactions to understanding the work itself. We will continue to iterate and improve our measurement approaches to reflect what AI is making possible.

Read the full methodology here: [Cowork_Methodology.pdf](https://microsoft.github.io/CopilotAnalyticsLabs/Cowork_Methodology.pdf)
