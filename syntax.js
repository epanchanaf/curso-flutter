(() => {
  const escapeHtml = (value) => value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

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
    'BuildContext', 'ColorScheme', 'Column', 'Icon', 'MaterialApp',
    'Padding', 'Row', 'Scaffold', 'SizedBox', 'State', 'StatefulWidget',
    'StatelessWidget', 'String', 'Text', 'ThemeData', 'Widget', 'Wrap',
    'Card', 'ElevatedButton', 'OutlinedButton', 'Future', 'List', 'Map',
    'int', 'double', 'bool', 'num'
  ]);

  function span(className, content) {
    return `<span class="token-${className}">${content}</span>`;
  }

  function highlightDart(source) {
    const escaped = escapeHtml(source);
    const tokenPattern = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|@[A-Za-z_][\w]*|\b[A-Za-z_][\w]*\b|\b\d+(?:\.\d+)?\b)/g;
    return escaped.replace(tokenPattern, (token) => {
      if (token.startsWith('//') || token.startsWith('/*')) return span('comment', token);
      if (token.startsWith("'") || token.startsWith('"')) return span('string', token);
      if (token.startsWith('@')) return span('annotation', token);
      if (/^\d/.test(token)) return span('number', token);
      if (dartKeywords.has(token)) return span('keyword', token);
      if (dartTypes.has(token) || /^[A-Z]/.test(token)) return span('type', token);
      if (token === 'true' || token === 'false' || token === 'null') return span('literal', token);
      return token;
    });
  }

  function highlightShell(source) {
    const escaped = escapeHtml(source);
    return escaped.replace(/("[^"]*")/g, (string) => span('string', string))
      .replace(/^(flutter|dart|git|cd|code)(?=\s|$)/gm, (command) => span('command', command));
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

  document.querySelectorAll('pre code').forEach((block) => {
    const source = block.textContent;
    const isDart = /(?:import 'package:flutter|class \w+ extends|StatefulWidget|StatelessWidget|setState\s*\()/m.test(source);
    const language = isDart ? 'dart' : 'shell';
    block.parentElement.dataset.language = language;
    block.innerHTML = isDart ? highlightDart(source) : highlightShell(source);

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
    block.parentElement.append(copyButton);
  });
})();
