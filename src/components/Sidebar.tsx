import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Briefcase, 
  Bell, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import type { ViewType } from './MainLayout';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const menuItems = [
  { id: 'dashboard' as ViewType, label: 'Dashboard', icon: LayoutDashboard, badge: null },
  { id: 'appointments' as ViewType, label: 'Citas', icon: Calendar, badge: null },
  { id: 'employees' as ViewType, label: 'Empleados', icon: Users, badge: null },
  { id: 'services' as ViewType, label: 'Servicios', icon: Briefcase, badge: null },
  { id: 'notifications' as ViewType, label: 'Notificaciones', icon: Bell, badge: null },
  { id: 'settings' as ViewType, label: 'Configuración', icon: Settings, badge: null },
];

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 288 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col macos-shadow relative"
    >
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 z-50 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center macos-shadow hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
        )}
      </motion.button>

      {/* Header */}
      <div className="p-8 border-b border-slate-200 dark:border-slate-700">
        <div className={`flex items-center ${isCollapsed ? 'justify-center gap-0' : 'gap-3'}`}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-marine-500 flex items-center justify-center macos-shadow flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-slate-900 dark:text-white whitespace-nowrap">La Estación</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs whitespace-nowrap">Barbershop</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 flex flex-col gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center gap-0 px-0' : 'gap-3 px-4'} py-3 rounded-xl transition-all duration-200 relative group ${
                isActive
                  ? 'bg-gradient-to-r from-teal-500 to-marine-500 text-white macos-shadow'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
              } ${isCollapsed ? 'justify-center' : ''}`}
              whileHover={{ x: isActive || isCollapsed ? 0 : 4 }}
              whileTap={{ scale: 0.98 }}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 dark:bg-slate-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 macos-shadow">
                  {item.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900 dark:border-r-slate-700" />
                </div>
              )}
            </motion.button>
          );
        })}
        {isCollapsed && (
          <div className="mt-auto flex justify-center pt-4">
            <img src="/logo.png" alt="SphereUp" className="w-6 h-6 object-contain" />
          </div>
        )}
      </nav>

      {/* Footer Info */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="p-4 border-t border-slate-200 dark:border-slate-700"
        >
          <div className="px-4 py-3 bg-gradient-to-br from-teal-50 to-marine-50 dark:from-teal-900/20 dark:to-marine-900/20 rounded-xl">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="SphereUp" className="w-5 h-5 object-contain" />
              <div>
                <p className="text-slate-900 dark:text-white text-sm mb-1">SphereUp</p>
                <p className="text-slate-600 dark:text-slate-400 text-xs">Todos los derechos reservados.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
}
