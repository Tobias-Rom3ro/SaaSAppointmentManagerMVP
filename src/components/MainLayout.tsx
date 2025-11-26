import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { Dashboard } from './Dashboard';
import { AppointmentsModule } from './AppointmentsModule';
import { EmployeesModule } from './EmployeesModule';
import { ServicesModule } from './ServicesModule';
import { NotificationsPanel } from './NotificationsPanel';
import { SettingsPanel } from './SettingsPanel';
import {LoginScreen} from "./LoginScreen";
import { useEffect } from 'react';
import { useAppData } from '../App';

export type ViewType = 'dashboard' | 'appointments' | 'employees' | 'services' | 'notifications' | 'settings' | 'login';

export function MainLayout() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const handleLoggedIn = () => setCurrentView('dashboard')
  const { settings } = useAppData();

  useEffect(() => {
    const titles: Record<ViewType, string> = {
      dashboard: 'Dashboard',
      appointments: 'Citas',
      employees: 'Empleados',
      services: 'Servicios',
      notifications: 'Notificaciones',
      settings: 'Configuración',
      login: 'Login',
    };
    document.title = `${titles[currentView]} — ${settings.businessName}`;
  }, [currentView, settings.businessName]);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onGoToAppointments={() => setCurrentView('appointments')} />;
      case 'appointments':
        return <AppointmentsModule />;
      case 'employees':
        return <EmployeesModule />;
      case 'services':
        return <ServicesModule />;
      case 'notifications':
        return <NotificationsPanel />;
      case 'settings':
        return <SettingsPanel />;
      case 'login':
        return <LoginScreen onLogin={handleLoggedIn} />
      default:
        return <Dashboard />;
    }
  };

  const isAuthView = currentView !== 'login'
  return (
      <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
        {isAuthView && <Sidebar currentView={currentView} onViewChange={setCurrentView} />}
        <div className="flex-1 flex flex-col overflow-hidden">
          {isAuthView && <TopBar currentView={currentView} onLogout={() => setCurrentView('login')} onGoToNotifications={() => setCurrentView('notifications')} />}
          <main className="flex-1 overflow-auto">
            <div className="min-h-full">{renderView()}</div>
          </main>
        </div>
      </div>
  );
}
