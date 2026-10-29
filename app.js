const sourceWeeks = [
  {
    number: 1,
    title: "Fundamentos de Flutter y Dart",
    outcome: "Entorno preparado y primera pantalla funcional de TaskFlow.",
    sessions: [
      {
        number: 1, hours: "3 horas", title: "Introducción a Flutter, Dart y el entorno", goal: "Comprender el propósito del curso, preparar el entorno y ejecutar una primera aplicación Flutter.",
        start: ["Presentación del reto final: TaskFlow, una app Android conectada a una API.", "Diagnóstico breve: experiencia previa con programación, Git y Android.", "Verificación de Flutter SDK, Android Studio, emulador y editor de código."],
        development: ["Flutter usa un único código Dart para construir interfaces nativas. Un widget es una pieza reutilizable de interfaz.", "Lectura de la estructura inicial: <code>lib/</code>, <code>main.dart</code>, <code>pubspec.yaml</code> y carpetas de plataforma.", "Comandos esenciales: <code>flutter doctor</code>, <code>flutter create</code> y <code>flutter run</code>.", "Dart básico: variables, tipos, cadenas, booleanos, listas, mapas, funciones y null safety."],
        close: ["Ejecutar la aplicación en emulador y verificar que todos dispongan de un entorno funcional.", "Registrar dificultades técnicas y realizar el primer commit del proyecto."],
        guided: "Crear una app llamada TaskFlow que muestre el nombre del curso, un usuario y una cantidad estática de tareas pendientes.",
        autonomous: "Crear el repositorio personal y sustituir la pantalla de ejemplo por una bienvenida que incluya el nombre de la app, nombre del estudiante, mensaje de bienvenida, contador estático y una paleta de color propia."
      },
      {
        number: 2, hours: "2 horas", title: "Widgets, estado e interfaces básicas", goal: "Distinguir widgets con y sin estado y responder a una acción de usuario.",
        start: ["Repaso de la estructura creada y de los conceptos básicos de Dart.", "Pregunta guía: si una tarea se completa, ¿qué información debe actualizarse en la pantalla?"],
        development: ["<code>StatelessWidget</code> se usa cuando la interfaz depende de datos que no cambian localmente; <code>StatefulWidget</code> cuando debe reaccionar a cambios de estado.", "El método <code>build()</code> describe cómo se ve la pantalla. Cuando el estado cambia, Flutter vuelve a construir las partes necesarias.", "Uso de <code>Scaffold</code>, <code>AppBar</code>, <code>Text</code>, <code>Icon</code>, <code>Container</code>, <code>Padding</code> y <code>Center</code>.", "Introducción a <code>setState()</code> como mecanismo local de actualización."],
        close: ["Socialización de soluciones y detección de qué widgets contienen estado.", "Commit con la pantalla principal básica."],
        guided: "Construir un contador de tareas pendientes con botones para aumentar y disminuir su valor mediante <code>setState()</code>.",
        autonomous: "Convertir la bienvenida en un panel de TaskFlow con AppBar, saludo, contador de tareas, botón “Agregar tarea” y un botón que simule completar una tarea."
      }
    ]
  },
  {
    number: 2,
    title: "Layouts, listas y navegación",
    outcome: "App con listado estático, pantalla de detalle y navegación entre rutas.",
    sessions: [
      {
        number: 3, hours: "3 horas", title: "Layouts, listas y componentes reutilizables", goal: "Componer interfaces de listado y reconocer componentes que deben reutilizarse.",
        start: ["Revisión visual de aplicaciones de tareas: qué información aparece en cada elemento de una lista.", "Identificación de elementos repetidos: tarjeta, título, prioridad, estado e iconos."],
        development: ["El sistema de layout de Flutter se basa en restricciones: un padre establece límites y cada hijo decide su tamaño dentro de ellas.", "Uso de <code>Row</code>, <code>Column</code>, <code>Expanded</code>, <code>Flexible</code>, <code>SizedBox</code> y <code>Spacer</code>.", "Listas eficientes con <code>ListView.builder</code>; se construyen los elementos necesarios en lugar de dibujar todos de una vez.", "Tarjetas con <code>Card</code> y <code>ListTile</code>. Creación de un widget reutilizable <code>TaskCard</code>.", "Tema visual con <code>ThemeData</code> para no repetir colores y estilos."],
        close: ["Revisar si cada tarjeta mantiene jerarquía visual y legibilidad.", "Identificar qué parte del código ya puede extraerse a componentes."],
        guided: "Crear una lista local de objetos de prueba y representarla con un widget reutilizable <code>TaskCard</code>.",
        autonomous: "Crear el listado estático de TaskFlow con cinco tareas. Cada tarjeta debe tener título, descripción corta, prioridad, estado y una acción para ver el detalle."
      },
      {
        number: 4, hours: "2 horas", title: "Navegación y comunicación entre pantallas", goal: "Moverse entre lista y detalle, enviando el identificador o datos de una tarea.",
        start: ["Reconstrucción del flujo de usuario: lista → detalle → regresar.", "Explicación de una ruta como una dirección que indica qué pantalla debe mostrarse."],
        development: ["Introducción a <code>go_router</code>: centraliza rutas, parámetros y navegación declarativa.", "Definición de rutas para el listado y el detalle.", "Parámetros de ruta: permiten saber qué tarea abrir sin duplicar pantallas.", "Un gesto del usuario no debe decidir detalles de datos; solo comunica una intención, por ejemplo: abrir tarea 12."],
        close: ["Probar navegación hacia varias tareas y retorno al listado.", "Verificar que cada ruta tenga un propósito claro."],
        guided: "Configurar una ruta de detalle que recibe un id y presenta una tarea de prueba.",
        autonomous: "Agregar las rutas de listado y detalle de TaskFlow. Al tocar una tarjeta se debe abrir su información completa y poder regresar sin perder el listado."
      }
    ]
  },
  {
    number: 3,
    title: "Diseño técnico y arquitectura MVVM",
    outcome: "Proyecto definido, modelado y estructurado por funcionalidades.",
    sessions: [
      {
        number: 5, hours: "3 horas", title: "Especificación del proyecto y modelado de datos", goal: "Definir un alcance viable, usuarios, historias y la entidad principal de la app.",
        start: ["Presentación de requisitos mínimos del producto final.", "Diferencia entre una idea amplia y un alcance que puede finalizarse en ocho semanas."],
        development: ["Una historia de usuario expresa valor: “Como usuario, quiero crear una tarea para organizar mi trabajo”.", "Requisitos funcionales describen acciones del sistema; los no funcionales incluyen usabilidad, rendimiento y mantenibilidad.", "Modelo de datos de Task: id, título, descripción, prioridad, estado y usuario. Un modelo representa información del dominio, no la interfaz.", "Introducción a JSON: formato de texto usado por muchas APIs para intercambiar objetos y listas."],
        close: ["Revisión cruzada de historias de usuario: deben ser claras, pequeñas y comprobables.", "Validación del modelo principal de cada proyecto."],
        guided: "Definir la clase Dart <code>Task</code> y crear varios objetos locales para las pruebas de interfaz.",
        autonomous: "Documentar en el README el problema, usuario objetivo, cinco historias de usuario, modelo principal, boceto de tres pantallas y los endpoints requeridos: listar, detalle, crear, actualizar y eliminar."
      },
      {
        number: 6, hours: "2 horas", title: "Arquitectura MVVM y estructura por funcionalidades", goal: "Separar interfaz, estado y acceso a datos para que la app sea mantenible.",
        start: ["Pregunta guía: ¿por qué una pantalla no debería hacer una petición HTTP directamente?", "Análisis de los problemas de mezclar widgets, reglas y red en el mismo archivo."],
        development: ["En MVVM, la View muestra datos y captura eventos; el ViewModel conserva el estado de pantalla y expone acciones; no dibuja widgets.", "El Repository es la fuente de verdad: ofrece datos a la aplicación y oculta el origen concreto.", "El Service conoce el protocolo HTTP y los endpoints. Esto facilita reemplazar o simular la fuente de datos en pruebas.", "Organización por funcionalidad: <code>features/tasks/data</code> y <code>features/tasks/presentation</code>. <code>core</code> mantiene recursos comunes.", "Introducción a <code>provider</code> para entregar dependencias y escuchar cambios de estado."],
        close: ["Compilar tras mover archivos: una reorganización exitosa no debe cambiar el comportamiento visible.", "Repasar el recorrido View → ViewModel → Repository → Service."],
        guided: "Reorganizar la funcionalidad Tasks y crear un <code>TasksViewModel</code> junto con el contrato inicial de <code>TaskRepository</code>.",
        autonomous: "Aplicar la estructura <code>app</code>, <code>core</code> y <code>features/tasks</code>; mover el modelo, crear ViewModel y Repository, y registrar la dependencia necesaria con Provider."
      }
    ]
  },
  {
    number: 4,
    title: "Consumo de API REST",
    outcome: "Tareas remotas representadas en pantalla con estados asíncronos claros.",
    sessions: [
      {
        number: 7, hours: "3 horas", title: "HTTP, asincronía, JSON y modelos", goal: "Consultar un endpoint REST y convertir su respuesta en modelos Dart.",
        start: ["Lectura de un ejemplo de respuesta JSON de una API de tareas.", "Repaso de cliente, servidor, endpoint, URL, método y código HTTP."],
        development: ["Una API REST expone recursos en URLs. <code>GET</code> consulta información; posteriormente se usarán POST, PATCH/PUT y DELETE.", "<code>Future</code> representa un resultado que llegará más tarde. <code>async</code> y <code>await</code> permiten escribir esa espera de forma legible.", "Instalación y uso de <code>http</code> o <code>dio</code>.", "Conversión JSON: <code>fromJson()</code> transforma un mapa recibido en un objeto <code>Task</code> tipado.", "Creación de <code>TaskApiService</code> para concentrar URL, solicitud y lectura de respuestas."],
        close: ["Inspeccionar códigos de respuesta y datos recibidos.", "Distinguir un error de red de una respuesta HTTP no exitosa."],
        guided: "Consultar un endpoint de tareas y convertir la lista JSON en una lista de objetos <code>Task</code>.",
        autonomous: "Crear <code>TaskApiService</code> y el método para obtener tareas. Mostrar temporalmente el código HTTP y reemplazar la lista local por las tareas remotas."
      },
      {
        number: 8, hours: "2 horas", title: "Repository, ViewModel y estados asíncronos", goal: "Mostrar la información remota y comunicar carga, éxito, vacío o error.",
        start: ["Reconstrucción del camino que siguen los datos desde el endpoint hasta una tarjeta visual.", "Pregunta guía: ¿qué debe ver una persona mientras la app espera una respuesta?"],
        development: ["El Repository solicita datos al Service y devuelve modelos que el resto de la app puede entender.", "El ViewModel expone estado de interfaz: <code>isLoading</code>, <code>tasks</code> y <code>errorMessage</code>.", "<code>ChangeNotifier</code> permite avisar a la vista cuando cambió el estado; la vista se reconstruye al escuchar ese cambio.", "Los cuatro estados esenciales son carga, éxito, vacío y error. Diseñarlos explícitamente evita pantallas en blanco confusas."],
        close: ["Probar cada estado con datos simulados o condiciones controladas.", "Revisar que ningún widget tenga lógica HTTP directa."],
        guided: "Construir un <code>TasksViewModel</code> que cargue tareas y exponga carga, error y resultado.",
        autonomous: "Actualizar el listado para incluir indicador de carga, lista remota, estado vacío, mensaje de error y botón Reintentar o actualización manual."
      }
    ]
  },
  {
    number: 5,
    title: "Formularios y operaciones CRUD",
    outcome: "App capaz de crear, editar y eliminar información mediante una API.",
    sessions: [
      {
        number: 9, hours: "3 horas", title: "Formularios y validación de datos", goal: "Recoger datos del usuario y validar antes de realizar una operación remota.",
        start: ["Análisis de los campos necesarios para registrar una tarea.", "Discusión: ¿por qué se valida antes de enviar datos al servidor?"],
        development: ["<code>Form</code> agrupa campos y <code>GlobalKey&lt;FormState&gt;</code> permite ejecutar la validación del conjunto.", "<code>TextFormField</code> combina entrada de texto y función validadora.", "Controladores permiten leer o precargar contenido en edición; deben liberarse cuando ya no se necesitan.", "Selectores, interruptores y mensajes claros reducen errores de entrada.", "La misma pantalla puede servir para crear y editar si recibe una tarea opcional."],
        close: ["Probar entradas vacías, demasiado cortas y correctas.", "Revisar que los mensajes expliquen cómo corregir el problema."],
        guided: "Crear un formulario de tarea con título obligatorio, descripción y selector de prioridad.",
        autonomous: "Implementar “Nueva tarea” con validaciones, selector de prioridad, fecha opcional, botón Guardar y retorno al listado cuando los datos sean correctos."
      },
      {
        number: 10, hours: "2 horas", title: "POST, PATCH/PUT y DELETE", goal: "Completar el ciclo CRUD y actualizar la interfaz tras cada operación.",
        start: ["Repaso: GET consulta; POST crea; PATCH o PUT modifica; DELETE elimina.", "Identificación de acciones irreversibles y necesidad de confirmación."],
        development: ["<code>toJson()</code> convierte el modelo de la app en el cuerpo JSON que espera la API.", "La respuesta exitosa de una operación debe reflejarse en el estado de la aplicación, no solo mostrar un mensaje.", "Se utiliza un <code>SnackBar</code> para avisos breves y un diálogo de confirmación antes de eliminar.", "Una API de práctica puede simular cambios; se aclara a estudiantes la diferencia entre una respuesta simulada y persistencia real."],
        close: ["Demostración por parejas del ciclo crear, editar y eliminar.", "Registro de endpoints y de las restricciones de la API elegida."],
        guided: "Enviar una tarea mediante POST y comunicar el resultado con un <code>SnackBar</code>.",
        autonomous: "Completar CRUD: crear desde formulario, editar desde detalle, pedir confirmación para eliminar, actualizar el listado y mostrar éxito o error tras cada acción."
      }
    ]
  },
  {
    number: 6,
    title: "Manejo de errores y pruebas",
    outcome: "Aplicación más resiliente y con evidencias automatizadas de calidad.",
    sessions: [
      {
        number: 11, hours: "3 horas", title: "Errores, excepciones y resiliencia", goal: "Detectar fallos previsibles y traducirlos en acciones útiles para el usuario.",
        start: ["Pregunta guía: ¿qué sucede si no hay internet, la API demora o el servidor falla?", "Análisis de mensajes técnicos que no ayudan a una persona usuaria."],
        development: ["Errores frecuentes: falta de conexión, timeout, JSON inválido, recurso no encontrado y error del servidor.", "<code>try/catch</code> permite capturar errores; las excepciones personalizadas expresan el tipo de problema sin exponer detalles técnicos innecesarios.", "El Repository interpreta errores de bajo nivel y el ViewModel prepara un mensaje de presentación.", "Un botón no debe poder enviar el mismo formulario varias veces mientras una solicitud sigue activa.", "Reintentar debe ser una opción cuando el error sea recuperable."],
        close: ["Simular al menos dos tipos de fallo y evaluar la claridad de los mensajes.", "Completar una lista de verificación de estados de error."],
        guided: "Simular una caída de red y crear una pantalla con icono, explicación y acción Reintentar.",
        autonomous: "Agregar manejo diferenciado para red y servidor, deshabilitar Guardar durante envíos, y ofrecer reintento para carga, creación, edición o eliminación cuando corresponda."
      },
      {
        number: 12, hours: "2 horas", title: "Pruebas unitarias y de widgets", goal: "Escribir pruebas pequeñas que validen comportamiento sin depender de pruebas manuales.",
        start: ["Diferencia entre comprobar manualmente y una prueba repetible.", "Clasificación: prueba unitaria, de widget y de integración."],
        development: ["Las pruebas unitarias verifican una clase o función aislada: por ejemplo, un modelo o un ViewModel.", "Una prueba de widget monta una porción de interfaz y comprueba qué se muestra tras una interacción o un estado.", "Un fake o mock reemplaza temporalmente el repositorio real, por lo que las pruebas no dependen de red.", "MVVM facilita probar ViewModels porque su lógica no necesita widgets para ejecutarse."],
        close: ["Ejecutar <code>flutter test</code> e interpretar un resultado exitoso o fallido.", "Relacionar cada prueba con un riesgo real del producto."],
        guided: "Escribir una prueba unitaria para comprobar que <code>Task.fromJson()</code> interpreta correctamente una respuesta.",
        autonomous: "Añadir cuatro evidencias: prueba de modelo, prueba de ViewModel o Repository con fake, prueba de validación de formulario y prueba de widget para carga o error."
      }
    ]
  },
  {
    number: 7,
    title: "Persistencia, búsqueda y experiencia de usuario",
    outcome: "App más útil, consistente y preparada para uso cotidiano.",
    sessions: [
      {
        number: 13, hours: "3 horas", title: "Sesión, preferencias y persistencia ligera", goal: "Conservar información apropiada entre aperturas de la aplicación.",
        start: ["Discusión: ¿qué información debería mantenerse al cerrar una aplicación?", "Diferenciar preferencias, sesión, token y base de datos local."],
        development: ["Las preferencias son datos pequeños como tema, nombre o filtro; no sustituyen una base de datos.", "Un token representa una sesión autenticada y requiere almacenamiento seguro cuando se usa en una aplicación real.", "La persistencia permite recuperar una configuración al reiniciar la app.", "Si la API seleccionada no posee autenticación, el curso prioriza guardar preferencias para mantener el alcance viable."],
        close: ["Cerrar y abrir la aplicación para verificar la recuperación de información.", "Revisar qué datos nunca deben guardarse en texto plano."],
        guided: "Guardar y recuperar el nombre de usuario o modo oscuro mediante preferencias locales.",
        autonomous: "Implementar una opción: sesión con token si la API lo permite; nombre de usuario persistente; tema claro/oscuro; último filtro empleado; o pantalla de configuración básica."
      },
      {
        number: 14, hours: "2 horas", title: "Búsqueda, filtros y accesibilidad básica", goal: "Ayudar a encontrar información y mejorar la comprensión de la interfaz.",
        start: ["Análisis del problema de una lista extensa de tareas.", "Definición de criterios: texto, prioridad, estado y orden."],
        development: ["La búsqueda transforma una colección según un término; se debe conservar la lista original para evitar pérdida de datos.", "Los filtros responden a condiciones explícitas, por ejemplo: solo tareas pendientes o de prioridad alta.", "El estado vacío también debe explicar por qué no hay resultados y ofrecer cómo recuperar la lista.", "Accesibilidad básica: contraste suficiente, textos comprensibles, objetivos táctiles adecuados y etiquetas claras."],
        close: ["Prueba de diferentes combinaciones de búsqueda y filtro.", "Revisión entre pares con una lista breve de criterios de usabilidad."],
        guided: "Agregar un campo que filtre tareas por el texto de su título.",
        autonomous: "Implementar búsqueda, filtro por prioridad o estado, acción para limpiar filtros, mensaje sin resultados y una revisión de contraste, textos y etiquetas."
      }
    ]
  },
  {
    number: 8,
    title: "Cierre técnico, APK y demostración",
    outcome: "Producto entregable, documentado y explicado técnicamente.",
    sessions: [
      {
        number: 15, hours: "3 horas", title: "Refactorización, documentación y preparación de entrega", goal: "Convertir el avance de clase en un proyecto que otra persona pueda ejecutar y entender.",
        start: ["Presentación de la lista de verificación final y de la rúbrica.", "Priorización: primero los errores que impiden usar la app, después mejoras visuales."],
        development: ["Refactorizar no implica agregar características: mejora la estructura sin modificar la conducta observada.", "Convenciones de nombres, archivos pequeños y responsabilidades claras disminuyen el costo de mantenimiento.", "<code>dart format</code> mantiene formato consistente y <code>flutter analyze</code> ayuda a detectar problemas estáticos.", "Un README debe explicar propósito, requisitos, instalación, arquitectura, API, pruebas y capturas.", "La documentación técnica no es un adorno: permite evaluar y continuar el proyecto."],
        close: ["Revisión individual de pendientes críticos.", "Validar repositorio, README, pruebas y ejecución de análisis."],
        guided: "Transformar un README mínimo en uno útil que incluya instalación, arquitectura y uso de API.",
        autonomous: "Completar paquete de entrega: código ordenado, README, capturas, diagrama de arquitectura, funcionalidades, limitaciones conocidas y ejecución correcta de pruebas y análisis estático."
      },
      {
        number: 16, hours: "2 horas", title: "Generación de APK, demostración y evaluación final", goal: "Construir el artefacto de instalación y comunicar las decisiones del proyecto.",
        start: ["Explicación del flujo de compilación de lanzamiento y del formato de demostración técnica.", "Organización de turnos y lista de comprobación para presentación."],
        development: ["Un APK es el paquete instalable para Android. La generación de release convierte el proyecto en un artefacto que puede probarse fuera del entorno de desarrollo.", "Prueba de flujos críticos: listar, ver detalle, crear, editar, eliminar y responder ante error.", "Una buena demo presenta problema, solución, arquitectura, API, demostración funcional y aprendizaje principal.", "La evaluación considera proceso y producto: no solo que la pantalla se vea bien, sino que las decisiones puedan justificarse."],
        close: ["Retroalimentación final orientada a próximos pasos: base de datos local, Firebase, notificaciones y publicación.", "Entrega formal de repositorio, APK y evidencias."],
        guided: "Generar un APK de lanzamiento y localizar el archivo resultante para instalarlo en un dispositivo o emulador.",
        autonomous: "Generar e instalar el APK, recorrer la lista de verificación funcional y presentar la app en cinco minutos demostrando al menos una operación conectada a la API."
      }
    ]
  }
];

