export const initialEmployees = [
  { id: 1, name: "Ana Martínez", role: "Estilista Senior", email: "ana.martinez@ejemplo.com", phone: "+34 600 111 111", specialties: ["Corte", "Peinado", "Barba"], rating: 4.9, appointmentsToday: 8, avatar: "A", status: "active" as const },
  { id: 2, name: "Pedro López", role: "Masajista Profesional", email: "pedro.lopez@ejemplo.com", phone: "+34 600 222 222", specialties: ["Masaje Relajante", "Masaje Deportivo"], rating: 4.8, appointmentsToday: 6, avatar: "P", status: "active" as const },
  { id: 3, name: "Sofia Torres", role: "Especialista en Estética", email: "sofia.torres@ejemplo.com", phone: "+34 600 333 333", specialties: ["Manicura", "Pedicura", "Facial"], rating: 4.7, appointmentsToday: 7, avatar: "S", status: "active" as const },
  { id: 4, name: "María Flores", role: "Colorista", email: "maria.flores@ejemplo.com", phone: "+34 600 444 444", specialties: ["Tinte", "Mechas", "Balayage"], rating: 4.9, appointmentsToday: 5, avatar: "M", status: "active" as const },
];

export const nextEmployeeId = (arr: { id: number }[]) => Math.max(0, ...arr.map(a => a.id)) + 1;

