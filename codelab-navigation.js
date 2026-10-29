const codelabWeeks = [
  { number: 1, sessions: [{ number: 1, title: 'Introducción a Flutter, Dart y el entorno' }, { number: 2, title: 'Widgets, estado e interfaces básicas' }] },
  { number: 2, sessions: [{ number: 3, title: 'Layouts, listas y componentes reutilizables' }, { number: 4, title: 'Navegación y comunicación entre pantallas' }] },
  { number: 3, sessions: [{ number: 5, title: 'Especificación del proyecto y modelado de datos' }, { number: 6, title: 'Arquitectura MVVM y estructura por funcionalidades' }] },
  { number: 4, sessions: [{ number: 7, title: 'HTTP, asincronía, JSON y modelos' }, { number: 8, title: 'Repository, ViewModel y estados asíncronos' }] },
  { number: 5, sessions: [{ number: 9, title: 'Formularios, validación y operaciones CRUD' }, { number: 10, title: 'Errores, excepciones y resiliencia' }] },
  { number: 6, sessions: [{ number: 11, title: 'Pruebas unitarias y de widgets' }, { number: 12, title: 'Sesión, preferencias y persistencia ligera' }] },
  { number: 7, sessions: [{ number: 13, title: 'Búsqueda, filtros y accesibilidad básica' }, { number: 14, title: 'Calidad, APK, demostración y evaluación final' }] }
];

const sidebarMenu = document.querySelector('.codelab-sidebar-menu');

if (sidebarMenu) {
  codelabWeeks.forEach((week) => {
    const group = document.createElement('section');
    group.className = 'sidebar-week';
    group.innerHTML = `<h2>Semana ${week.number}</h2>`;

    week.sessions.forEach((session) => {
      const link = document.createElement('a');
      const sessionNumber = String(session.number).padStart(2, '0');
      link.href = `sesion-${sessionNumber}.html`;
      link.innerHTML = `<span>${session.number}</span>${session.title}`;
      group.append(link);
    });

    sidebarMenu.append(group);
  });
}
