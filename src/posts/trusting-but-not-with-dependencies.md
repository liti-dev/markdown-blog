---
title: I'm a trusting person, but not with dependencies
description: Things I've done to prevent dependency confusion attacks
date: '2025-08-05'
categories:
  - security
  - learning
published: true
status: tree
---

Third-party dependencies aren't just helpful, they're the backbone of modern
software development. They let us build faster, standing on the shoulders of
brilliant open-source contributors. But every time we install a package, we also
invite someone else's code into our app, and with it, their bugs, their
decisions, and their security holes.

I didn't think much about this, until recently reading a Linkedin post about
someone tricking interviewees into installing their dodgy repo. Also,
[eslint-config-prettier issue](https://github.com/prettier/eslint-config-prettier/issues/339)
has raised my concern. Lastly, I've released my
[VSCarbon](/vscarbon-grid-aware-vscode-extension) (a VS Code extension, repo is
[here](https://github.com/liti-dev/vscarbon)) and cared more about security.
That's why I stop trusting blindly dependencies.

- Watch for unknown or very new packages with few downloads
- (optional) Test unknown projects in a Docker sandbox

```bash
# start a bash shell inside the container, auto delete after exit
docker run --rm -it node:20 bash
# inside container
npm install
npm audit
```

- Use tools like [npq](https://www.npmjs.com/package/npq) to audit npm packages
  before installing

```bash
npx npq install some-new-lib
```

- Be extra-careful when copy-pasting package installation into the terminal.
  Make sure to verify in the source code repo as well as on the npm registry
  that this is indeed the package you are intending to install. You might verify
  the metadata of the package with `npm info` to fetch more information about
  contributors and latest versions (More details at
  [owasp security cheetsheets](https://cheatsheetseries.owasp.org/cheatsheets/NPM_Security_Cheat_Sheet.html))
- When installing, append the `--ignore-scripts` to reduce the risk of arbitrary
  command execution. For example:

```bash
npm install my-malicious-package --ignore-scripts
```

- When managing packages, running `npm outdated` helps reveal which packages are
  out of date. But rushing to upgrade dependencies to their latest releases is
  not necessarily a good practice. It's best to review release notes, the code
  changes, etc.
- Lock version. `package-lock.json` used to confuse me. Lock files provide a
  record of which versions of dependencies are in use, making it easier to audit
  and roll back, preventing accidental introduction of newer versions that might
  contain vulnerabilities
