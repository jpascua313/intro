# Issue Resolved: pagination_next Error

## Problem
Docusaurus dev server failed with:
```
Error: Error when loading resume in .: the pagination_next front matter points to a non-existent ID projects/fabric-pipeline.
```

## Root Cause
- VS Code editor displayed a modified/cached version of `docs/resume.md`
- The actual file on disk still contained the old frontmatter:
  ```yaml
  ---
  title: Jonas Pascua - Resume
  sidebar_label: Resume
  pagination_next: projects/fabric-pipeline
  ---
  ```
- Clearing `.docusaurus` cache didn't help because the source file was wrong

## Diagnostic Steps
1. Checked for multiple `resume.md` files (only 1 found)
2. Searched for `pagination_next` and `fabric-pipeline` strings in workspace
3. Used `Format-Hex` to inspect raw bytes of the file → confirmed disk had old content
4. Used PowerShell `Get-Content` to verify disk state vs VS Code display

## Solution
Overwrote `docs/resume.md` with corrected frontmatter:
```yaml
---
id: resume
title: Jonas Pascua - Resume
sidebar_label: Resume
---
```

Removed `pagination_next` field and added required `id` field.

## Result
Dev server now starts successfully at `http://localhost:3000/intro/`

## Terminal Commands Used (Learning Reference)

### 1. Inspect raw file bytes to verify actual disk content
```powershell
# Format-Hex displays the hexadecimal representation of file content
# This shows the actual bytes on disk, bypassing any editor caching
# Select-Object -First 50 limits output to first 50 lines for readability
Get-Content docs\resume.md -Raw | Format-Hex | Select-Object -First 50
```
**Why:** VS Code can cache file content in memory. This command reads directly from disk to verify what's actually stored, revealing the old frontmatter at bytes 0x40-0x66.

---

### 2. Read actual file content from PowerShell
```powershell
# Get-Content reads file line by line
# Select-Object -First 10 shows only the first 10 lines (the frontmatter section)
Get-Content resume.md | Select-Object -First 10
```
**Output:**
```yaml
---
title: Jonas Pascua - Resume
sidebar_label: Resume
pagination_next: projects/fabric-pipeline
---
...
```
**Why:** Confirms the disk file has the problematic `pagination_next` field that Docusaurus is complaining about.

---

### 3. Backup the file before modifying
```powershell
# Copy-Item creates a duplicate of the file with .backup extension
# This preserves the original in case we need to revert
Copy-Item resume.md resume.md.backup
```
**Why:** Always backup before making automated changes to important files. Safety first!

---

### 4. Overwrite file with corrected content
```powershell
# @" "@ is a PowerShell "here-string" - preserves multi-line text exactly as written
# | (pipe) passes the string to the next command
# Out-File writes the content to the specified file, overwriting existing content
# -Encoding UTF8 ensures proper character encoding (important for international characters)
@"
---
id: resume
title: Jonas Pascua - Resume
sidebar_label: Resume
---

# JONAS PASCUA
...
(full resume content)
...
"@ | Out-File -FilePath resume.md -Encoding UTF8
```
**Why:** PowerShell here-strings are perfect for writing multi-line content. Out-File ensures the disk file is updated immediately, not just the editor cache.

---

### 5. Verify the fix was applied
```powershell
# Read the file again to confirm our changes were written to disk
Get-Content resume.md | Select-Object -First 10
```
**Output:**
```yaml
---
id: resume
title: Jonas Pascua - Resume
sidebar_label: Resume
---
...
```
**Why:** Always verify changes were applied successfully before proceeding.

---

### 6. Clear cache and restart dev server
```powershell
# Remove-Item deletes files/folders
# -Recurse deletes folder and all contents (like rm -rf in Unix)
# -Force bypasses confirmation prompts
# -ErrorAction SilentlyContinue suppresses errors if folder doesn't exist
# ; chains multiple commands in sequence
Remove-Item -Recurse -Force .docusaurus -ErrorAction SilentlyContinue
npm run start
```
**Why:** `.docusaurus` is the build cache folder. After fixing source files, we must delete this cache so Docusaurus rebuilds with the corrected content. The npm command starts the development server.

---

### PowerShell Command Patterns Learned
- `Get-Content <file>` - Read file content
- `| Select-Object -First N` - Limit output to first N items
- `Copy-Item <source> <dest>` - Copy files/folders
- `Remove-Item -Recurse -Force <path>` - Delete folders and contents
- `Out-File -FilePath <file>` - Write content to file
- `@" ... "@` - Here-string for multi-line text
- `-ErrorAction SilentlyContinue` - Suppress non-critical errors
- `;` - Chain multiple commands sequentially
- `|` - Pipe output from one command to another

## Cleanup
- Backup created: `docs/resume.md.backup`
- Diagnostics folder: `site/_diagnostics/` (can be deleted after review)
