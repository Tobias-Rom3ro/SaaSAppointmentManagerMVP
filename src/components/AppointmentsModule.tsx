import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, Search, Filter, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { AppointmentCalendar } from './AppointmentCalendar';
import { AppointmentTable } from './AppointmentTable';
import { AppointmentModal } from './AppointmentModal';

type ViewMode = 'calendar' | 'table';

export function AppointmentsModule() {
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAppointmentClick = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 dark:text-white mb-2">Gestión de Citas</h1>
          <p className="text-slate-600 dark:text-slate-400">Administra y programa citas de tus clientes</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-gradient-to-r from-teal-500 to-marine-500 hover:from-teal-600 hover:to-marine-600 text-white px-6 h-11 rounded-xl macos-shadow">
            <Plus className="w-5 h-5 mr-2" />
            Nueva Cita
          </Button>
        </motion.div>
      </div>

      {/* Filters and View Toggle */}
      <Card className="p-4 macos-shadow border-0 bg-white dark:bg-slate-800">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
              <Input
                placeholder="Buscar citas, clientes, servicios..."
                className="pl-10 h-10 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400"
              />
            </div>
            <Button variant="outline" className="h-10 px-4 rounded-xl border-slate-200 dark:border-slate-600 dark:text-slate-300">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg transition-all ${
                viewMode === 'calendar'
                  ? 'bg-white dark:bg-slate-600 text-teal-600 dark:text-teal-400 macos-shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-lg transition-all ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-600 text-teal-600 dark:text-teal-400 macos-shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* View Content */}
      <motion.div
        key={viewMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {viewMode === 'calendar' ? (
          <AppointmentCalendar onAppointmentClick={handleAppointmentClick} />
        ) : (
          <AppointmentTable onAppointmentClick={handleAppointmentClick} />
        )}
      </motion.div>

      {/* Appointment Detail Modal */}
      <AppointmentModal
        appointment={selectedAppointment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
