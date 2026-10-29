const sessionId = Number(document.body.dataset.session);
const pageContent = document.querySelector('#session-content');
const allSessions = window.courseWeeks?.flatMap((week) => week.sessions.map((session) => ({ ...session, week })));
const currentSession = allSessions?.find((session) => session.number === sessionId);

const codeExamples = {
  1: { language: 'shell', code: 'flutter doctor\nflutter devices\nflutter create taskflow\ncd taskflow\nflutter run' },
  2: { language: 'dart', code: 'int pendingTasks = 3;\n\nvoid completeTask() {\n  if (pendingTasks == 0) return;\n  setState(() {\n    pendingTasks--;\n  });\n}' },
  3: { language: 'dart', code: 'ListView.builder(\n  itemCount: tasks.length,\n  itemBuilder: (context, index) {\n    final task = tasks[index];\n    return ListTile(title: Text(task.title));\n  },\n)' },
  4: { language: 'dart', code: 'final changed = await Navigator.push<bool>(\n  context,\n  MaterialPageRoute(\n    builder: (_) => TaskDetailScreen(task: task),\n  ),\n);\n\nif (changed == true) setState(() {});' },
  5: { language: 'dart', code: 'class Task {\n  const Task({required this.id, required this.title});\n  final int id;\n  final String title;\n\n  factory Task.fromJson(Map<String, dynamic> json) {\n    return Task(id: json[\'id\'] as int, title: json[\'title\'] as String);\n  }\n}' },
  6: { language: 'shell', code: 'lib/features/tasks/\n  data/task_repository.dart\n  domain/task.dart\n  presentation/task_list_view.dart\n  presentation/task_list_view_model.dart' },
  7: { language: 'dart', code: 'final response = await http.get(Uri.parse(apiUrl));\nif (response.statusCode != 200) {\n  throw Exception(\'No se pudieron cargar las tareas\');\n}\nfinal data = jsonDecode(response.body) as List<dynamic>;\nreturn data.map((item) => Task.fromJson(item)).toList();' },
  8: { language: 'dart', code: 'Future<void> loadTasks() async {\n  isLoading = true;\n  notifyListeners();\n  try {\n    tasks = await repository.getTasks();\n  } finally {\n    isLoading = false;\n    notifyListeners();\n  }\n}' },
  9: { language: 'dart', code: 'if (formKey.currentState!.validate()) {\n  await viewModel.createTask(\n    titleController.text.trim(),\n  );\n}' },
  10: { language: 'dart', code: 'try {\n  await repository.getTasks();\n} on SocketException {\n  errorMessage = \'Revisa tu conexión e inténtalo nuevamente.\';\n} on TimeoutException {\n  errorMessage = \'El servidor demoró demasiado.\';\n}' },
  11: { language: 'dart', code: 'test(\'Task.fromJson convierte una respuesta válida\', () {\n  final task = Task.fromJson({\'id\': 7, \'title\': \'Preparar demo\'});\n  expect(task.id, 7);\n  expect(task.title, \'Preparar demo\');\n});' },
  12: { language: 'dart', code: 'final preferences = await SharedPreferences.getInstance();\nawait preferences.setBool(\'darkMode\', true);\nfinal isDarkMode = preferences.getBool(\'darkMode\') ?? false;' },
  13: { language: 'dart', code: 'final visibleTasks = tasks.where((task) {\n  return task.title.toLowerCase().contains(query.toLowerCase());\n}).toList();' },
  14: { language: 'shell', code: 'dart format lib test\nflutter analyze\nflutter test\nflutter build apk --release' },
};

