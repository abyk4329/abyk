const vscode = require('vscode');
const path = require('path');

const OUTPUT_RELATIVE_PATH = 'docs/PROJECT_STRUCTURE_AUTO.md';
const EXCLUDED_DIRECTORIES = new Set([
  '.git',
  '.next',
  '.vercel',
  'node_modules',
  '.vscode',
  'playwright-report',
  'test-results',
  '.joyride/assets',
  '.turbo',
  '.cache',
  '.husky',
]);

const BINARY_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.avif',
  '.gif',
  '.svg',
  '.ico',
  '.woff',
  '.woff2',
  '.ttf',
  '.otf',
  '.pdf',
  '.mp4',
  '.mp3',
]);

const SUMMARY_HINTS = new Map([
  ['app', 'שכבת ה-App Router של Next.js והקומפוננטות הראשיות'],
  ['lib', 'פונקציות דומיין, שירותים ושיתוף לוגיקה'],
  ['docs', 'מסמכי תיעוד ותהליכי עבודה'],
  ['features', 'פיצ׳רים עצמאיים לפי תחום'],
  ['tests', 'בדיקות E2E ובדיקות נוספות'],
  ['public', 'נכסים סטטיים וקטעי מותג'],
  ['prisma', 'סכמת Prisma'],
]);

function toRelativePath(uri) {
  return vscode.workspace.asRelativePath(uri, false).replace(/\\/g, '/');
}

function isExcludedDirectory(segment) {
  if (!segment) return false;
  if (EXCLUDED_DIRECTORIES.has(segment)) return true;
  if (segment.startsWith('.next')) return true;
  return false;
}

function extensionOf(name) {
  const idx = name.lastIndexOf('.');
  return idx === -1 ? '' : name.slice(idx).toLowerCase();
}

function describeFileKind(record) {
  const { extension, name } = record;
  if (record.isBinary) {
    return 'נכס סטטי';
  }
  if (extension === '.tsx') {
    if (/page\.tsx$/i.test(name)) return 'Route Component (TSX)';
    if (/layout\.tsx$/i.test(name)) return 'Route Layout (TSX)';
    return 'קומפוננטת React (TSX)';
  }
  if (extension === '.ts') {
    if (/\.d\.ts$/i.test(name)) return 'Type Declarations';
    return 'מודול TypeScript';
  }
  if (extension === '.js' || extension === '.jsx') {
    return 'מודול JavaScript';
  }
  if (extension === '.css') {
    if (/\.module\.css$/i.test(name)) return 'CSS Module';
    return 'גלובל CSS';
  }
  if (extension === '.md' || extension === '.mdx') {
    return 'תיעוד Markdown';
  }
  if (extension === '.json') {
    return 'JSON משותף/config';
  }
  if (extension === '.env') {
    return 'קובץ סביבת עבודה';
  }
  if (!extension) {
    return 'קובץ';
  }
  return `${extension.toUpperCase()} קובץ`;
}

function describeDirectory(record, records) {
  if (SUMMARY_HINTS.has(record.name)) {
    return SUMMARY_HINTS.get(record.name);
  }
  const children = record.children || [];
  if (children.length === 0) {
    return 'תיקיה ריקה או מחכה לתוכן';
  }
  let files = 0;
  let directories = 0;
  for (const childPath of children) {
    const child = records.get(childPath);
    if (!child) continue;
    if (child.type === 'directory') {
      directories += 1;
    } else if (child.type === 'file') {
      files += 1;
    }
  }
  return `כוללת ${directories} תיקיות-משנה ו-${files} קבצים`;
}

