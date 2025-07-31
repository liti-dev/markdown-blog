---
title: (Draft) How I learned to read and navigate larger codebase
description: Writing code was all I knew until I worked with others
date: '2025-07-23'
categories:
  - learning
  - reading-code
published: true
---

When I first started coding, I thought writing code was the hard part. Turns out, reading code, especially someone else’s, can be even harder.

According to [The Programmer’s Brain](https://www.felienne.com/book) (by Felienne Hermans), what makes reading code difficult isn’t just a lack of experience. It’s a mix of:

- Lack of knowledge (e.g., you don’t know syntax)

- Lack of information (e.g., unclear what the function does, missing context)

- And limited processing power (your brain can only hold so much at once)

Looking at open-source projects, I felt completely lost. Where do I start? Which component is responsible for the UI I see? This is something I wasn't taught when following online bootcamps/courses. It's true that most courses teach writing code rather than reading code.

It wasn’t until my internship that I learned how to navigate large codebases with more confidence (I felt grateful for having an awesome team lead at Hodfords who spent half of his time mentoring me and the other half telling me off. Just kidding. But I'm missing this dynamic LOL). 


## Strategies That Changed Everything
- Read documentation and guidelines (if there's any): I used to jump right into `src` to read code. But I realised the better way is reading these readme or contribution guidelines, as they help understand naming conventions, design patterns, and above all, the logic behind file organisation. 

- Explore folder structure: I would start with understanding how the project is organised to predict where things live.

- Get familiar with VS Code shortcuts: Cmd/Ctrl + Click to jump to variable or function declarations, Cmd/Ctrl + P to search for files.

- Search strategically: I look for component names, CSS classes, or keywords related to what I'm debugging or building.

- Use DevTools for clues: I use browser or framework's DevTools to inspect elements and trace them back to their component files.

- Use GitLens: I love this extension because it shows me commit history, like who contributed to what, in the file I'm looking at. If there's any confusion I can't figure out yet, I'll go ask the person who wrote that code. This is collaboration!

## Making Code Easier to Read
The more I struggle with reading code, the more I appreciate readable code. What helps?

- Consistent coding style (which might be going downhill in this AI gen era)

- Clear, intentional folder structures

- Helpful comments

- Naming that reflects intention

Now when I read code, I don’t expect to understand everything at once. I follow breadcrumbs. I ask: What is this doing? Where is it used? Can I trace it backwards or forwards? And slowly, the big picture emerges.

If you’re learning to read larger codebases, keep going. It is a skill, and you’ll get faster with time.