function list(items) {
  return `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
}

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function sidebarMarkup() {
  return `
    <aside class="codelab-sidebar" id="menu-codelabs" aria-label="Menú lateral de codelabs">
      <a class="sidebar-home" href="codelabs.html">Índice de codelabs</a>
      <p class="navigator-label">SEMANAS Y SESIONES</p>
      <nav class="codelab-sidebar-menu" aria-label="Seleccionar sesión">
        ${window.courseWeeks.map((week) => `
          <section class="sidebar-week">
            <h2>Semana ${week.number}</h2>
            ${week.sessions.map((session) => {
              const number = String(session.number).padStart(2, '0');
              const current = session.number === sessionId ? ' current-session' : '';
              const selected = session.number === sessionId ? ' aria-current="page"' : '';
              return `<a class="${current}" href="sesion-${number}.html"${selected}><span>${session.number}</span>${session.title}</a>`;
            }).join('')}
          </section>`).join('')}
      </nav>
    </aside>`;
}

function addCodeControls(scope) {
  scope.querySelectorAll('pre code').forEach((block) => {
    const source = block.textContent;
    const pre = block.parentElement;
    const button = document.createElement('button');
    if (!pre.dataset.language) {
      pre.dataset.language = /^(?:flutter|dart|git|cd|code)\b/m.test(source) ? 'shell' : 'dart';
    }
    button.type = 'button';
    button.className = 'code-copy';
    button.textContent = 'Copiar';
    button.setAttribute('aria-label', `Copiar bloque de código ${pre.dataset.language}`);
    button.addEventListener('click', async () => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(source);
        } else {
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
        button.textContent = '✓ Copiado';
        button.classList.add('copied');
      } catch {
        button.textContent = 'No se pudo copiar';
        button.classList.add('copy-error');
      }
      window.setTimeout(() => {
        button.textContent = 'Copiar';
        button.classList.remove('copied', 'copy-error');
      }, 1800);
    });
    pre.append(button);
  });
}

if (!currentSession || !pageContent) {
  pageContent.innerHTML = '<p>No se encontró la sesión solicitada. <a href="codelabs.html">Volver al índice de codelabs</a>.</p>';
} else {
  const { week, number, hours, title, goal, start, development, close, guided, autonomous } = currentSession;
  const example = codeExamples[number];

  document.title = `Codelab ${number} · ${title} | Curso Flutter`;
  document.querySelector('#session-eyebrow').textContent = `CODELAB · SEMANA ${week.number} · SESIÓN ${number} · ${hours.toUpperCase()}`;
  document.querySelector('#session-title').textContent = title;
  document.querySelector('#session-subtitle').textContent = `Laboratorio guiado para incorporar este avance en TaskFlow.`;
  pageContent.className = 'codelab-layout session-codelab-layout';
  pageContent.parentElement.classList.add('session-codelab-main');

  if (number === 1) {
    pageContent.innerHTML = `
      ${sidebarMarkup()}
      <div class="codelab-content" id="detailed-codelab">
        <p class="session-objective">Cargando el codelab detallado de la sesión 1…</p>
      </div>`;

    fetch('codelabs.html')
      .then((response) => {
        if (!response.ok) throw new Error('No se pudo leer el codelab original.');
        return response.text();
      })
      .then((markup) => {
        const documentSource = new DOMParser().parseFromString(markup, 'text/html');
        const detailedCodelab = documentSource.querySelector('#codelab-1');
        if (!detailedCodelab) throw new Error('No se encontró el contenido de la sesión 1.');

        detailedCodelab.removeAttribute('hidden');
        const destination = pageContent.querySelector('#detailed-codelab');
        destination.replaceChildren(detailedCodelab);
        addCodeControls(destination);
      })
      .catch(() => {
        pageContent.querySelector('#detailed-codelab').innerHTML =
          '<p class="session-objective">No se pudo cargar el codelab detallado. Abre <a href="codelabs.html#codelab-1">la sesión 1</a> desde el índice.</p>';
      });
  } else {
  pageContent.innerHTML = `
    ${sidebarMarkup()}
    <div class="codelab-content">
      <section class="codelab-session">
        <div class="codelab-title">
          <div class="session-badge">SESIÓN ${number}<br><span>${hours.toUpperCase()}</span></div>
          <div><p class="eyebrow">CODELAB ${String(number).padStart(2, '0')}</p><h2>${title}</h2><p>Este codelab transforma los conceptos de la sesión en un avance verificable de tu aplicación.</p></div>
        </div>
        <div class="learning-box"><strong>Objetivo del laboratorio:</strong> ${goal}</div>
        <article class="lab-step"><div class="step-number">1</div><div><h3>Preparar el trabajo</h3><p>Ubica el archivo o la funcionalidad de TaskFlow que vas a modificar. Antes de cambiar código, revisa los conceptos de inicio:</p>${list(start)}</div></article>
        <article class="lab-step"><div class="step-number">2</div><div><h3>Construir el avance</h3><p>Aplica estos puntos en orden. Guarda el proyecto después de cada cambio y usa Hot Reload cuando el cambio sea visual.</p>${list(development)}</div></article>
        <article class="lab-step"><div class="step-number">3</div><div><h3>Resolver el ejemplo guiado</h3><p>${guided}</p><pre data-language="${example.language}"><code>${escapeHtml(example.code)}</code></pre><div class="explain"><strong>Comprensión:</strong> adapta los nombres de clases, propiedades y rutas a la estructura real de tu proyecto. No copies sin identificar qué dato cambia y qué capa debe manejarlo.</div></div></article>
        <article class="lab-step"><div class="step-number">4</div><div><h3>Verificar y cerrar</h3><p>Comprueba el resultado observado y reúne la evidencia solicitada:</p>${list(close)}</div></article>
        <aside class="challenge"><p class="eyebrow">TRABAJO AUTÓNOMO INCREMENTAL</p><h3>Integra este avance en tu aplicación final</h3><p>${autonomous}</p><p>Al terminar, prueba el avance y registra exclusivamente este trabajo autónomo con <code>git add .</code>, un commit descriptivo y <code>git push origin main</code>.</p></aside>
        <div class="common-errors"><h3>Si algo no funciona</h3><dl><dt>La app no refleja el cambio</dt><dd>Guarda los archivos y, si cambiaste la estructura de widgets o inicialización, prueba Hot Restart.</dd><dt>Hay un error de tipos o nulos</dt><dd>Lee la línea señalada por el analizador y confirma el tipo esperado antes de forzar una conversión.</dd><dt>El resultado no coincide</dt><dd>Vuelve al paso 4, revisa los datos de entrada y después el estado que utiliza la interfaz.</dd></dl></div>
      </section>
    </div>`;
  addCodeControls(pageContent);
  }
}