function sanitizeComment(comment) {
  if (!comment) return '';
  return comment
    .split('\n')
    .map((line) => line.trim().replace(/^\*\s?/, ''))
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractLeadingComment(text) {
  if (!text) return '';
  const trimmed = text.trimStart();
  if (trimmed.startsWith('/*')) {
    const endIndex = trimmed.indexOf('*/');
    if (endIndex !== -1) {
      return trimmed.slice(2, endIndex);
    }
  }
  const lines = text.split(/\r?\n/);
  const commentLines = [];
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    if (trimmedLine.startsWith('//')) {
      commentLines.push(trimmedLine.replace(/^\/\//, ''));
      continue;
    }
    break;
  }
  return commentLines.join('\n');
}

function resolveImportPath(raw, importerDir, workspacePath, fileIndex) {
  if (!raw) return null;
  if (raw.startsWith('data:') || raw.startsWith('http')) return null;

  let candidate;
  if (raw.startsWith('@/')) {
    candidate = path.join(workspacePath, raw.slice(2));
  } else if (raw.startsWith('./') || raw.startsWith('../')) {
    candidate = path.resolve(importerDir, raw);
  } else if (raw.startsWith('~')) {
    candidate = path.join(workspacePath, raw.slice(1));
  } else {
    return null; // ignore external packages
  }

  candidate = candidate.replace(/\\/g, '/');
  if (fileIndex.has(candidate)) {
    return fileIndex.get(candidate);
  }

  const withoutExt = candidate.replace(/\.[^./]+$/, '');
  if (fileIndex.has(withoutExt)) {
    return fileIndex.get(withoutExt);
  }

  // Try index resolution
  const asIndex = `${candidate}/index`;
  if (fileIndex.has(asIndex)) {
    return fileIndex.get(asIndex);
  }

  const asDirIndex = `${withoutExt}/index`;
  if (fileIndex.has(asDirIndex)) {
    return fileIndex.get(asDirIndex);
  }

  return null;
}

async function buildFileIndex(records) {
  const index = new Map();
  for (const record of records.values()) {
    if (record.type !== 'file') continue;
    const absoluteWithoutExt = record.absolutePath.replace(/\.[^./]+$/, '');
    index.set(record.absolutePath, record.relativePath);
    index.set(absoluteWithoutExt, record.relativePath);
    if (
      record.name === 'index.ts' ||
      record.name === 'index.tsx' ||
      record.name === 'index.js'
    ) {
      const directoryKey = record.absoluteDirPath.replace(/\\/g, '/');
      index.set(directoryKey, record.relativePath);
    }
  }
  return index;
}

async function analyzeImports(records, fileIndex, workspacePath, usageMap) {
  for (const record of records.values()) {
    if (!record.analyzeImports) continue;
    const document = await vscode.workspace.openTextDocument(record.uri);
    const text = document.getText();
    record.leadingComment = sanitizeComment(extractLeadingComment(text));

    const importerDir = path.dirname(record.absolutePath);

    const importRegex = /import\s+[^'"`]+['"`]([^'"`]+)['"`]/g;
    const dynamicImportRegex = /import\(['"`]([^'"`]+)['"`]\)/g;
    const requireRegex = /require\(['"`]([^'"`]+)['"`]\)/g;

    const matches = [
      ...text.matchAll(importRegex),
      ...text.matchAll(dynamicImportRegex),
      ...text.matchAll(requireRegex),
    ];

    for (const match of matches) {
      const raw = match[1];
      const resolved = resolveImportPath(
        raw,
        importerDir,
        workspacePath,
        fileIndex
      );
      if (!resolved) continue;
      if (!usageMap.has(resolved)) {
        usageMap.set(resolved, new Set());
      }
      usageMap.get(resolved).add(record.relativePath);
    }
  }
}

function buildDirectoryNode(recordMap, relativePath) {
  const record = recordMap.get(relativePath);
  const node = {
    name: record.name,
    relativePath,
    type: record.type,
    summary: record.summary,
    children: [],
  };
  if (record.children) {
    node.children = record.children
      .map((childPath) => buildDirectoryNode(recordMap, childPath))
      .sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name, 'he');
        return a.type === 'directory' ? -1 : 1;
      });
  }
  return node;
}

function renderTree(node, depth = 0, lines = []) {
  const indent = '  '.repeat(depth);
  const label = node.type === 'directory' ? `**${node.name}/**` : node.name;
  const summary = node.summary ? ` — ${node.summary}` : '';
  lines.push(`${indent}- ${label}${summary}`);
  if (node.children) {
    for (const child of node.children) {
      renderTree(child, depth + 1, lines);
    }
  }
  return lines;
}

function createTable(records, usageMap) {
  const header = [
    '| מסלול | סוג | תיאור | קבצים משתמשים |',
    '| --- | --- | --- | --- |',
  ];
  const rows = [];

  const sorted = [...records.values()]
    .filter((record) => record.type === 'file')
    .sort((a, b) => a.relativePath.localeCompare(b.relativePath, 'he'));

  for (const record of sorted) {
    const usedBy = usageMap.get(record.relativePath);
    const usedByText =
      usedBy && usedBy.size
        ? [...usedBy].slice(0, 5).join('<br />') +
          (usedBy.size > 5 ? '<br />…' : '')
        : '—';
    rows.push(
      `| ${record.relativePath} | קובץ | ${
        record.summary || describeFileKind(record)
      } | ${usedByText} |`
    );
  }

  return header.concat(rows);
}

async function walkDirectory(uri, workspaceRoot, records) {
  const relativePath = toRelativePath(uri);
  const name = path.basename(uri.fsPath);
  const record = {
    name,
    relativePath,
    absolutePath: uri.fsPath.replace(/\\/g, '/'),
    absoluteDirPath: uri.fsPath.replace(/\\/g, '/'),
    type: 'directory',
    summary: '',
    children: [],
    uri,
  };
  records.set(relativePath, record);

  const entries = await vscode.workspace.fs.readDirectory(uri);

  for (const [entryName, entryType] of entries) {
    if (isExcludedDirectory(entryName)) {
      continue;
    }

    const entryUri = vscode.Uri.joinPath(uri, entryName);
    if (entryType === vscode.FileType.Directory) {
      const childRelative = toRelativePath(entryUri);
      record.children.push(childRelative);
      await walkDirectory(entryUri, workspaceRoot, records);
    } else if (entryType === vscode.FileType.File) {
      const relative = toRelativePath(entryUri);
      const extension = extensionOf(entryName);
      const isBinary = BINARY_EXTENSIONS.has(extension);
      const fileRecord = {
        name: entryName,
        relativePath: relative,
        absolutePath: entryUri.fsPath.replace(/\\/g, '/'),
        absoluteDirPath: path.dirname(entryUri.fsPath).replace(/\\/g, '/'),
        type: 'file',
        extension,
        uri: entryUri,
        isBinary,
        analyzeImports: ['.ts', '.tsx', '.js', '.jsx', '.mts', '.cts'].includes(
          extension
        ),
        leadingComment: '',
        summary: '',
      };
      records.set(relative, fileRecord);
      record.children.push(relative);
    }
  }
}

function enrichSummaries(records, usageMap) {
  for (const record of records.values()) {
    if (record.type === 'directory') {
      record.summary = describeDirectory(record, records);
      continue;
    }

    if (record.leadingComment) {
      record.summary = record.leadingComment;
      continue;
    }

    record.summary = describeFileKind(record);

    const usedBy = usageMap.get(record.relativePath);
    if (!usedBy || usedBy.size === 0) {
      continue;
    }

    const usedByArray = [...usedBy];
    if (usedByArray.length === 1) {
      record.summary += ` (בשימוש על ידי ${usedByArray[0]})`;
    } else {
      record.summary += ` (בשימוש ע"י ${usedByArray.length} קבצים)`;
    }
  }
}

async function writeReport(content, workspaceFolder) {
  const target = vscode.Uri.joinPath(workspaceFolder.uri, OUTPUT_RELATIVE_PATH);
  const segments = OUTPUT_RELATIVE_PATH.split('/');
  segments.pop();
  if (segments.length) {
    const dirUri = vscode.Uri.joinPath(workspaceFolder.uri, ...segments);
    await vscode.workspace.fs.createDirectory(dirUri);
  }
  const enc = new TextEncoder();
  await vscode.workspace.fs.writeFile(target, enc.encode(content));
  return target;
}

async function generateReport() {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) {
    vscode.window.showErrorMessage('לא נמצאה סביבת עבודה פעילה.');
    return;
  }

  const records = new Map();
  const rootUri = workspaceFolder.uri;
  const workspacePath = rootUri.fsPath;

  await walkDirectory(rootUri, workspacePath, records);

  const fileIndex = await buildFileIndex(records);
  const usageMap = new Map();
  await analyzeImports(records, fileIndex, workspacePath, usageMap);
  enrichSummaries(records, usageMap);

  const rootNode = buildDirectoryNode(records, toRelativePath(rootUri));
  const treeLines = renderTree(rootNode);
  const tableLines = createTable(records, usageMap);

  const now = new Date();
  const formattedDate = now.toLocaleString('he-IL', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const content = [
    '# סקירת מבנה הפרויקט',
    '',
    `נוצר אוטומטית: ${formattedDate}.`,
    '',
    '## עץ תיקיות',
    '',
    ...treeLines,
    '',
    '## טבלת פירוט',
    '',
    ...tableLines,
    '',
    '> הערה: טבלה זו נבנתה באופן אוטומטי. כדאי להשלים תיאורים ידניים במידת הצורך.',
    '',
  ].join('\n');

  const outputUri = await writeReport(content, workspaceFolder);
  vscode.window.showInformationMessage(
    `נסקרו ${records.size} פריטים. הדוח נשמר ב-${toRelativePath(outputUri)}.`
  );
}

generateReport().catch((error) => {
  console.error('generate-project-overview.js', error);
  vscode.window.showErrorMessage(
    'הפקת דוח המבנה נכשלה. בדקי את הקונסול לפרטים.'
  );
});
