const vscode = require('vscode');
const path = require('path');

function toRelativePath(uri) {
  return vscode.workspace.asRelativePath(uri, false);
}

function extractLocalClassNames(line) {
  if (!line || !line.includes('.')) {
    return [];
  }

  const sanitized = line.trim();
  if (!sanitized || sanitized.startsWith('/*') || sanitized.startsWith('*')) {
    return [];
  }

  if (sanitized.includes(':global(')) {
    return [];
  }

  const matches = [...line.matchAll(/\.([A-Za-z][A-Za-z0-9_-]*)\b/g)];
  return matches.map((match) => match[1]);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function upperFirst(value) {
  if (!value) {
    return value;
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function lowerFirst(value) {
  if (!value) {
    return value;
  }
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function pascalCase(value) {
  return value
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((segment) => upperFirst(segment.toLowerCase()))
    .join('');
}

function componentBaseName(uri) {
  const relative = toRelativePath(uri).replace(/\\/g, '/');
  const withoutExtension = relative.replace(/\.module\.css$/i, '');
  const segments = withoutExtension.split('/').filter(Boolean);
  const interesting = segments.slice(-2);
  const pascal = interesting.map((segment) => pascalCase(segment)).join('');
  if (pascal) {
    return lowerFirst(pascal);
  }
  const fallback = pascalCase(path.basename(withoutExtension));
  return lowerFirst(fallback);
}

async function gatherCssModules() {
  const patterns = [
    'app/**/_components/**/*.module.css',
    'app/components/**/*.module.css',
    'features/**/*.module.css',
  ];

  const uris = new Map();
  for (const pattern of patterns) {
    const found = await vscode.workspace.findFiles(pattern);
    for (const uri of found) {
      uris.set(uri.fsPath, uri);
    }
  }

  return [...uris.values()];
}

async function findDuplicateClassNames() {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) {
    vscode.window.showErrorMessage('No workspace detected for Joyride script.');
    return;
  }

  const cssModuleUris = await gatherCssModules();
  if (!cssModuleUris.length) {
    vscode.window.showInformationMessage(
      '\u05dc\u05d0 \u05e0\u05de\u05e6\u05d0\u05d5 \u05e7\u05d5\u05d1\u05e6\u05d9 CSS Modules \u05dc\u05e1\u05e8\u05d9\u05e7\u05d4.'
    );
    return;
  }

  const occurrencesByClass = new Map();

  for (const uri of cssModuleUris) {
    const document = await vscode.workspace.openTextDocument(uri);
    const lines = document.getText().split(/\r?\n/);

    lines.forEach((line, index) => {
      const classNames = extractLocalClassNames(line);
      classNames.forEach((className) => {
        const bucket = occurrencesByClass.get(className) || [];
        bucket.push({
          uri,
          line: index,
          preview: line.trim(),
        });
        occurrencesByClass.set(className, bucket);
      });
    });
  }

  const duplicates = [...occurrencesByClass.entries()]
    .filter(([, occurrences]) => occurrences.length > 1)
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));

  if (!duplicates.length) {
    vscode.window.showInformationMessage(
      '\u05dc\u05d0 \u05e0\u05de\u05e6\u05d0\u05d5 \u05de\u05d7\u05dc\u05e7\u05d5\u05ea \u05db\u05e4\u05d5\u05dc\u05d5\u05ea.'
    );
    return;
  }

  const items = duplicates.map(([className, occurrences]) => {
    const detail = occurrences
      .map(
        (occurrence) =>
          `${toRelativePath(occurrence.uri)}:${occurrence.line + 1}`
      )
      .join(', ');

    return {
      label: className,
      description: `${occurrences.length} \u05de\u05d5\u05e4\u05e2\u05d9\u05dd`,
      detail,
      occurrences,
    };
  });

  const picked = await vscode.window.showQuickPick(items, {
    placeHolder:
      '\u05d1\u05d7\u05e8\u05d9 \u05de\u05d7\u05dc\u05e7\u05d4 \u05dc\u05e1\u05e7\u05d9\u05e8\u05ea \u05dc\u05dc\u05d5\u05d7.',
  });

  if (!picked) {
    return;
  }

  await copyOccurrencesToClipboard(picked.label, picked.occurrences);
}

async function copyOccurrencesToClipboard(className, occurrences) {
  const lines = [];

  for (const occurrence of occurrences) {
    const document = await vscode.workspace.openTextDocument(occurrence.uri);
    const textLine = document.lineAt(Math.max(occurrence.line, 0)).text.trim();
    lines.push(
      `${toRelativePath(occurrence.uri)}:${occurrence.line + 1} — ${textLine}`
    );
  }

  const snippet = [
    `\u05de\u05d7\u05dc\u05e7\u05d4: ${className}`,
    ...lines,
  ].join('\n');
  await vscode.env.clipboard.writeText(snippet);

  const firstOccurrence = occurrences[0];
  const document = await vscode.workspace.openTextDocument(firstOccurrence.uri);
  const editor = await vscode.window.showTextDocument(document, {
    preview: false,
  });
  const targetPosition = new vscode.Position(firstOccurrence.line, 0);
  editor.selection = new vscode.Selection(targetPosition, targetPosition);
  editor.revealRange(
    new vscode.Range(targetPosition, targetPosition),
    vscode.TextEditorRevealType.InCenter
  );

  vscode.window.showInformationMessage(
    '\u05e4\u05e8\u05d8 \u05d4\u05de\u05d7\u05dc\u05e7\u05d5\u05ea \u05d4\u05d5\u05e2\u05ea\u05e7 \u05dc\u05dc\u05d5\u05d7. \u05e4\u05e9\u05d8 \u05dc\u05d4\u05d3\u05d1\u05d9\u05e7 \u05dc\u05e6\u05d0\u05ea \u05d4\u05e6\u05d8\u05d5\u05df.',
    { modal: false }
  );
}

findDuplicateClassNames().catch((error) => {
  console.error('find-css-duplicates.js', error);
  vscode.window.showErrorMessage(
    '\u05d4\u05e1\u05e8\u05d9\u05e7\u05d4 \u05e0\u05db\u05e9\u05dc\u05d4 \u05d1\u05e9\u05d2\u05d9\u05d0\u05d4. \u05e2\u05d9\u05d0\u05d9 \u05d0\u05ea \u05d4\u05e7\u05d5\u05e0\u05e1\u05d5\u05dc \u05dc\u05e4\u05e8\u05d8\u05d9\u05dd \u05dc\u05e4\u05e8\u05d8\u05d9\u05dd \u05e0\u05d5\u05e1\u05e4\u05d9\u05dd.'
  );
});
