import { motion } from 'motion/react';
import { CheckCircle, Clock, XCircle, AlertCircle, MoreVertical } from 'lucide-react';
import { Card } from './ui/card';

const appointments = [
  { id: 1, client: 'María González', email: 'maria@ejemplo.com', service: 'Corte de Cabello', employee: 'Ana Martínez', date: '2025-11-11', time: '09:00', duration: '1h', status: 'completed', price: '$35' },
  { id: 2, client: 'Carlos Ruiz', email: 'carlos@ejemplo.com', service: 'Masaje Relajante', employee: 'Pedro López', date: '2025-11-11', time: '10:30', duration: '1.5h', status: 'in-progress', price: '$60' },
  { id: 3, client: 'Laura Sánchez', email: 'laura@ejemplo.com', service: 'Manicura', employee: 'Sofia Torres', date: '2025-11-12', time: '11:00', duration: '1h', status: 'pending', price: '$25' },
  { id: 4, client: 'Diego Morales', email: 'diego@ejemplo.com', service: 'Corte y Barba', employee: 'Ana Martínez', date: '2025-11-12', time: '14:00', duration: '1h', status: 'pending', price: '$45' },
  { id: 5, client: 'Elena Castro', email: 'elena@ejemplo.com', service: 'Tinte', employee: 'María Flores', date: '2025-11-13', time: '15:00', duration: '2h', status: 'cancelled', price: '$80' },
  { id: 6, client: 'Roberto Díaz', email: 'roberto@ejemplo.com', service: 'Facial', employee: 'Sofia Torres', date: '2025-11-14', time: '10:00', duration: '1.5h', status: 'confirmed', price: '$55' },
  { id: 7, client: 'Patricia Vega', email: 'patricia@ejemplo.com', service: 'Pedicura', employee: 'Ana Martínez', date: '2025-11-15', time: '13:00', duration: '1h', status: 'pending', price: '$30' },
  { id: 8, client: 'Andrés Silva', email: 'andres@ejemplo.com', service: 'Masaje Deportivo', employee: 'Pedro López', date: '2025-11-15', time: '15:00', duration: '1h', status: 'confirmed', price: '$70' },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'completed':
      return { label: 'Completada', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-700', icon: CheckCircle };
    case 'in-progress':
      return { label: 'En Progreso', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-700', icon: Clock };
    case 'pending':
      return { label: 'Pendiente', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-700', icon: AlertCircle };
    case 'confirmed':
      return { label: 'Confirmada', color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-700', icon: CheckCircle };
    case 'cancelled':
      return { label: 'Cancelada', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-700', icon: XCircle };
    default:
      return { label: status, color: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600', icon: AlertCircle };
  }
};

interface AppointmentTableProps {
  onAppointmentClick: (appointment: any) => void;
}

export function AppointmentTable({ onAppointmentClick }: AppointmentTableProps) {
  return (
    <Card className="macos-shadow border-0 bg-white dark:bg-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
              <th className="text-left p-4 text-slate-700 dark:text-slate-300">Cliente</th>
              <th className="text-left p-4 text-slate-700 dark:text-slate-300">Servicio</th>
              <th className="text-left p-4 text-slate-700 dark:text-slate-300">Empleado</th>
              <th className="text-left p-4 text-slate-700 dark:text-slate-300">Fecha</th>
              <th className="text-left p-4 text-slate-700 dark:text-slate-300">Hora</th>
              <th className="text-left p-4 text-slate-700 dark:text-slate-300">Duración</th>
              <th className="text-left p-4 text-slate-700 dark:text-slate-300">Estado</th>
              <th className="text-left p-4 text-slate-700 dark:text-slate-300">Precio</th>
              <th className="text-left p-4 text-slate-700 dark:text-slate-300"></th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => {
              const statusConfig = getStatusConfig(appointment.status);
              const StatusIcon = statusConfig.icon;

              return (
                <motion.tr
                  key={appointment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
                  onClick={() => onAppointmentClick(appointment)}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-marine-400 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">{appointment.client.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-slate-900 dark:text-white">{appointment.client}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">{appointment.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-slate-900 dark:text-white">{appointment.service}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-slate-700 dark:text-slate-300">{appointment.employee}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-slate-700 dark:text-slate-300">{appointment.date}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-slate-700 dark:text-slate-300">{appointment.time}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-slate-700 dark:text-slate-300">{appointment.duration}</p>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${statusConfig.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      <span className="text-sm">{statusConfig.label}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-slate-900 dark:text-white">{appointment.price}</p>
                  </td>
                  <td className="p-4">
                    <button
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <MoreVertical className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}