function mergeSessions(number, hours, title, first, second) {
  return {
    number,
    hours,
    title,
    goal: `${first.goal} Además, ${second.goal}`,
    start: [...first.start, ...second.start],
    development: [...first.development, ...second.development],
    close: [...first.close, ...second.close],
    guided: `${first.guided} Después, ${second.guided}`,
    autonomous: `${first.autonomous} Después, ${second.autonomous}`
  };
}

const weeks = [
  { number: 1, title: "Fundamentos de Flutter y Dart", outcome: "Entorno preparado y primera pantalla funcional de TaskFlow.", sessions: sourceWeeks[0].sessions },
  { number: 2, title: "Layouts, listas y navegación", outcome: "App con listado estático, pantalla de detalle y navegación entre rutas.", sessions: sourceWeeks[1].sessions },
  { number: 3, title: "Diseño técnico y arquitectura MVVM", outcome: "Proyecto definido, modelado y estructurado por funcionalidades.", sessions: sourceWeeks[2].sessions },
  { number: 4, title: "Consumo de API REST", outcome: "Tareas remotas representadas en pantalla con estados asíncronos claros.", sessions: sourceWeeks[3].sessions },
  { number: 5, title: "Formularios, CRUD y resiliencia", outcome: "La app crea, edita y elimina información con validación y manejo de fallos recuperables.", sessions: [mergeSessions(9, "3 horas", "Formularios, validación y operaciones CRUD", sourceWeeks[4].sessions[0], sourceWeeks[4].sessions[1]), { ...sourceWeeks[5].sessions[0], number: 10, hours: "2 horas" }] },
  { number: 6, title: "Pruebas y persistencia", outcome: "Comportamientos críticos probados y preferencias útiles conservadas entre aperturas.", sessions: [{ ...sourceWeeks[5].sessions[1], number: 11, hours: "3 horas" }, { ...sourceWeeks[6].sessions[0], number: 12, hours: "2 horas" }] },
  { number: 7, title: "Experiencia, calidad y entrega", outcome: "App más fácil de usar, validada, documentada y entregada como APK instalable.", sessions: [{ ...sourceWeeks[6].sessions[1], number: 13, hours: "3 horas" }, mergeSessions(14, "2 horas", "Calidad, APK, demostración y evaluación final", sourceWeeks[7].sessions[0], sourceWeeks[7].sessions[1])] }
];

