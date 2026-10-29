const sessionId = Number(document.body.dataset.session);
const pageContent = document.querySelector('#session-content');
const allSessions = window.courseWeeks?.flatMap((week) => week.sessions.map((session) => ({ ...session, week })));
const currentSession = allSessions?.find((session) => session.number === sessionId);

function list(items) {
  return `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
}

if (!currentSession || !pageContent) {
  pageContent.innerHTML = '<p>No se encontró la sesión solicitada. <a href="codelabs.html">Volver al índice de codelabs</a>.</p>';
} else {
  const { week, number, hours, title, goal, start, development, close, guided, autonomous } = currentSession;
  const expandedGuide = number <= 2
    ? `<a class="session-detail-link" href="codelabs.html#codelab-${number}">Abrir la guía paso a paso con código →</a>`
    : '';

  document.title = `Sesión ${number} · ${title} | Curso Flutter`;
  document.querySelector('#session-eyebrow').textContent = `SEMANA ${week.number} · SESIÓN ${number} · ${hours.toUpperCase()}`;
  document.querySelector('#session-title').textContent = title;
  document.querySelector('#session-subtitle').textContent = week.title;

  pageContent.innerHTML = `
    <aside class="session-facts">
      <p><strong>Semana ${week.number}</strong>${week.title}</p>
      <p><strong>Duración</strong>${hours}</p>
      <a href="codelabs.html">← Todas las sesiones</a>
    </aside>
    <div>
      <p class="session-objective"><strong>Objetivo:</strong> ${goal}</p>
      <div class="session-moments">
        <section class="session-moment"><h2>1. Inicio · activación</h2>${list(start)}</section>
        <section class="session-moment"><h2>2. Desarrollo · construcción</h2>${list(development)}</section>
        <section class="session-moment"><h2>3. Cierre · evidencia</h2>${list(close)}</section>
      </div>
      <section class="session-practice">
        <h2>Ejemplo práctico guiado</h2><p>${guided}</p>
        <h2>Trabajo integrador incremental</h2><p>${autonomous}</p>
        <p><strong>Registro obligatorio:</strong> al terminar el trabajo autónomo, prueba el avance y ejecuta <code>git add .</code>, <code>git commit</code> y <code>git push origin main</code>.</p>
        ${expandedGuide}
      </section>
    </div>`;
}
