const vscode = require('vscode');
const path = require('path');
const postcss = require('postcss');

// Script purpose: scan CSS assets to flag conflicting declarations and responsive overrides.

const CSS_GLOBS = [
  'app/**/*.module.css',
  'app/**/*.css',
  'features/**/*.module.css',
  'features/**/*.css',
];

const LAYOUT_PROPERTIES = new Set([
  'display',
  'flex-direction',
  'flex-wrap',
  'justify-content',
  'align-items',
  'align-content',
  'gap',
  'row-gap',
  'column-gap',
  'grid-template-columns',
  'grid-template-rows',
  'grid-auto-flow',
  'grid-template-areas',
  'place-items',
  'place-content',
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'inset',
  'inset-block',
  'inset-inline',
  'margin',
  'margin-block',
  'margin-inline',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'padding',
  'padding-block',
  'padding-inline',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'width',
  'min-width',
  'max-width',
  'height',
  'min-height',
  'max-height',
  'aspect-ratio',
  'overflow',
  'overflow-x',
  'overflow-y',
  'z-index',
]);

const SEVERITY_LABEL = {
  conflict:
    '\u05e1\u05ea\u05d9\u05e8\u05d5\u05ea \u05de\u05d1\u05d8\u05dc\u05ea',
  duplicate:
    '\u05db\u05e4\u05d9\u05dc\u05d5\u05ea \u05de\u05d5\u05e1\u05db\u05de\u05d5\u05ea',
  responsive:
    '\u05e1\u05e8\u05d9\u05e1 \u05ea\u05d0\u05de\u05d4 \u05e8\u05e1\u05e4\u05e0\u05e1\u05d9\u05d1\u05d9',
};

function toRelativePath(uri) {
  return vscode.workspace.asRelativePath(uri, false);
}

function normalizeSelector(selector) {
  if (!selector) {
    return '«empty»';
  }

  const segments = selector
    .split(',')
    .map((segment) => segment.trim().replace(/\s+/g, ' '))
    .filter(Boolean)
    .sort();

  return segments.join(', ');
}

function describeAtRuleChain(node) {
  const parts = [];
  let current = node.parent;

  while (current && current.type !== 'root') {
    if (current.type === 'atrule') {
      const formatted = current.params
        ? `@${current.name} ${current.params}`
        : `@${current.name}`;
      parts.unshift(formatted.trim());
    }
    current = current.parent;
  }

  return parts.length ? parts.join(' › ') : 'root';
}

function valueFingerprint(value, important) {
  const normalized = (value ?? '').toString().replace(/\s+/g, ' ').trim();
  return `${normalized}${important ? ' !important' : ''}`.toLowerCase();
}

function collectLinePreview(lines, node) {
  const lineIndex = node?.source?.start?.line ?? 1;
  const safeIndex = Math.max(0, lineIndex - 1);
  return lines[safeIndex]?.trim() ?? '';
}

async function gatherCssUris() {
  const unique = new Map();

  for (const pattern of CSS_GLOBS) {
    const found = await vscode.workspace.findFiles(
      pattern,
      '**/node_modules/**'
    );
    for (const uri of found) {
      unique.set(uri.fsPath, uri);
    }
  }

  return [...unique.values()];
}

function registerDeclaration(registry, selector, chainKey, declEntry) {
  if (!registry.has(selector)) {
    registry.set(selector, new Map());
  }

  const chainMap = registry.get(selector);
  if (!chainMap.has(chainKey)) {
    chainMap.set(chainKey, new Map());
  }

  const propertyMap = chainMap.get(chainKey);
  if (!propertyMap.has(declEntry.prop)) {
    propertyMap.set(declEntry.prop, []);
  }

  propertyMap.get(declEntry.prop).push(declEntry);
}

