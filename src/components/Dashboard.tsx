import { motion } from 'motion/react';
import { Calendar, Users, DollarSign, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';

const stats = [
  {
    label: 'Citas Hoy',
    value: '24',
    change: '+12%',
    trend: 'up',
    icon: Calendar,
    color: 'teal',
  },
  {
    label: 'Clientes Activos',
    value: '342',
    change: '+8%',
    trend: 'up',
    icon: Users,
    color: 'marine',
  },
  {
    label: 'Ingresos del Mes',
    value: '$12,450',
    change: '+23%',
    trend: 'up',
    icon: DollarSign,
    color: 'teal',
  },
  {
    label: 'Tasa de Ocupación',
    value: '87%',
    change: '+5%',
    trend: 'up',
    icon: TrendingUp,
    color: 'marine',
  },
];

const recentAppointments = [
  { id: 1, client: 'María González', service: 'Corte de Cabello', time: '09:00', status: 'completed', employee: 'Ana Martínez' },
  { id: 2, client: 'Carlos Ruiz', service: 'Masaje Relajante', time: '10:30', status: 'in-progress', employee: 'Pedro López' },
  { id: 3, client: 'Laura Sánchez', service: 'Manicura', time: '11:00', status: 'pending', employee: 'Sofia Torres' },
  { id: 4, client: 'Diego Morales', service: 'Corte y Barba', time: '12:00', status: 'pending', employee: 'Ana Martínez' },
  { id: 5, client: 'Elena Castro', service: 'Tinte', time: '14:00', status: 'cancelled', employee: 'María Flores' },
];

const upcomingAppointments = [
  { time: '13:00', client: 'Roberto Díaz', service: 'Corte de Cabello' },
  { time: '14:30', client: 'Patricia Vega', service: 'Pedicura' },
  { time: '15:00', client: 'Andrés Silva', service: 'Masaje' },
  { time: '16:00', client: 'Carmen Ortiz', service: 'Facial' },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'completed':
      return { label: 'Completada', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400', icon: CheckCircle };
    case 'in-progress':
      return { label: 'En Progreso', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400', icon: Clock };
    case 'pending':
      return { label: 'Pendiente', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400', icon: AlertCircle };
    case 'cancelled':
      return { label: 'Cancelada', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400', icon: XCircle };
    default:
      return { label: status, color: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300', icon: AlertCircle };
  }
};

type DashboardProps = {
  onGoToAppointments?: () => void
};

export function Dashboard({ onGoToAppointments }: DashboardProps) {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-slate-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Bienvenido de nuevo, aquí está tu resumen de hoy</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 macos-shadow hover:shadow-lg transition-shadow duration-300 border-0 bg-white dark:bg-slate-800">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                    stat.color === 'teal' ? 'from-teal-500 to-teal-600' : 'from-marine-500 to-marine-600'
                  } flex items-center justify-center macos-shadow`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-slate-900 dark:text-white mb-1">{stat.value}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{stat.label}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <div className="lg:col-span-2">
          <Card className="p-6 macos-shadow border-0 bg-white dark:bg-slate-800">
            <h3 className="text-slate-900 dark:text-white mb-6">Citas Recientes</h3>
            <div className="space-y-3">
              {recentAppointments.map((appointment) => {
                const statusConfig = getStatusConfig(appointment.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <motion.div
                    key={appointment.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-marine-400 flex items-center justify-center">
                        <span className="text-white text-sm">{appointment.client.charAt(0)}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-900 dark:text-white truncate">{appointment.client}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm truncate">{appointment.service} • {appointment.employee}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-900 dark:text-white">{appointment.time}</p>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs mt-1 ${statusConfig.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Upcoming Appointments */}
        <div>
          <Card className="p-6 macos-shadow border-0 bg-white dark:bg-slate-800">
            <h3 className="text-slate-900 dark:text-white mb-6">Próximas Citas</h3>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="px-2 py-1 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400">
                      {appointment.time}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-900 dark:text-white truncate">{appointment.client}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm truncate">{appointment.service}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 macos-shadow border-0 bg-gradient-to-br from-teal-500 to-marine-500">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <h3 className="mb-2">¿Listo para programar?</h3>
            <p className="text-white/80">Crea una nueva cita o gestiona las existentes</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              className="px-6 py-3 bg-white text-teal-600 rounded-xl macos-shadow hover:bg-slate-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Nueva Cita
            </motion.button>
            <motion.button
              className="px-6 py-3 bg-white/20 backdrop-blur text-white rounded-xl hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGoToAppointments}
            >
              Ver Calendario
            </motion.button>
          </div>
        </div>
      </Card>
    </div>
  );
}