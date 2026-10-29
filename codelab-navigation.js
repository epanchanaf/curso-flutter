const codelabWeeks = [
  { number: 1, title: 'Fundamentos de Flutter y Dart', sessions: [{ number: 1, hours: '3 h', title: 'Introducción a Flutter, Dart y el entorno', target: '#codelab-1' }, { number: 2, hours: '2 h', title: 'Widgets, estado e interfaces básicas', target: '#codelab-2' }] },
  { number: 2, title: 'Layouts, listas y navegación', sessions: [{ number: 3, hours: '3 h', title: 'Layouts, listas y componentes reutilizables' }, { number: 4, hours: '2 h', title: 'Navegación y comunicación entre pantallas' }] },
  { number: 3, title: 'Diseño técnico y arquitectura MVVM', sessions: [{ number: 5, hours: '3 h', title: 'Especificación del proyecto y modelado de datos' }, { number: 6, hours: '2 h', title: 'Arquitectura MVVM y estructura por funcionalidades' }] },
  { number: 4, title: 'Consumo de API REST', sessions: [{ number: 7, hours: '3 h', title: 'HTTP, asincronía, JSON y modelos' }, { number: 8, hours: '2 h', title: 'Repository, ViewModel y estados asíncronos' }] },
  { number: 5, title: 'Formularios y operaciones CRUD', sessions: [{ number: 9, hours: '3 h', title: 'Formularios y validación de datos' }, { number: 10, hours: '2 h', title: 'POST, PATCH/PUT y DELETE' }] },
  { number: 6, title: 'Manejo de errores y pruebas', sessions: [{ number: 11, hours: '3 h', title: 'Errores, excepciones y resiliencia' }, { number: 12, hours: '2 h', title: 'Pruebas unitarias y de widgets' }] },
  { number: 7, title: 'Persistencia, búsqueda y experiencia de usuario', sessions: [{ number: 13, hours: '3 h', title: 'Sesión, preferencias y persistencia ligera' }, { number: 14, hours: '2 h', title: 'Búsqueda, filtros y accesibilidad básica' }] },
  { number: 8, title: 'Integración, calidad y entrega', sessions: [{ number: 15, hours: '3 h', title: 'Integración, depuración y preparación de entrega' }, { number: 16, hours: '2 h', title: 'APK, demostración y retrospectiva' }] }
];

const weekTabs = document.querySelector('.codelab-week-tabs');
const sessionLinks = document.querySelector('.codelab-session-links');
const status = document.querySelector('.navigator-status');
const upcoming = document.querySelector('.codelab-upcoming');
let activeWeek = 1;

function showUpcoming(session, week) {
  upcoming.hidden = false;
  upcoming.querySelector('h3').textContent = `Semana ${week.number} · Sesión ${session.number}: ${session.title}`;
  upcoming.querySelector('p:not(.eyebrow)').textContent = 'La guía detallada de esta sesión se agregará cuando se publique su codelab. Por ahora puedes consultar sus objetivos, contenidos y trabajo integrador en el plan del curso.';
  upcoming.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function renderSessions(week) {
  sessionLinks.replaceChildren();
  week.sessions.forEach((session) => {
    const item = document.createElement(session.target ? 'a' : 'button');
    item.className = 'codelab-session-link';
    item.innerHTML = `<span><b>Sesión ${session.number}</b><small>${session.hours}</small></span><span>${session.title}</span><i>${session.target ? 'Ir al codelab →' : 'Ver planificación →'}</i>`;
    if (session.target) {
      item.href = session.target;
      item.addEventListener('click', () => { upcoming.hidden = true; });
    } else {
      item.type = 'button';
      item.addEventListener('click', () => showUpcoming(session, week));
    }
    sessionLinks.append(item);
  });
  status.textContent = week.number === 1
    ? 'Semana 1 disponible: selecciona una sesión para abrir su guía paso a paso.'
    : `Semana ${week.number}: las sesiones ya están ubicadas en la ruta; sus codelabs detallados se publicarán próximamente.`;
}

function selectWeek(number) {
  activeWeek = number;
  const week = codelabWeeks.find((item) => item.number === number);
  [...weekTabs.children].forEach((tab) => {
    const isSelected = Number(tab.dataset.week) === number;
    tab.classList.toggle('active', isSelected);
    tab.setAttribute('aria-selected', String(isSelected));
  });
  upcoming.hidden = true;
  renderSessions(week);
}

codelabWeeks.forEach((week) => {
  const tab = document.createElement('button');
  tab.type = 'button';
  tab.dataset.week = week.number;
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-selected', String(week.number === activeWeek));
  tab.textContent = `Semana ${week.number}`;
  tab.addEventListener('click', () => selectWeek(week.number));
  weekTabs.append(tab);
});

selectWeek(activeWeek);
