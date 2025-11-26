## Objetivo

Implementar modales para “Nuevo Empleado” y “Nuevo Servicio”, y conectar botones de crear/editar/eliminar con una capa de datos simulada (mocks) para dar reactividad realista en todo el panel: calendario, tabla de citas, estadísticas y listados.

## Capa de Datos (Mocks)

* Crear `src/data/appointments.ts`, `src/data/employees.ts`, `src/data/services.ts` con:

  * Constantes iniciales exportadas (las que hoy están hardcodeadas en componentes).

  * Utilidades para generar IDs y (opcional) persistir en `localStorage` para mantener estado entre recargas.

* Refactorizar `src/App.tsx:71–91` para importar estos mocks y usarlos como estado inicial.

* Mantener el `AppContext` como API de “backend” simulado (`add/update/delete`) ya existente (`src/App.tsx:99–136`).

## Modales Nuevos (ojo que el estilo debe ser identico que los otros modales)

* `NewEmployeeModal.tsx`: formulario con `name, role, email, phone, specialties[], rating, status`.

  * Envío: llama `addEmployee(...)` de `useAppData()`.

* `NewServiceModal.tsx`: formulario con `name, category, description, duration, price, icon, color, popular`.

  * Envío: llama `addService(...)` de `useAppData()`.

* (Opcional corto plazo) `EditEmployeeModal.tsx` y `EditServiceModal.tsx` reutilizando los mismos campos; envío usa `updateEmployee(...)` y `updateService(...)`.

## Conexión de Botones

* Dashboard: botón “Nueva Cita” ya conectado; mantener.

* Empleados: `src/components/EmployeesModule.tsx`

  * Conectar “Nuevo Empleado” (`:102–105`) → abrir `NewEmployeeModal` con estado local.

  * Reemplazar lista local `employees` por datos del contexto `useAppData()`.

  * Conectar iconos Edit/Trash (`:147–152`) → abrir modal de edición / ejecutar `deleteEmployee(id)`.

* Servicios: `src/components/ServicesModule.tsx`

  * Conectar “Nuevo Servicio” (`:130–133`) → abrir `NewServiceModal` con estado local.

  * Reemplazar lista local `services` por datos del contexto `useAppData()`.

  * Conectar Edit/Trash (`:227–243`) → abrir modal de edición / ejecutar `deleteService(id)`.

* Tabla de Citas: `src/components/AppointmentTable.tsx`

  * Reemplazar `appointments` local por contexto.

  * Botón menú (`:105–112`) → opciones Editar/Eliminar (editar abre `AppointmentModal` o un `EditAppointmentModal`, eliminar llama `deleteAppointment(id)`).

## Calendario

* `src/components/AppointmentCalendar.tsx`

  * Eliminar `initialAppointments` local y consumir `appointments` del contexto.

  * En `handleDrop` (`:112–120`) llamar `updateAppointment(id, { day, startHour })` del contexto para reactividad global.

## Estadísticas Dinámicas

* Dashboard: sustituir `stats` fijo (`src/components/Dashboard.tsx:5–38`) por cálculos desde contexto:

  * Citas hoy: filtrar por fecha actual.

  * Clientes activos: distintos por ventana de tiempo (p.ej. semana actual).

  * Ingresos del mes: sumar `price` (parseando `'$'`).

  * Tasa de ocupación: horas agendadas / horas disponibles (aproximación simple).

* Empleados y Servicios: ya muestran conteos; asegurar que usan el contexto para que reaccionen a altas/bajas.

## UX/Validaciones

* Validar campos requeridos en los modales y mostrar feedback.

* Mantener estilo UI (Shadcn + Tailwind) y animaciones `motion` ya presentes.

## Impacto en Código

* Archivos nuevos: `src/data/*.ts`, `src/components/NewEmployeeModal.tsx`, `src/components/NewServiceModal.tsx` (+ opcionales de edición).

* Refactors:

  * `src/App.tsx` (importar mocks).

  * `EmployeesModule.tsx`, `ServicesModule.tsx`, `AppointmentTable.tsx`, `AppointmentCalendar.tsx` para usar `useAppData()` y conectar acciones.

## Entregables y Verificación

* Modales funcionales para altas de empleados/servicios.

* Botones de editar/eliminar conectados.

* Calendario y tabla de citas reaccionan a nuevas citas y actualizaciones.

* Estadísticas del Dashboard calculadas dinámicamente.

* Prueba manual en `npm run dev` y navegación por vistas para verificar reactividad.

¿Confirmo este plan e implemento los cambios y modales ahora?