function detectIntraChainIssues(selector, chainKey, property, entries) {
  if (entries.length < 2) {
    return [];
  }

  const fingerprints = new Set(entries.map((entry) => entry.fingerprint));
  if (fingerprints.size === 1) {
    return [
      {
        severity: 'duplicate',
        selector,
        chainKey,
        property,
        entries,
        message: `\u05ea\u05db\u05dc\u05d9\u05dd \u05e9\u05d5\u05e0\u05d5\u05ea \u05d0\u05ea \u05d4-${property} \u05d1\u05d0\u05d5\u05ea\u05d4 \u05e1\u05e8\u05d9\u05e7\u05ea.`,
      },
    ];
  }

  return [
    {
      severity: 'conflict',
      selector,
      chainKey,
      property,
      entries,
      message: `\u05d4-${property} \u05d5\u05da \u05de\u05d5\u05d2\u05d3\u05e8 \u05dc\u05de\u05e1\u05e4\u05e8 \u05e2\u05e8\u05db\u05d9 \u05e9\u05d5\u05e0\u05d9\u05dd \u05d0\u05d5 \u05e8\u05d5\u05e7\u05e0\u05d5 \u05d1\u05d2\u05f3.`,
    },
  ];
}

function detectResponsiveIssues(selector, property, chains) {
  if (chains.size < 2 || !LAYOUT_PROPERTIES.has(property)) {
    return [];
  }

  const seen = new Map();

  for (const [chainKey, entries] of chains.entries()) {
    const values = entries.map((entry) => entry.fingerprint);
    const unique = [...new Set(values)];
    if (!unique.length) {
      continue;
    }

    seen.set(chainKey, unique);
  }

  if (seen.size < 2) {
    return [];
  }

  const fingerprints = new Set([...seen.values()].flatMap((values) => values));

  if (fingerprints.size < 2) {
    return [];
  }

  const entries = [...chains.values()].flat();
  return [
    {
      severity: 'responsive',
      selector,
      chainKey: 'responsive',
      property,
      entries,
      message: `\u05e2\u05e8\u05da ${property} \u05de\u05e9\u05ea\u05e0\u05d4 \u05e7\u05e8\u05d5\u05d1 \u05dc\u05e4\u05d9 \u05de\u05e6\u05d1\u05d9 \u05de\u05e1\u05da \u05e9\u05d5\u05e0\u05d9\u05dd. \u05d1\u05d3\u05e7\u05d9 \u05e9\u05d4\u05e9\u05d9\u05e0\u05d5\u05d9\u05d5\u05ea \u05d4\u05df \u05de\u05ea\u05d5\u05db\u05e0\u05e0\u05d5\u05ea.`,
    },
  ];
}

async function analyzeCssDocument(uri) {
  const document = await vscode.workspace.openTextDocument(uri);
  const content = document.getText();
  const lines = content.split(/\r?\n/);

  let root;
  try {
    root = postcss.parse(content, { from: uri.fsPath });
  } catch (error) {
    vscode.window.showErrorMessage(
      `\u05e0\u05db\u05e9\u05dc\u05d4 \u05d4\u05e4\u05e8\u05d8 \u05d1-${toRelativePath(
        uri
      )}: ${error.message}`
    );
    return [];
  }

  const selectorRegistry = new Map();

  root.walkRules((rule) => {
    if (!rule.selector) {
      return;
    }

    const selectorNames = normalizeSelector(rule.selector)
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    const chainKey = describeAtRuleChain(rule);

    rule.walkDecls((decl) => {
      const entry = {
        prop: decl.prop,
        value: decl.value,
        important: decl.important,
        fingerprint: valueFingerprint(decl.value, decl.important),
        uri,
        node: decl,
        chainKey,
        selector: rule.selector,
        preview: collectLinePreview(lines, decl),
      };

      selectorNames.forEach((selectorName) => {
        registerDeclaration(selectorRegistry, selectorName, chainKey, entry);
      });
    });
  });

  const issues = [];

  for (const [selector, chainMap] of selectorRegistry.entries()) {
    for (const [chainKey, propertyMap] of chainMap.entries()) {
      for (const [property, entries] of propertyMap.entries()) {
        issues.push(
          ...detectIntraChainIssues(selector, chainKey, property, entries)
        );
      }
    }

    const propertyGroups = new Map();
    for (const [chainKey, propertyMap] of chainMap.entries()) {
      for (const [property, entries] of propertyMap.entries()) {
        if (!propertyGroups.has(property)) {
          propertyGroups.set(property, new Map());
        }
        propertyGroups.get(property).set(chainKey, entries);
      }
    }

    for (const [property, chains] of propertyGroups.entries()) {
      issues.push(...detectResponsiveIssues(selector, property, chains));
    }
  }

  return issues.map((issue) => {
    const primaryEntry = issue.entries[0];
    const line = primaryEntry.node?.source?.start?.line ?? 1;
    const column = primaryEntry.node?.source?.start?.column ?? 1;

    return {
      ...issue,
      uri,
      line,
      column,
      preview: primaryEntry.preview,
    };
  });
}

