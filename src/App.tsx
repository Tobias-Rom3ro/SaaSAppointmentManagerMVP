import { useState, useEffect, createContext, useContext } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { MainLayout } from './components/MainLayout';
import { ThemeProvider } from './contexts/ThemeContext';
import { initialAppointments } from './data/appointments';
import { initialEmployees } from './data/employees';
import { initialServices } from './data/services';

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

// datos iniciales importados desde mocks

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : initialAppointments as any;
  });
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('employees');
    return saved ? JSON.parse(saved) : initialEmployees as any;
  });
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('services');
    return saved ? JSON.parse(saved) : initialServices as any;
  });

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newId = Math.max(...appointments.map(a => a.id), 0) + 1;
    setAppointments([{ ...appointment, id: newId }, ...appointments]);
  };

  const updateAppointment = (id: number, updatedData: Partial<Appointment>) => {
    setAppointments(appointments.map(apt => apt.id === id ? { ...apt, ...updatedData } : apt));
  };

  const deleteAppointment = (id: number) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newId = Math.max(...employees.map(e => e.id), 0) + 1;
    setEmployees([{ ...employee, id: newId }, ...employees]);
  };

  const updateEmployee = (id: number, updatedData: Partial<Employee>) => {
    setEmployees(employees.map(emp => emp.id === id ? { ...emp, ...updatedData } : emp));
  };

  const deleteEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const addService = (service: Omit<Service, 'id'>) => {
    const newId = Math.max(...services.map(s => s.id), 0) + 1;
    setServices([{ ...service, id: newId }, ...services]);
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

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);
  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);

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
