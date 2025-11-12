import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { Dashboard } from './Dashboard';
import { AppointmentsModule } from './AppointmentsModule';
import { EmployeesModule } from './EmployeesModule';
import { ServicesModule } from './ServicesModule';
import { NotificationsPanel } from './NotificationsPanel';
import { SettingsPanel } from './SettingsPanel';

export type ViewType = 'dashboard' | 'appointments' | 'employees' | 'services' | 'notifications' | 'settings';

export function MainLayout() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
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
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar currentView={currentView} />
        <main className="flex-1 overflow-auto">
          <div className="min-h-full">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
}