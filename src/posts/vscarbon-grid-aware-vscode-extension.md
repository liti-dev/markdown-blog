---
title: 'VSCarbon: A grid-aware VS Code extension'
description: Bringing nature and grid-awareness to VS Code to encourage climate action. This article is also published on Branch magazine's Issue 9.
date: '2025-07-16'
categories:
  - vscode
  - green-software
published: true
---

> "Climate action becomes possible when we make it accessible."— Glyn Baker, CEO at FourTwoThree

With information and communications technology potentially accounting for [14% of the global carbon footprint by 2040](https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099121223165540890/p17859702a98880540a4b70d57876048abb), it's vital that every developer understands the environmental impact of their work and is equipped with ways to reduce it.

Yet at many green software meetups and conferences, seasoned developers and researchers often share technical insights with their audiences. While certainly very valuable, these sessions can be daunting for newcomers – especially junior developers – because they require specialized knowledge, creating an unintended barrier to entry. This presents a problem for the green coding community as we are looking to engage a broader audience.

As a green software advocate, my goal is to make sustainable coding accessible to all. Therefore, this article explores how familiar tools like code editors and GitHub can be used to raise awareness of their carbon impact throughout the coding community – and nudge developers towards more sustainable practices. Using my [VSCarbon extension](https://github.com/liti-dev/vscarbon) (still under development) for VS Code, we will tackle how to make green coding tangible, engaging, and rewarding by addressing three key barriers: awareness, disconnection from nature, and motivation.

## Barrier 1: Lack of awareness

A single GitHub commit can trigger a chain of processes: CI/CD pipelines, storage updates, cloud function calls, and many others that are often a critical part of a software project. Yet these operations run automatically and quietly consume energy behind the scenes without the developer's awareness. To turn this hidden energy into climate action, it's best to run these tasks during low-carbon periods, when the electricity grid is cleaner and more renewable-powered.

But how do we know when energy from the electricity grid is low-carbon (and comes from more renewable sources)? Currently, this information isn't easily surfaced in tools that developers most frequently use when they are about to push a commit.

VSCarbon aims to address this information gap by embedding real-time carbon intensity data into their code editor. This is then reinforced with positive feedback (which will be discussed in depth in "Barrier 3: Lack of motivation") based on their commit activity.

### A real-time carbon intensity widget

To make it effortless for developers to keep track of the grid's carbon intensity based on their location, VSCarbon adds a live badge to VS Code's status bar, showing data fetched from sources like the UK National Grid's [Carbon Intensity API](https://carbonintensity.org.uk/).

<figure>
    <img src="/posts/vscarbon-grid-aware-vscode-extension/vscarbon.jpg"
         alt="status bar displays real-time carbon intensity at 5 gCO2/kWh">
    <figcaption>Figure 1: VS Code’s status bar displays real-time carbon intensity (Source: VSCarbon)</figcaption>
</figure>

Clicking it opens a breakdown of the user’s region’s electricity mix, which highlights the percentage of renewables, fossil fuels, and other sources, offering insights into the grid’s current sustainability profile.

<figure>
    <img src="/posts/vscarbon-grid-aware-vscode-extension/grid mix.jpg"
         alt="pie chart showing electricity sources and their percentage">
    <figcaption>Figure 2: A breakdown of electricity sources (Source: VSCarbon)</figcaption>
</figure>

Having this information visible to developers while they code also fosters a deeper awareness of local energy patterns (e.g. solar surges at midday or windy nights; carbon intensity spikes on rainy days). This is a subtle trigger but over time it can have a real impact on the decision-making of developers. 

I have noticed my own habits slowly shifting while using the extension. I don’t mind waiting a little longer until the carbon intensity is lower to push code. That small pause becomes a conscious choice – one that feels easy and meaningful. 

In future, there will be alerts if carbon intensity exceeds a customizable threshold – via VS Code notifications or git pre-commit hooks – and automatically queue commits until levels drop.

<figure>
    <img src="/posts/vscarbon-grid-aware-vscode-extension/high carbon warning.jpg"
         alt="popup showing warning when carbon intensity is high">
    <figcaption>Figure 3: Future feature: high carbon alerts and commit scheduling (Source: design by Thuyet Nguyen using ChatGPT)</figcaption>
</figure>

Going forward, developers can find a more efficient and creative way that suits their personal workflow. 

## Barrier 2: Disconnection from nature

Another potential reason for developers’ lack of action is a deeper, more psychological one: disconnection from nature. It’s thought that connection with nature is [greatly beneficial to human well-being](https://centerhealthyminds.org/assets/files-publications/Pelin_GrowingDisconnectfromNature.pdf), and it’s associated with environmentally protective attitudes and behaviors. Coding typically happens indoors, in urban spaces, far removed from the ecosystems impacted by our digital activities.
We may all hear about environmental problems, such as the rapid extinction of species and melting polar ice, but these crises often feel distant, outside of our immediate reality. This psychological distance may [dull our sense of urgency or responsibility](https://www.sciencedirect.com/science/article/pii/S0747563220303538). As a result, individuals may not change their behavior even though they have the ability to make a difference.

To gently bridge this gap, VSCarbon integrates nature-inspired elements into the developer environment, in the form of a coding buddy that can be either a woodland animal or a tree.  

### A pixel-art coding companion (inspired by VS Code Pet)

<figure>
    <img src="/posts/vscarbon-grid-aware-vscode-extension/pet.gif"
         alt="animated animals running on snowing background">
    <figcaption>Figure 4: VS Code Pet brought animated animals to VS Code (Source: VS Code Pet)</figcaption>
</figure>

For the MVP version of VSCarbon, a fox icon is added to the status bar (as shown in Figure 1). In the future, it will also be possible to add an animated animal or a tree to VS Code’s sidebar. 

However, unlike VS Code Pet, VSCarbon’s characters will be responding to carbon intensity:

- 💚 Low carbon: the fox naps or the tree blossoms.
- 🔥 High carbon: the fox looks sad or leaves fall.


One reason for this approach is that studies show emotional feedback can prompt behavior change more effectively than raw data. Humans are known to [attribute emotions to non-human entities](https://pmc.ncbi.nlm.nih.gov/articles/PMC5390760/). When this happens, they are more likely to feel something in return: concern, delight, guilt, etc.

When developers code alongside a fox that snoozes during low emissions or becomes upset when carbon spikes, they are not just reacting to carbon data (which may feel a little abstract), they are associating their actions with the wellbeing of a living proxy. Plus, adding a playful and whimsical interface lowers defenses and makes it easier to engage with tough ideas (like emissions or energy waste) in a positive, engaging way.

Every time developers make a green choice, the animal might even gain a treat, or the tree might blossom and grow. Inspired by habit-tracking and focus apps, it provides dopamine feedback for eco-positive behaviors. 

<figure>
    <img src="/posts/vscarbon-grid-aware-vscode-extension/growth.jpg"
         alt="blossoming trees or fed animals">
    <figcaption>Figure 5: Blossoming trees or fed animals (cre: design by Thuyet Nguyen using Canva)</figcaption>
</figure>

## Barrier 3: Lack of motivation

Even when developers are aware and empathetic, they can struggle to change their habits without reinforcement. Sustainability can feel unrewarding sometimes. That is why I recommend the use of positive feedback, gamification and real-world impact to tap into intrinsic motivation and foster cultural change in tech.

Note: the following features are all exploratory and may be implemented in future.

### Subtle, relatable messages
One challenge with sustainability metrics is that they may feel abstract. VSCarbon explores ways of making impact tangible through relatable analogies, helping to form eco-conscious habits without overwhelming the user. 

- “This week’s low-carbon coding sessions = one hour of LED light”
- ”Your weekly commits saved enough energy to brew a coffee ☕”

These messages are not designed as accurate measurements, but as illustrative nudges. They may be drawn from existing sources like carbon calculators, energy agencies, to estimate impact based on average emission per kWh. For maximum impact, analogies can be adjusted to suit the local culture (e.g. tea kettles in the UK, or coffee cups in Vietnam).

### GitHub eco-badges
For many developers, especially those early in their career, GitHub profile serves as a living resume to showcase their technical skills and community contributions. By integrating sustainability achievements into the profile, there is an opportunity to spark friendly competition and peer recognition, motivating developers to code with the climate in mind. 

To recognize and celebrate sustainable habits, we can offer fun, public-facing eco badges. For example:

- **Night Owl**: For late-night commits during low-carbon hours.
- **Solar Champion**: For coding during solar-rich daytime windows.

While a real partnership with GitHub may be tricky, there are other ways to add badges to a GitHub page: for example by providing a markdown snippet of badge images to paste into the profile readme or using Shields.io to host these badges.

<figure>
    <img src="/posts/vscarbon-grid-aware-vscode-extension/profile.jpg"
         alt="a GitHub profile page with eco badges in achievements section">
    <figcaption>Figure 6: An example of a GitHub profile page with eco badges in achievements section (Source: design by Thuyet Nguyen using Canva)</figcaption>
</figure>

### Real-world impact
Tangible impact trumps abstract data. That is why I envision a system where low-carbon commits can be converted into real trees. For example:

50 low-carbon commits = 1 real tree planted through verified partnerships (e.g. with TheTreeApp).

To amplify the impact, organisations can integrate this model into their developer culture and sustainability practices: 
Track green commits -> fund the planting of a tree -> share progress to encourage friendly competition among teams.

What if after every sprint cycle, we plant a small forest? What if your Git history told a story of climate action?

## Challenges and paradoxes
During the journey of building VSCarbon and exploring its ideas, I have encountered various challenges of building a sustainable tool in an imperfect ecosystem. While the intention – making green coding more accessible – is clear, the path is layered with complexity. Here are some of the challenges:

### Technical constraints

- **Geolocation limitations**: Free tiers for most energy data APIs allow access to only one region. As a result, the VSCarbon extension currently focuses on UK postcodes. IP-based location detection isn’t always accurate, especially in corporate VPN environments. VSCarbon therefore still requires inputting the postcode manually.

- **Data fetch overhead**: Even sustainability tools use energy. Fetching and processing data for the VSCarbon extension is no different. I have to consider how often the extension should fetch data. But I believe if it helps avoid unnecessary commits and raise more awareness, it pays for itself in efficiency gains.

- **Keeping it lightweight**: VSCarbon needs to remain lightweight, not just in terms of energy use, but also memory and performance. Should the pixel-art buddy be static SVGs or CSS? Should the extension remain fully local or introduce a backend for team analytics? 

### The productivity paradox
One developer told me, “Waiting to commit is easy for me, but my manager wants it done now.”

Sure enough, some teams can’t delay critical work. I encourage applying low-carbon scheduling to non-urgent, less time sensitive tasks – documentation, testing, or building internal tools – so business objectives and green practices can coexist.

## Making carbon-conscious coding the default
>“The ability to experiment is a critical part of innovation and creating business value.” — Accelerate: The Science of Lean Software and DevOps

Sustainability in tech isn’t a checkbox, it is a journey. Instead of triggering anxiety when talking about the climate, VSCarbon’s mission is to make carbon visible, relatable, and actionable – so developers can experiment, learn, and gradually align their workflows with environmental goals. Even unsuccessful experiments provide valuable insights. 

So, if you are curious about what climate-conscious coding might look like in practice, or thinking about the first step to take, start with your own editor by trying VSCarbon or other eco-extensions, and push commits when the grid is cleaner. 

Together we can bridge the gap between code and nature, one thoughtful commit at a time.
