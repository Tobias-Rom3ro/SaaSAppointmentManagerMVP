## Objetivo
Convertir la pestaña de Configuración en un panel realmente reactivo y conectado con el “negocio”, persistiendo cambios y reflejándolos en todo el producto (sidebar, dashboard, calendario, citas, títulos, tema, notificaciones y seguridad).

## Modelo de Datos y Persistencia
- Añadir `settings` al contexto global con tipo:
  - Perfil: `firstName`, `lastName`, `email`, `phone`.
  - Negocio: `businessName`, `timezone`, `currency`, `openTime`, `closeTime`, `slotDurationMinutes`.
  - Notificaciones: `emailEnabled`, `pushEnabled`, `remindersEnabled`, `weeklySummaryEnabled`.
  - Apariencia: `theme` ('light'|'dark').
  - Seguridad: `twoFAEnabled`.
- Agregar `updateSettings(partial)` y persistir en `localStorage`.

## Conexiones Reactivas
- **Nombre del negocio**:
  - Sidebar header muestra `businessName`.
  - `document.title` incluye `businessName` en todas las vistas.
- **Zona horaria**:
  - Normalizar fecha/hora en calendario y tabla de citas al `timezone` (libre de dependencias: usar offset fijo elegido por el usuario).
- **Moneda**:
  - Formatear precios (`Dashboard`, `ServicesModule`, `AppointmentTable`, `AppointmentModal`) con `currency` (símbolo/ISO sencillo: 'USD', 'EUR', etc.).
- **Horario de apertura/cierre**:
  - Calendario muestra horas desde `openTime` hasta `closeTime`.
  - Validar que nuevas citas caigan dentro del rango; mostrar feedback si no.
- **Duración de turnos**:
  - `NewAppointmentModal` usa `slotDurationMinutes` como default y recalcula duración/precio cuando cambian.
- **Tema**:
  - Conectar switch de apariencia para alternar `ThemeContext` y persistir.
- **Notificaciones**:
  - Al alternar switches, simular backend con toasts (ej. “Preferencias guardadas”) y reflejar en componentes que muestren badges/estado.
- **Seguridad/2FA**:
  - Activar `twoFAEnabled` impacta un badge en `TopBar` y bloquea acciones sensibles (simulado) si está activo y no verificado.

## UI/UX en Configuración
- Reemplazar `defaultValue` por `value` controlado desde `settings`.
- Botón “Guardar Cambios”: llama `updateSettings` y muestra confirmación; validaciones:
  - `businessName` requerido; `timezone` formato válido; `openTime<closeTime`; `slotDurationMinutes > 0`.
- Feedback inmediato: mostrar "guardado"/"error".

## Ajustes en Módulos
- **Dashboard**: métricas y título usan `businessName`; ingresos formateados por `currency`.
- **Calendario**: rango horario y duración por `settings`; horas visibles dinámicas.
- **Citas**: al crear, `duration` default desde `slotDurationMinutes`; validar contra horario.
- **Servicios**: precios mostrados con `currency`.

## Seguridad Simulada
- Cambios de contraseña: validación básica local, feedback; no almacenar contraseñas reales.
- 2FA: toggles y banners informativos; no integración real.

## Telemetría/Notificaciones (simuladas)
- Al cambiar `notifications` mostrar toasts y un indicador en `TopBar` (ej. campana con estado).

## Pruebas Manuales
- Cambiar `businessName` y verificar sidebar/títulos.
- Ajustar `openTime/closeTime` y confirmar calendario.
- Cambiar `currency` y revisar precios en servicios/tabla/modal.
- Alternar tema y ver persistencia.
- Validar switches de notificaciones con toasts.

## Entregables
- Contexto extendido con `settings` + persistencia.
- Configuración “controlada” (form fields vinculados).
- Conexiones reactivas a módulos (titulo, calendario, precios, tema, notificaciones).
- Validaciones y feedback UI.

¿Confirmo este plan para implementar los cambios y enlazar Configuración con el resto del sistema?