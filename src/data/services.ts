export const initialServices = [
  { id: 1, name: 'Corte de Cabello', category: 'Peluquería', description: 'Corte de cabello profesional adaptado a tu estilo', duration: '45 min', price: '$35', icon: 'scissors', color: 'teal', popular: true },
  { id: 2, name: 'Corte y Barba', category: 'Peluquería', description: 'Servicio completo de corte de cabello y arreglo de barba', duration: '1 hora', price: '$45', icon: 'scissors', color: 'teal', popular: true },
  { id: 3, name: 'Tinte', category: 'Coloración', description: 'Tinte profesional con productos de alta calidad', duration: '2 horas', price: '$80', icon: 'sparkles', color: 'marine', popular: false },
  { id: 4, name: 'Mechas', category: 'Coloración', description: 'Mechas y reflejos para iluminar tu cabello', duration: '2.5 horas', price: '$95', icon: 'sparkles', color: 'marine', popular: false },
  { id: 5, name: 'Balayage', category: 'Coloración', description: 'Técnica moderna de coloración degradada', duration: '3 horas', price: '$120', icon: 'sparkles', color: 'marine', popular: true },
  { id: 6, name: 'Manicura', category: 'Estética', description: 'Cuidado completo de manos y uñas', duration: '45 min', price: '$25', icon: 'sparkles', color: 'teal', popular: false },
  { id: 7, name: 'Pedicura', category: 'Estética', description: 'Tratamiento completo para pies y uñas', duration: '1 hora', price: '$30', icon: 'sparkles', color: 'teal', popular: false },
  { id: 8, name: 'Masaje Relajante', category: 'Bienestar', description: 'Masaje terapéutico para aliviar tensiones', duration: '1 hora', price: '$60', icon: 'sparkles', color: 'marine', popular: true },
];

export const nextServiceId = (arr: { id: number }[]) => Math.max(0, ...arr.map(a => a.id)) + 1;

