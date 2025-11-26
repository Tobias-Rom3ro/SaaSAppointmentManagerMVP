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

export type ViewType = 'dashboard' | 'appointments' | 'employees' | 'services' | 'notifications' | 'settings' | 'login';

export function MainLayout() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const handleLoggedIn = () => setCurrentView('dashboard')

  useEffect(() => {
    const titles: Record<ViewType, string> = {
      dashboard: 'Dashboard — SphereUp',
      appointments: 'Citas — SphereUp',
      employees: 'Empleados — SphereUp',
      services: 'Servicios — SphereUp',
      notifications: 'Notificaciones — SphereUp',
      settings: 'Configuración — SphereUp',
      login: 'Login — SphereUp',
    };
    document.title = titles[currentView] || 'SphereUp';
  }, [currentView]);

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
          {isAuthView && <TopBar currentView={currentView} onLogout={() => setCurrentView('login')} />}
          <main className="flex-1 overflow-auto">
            <div className="min-h-full">{renderView()}</div>
          </main>
        </div>
      </div>
  );
}
