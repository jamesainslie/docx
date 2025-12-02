# Publishing Specification: @jamesainslie/docx

This document provides the specification for publishing the forked `docx` library with SVG support to npm.

## Overview

The fork (`jamesainslie/docx`) extends the upstream `dolanmiu/docx` library with first-class SVG image support. To make it consumable without requiring consumers to build from source, it should be published to npm under a scoped package name.

## Package Identity

| Field | Value |
|-------|-------|
| **Package name** | `@jamesainslie/docx` |
| **Registry** | npm public registry |
| **Source repo** | `github.com/jamesainslie/docx` |
| **Branch** | `feature/svg-image-support` |

## package.json Changes

Update the `package.json` in the fork to reflect the new package identity:

```json
{
  "name": "@jamesainslie/docx",
  "version": "9.5.1-svg.1",
  "description": "Fork of docx with SVG image support. Easily generate .docx files with JS/TS with a nice declarative API.",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/jamesainslie/docx.git"
  },
  "keywords": [
    "docx",
    "word",
    "document",
    "svg",
    "office",
    "openxml"
  ],
  "author": "James Ainslie",
  "license": "MIT"
}
```

### Versioning Strategy

Use a versioning scheme that:
- Tracks the upstream version it's based on (e.g. `9.5.1`)
- Appends a suffix to indicate the fork variant (e.g. `-svg.1`, `-svg.2`)

Examples:
- `9.5.1-svg.1` - First release based on upstream 9.5.1
- `9.5.1-svg.2` - Bug fix release
- `9.6.0-svg.1` - Rebased on upstream 9.6.0

## Build and Publish Workflow

### Prerequisites

1. npm account with publish access
2. npm login configured locally or via CI token
3. Node.js 18+ and npm 9+

### Manual Publish Steps

```bash
# 1. Clone the fork
git clone https://github.com/jamesainslie/docx.git
cd docx
git checkout feature/svg-image-support

# 2. Install dependencies
npm install

# 3. Build the library
npm run build

# 4. Verify the dist folder exists
ls dist/
# Should contain: index.cjs, index.mjs, index.d.ts, index.d.cts, etc.

# 5. Login to npm (if not already)
npm login

# 6. Publish (scoped packages are private by default, use --access public)
npm publish --access public
```

### Automated Publish via GitHub Actions

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  push:
    tags:
      - 'v*-svg.*'

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Publish
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `NPM_TOKEN` | npm automation token with publish permissions |

To create an npm token:
1. Go to npmjs.com > Account Settings > Access Tokens
2. Generate a new "Automation" token
3. Add it as a repository secret in GitHub

## Files to Include in Published Package

The `files` field in `package.json` should already be configured:

```json
{
  "files": [
    "dist"
  ]
}
```

This ensures only the built artifacts are published, not source files or tests.

## Exports Configuration

The existing exports configuration should work correctly:

```json
{
  "main": "dist/index.umd.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.mjs"
      },
      "require": {
        "types": "./dist/index.d.cts",
        "default": "./dist/index.cjs"
      }
    }
  }
}
```

## Consumer Usage

Once published, consumers update their `package.json`:

```json
{
  "dependencies": {
    "@jamesainslie/docx": "^9.5.1-svg.1"
  }
}
```

And update imports:

```typescript
// Before (upstream)
import { Document, Packer, ImageRun } from 'docx';

// After (fork with SVG support)
import { Document, Packer, ImageRun } from '@jamesainslie/docx';
```

### SVG Image Usage

```typescript
import { ImageRun } from '@jamesainslie/docx';

// Embed SVG image using the new mimeType option
const svgImage = new ImageRun({
  data: svgBytes,                    // Uint8Array of SVG XML
  mimeType: 'image/svg+xml',         // Signals SVG format
  transformation: {
    width: 600,
    height: 400,
  },
});
```

## Release Checklist

Before each release:

- [ ] Merge latest changes from upstream if needed
- [ ] Update version in `package.json`
- [ ] Run full test suite: `npm run test:ci`
- [ ] Build: `npm run build`
- [ ] Verify `dist/` contains all expected files
- [ ] Create and push git tag: `git tag v9.5.1-svg.1 && git push --tags`
- [ ] Verify GitHub Actions publishes successfully (if automated)
- [ ] Test installation in a fresh project: `npm install @jamesainslie/docx`

## Keeping in Sync with Upstream

Periodically rebase or merge from upstream to get bug fixes and features:

```bash
# Add upstream remote (one-time)
git remote add upstream https://github.com/dolanmiu/docx.git

# Fetch upstream changes
git fetch upstream

# Rebase your branch onto upstream main
git checkout feature/svg-image-support
git rebase upstream/main

# Resolve any conflicts, then force push
git push --force-with-lease origin feature/svg-image-support
```

After rebasing:
1. Update the base version number (e.g. `9.6.0-svg.1`)
2. Run tests
3. Publish new version

## Documentation

Update the fork's README.md to:

1. Clearly state it's a fork with SVG support
2. Link to the upstream repository
3. Document the SVG-specific API additions
4. Provide usage examples
5. Note Word version requirements (2016+/365)

Example README addition:

```markdown
## SVG Image Support

This fork adds native SVG image support to the docx library.

### Usage

```typescript
import { ImageRun } from '@jamesainslie/docx';

const svgImage = new ImageRun({
  data: svgBytes,
  mimeType: 'image/svg+xml',
  transformation: { width: 600, height: 400 },
});
```

### Requirements

- Microsoft Word 2016 or later
- Microsoft 365

Older Word versions may not render SVG images correctly.
```

## Support and Maintenance

- Monitor upstream releases for security fixes
- Respond to issues related to SVG functionality
- Consider contributing SVG support upstream if there's interest

