export const initialAppointments = [
  { id: 1, client: 'María González', email: 'maria@ejemplo.com', service: 'Corte de Cabello', employee: 'Ana Martínez', date: '2025-11-11', time: '09:00', duration: '1h', status: 'completed', price: '$35', day: 0, startHour: 9, color: 'teal' },
  { id: 2, client: 'Carlos Ruiz', email: 'carlos@ejemplo.com', service: 'Masaje Relajante', employee: 'Pedro López', date: '2025-11-11', time: '10:30', duration: '1.5h', status: 'in-progress', price: '$60', day: 0, startHour: 10.5, color: 'marine' },
  { id: 3, client: 'Laura Sánchez', email: 'laura@ejemplo.com', service: 'Manicura', employee: 'Sofia Torres', date: '2025-11-12', time: '11:00', duration: '1h', status: 'pending', price: '$25', day: 1, startHour: 11, color: 'amber' },
  { id: 4, client: 'Diego Morales', email: 'diego@ejemplo.com', service: 'Corte y Barba', employee: 'Ana Martínez', date: '2025-11-12', time: '14:00', duration: '1h', status: 'confirmed', price: '$45', day: 1, startHour: 14, color: 'teal' },
  { id: 5, client: 'Elena Castro', email: 'elena@ejemplo.com', service: 'Tinte', employee: 'María Flores', date: '2025-11-13', time: '15:00', duration: '2h', status: 'cancelled', price: '$80', day: 2, startHour: 15, color: 'marine' },
];

export const nextAppointmentId = (arr: { id: number }[]) => Math.max(0, ...arr.map(a => a.id)) + 1;

