---
title: Build and publish a VS Code extension
description: The development process behind the vscarbon project
date: '2025-07-28'
categories:
  - sustainability
  - vscode
published: true
---

### 1. Why building a VS Code extension
When I have a new idea, my instinct is usually to build a website. It’s the most familiar path to show things, interact with users, share data. But this time was different.

The idea behind [VSCarbon](/vscarbon-grid-aware-vscode-extension) wasn’t about creating another destination for people to visit, it was about meeting developers inside their daily workflow. The VSCarbon code can be found [here](https://github.com/liti-dev/vscarbon).
### 2. Scaffolding the Extension
Make sure you have [Node.js](https://nodejs.org/en) and [Git](https://git-scm.com/) installed.

Start by using Yeoman Generator or `yo code` command to generate a TypeScript extension template. Details can be found in [VS Code docs](https://code.visualstudio.com/api/get-started/your-first-extension).

```bash
npm install -g yo generator-code
yo code
```

Choose “New Extension (TypeScript)”, then provide a name (e.g., vscarbon), identifier, and description. This creates:

* `package.json` with metadata and `contributes` settings (commands, keybindings, etc.)
* `src/extension.ts` where you implement logic
* `README.md` 

Extension File Structure (source: VS Code)
```bash
.
├── .vscode
│   ├── launch.json     // Config for launching and debugging
│   └── tasks.json      // Config for build task that compiles TS
├── .gitignore          
├── README.md           // Description of functionality
├── src
│   └── extension.ts    // Extension source code
├── package.json        // Extension manifest
├── tsconfig.json       // TypeScript config
```

### 3. Developing Features

Inside **extension.ts**, register commands and functionality. For instance:

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const sayHello = vscode.commands.registerCommand('vscarbon.hello', () => {
    vscode.window.showInformationMessage('Hello from vscarbon!');
  });
  context.subscriptions.push(sayHello);
}
```

Modify `package.json` to declare commands under `"contributes"`:

```json
"contributes": {
  "commands": [
    { "command": "vscarbon.hello", "title": "Say Hello" }
  ]
}
```

Note: The `activate` function is the entry point of a VS Code extension. VS Code automatically calls this function when the extension is loaded (usually after a command is triggered, unless marked with "activationEvents": ["*"] in package.json)

### 4. Testing

Press F5 to launch the **Extension Development Host**. Make incremental changes and reload to test behaviour live.

### 5. Advanced Features

Depending on project goals, you could add:

- **Webviews** or **Side panels** for UI-based interactions
- **Tree views** or **Status bar** items
- **Completion, hover, or code lens providers** for language intelligence

<figure>
    <img src="/posts/vscarbon-grid-aware-vscode-extension/grid mix.jpg"
         alt="pie chart showing electricity sources and their percentage">
    <figcaption>Figure 1: Example of webview and status bar items (Source: VSCarbon)</figcaption>
</figure>

VS Code also has a `globalState` where you can write key/value pairs (similar to localStorage in browser). VS Code manages the storage and will restore it for each extension activation.

```ts
async function setPostcode() {
  // ... input validation logic ...
  
  if (postcode) {
    // save postcode (in lowercase) to globalState under key "postcode"
    await extensionContext.globalState.update('postcode', postcode.trim().toLowerCase())
    // show a message (in uppercase for readability)
    vscode.window.showInformationMessage(`Postcode set to: ${postcode.trim().toUpperCase()}`)
    // update carbon data now that a postcode is available
    updateCarbonIntensity()
  }
}
```
 
Read more at [VS Code extension capabilities](https://code.visualstudio.com/api/extension-capabilities/common-capabilities)

### 6. Packaging and Publishing

Once ready, package the extension using the `vsce` CLI tool:

```bash
npm install -g @vscode/vsce
vsce package    # produces vscarbon‑<version>.vsix
vsce publish    # if you have a publisher set up and PAT token configured
```

Set the extension version and engine constraints in your `package.json`. Ensures icons and assets follow marketplace security rules. Details about publishing rules can be found in [VS Code docs](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

For me, I haven't published VSCarbon on marketplace yet. I released it on [GitHub](https://github.com/liti-dev/vscarbon) after packaging it into a .vsix file. Users can download the file then install it, using VS Code extensions tab.





