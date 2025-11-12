import { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, Calendar, User, DollarSign, AlertCircle, CheckCircle, Info, Trash2, Check } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Notification {
  id: number;
  type: 'appointment' | 'payment' | 'user' | 'alert' | 'success' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: 'appointment',
    title: 'Nueva cita programada',
    message: 'María González ha reservado un corte de cabello para mañana a las 10:00',
    time: 'Hace 5 minutos',
    read: false,
  },
  {
    id: 2,
    type: 'alert',
    title: 'Cita cancelada',
    message: 'Carlos Ruiz ha cancelado su cita de masaje programada para hoy',
    time: 'Hace 15 minutos',
    read: false,
  },
  {
    id: 3,
    type: 'payment',
    title: 'Pago recibido',
    message: 'Se ha procesado un pago de $80 por el servicio de tinte',
    time: 'Hace 1 hora',
    read: true,
  },
  {
    id: 4,
    type: 'user',
    title: 'Nuevo cliente registrado',
    message: 'Laura Sánchez se ha registrado en la plataforma',
    time: 'Hace 2 horas',
    read: true,
  },
  {
    id: 5,
    type: 'success',
    title: 'Cita completada',
    message: 'Ana Martínez ha completado la cita con Diego Morales',
    time: 'Hace 3 horas',
    read: true,
  },
  {
    id: 6,
    type: 'info',
    title: 'Recordatorio',
    message: 'Tienes 5 citas pendientes de confirmación para esta semana',
    time: 'Hace 4 horas',
    read: true,
  },
  {
    id: 7,
    type: 'appointment',
    title: 'Cita modificada',
    message: 'Elena Castro ha cambiado su cita del jueves al viernes',
    time: 'Hace 5 horas',
    read: true,
  },
  {
    id: 8,
    type: 'alert',
    title: 'Inventario bajo',
    message: 'El stock de productos para tinte está por debajo del mínimo',
    time: 'Hace 1 día',
    read: true,
  },
];

const getNotificationConfig = (type: string) => {
  switch (type) {
    case 'appointment':
      return { icon: Calendar, color: 'bg-teal-100 text-teal-600', iconBg: 'bg-teal-500' };
    case 'payment':
      return { icon: DollarSign, color: 'bg-emerald-100 text-emerald-600', iconBg: 'bg-emerald-500' };
    case 'user':
      return { icon: User, color: 'bg-marine-100 text-marine-600', iconBg: 'bg-marine-500' };
    case 'alert':
      return { icon: AlertCircle, color: 'bg-red-100 text-red-600', iconBg: 'bg-red-500' };
    case 'success':
      return { icon: CheckCircle, color: 'bg-emerald-100 text-emerald-600', iconBg: 'bg-emerald-500' };
    case 'info':
      return { icon: Info, color: 'bg-blue-100 text-blue-600', iconBg: 'bg-blue-500' };
    default:
      return { icon: Bell, color: 'bg-slate-100 text-slate-600', iconBg: 'bg-slate-500' };
  }
};

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications;

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-slate-900 dark:text-slate-100 mb-2">Notificaciones</h1>
            <p className="text-slate-600 dark:text-slate-400">
              {unreadCount > 0
                  ? `Tienes ${unreadCount} notificaciones sin leer`
                  : 'No tienes notificaciones sin leer'}
            </p>
          </div>

          {unreadCount > 0 && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                    onClick={markAllAsRead}
                    variant="outline"
                    className="px-6 h-11 rounded-xl border-slate-200 dark:border-slate-700
                       text-slate-700 dark:text-slate-100
                       bg-white dark:bg-slate-800"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Marcar todas como leídas
                </Button>
              </motion.div>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1 rounded-xl macos-shadow border border-slate-200 dark:border-slate-700 inline-flex">
          <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg transition-all ${
                  filter === 'all'
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white macos-shadow dark:from-teal-400 dark:to-sky-500'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100'
              }`}
          >
            Todas
          </button>

          <button
              onClick={() => setFilter('unread')}
              className={`px-6 py-2 rounded-lg transition-all relative ${
                  filter === 'unread'
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white macos-shadow dark:from-teal-400 dark:to-sky-500'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100'
              }`}
          >
            Sin leer
            {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 dark:bg-red-400 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
            )}
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
              <Card className="p-12 macos-shadow border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-slate-400 dark:text-slate-300" />
                </div>
                <h3 className="text-slate-900 dark:text-slate-100 mb-2">No hay notificaciones</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Cuando recibas notificaciones, aparecerán aquí
                </p>
              </Card>
          ) : (
              filteredNotifications.map((notification, index) => {
                const config = getNotificationConfig(notification.type);
                const Icon = config.icon;

                return (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                      <Card
                          onClick={() => markAsRead(notification.id)}
                          className={`p-5 macos-shadow hover:shadow-lg transition-all duration-300 cursor-pointer group border
                  ${
                              notification.read
                                  ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                                  : // versión "unread" con gradiente para claro y un ligero realce en oscuro
                                  'bg-gradient-to-r from-teal-50 to-sky-50 dark:from-slate-800 dark:to-slate-700 border-transparent'
                          }`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 macos-shadow
                      ${
                                  // permite que tu getNotificationConfig siga definiendo el fondo del ícono
                                  // agrega variantes dark comunes si config.iconBg usa colores claros
                                  config.iconBg ||
                                  'bg-teal-500 dark:bg-teal-500'
                              }`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h4 className="text-slate-900 dark:text-slate-100">{notification.title}</h4>
                              {!notification.read && (
                                  <div className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 flex-shrink-0 mt-2" />
                              )}
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">
                              {notification.message}
                            </p>
                            <p className="text-slate-400 dark:text-slate-400 text-xs">
                              {notification.time}
                            </p>
                          </div>

                          {/* Delete Button */}
                          <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg
                               hover:bg-red-50 dark:hover:bg-red-950/30"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              aria-label="Eliminar"
                          >
                            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </motion.button>
                        </div>
                      </Card>
                    </motion.div>
                );
              })
          )}
      </div>

  {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6">
        <Card className="p-6 macos-shadow border-0 bg-gradient-to-br from-teal-500 to-teal-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8" />
            <span className="text-2xl">12</span>
          </div>
          <p className="text-white/90">Citas Hoy</p>
        </Card>

        <Card className="p-6 macos-shadow border-0 bg-gradient-to-br from-marine-500 to-marine-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8" />
            <span className="text-2xl">8</span>
          </div>
          <p className="text-white/90">Pagos Pendientes</p>
        </Card>

        <Card className="p-6 macos-shadow border-0 bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="w-8 h-8" />
            <span className="text-2xl">3</span>
          </div>
          <p className="text-white/90">Alertas Activas</p>
        </Card>

        <Card className="p-6 macos-shadow border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8" />
            <span className="text-2xl">45</span>
          </div>
          <p className="text-white/90">Completadas</p>
        </Card>
      </div>
    </div>
  );
}
