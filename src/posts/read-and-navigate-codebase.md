---
title: (Draft) How I learned to read and navigate larger codebase
description: Writing code was all I knew until I worked with others
date: '2025-07-23'
categories:
  - learning
  - reading-code
published: true
---

When I first started coding, I thought writing code was the hard part. Turns out, reading code,especially someone else’s, can be even harder.

According to [The Programmer’s Brain](https://www.felienne.com/book) (by Felienne Hermans), what makes reading code difficult isn’t just lack of experience. It’s a mix of:

- Lack of knowledge (e.g., you don’t know syntax)

- Lack of information (e.g., unclear what the function does, missing context)

- And limited processing power (your brain can only hold so much at once)

I’d open a large codebase and feel completely lost. Where do I start? Which component is responsible for the UI I see? It wasn’t until my internship that I learned how to navigate large codebases with more confidence. Here are some tools and habits that helped:

## Strategies That Changed Everything
- VS Code shortcuts: Cmd/Ctrl + Click to jump to variable or function declarations, Cmd/Ctrl + P to search for files.

- Search strategically: Look for component names, CSS classes, or keywords related to what I'm debugging or building.

- DevTools for clues: Use browser DevTools to inspect elements and trace them back to their component files.


- Read documentation and guidelines: Helps understand naming conventions, design patterns, and the logic behind file organisation.

- Explore folder structure: Understanding how the project is organised helps predict where things live.

## Making Code Easier to Read
The more I struggled with reading code, the more I appreciated readable code. What helps?

- Consistent coding style

- Clear, intentional folder structures

- Helpful comments

- Naming that reflects intention

Now when I read code, I don’t expect to understand everything at once. I follow breadcrumbs. I ask: What is this doing? Where is it used? Can I trace it backwards or forwards? And slowly, the big picture emerges.

If you’re learning to read larger codebases—keep going. It is a skill, and you’ll get faster with time.