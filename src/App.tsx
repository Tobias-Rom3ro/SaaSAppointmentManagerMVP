import { useState, createContext, useContext } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { MainLayout } from './components/MainLayout';
import { ThemeProvider } from './contexts/ThemeContext';

// Context para manejar datos globales
interface Appointment {
  id: number;
  client: string;
  email: string;
  service: string;
  employee: string;
  date: string;
  time: string;
  duration: string;
  status: string;
  price: string;
  day?: number;
  startHour?: number;
  color?: string;
}

interface Employee {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  specialties: string[];
  rating: number;
  appointmentsToday: number;
  avatar: string;
  status: "active" | "inactive";
}

interface Service {
  id: number;
  name: string;
  category: string;
  description: string;
  duration: string;
  price: string;
  icon: string;
  color: string;
  popular: boolean;
}

interface AppContextType {
  appointments: Appointment[];
  employees: Employee[];
  services: Service[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: number, appointment: Partial<Appointment>) => void;
  deleteAppointment: (id: number) => void;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: number, employee: Partial<Employee>) => void;
  deleteEmployee: (id: number) => void;
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: number, service: Partial<Service>) => void;
  deleteService: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppData = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppData must be used within AppProvider');
  return context;
};

const initialAppointments: Appointment[] = [
  { id: 1, client: 'María González', email: 'maria@ejemplo.com', service: 'Corte de Cabello', employee: 'Ana Martínez', date: '2025-11-11', time: '09:00', duration: '1h', status: 'completed', price: '$35', day: 0, startHour: 9, color: 'teal' },
  { id: 2, client: 'Carlos Ruiz', email: 'carlos@ejemplo.com', service: 'Masaje Relajante', employee: 'Pedro López', date: '2025-11-11', time: '10:30', duration: '1.5h', status: 'in-progress', price: '$60', day: 0, startHour: 10.5, color: 'marine' },
  { id: 3, client: 'Laura Sánchez', email: 'laura@ejemplo.com', service: 'Manicura', employee: 'Sofia Torres', date: '2025-11-12', time: '11:00', duration: '1h', status: 'pending', price: '$25', day: 1, startHour: 11, color: 'amber' },
  { id: 4, client: 'Diego Morales', email: 'diego@ejemplo.com', service: 'Corte y Barba', employee: 'Ana Martínez', date: '2025-11-12', time: '14:00', duration: '1h', status: 'confirmed', price: '$45', day: 1, startHour: 14, color: 'teal' },
  { id: 5, client: 'Elena Castro', email: 'elena@ejemplo.com', service: 'Tinte', employee: 'María Flores', date: '2025-11-13', time: '15:00', duration: '2h', status: 'cancelled', price: '$80', day: 2, startHour: 15, color: 'marine' },
];

const initialEmployees: Employee[] = [
  { id: 1, name: "Ana Martínez", role: "Estilista Senior", email: "ana.martinez@ejemplo.com", phone: "+34 600 111 111", specialties: ["Corte", "Peinado", "Barba"], rating: 4.9, appointmentsToday: 8, avatar: "A", status: "active" },
  { id: 2, name: "Pedro López", role: "Masajista Profesional", email: "pedro.lopez@ejemplo.com", phone: "+34 600 222 222", specialties: ["Masaje Relajante", "Masaje Deportivo"], rating: 4.8, appointmentsToday: 6, avatar: "P", status: "active" },
  { id: 3, name: "Sofia Torres", role: "Especialista en Estética", email: "sofia.torres@ejemplo.com", phone: "+34 600 333 333", specialties: ["Manicura", "Pedicura", "Facial"], rating: 4.7, appointmentsToday: 7, avatar: "S", status: "active" },
  { id: 4, name: "María Flores", role: "Colorista", email: "maria.flores@ejemplo.com", phone: "+34 600 444 444", specialties: ["Tinte", "Mechas", "Balayage"], rating: 4.9, appointmentsToday: 5, avatar: "M", status: "active" },
];

const initialServices: Service[] = [
  { id: 1, name: 'Corte de Cabello', category: 'Peluquería', description: 'Corte de cabello profesional adaptado a tu estilo', duration: '45 min', price: '$35', icon: 'scissors', color: 'teal', popular: true },
  { id: 2, name: 'Corte y Barba', category: 'Peluquería', description: 'Servicio completo de corte de cabello y arreglo de barba', duration: '1 hora', price: '$45', icon: 'scissors', color: 'teal', popular: true },
  { id: 3, name: 'Tinte', category: 'Coloración', description: 'Tinte profesional con productos de alta calidad', duration: '2 horas', price: '$80', icon: 'sparkles', color: 'marine', popular: false },
  { id: 4, name: 'Manicura', category: 'Estética', description: 'Cuidado completo de manos y uñas', duration: '45 min', price: '$25', icon: 'sparkles', color: 'teal', popular: false },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [services, setServices] = useState<Service[]>(initialServices);

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newId = Math.max(...appointments.map(a => a.id), 0) + 1;
    setAppointments([...appointments, { ...appointment, id: newId }]);
  };

  const updateAppointment = (id: number, updatedData: Partial<Appointment>) => {
    setAppointments(appointments.map(apt => apt.id === id ? { ...apt, ...updatedData } : apt));
  };

  const deleteAppointment = (id: number) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newId = Math.max(...employees.map(e => e.id), 0) + 1;
    setEmployees([...employees, { ...employee, id: newId }]);
  };

  const updateEmployee = (id: number, updatedData: Partial<Employee>) => {
    setEmployees(employees.map(emp => emp.id === id ? { ...emp, ...updatedData } : emp));
  };

  const deleteEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const addService = (service: Omit<Service, 'id'>) => {
    const newId = Math.max(...services.map(s => s.id), 0) + 1;
    setServices([...services, { ...service, id: newId }]);
  };

  const updateService = (id: number, updatedData: Partial<Service>) => {
    setServices(services.map(srv => srv.id === id ? { ...srv, ...updatedData } : srv));
  };

  const deleteService = (id: number) => {
    setServices(services.filter(srv => srv.id !== id));
  };

  const contextValue: AppContextType = {
    appointments,
    employees,
    services,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    addService,
    updateService,
    deleteService,
  };

  return (
    <ThemeProvider>
      <AppContext.Provider value={contextValue}>
        {!isLoggedIn ? (
          <LoginScreen onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <MainLayout />
        )}
      </AppContext.Provider>
    </ThemeProvider>
  );
}