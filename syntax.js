(() => {
  const dartKeywords = new Set([
    'abstract', 'as', 'assert', 'async', 'await', 'break', 'case', 'catch',
    'class', 'const', 'continue', 'covariant', 'default', 'deferred', 'do',
    'dynamic', 'else', 'enum', 'export', 'extends', 'extension', 'external',
    'factory', 'final', 'for', 'get', 'hide', 'if', 'implements', 'import',
    'in', 'interface', 'is', 'late', 'library', 'mixin', 'new', 'on',
    'operator', 'part', 'required', 'rethrow', 'return', 'set', 'show',
    'static', 'super', 'switch', 'sync', 'this', 'throw', 'try', 'typedef',
    'var', 'void', 'when', 'while', 'with', 'yield'
  ]);
  const dartTypes = new Set([
    'AppBar', 'BuildContext', 'Card', 'Center', 'Color', 'ColorScheme',
    'Column', 'CrossAxisAlignment', 'EdgeInsets', 'ElevatedButton', 'Future',
    'Icon', 'IconData', 'Key', 'List', 'Map', 'MaterialApp', 'Padding',
    'Row', 'Scaffold', 'SizedBox', 'State', 'StatefulWidget',
    'StatelessWidget', 'String', 'Text', 'ThemeData', 'Widget', 'Wrap',
    'OutlinedButton', 'VoidCallback', 'bool', 'double', 'int', 'num'
  ]);
  const dartPattern = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|@[A-Za-z_]\w*|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b)/g;

  function escapeHtml(value) {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');
  }

  function span(className, content) {
    return `<span class="token-${className}">${content}</span>`;
  }

  function highlightDart(source) {
    // Escape once, then classify whole comments and strings before their contents.
    return escapeHtml(source).replace(dartPattern, (token) => {
      if (token.startsWith('//') || token.startsWith('/*')) return span('comment', token);
      if (token.startsWith("'") || token.startsWith('"')) return span('string', token);
      if (token.startsWith('@')) return span('annotation', token);
      if (/^\d/.test(token)) return span('number', token);
      if (token === 'true' || token === 'false' || token === 'null') return span('literal', token);
      if (dartKeywords.has(token)) return span('keyword', token);
      if (dartTypes.has(token) || /^[A-Z]/.test(token)) return span('type', token);
      return token;
    });
  }

  function highlightShell(source) {
    return escapeHtml(source)
      .replace(/("[^"]*")/g, (string) => span('string', string))
      .replace(/^(flutter|dart|git|cd|code)(?=\s|$)/gm, (command) => span('command', command));
  }

  function detectLanguage(pre, source) {
    if (['dart', 'shell', 'text'].includes(pre.dataset.language)) {
      return pre.dataset.language;
    }

    return /(?:import 'package:flutter|class \w+ extends|StatefulWidget|StatelessWidget|setState\s*\()/m.test(source)
      ? 'dart'
      : 'shell';
  }

  async function copyCode(source) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(source);
      return;
    }

    const helper = document.createElement('textarea');
    helper.value = source;
    helper.setAttribute('readonly', '');
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    document.body.append(helper);
    helper.select();
    document.execCommand('copy');
    helper.remove();
  }

  function addCopyButton(pre, source, language) {
    if (pre.querySelector('.code-copy')) return;

    const copyButton = document.createElement('button');
    copyButton.type = 'button';
    copyButton.className = 'code-copy';
    copyButton.textContent = 'Copiar';
    copyButton.setAttribute('aria-label', `Copiar bloque de código ${language}`);
    copyButton.addEventListener('click', async () => {
      try {
        await copyCode(source);
        copyButton.textContent = '✓ Copiado';
        copyButton.classList.add('copied');
      } catch {
        copyButton.textContent = 'No se pudo copiar';
        copyButton.classList.add('copy-error');
      }

      window.setTimeout(() => {
        copyButton.textContent = 'Copiar';
        copyButton.classList.remove('copied', 'copy-error');
      }, 1800);
    });
    pre.append(copyButton);
  }

  function enhanceCodeBlocks(scope = document) {
    scope.querySelectorAll('pre code').forEach((block) => {
      const pre = block.parentElement;
      if (pre.dataset.syntaxHighlighted === 'true') return;

      // Keep a text-only snapshot so formatting never affects what is copied.
      const source = block.textContent;
      const language = detectLanguage(pre, source);
      pre.dataset.language = language;
      pre.dataset.syntaxHighlighted = 'true';
      block.innerHTML = language === 'dart'
        ? highlightDart(source)
        : language === 'shell'
          ? highlightShell(source)
          : escapeHtml(source);
      addCopyButton(pre, source, language);
    });
  }

  window.enhanceCodelabCode = enhanceCodeBlocks;
  enhanceCodeBlocks();
})();