const tabs = document.querySelector("#week-tabs");
const content = document.querySelector("#week-content");

function sessionMarkup(session) {
  const list = (items) => `<ul>${items.map(item => `<li>${item}</li>`).join("")}</ul>`;
  return `
    <article class="session">
      <button class="session-toggle" aria-expanded="false">
        <span><span class="session-meta">SESIÓN ${session.number} · ${session.hours}</span><span class="session-title">${session.title}</span></span>
        <span class="session-icon" aria-hidden="true">+</span>
      </button>
      <div class="session-body">
        <p class="session-goal"><strong>Objetivo:</strong> ${session.goal}</p>
        <div class="moments">
          <section class="moment"><h4>1. Inicio <span>activación</span></h4>${list(session.start)}</section>
          <section class="moment"><h4>2. Desarrollo <span>construcción</span></h4>${list(session.development)}</section>
          <section class="moment"><h4>3. Cierre <span>evidencia</span></h4>${list(session.close)}</section>
        </div>
        <div class="practice"><h4>Ejemplo práctico guiado</h4><p>${session.guided}</p><h4>Trabajo integrador incremental</h4><p>${session.autonomous}</p><p class="git-session"><strong>Registro obligatorio:</strong> una vez terminado este trabajo autónomo, comprobarlo, hacer <code>git add .</code>, crear el commit sugerido en la ruta del proyecto y ejecutar <code>git push origin main</code>.</p></div>
      </div>
    </article>`;
}

function renderWeek(index) {
  const week = weeks[index];
  [...tabs.children].forEach((tab, tabIndex) => {
    const active = tabIndex === index;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", active);
  });
  content.innerHTML = `
    <div class="week-header">
      <div><p class="eyebrow">SEMANA ${week.number}</p><h3>${week.title}</h3></div>
      <p class="week-outcome"><strong>Resultado:</strong> ${week.outcome}</p>
    </div>
    <div class="session-list">${week.sessions.map(sessionMarkup).join("")}</div>`;
  content.querySelector(".session").classList.add("open");
  content.querySelector(".session-toggle").setAttribute("aria-expanded", "true");
}

weeks.forEach((week, index) => {
  const button = document.createElement("button");
  button.className = "week-tab";
  button.setAttribute("role", "tab");
  button.textContent = `Semana ${week.number}`;
  button.addEventListener("click", () => renderWeek(index));
  tabs.append(button);
});

content.addEventListener("click", (event) => {
  const button = event.target.closest(".session-toggle");
  if (!button) return;
  const session = button.closest(".session");
  const open = session.classList.toggle("open");
  button.setAttribute("aria-expanded", String(open));
});

renderWeek(0);
