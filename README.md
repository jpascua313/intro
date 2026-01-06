# Jonas Pascua - Resume Site

Personal resume website built with Docusaurus and deployed to GitHub Pages.

## 📋 Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Git

## 🚀 Local Development Quickstart

### 1. Clone and Navigate
```powershell
git clone https://github.com/jpascua313/intro.git
cd intro/site
```

### 2. Install Dependencies
```powershell
npm install
```

### 3. Start Development Server
```powershell
npm run start
```

The site will open at `http://localhost:3000/intro/`

### 4. Build for Production (Optional)
```powershell
npm run build
```

Production files will be in `site/build/`

### 5. Preview Production Build (Optional)
```powershell
npm run serve
```

## 🔧 Common Issues & Debugging

### Issue: Dev server fails with "pagination_next" error
**Symptom:** Error loading resume with reference to non-existent ID

**Solution:** Clear the Docusaurus cache
```powershell
cd site
Remove-Item -Recurse -Force .docusaurus
npm run start
```

### Issue: Changes not appearing after save
**Symptom:** File saved but dev server shows old content

**Root Cause:** VS Code editor cache vs actual disk file mismatch

**Solution:** 
1. Verify actual file content from terminal:
   ```powershell
   Get-Content docs\resume.md | Select-Object -First 10
   ```
2. Clear Docusaurus cache (see above)
3. If persists, restart VS Code

### Issue: npm commands fail with "package.json not found"
**Symptom:** `ENOENT: no such file or directory, open 'package.json'`

**Solution:** Ensure you're in the `site` directory:
```powershell
cd C:\vsWorkspace\jpascua313\site
```

## 📁 Project Structure

```
jpascua313/
├── site/                          # Docusaurus site root
│   ├── docs/
│   │   └── resume.md             # Main resume page
│   ├── src/
│   │   └── pages/                # Custom React pages
│   ├── static/
│   │   └── img/                  # Static assets (images, GIFs)
│   ├── _archived-tutorials/      # Preserved tutorial content for reference
│   ├── _diagnostics/             # Troubleshooting logs (can be deleted)
│   ├── docusaurus.config.js      # Main configuration
│   ├── sidebars.js               # Sidebar navigation
│   └── package.json              # Dependencies
├── GitSetup_jpascua313.md        # Git auth setup notes
└── README.md                     # This file
```

## 📝 Editing Content

### Update Resume
Edit `site/docs/resume.md` - changes will hot-reload in dev mode.

### Add Images/GIFs
Place files in `site/static/img/` and reference with:
```markdown
![Description](/img/your-image.gif)
```

### Modify Navigation
Edit `site/docusaurus.config.js` navbar and footer sections.

## 🛠️ Git Configuration (Personal Account)

This repo uses local git config to keep personal (jpascua313) and work accounts separate.

**Verify current identity:**
```powershell
git config --show-origin --get user.name
git config --show-origin --get user.email
```

**If needed, set local identity:**
```powershell
git config user.name "jpascua313"
git config user.email "jpascua@gmail.com"
```

See [GitSetup_jpascua313.md](GitSetup_jpascua313.md) for detailed auth troubleshooting.

## 🚢 Next Steps: Deploy to GitHub Pages

1. **Configure deployment settings** in `site/docusaurus.config.js`:
   - `url: 'https://jpascua313.github.io'`
   - `baseUrl: '/intro/'`
   - `organizationName: 'jpascua313'`
   - `projectName: 'intro'`
   - `deploymentBranch: 'gh-pages'`

2. **Build and deploy:**
   ```powershell
   cd site
   GIT_USER=jpascua313 npm run deploy
   ```

3. **Enable GitHub Pages** in repo settings:
   - Source: `gh-pages` branch
   - Path: `/` (root)

4. **Access deployed site:** `https://jpascua313.github.io/intro/`

## 📚 Resources

- [Docusaurus Documentation](https://docusaurus.io/)
- [Tutorial Content](_archived-tutorials/) - Preserved for learning reference
- [Troubleshooting Guide](_diagnostics/ISSUE_RESOLVED.md) - Common errors and solutions

## 📄 License

Personal project - all rights reserved.

