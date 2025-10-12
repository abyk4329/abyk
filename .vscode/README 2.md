# VS Code Configuration for ABYK Project

This directory contains workspace-specific settings for Visual Studio Code.

## Files

### `extensions.json`
Recommended extensions for this project:
- **GitHub Copilot** - AI-powered code completions
- **GitHub Copilot Chat** - AI-powered chat assistant
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Tailwind class completions
- **Auto Rename Tag** - Automatically rename paired HTML/JSX tags
- **TypeScript** - Enhanced TypeScript support
- **Error Lens** - Inline error messages

### `settings.json`
Workspace settings configured for optimal development experience:

#### GitHub Copilot
- ✅ Enabled for all file types (except plaintext)
- ✅ Auto-completions enabled
- ✅ Code actions enabled

#### TypeScript & JavaScript
- ✅ Uses workspace TypeScript version
- ✅ Auto-imports enabled
- ✅ Updates imports when files move
- ✅ Uses double quotes (consistent with project)

#### Formatting & Linting
- ✅ Format on save with Prettier
- ✅ Auto-fix ESLint issues on save
- ✅ Consistent 2-space indentation

#### Next.js & Tailwind
- ✅ Tailwind IntelliSense for TypeScript/TSX
- ✅ Optimized file watchers for Next.js builds
- ✅ Proper CSS file associations

#### Hebrew & RTL Support
- ✅ Disabled ambiguous character warnings (for Hebrew text)
- ✅ Proper Unicode handling

## Installation

1. **Install VS Code** (if not already installed): https://code.visualstudio.com/

2. **Install recommended extensions**:
   - Open the Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
   - Type "Extensions: Show Recommended Extensions"
   - Click the cloud icon to install all recommended extensions

3. **Install GitHub Copilot**:
   - Requires a GitHub Copilot subscription
   - Install the "GitHub Copilot" and "GitHub Copilot Chat" extensions
   - Sign in with your GitHub account when prompted

4. **Verify Copilot is working**:
   - Open any TypeScript/JavaScript file
   - Start typing - you should see gray ghost text suggestions
   - Press Tab to accept suggestions
   - Use Ctrl+Enter (Cmd+Enter on Mac) to see all suggestions

## Troubleshooting

### Copilot Not Working?

1. **Check Extension Status**:
   - Look for the Copilot icon in the bottom-right status bar
   - Click it to see if you're signed in
   - If you see an error, try signing out and back in

2. **Verify Subscription**:
   - Visit https://github.com/settings/copilot
   - Ensure you have an active subscription

3. **Reload VS Code**:
   - Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
   - Type "Developer: Reload Window"

4. **Check Settings**:
   - Ensure workspace settings are being applied
   - Check that no user settings override workspace settings

### TypeScript IntelliSense Issues?

1. **Select Workspace TypeScript**:
   - Open any .ts or .tsx file
   - Click on "TypeScript" in the bottom-right status bar
   - Select "Use Workspace Version"

2. **Restart TS Server**:
   - Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
   - Type "TypeScript: Restart TS Server"

### ESLint Not Working?

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Restart ESLint Server**:
   - Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
   - Type "ESLint: Restart ESLint Server"

## Notes

- This project uses **pnpm** as the package manager
- Node.js version **22** is required
- The workspace is configured for **Next.js 15** with **React 19**
- Hebrew (RTL) text is properly supported in the editor
