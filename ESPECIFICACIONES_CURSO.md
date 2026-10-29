# Especificaciones canónicas — Curso Flutter + API REST

Este archivo es la fuente de verdad para elaborar las sesiones y los contenidos del sitio. Debe respetarse al generar las semanas restantes.

## Contexto

- Audiencia: estudiantes de quinto nivel de una carrera tecnológica.
- Duración: siete semanas, 14 sesiones y 35 horas. Cada semana contiene una sesión de 3 horas y una sesión de 2 horas. Para no eliminar contenido, los temas afines se integran en dos sesiones: formularios con CRUD; y calidad, APK, demostración y evaluación final.
- Producto: TaskFlow, aplicación Android en Flutter conectada a una API REST.
- Arquitectura: MVVM orientado por funcionalidades, Repository pattern y ApiService.

## Formato de cada sesión

Toda sesión debe incluir:

1. Resultado u objetivo observable.
2. Inicio: activación, contexto y objetivo; indicar duración.
3. Desarrollo: explicación clara de cada concepto, ejemplo práctico guiado y práctica acompañada; indicar duración.
4. Cierre: comprobación, síntesis y evidencia; indicar duración.
5. Ejemplo práctico guiado, separado del trabajo autónomo.
6. Trabajo integrador incremental autónomo, vinculado al contenido de esa sesión.

La explicación debe estar adaptada a estudiantes de quinto nivel: definir términos, explicar qué problema resuelven, señalar dónde se aplican, describir cómo comprobar el resultado y advertir errores frecuentes.

## Trabajo integrador incremental

Después de cada sesión, el estudiante debe extender TaskFlow aplicando lo aprendido. La propuesta debe incluir:

- **Aplicar:** conceptos específicos revisados.
- **Avance:** funcionalidad concreta en la app final.
- **Evidencia:** resultado observable, captura, prueba o artefacto.
- **Versionado:** commit sugerido y push.

No proponer ejercicios desvinculados del proyecto ni versionar el ejemplo guiado. Si la sesión enseña Column y Row, la práctica autónoma debe usar Column y Row para construir una parte auténtica de TaskFlow, por ejemplo el panel de tareas pendientes.

## Git y GitHub

El commit y push se hacen únicamente al terminar el trabajo autónomo de cada sesión. El ejemplo guiado es parte del aprendizaje, no de la evidencia.

```bash
git status
git add .
git commit -m "mensaje sugerido para el avance autónomo"
git push origin main
```

Cada sesión debe proponer un mensaje de commit descriptivo. El historial de GitHub es evidencia del avance continuo.

## Codelabs

Para sesiones con programación, crear un codelab que incluya:

- Lista de preparación o precondiciones.
- Pasos numerados y verificables.
- Bloques de código completos cuando sean necesarios.
- Explicación antes y después de cada bloque.
- Resultado esperado y formas de comprobarlo.
- Errores frecuentes con una primera acción de diagnóstico.
- Reto autónomo vinculado a TaskFlow, junto con su commit y push.

Los bloques Dart se muestran con resaltado de sintaxis Dart y un botón Copiar. Los comandos de terminal se identifican como Shell y también deben poder copiarse.

Cada sesión debe contar con su propia página (`sesion-XX.html`) y estar enlazada desde el menú lateral de Codelabs, agrupado por semana. La página debe mostrar objetivo, los tres momentos de clase, ejemplo guiado, trabajo integrador incremental y regla de commit/push.

## Stack técnico

- Estado e inyección: `provider` + `ChangeNotifier`.
- API REST: `dio` dentro de `ApiService`.
- Rutas: `go_router`.
- Preferencias no críticas: `shared_preferences`.
- Tokens reales, solo si son necesarios: `flutter_secure_storage`.
- Soporte: `intl`, `flutter_lints`, `mocktail` y `flutter_test`.

No incorporar Bloc, Riverpod, GetX, `get_it`, Retrofit o Firebase sin ampliar explícitamente el alcance del curso.

## Sitio web

El curso se publica como sitio estático para GitHub Pages. Todo contenido nuevo debe conservar navegación clara entre el plan, los codelabs, la ruta del proyecto y estas especificaciones; ser responsive, accesible y estar escrito en español.
