import { motion, AnimatePresence } from 'motion/react';
import { Bell, User, LogOut, Moon, Sun, ChevronDown, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import type { ViewType } from './MainLayout';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

const notifications: Notification[] = [
  {
    id: 1,
    title: 'Nueva cita programada',
    message: 'María González ha reservado una cita para mañana a las 10:00',
    time: 'Hace 5 min',
    read: false,
    type: 'info',
  },
  {
    id: 2,
    title: 'Cita cancelada',
    message: 'Carlos Ruiz ha cancelado su cita del viernes',
    time: 'Hace 15 min',
    read: false,
    type: 'warning',
  },
  {
    id: 3,
    title: 'Pago recibido',
    message: 'Se ha procesado el pago de $150 de Laura Sánchez',
    time: 'Hace 1 hora',
    read: true,
    type: 'success',
  },
  {
    id: 4,
    title: 'Recordatorio',
    message: 'Tienes 5 citas pendientes para hoy',
    time: 'Hace 2 horas',
    read: true,
    type: 'info',
  },
];

const viewTitles: Record<ViewType, string> = {
  dashboard: 'Dashboard',
  appointments: 'Gestión de Citas',
  employees: 'Empleados',
  services: 'Servicios',
  notifications: 'Notificaciones',
  settings: 'Configuración',
};

interface TopBarProps {
  currentView: ViewType;
}

export function TopBar({ currentView }: TopBarProps) {
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-8 flex items-center justify-between macos-shadow sticky top-0 z-40">
      {/* Left side - Page Title */}
      <div className="flex-1">
        <h2 className="text-slate-900 dark:text-white">{viewTitles[currentView]}</h2>
      </div>

      {/* Right side - Notifications and User Menu */}
      <div className="flex items-center gap-3">
        {/* Notifications Dropdown */}
        <div ref={notifRef} className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
          >
            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </motion.button>

          {/* Notifications Dropdown Panel */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-96 bg-white dark:bg-slate-800 rounded-2xl macos-shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                {/* Header */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <h3 className="text-slate-900 dark:text-white">Notificaciones</h3>
                  {unreadCount > 0 && (
                    <button className="text-teal-600 dark:text-teal-400 text-sm hover:text-teal-700 dark:hover:text-teal-300">
                      Marcar todas como leídas
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-slate-100 dark:border-slate-700 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-teal-50/50 dark:bg-teal-900/10' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          notification.type === 'success' ? 'bg-emerald-500' :
                          notification.type === 'warning' ? 'bg-amber-500' :
                          'bg-blue-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="text-slate-900 dark:text-white text-sm font-medium">
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">
                            {notification.message}
                          </p>
                          <p className="text-slate-500 dark:text-slate-500 text-xs">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                  <button className="w-full text-center text-teal-600 dark:text-teal-400 text-sm hover:text-teal-700 dark:hover:text-teal-300 py-2">
                    Ver todas las notificaciones
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />

        {/* User Menu Dropdown */}
        <div ref={userRef} className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-marine-400 flex items-center justify-center">
              <span className="text-white text-sm">A</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-600 dark:text-slate-300 transition-transform ${
              showUserMenu ? 'rotate-180' : ''
            }`} />
          </motion.button>

          {/* User Menu Dropdown Panel */}
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-2xl macos-shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                {/* User Info */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-marine-400 flex items-center justify-center">
                      <span className="text-white text-lg">A</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-900 dark:text-white font-medium truncate">
                        Administrador
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm truncate">
                        admin@ejemplo.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  {/* Theme Toggle */}
                  <button
                    onClick={() => {
                      toggleTheme();
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      {theme === 'light' ? (
                        <Moon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      ) : (
                        <Sun className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      )}
                      <span className="text-slate-900 dark:text-white">
                        Modo {theme === 'light' ? 'Oscuro' : 'Claro'}
                      </span>
                    </div>
                    <div className={`w-11 h-6 rounded-full transition-colors ${
                      theme === 'dark' ? 'bg-teal-500' : 'bg-slate-300'
                    } relative`}>
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'
                      }`} />
                    </div>
                  </button>

                  {/* Divider */}
                  <div className="my-2 h-px bg-slate-200 dark:bg-slate-700" />

                  {/* Logout */}
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}