function buildQuickPickItems(issues) {
  return issues.map((issue) => {
    const severityLabel = SEVERITY_LABEL[issue.severity] ?? issue.severity;
    const relative = toRelativePath(issue.uri);
    const detail = `${relative}:${issue.line} • ${issue.selector} • ${issue.property}`;

    return {
      label: `${severityLabel} — ${issue.message}`,
      description: `@${issue.chainKey}`,
      detail,
      issue,
    };
  });
}

async function presentIssues(issues) {
  const sorted = issues.sort((a, b) => {
    if (a.severity !== b.severity) {
      return a.severity.localeCompare(b.severity);
    }
    const selectorCompare = a.selector.localeCompare(b.selector);
    if (selectorCompare !== 0) {
      return selectorCompare;
    }
    return a.property.localeCompare(b.property);
  });

  const items = buildQuickPickItems(sorted);
  const picked = await vscode.window.showQuickPick(items, {
    placeHolder:
      '\u05de\u05e6\u05d0\u05ea\u05d9 \u05e1\u05ea\u05d9\u05e8\u05d5\u05ea \u05d5\u05db\u05e4\u05d9\u05dc\u05d5\u05d9\u05d5\u05ea — \u05d1\u05d7\u05e8\u05d9 \u05e2\u05e0\u05d9\u05df \u05dc\u05e4\u05ea\u05d9\u05d7\u05d4 \u05e4\u05e8\u05d8\u05e0\u05d4.',
    matchOnDescription: true,
    matchOnDetail: true,
  });

  if (!picked) {
    return;
  }

  const { issue } = picked;
  const document = await vscode.workspace.openTextDocument(issue.uri);
  const editor = await vscode.window.showTextDocument(document, {
    preview: false,
  });

  const target = new vscode.Position(
    issue.line - 1,
    Math.max(issue.column - 1, 0)
  );
  editor.selection = new vscode.Selection(target, target);
  editor.revealRange(
    new vscode.Range(target, target),
    vscode.TextEditorRevealType.InCenter
  );
}

async function runAnalysis() {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) {
    vscode.window.showErrorMessage(
      '\u05dc\u05dc\u05d0 \u05ea\u05d9\u05e7\u05ea \u05e1\u05d1\u05d9\u05d1\u05d4 \u05e4\u05e2\u05d9\u05dc\u05d9\u05ea.'
    );
    return;
  }

  const uris = await gatherCssUris();
  if (!uris.length) {
    vscode.window.showInformationMessage(
      '\u05dc\u05d0 \u05e0\u05de\u05e6\u05d0\u05d5 \u05e7\u05d1\u05e6\u05d9 CSS \u05dc\u05e1\u05e8\u05d9\u05e7\u05d4.'
    );
    return;
  }

  const analysis = [];
  for (const uri of uris) {
    const issues = await analyzeCssDocument(uri);
    analysis.push(...issues);
  }

  if (!analysis.length) {
    vscode.window.showInformationMessage(
      '\u05d4\u05e0\u05d9\u05ea\u05d5 \u05d0\u05d9\u05ea \u05e1\u05ea\u05d9\u05e8\u05d5\u05ea \u05d5\u05db\u05e4\u05d9\u05dc\u05d5\u05d9\u05d5\u05ea \u05d1\u05e4\u05e8\u05d9\u05e1\u05ea CSS.'
    );
    return;
  }

  const total = analysis.length;
  vscode.window.showInformationMessage(
    `\u05e0\u05de\u05e6\u05d0\u05d5 ${total} \u05de\u05e8\u05ea\u05d9\u05dd \u05dc\u05d1\u05d9\u05e7\u05d5\u05e8.`
  );

  await presentIssues(analysis);
}

runAnalysis().catch((error) => {
  console.error('analyze-layout-conflicts.js', error);
  vscode.window.showErrorMessage(
    '\u05d4\u05e1\u05e8\u05d9\u05e7\u05d4 \u05e0\u05db\u05e9\u05dc\u05d4. \u05d0\u05e0\u05d0 \u05d1\u05d3\u05e7\u05d9 \u05d0\u05ea \u05dc\u05d5\u05d2 \u05d4\u05e7\u05d5\u05e0\u05e1\u05d5\u05dc.'
  );
});
