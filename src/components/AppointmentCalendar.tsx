import { useState } from 'react';
import { motion } from 'motion/react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 8:00 to 20:00
const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

interface Appointment {
  id: number;
  client: string;
  service: string;
  employee: string;
  day: number;
  startHour: number;
  duration: number;
  status: string;
  color: string;
}

const initialAppointments: Appointment[] = [
  { id: 1, client: 'María G.', service: 'Corte', employee: 'Ana M.', day: 0, startHour: 9, duration: 1, status: 'confirmed', color: 'teal' },
  { id: 2, client: 'Carlos R.', service: 'Masaje', employee: 'Pedro L.', day: 0, startHour: 10.5, duration: 1.5, status: 'confirmed', color: 'marine' },
  { id: 3, client: 'Laura S.', service: 'Manicura', employee: 'Sofia T.', day: 1, startHour: 11, duration: 1, status: 'pending', color: 'amber' },
  { id: 4, client: 'Diego M.', service: 'Corte y Barba', employee: 'Ana M.', day: 1, startHour: 14, duration: 1, status: 'confirmed', color: 'teal' },
  { id: 5, client: 'Elena C.', service: 'Tinte', employee: 'María F.', day: 2, startHour: 15, duration: 2, status: 'confirmed', color: 'marine' },
  { id: 6, client: 'Roberto D.', service: 'Facial', employee: 'Sofia T.', day: 3, startHour: 10, duration: 1.5, status: 'confirmed', color: 'teal' },
  { id: 7, client: 'Patricia V.', service: 'Pedicura', employee: 'Ana M.', day: 4, startHour: 13, duration: 1, status: 'pending', color: 'amber' },
];

interface AppointmentCardProps {
  appointment: Appointment;
  onClick: (appointment: Appointment) => void;
}

function AppointmentCard({ appointment, onClick }: AppointmentCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'appointment',
    item: appointment,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'teal':
        return 'bg-teal-500 border-teal-600 text-white';
      case 'marine':
        return 'bg-marine-500 border-marine-600 text-white';
      case 'amber':
        return 'bg-amber-400 border-amber-500 text-amber-900';
      default:
        return 'bg-slate-500 border-slate-600 text-white';
    }
  };

  return (
    <motion.div
      ref={drag}
      className={`p-2 rounded-lg border-l-4 cursor-move ${getColorClasses(appointment.color)} ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } macos-shadow hover:shadow-lg transition-shadow`}
      style={{
        height: `${appointment.duration * 60}px`,
      }}
      onClick={() => onClick(appointment)}
      whileHover={{ scale: 1.02 }}
    >
      <p className="text-xs mb-1 truncate">{appointment.client}</p>
      <p className="text-xs opacity-90 truncate">{appointment.service}</p>
    </motion.div>
  );
}

interface TimeSlotProps {
  day: number;
  hour: number;
  onDrop: (appointment: Appointment, day: number, hour: number) => void;
}

function TimeSlot({ day, hour, onDrop }: TimeSlotProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'appointment',
    drop: (item: Appointment) => onDrop(item, day, hour),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`border-b border-r border-slate-200 dark:border-slate-700 transition-colors ${
        isOver ? 'bg-teal-50 dark:bg-teal-900/20' : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50'
      }`}
      style={{ height: '60px' }}
    />
  );
}

interface AppointmentCalendarProps {
  onAppointmentClick: (appointment: any) => void;
}

export function AppointmentCalendar({ onAppointmentClick }: AppointmentCalendarProps) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [currentWeek, setCurrentWeek] = useState(0);

  const handleDrop = (appointment: Appointment, newDay: number, newHour: number) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointment.id
          ? { ...apt, day: newDay, startHour: newHour }
          : apt
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Card className="p-6 macos-shadow border-0 bg-white dark:bg-slate-800 overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-slate-900 dark:text-white">Semana del 11 - 17 Nov 2025</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentWeek(currentWeek - 1)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
            <button className="px-4 py-2 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors">
              Hoy
            </button>
            <button
              onClick={() => setCurrentWeek(currentWeek + 1)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Days Header */}
            <div className="grid grid-cols-8 border-b border-slate-200 dark:border-slate-700">
              <div className="p-3 border-r border-slate-200 dark:border-slate-700" />
              {DAYS.map((day, index) => (
                <div
                  key={day}
                  className="p-3 text-center border-r border-slate-200 dark:border-slate-700 last:border-r-0"
                >
                  <p className="text-slate-900 dark:text-white">{day}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">{11 + index} Nov</p>
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="relative">
              <div className="grid grid-cols-8">
                {/* Hours Column */}
                <div className="border-r border-slate-200 dark:border-slate-700">
                  {HOURS.map((hour) => (
                    <div
                      key={hour}
                      className="h-[60px] p-2 text-right border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm"
                    >
                      {hour}:00
                    </div>
                  ))}
                </div>

                {/* Days Columns */}
                {DAYS.map((_, dayIndex) => (
                  <div key={dayIndex} className="relative">
                    {HOURS.map((hour) => (
                      <TimeSlot
                        key={`${dayIndex}-${hour}`}
                        day={dayIndex}
                        hour={hour}
                        onDrop={handleDrop}
                      />
                    ))}

                    {/* Appointments */}
                    <div className="absolute inset-0 pointer-events-none">
                      {appointments
                        .filter((apt) => apt.day === dayIndex)
                        .map((apt) => (
                          <div
                            key={apt.id}
                            className="absolute left-1 right-1 pointer-events-auto"
                            style={{
                              top: `${(apt.startHour - 8) * 60}px`,
                            }}
                          >
                            <AppointmentCard
                              appointment={apt}
                              onClick={onAppointmentClick}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 flex items-center gap-6">
          <p className="text-slate-600 dark:text-slate-400 text-sm">Estado:</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-teal-500" />
              <span className="text-slate-600 dark:text-slate-400 text-sm">Confirmada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-amber-400" />
              <span className="text-slate-600 dark:text-slate-400 text-sm">Pendiente</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-marine-500" />
              <span className="text-slate-600 dark:text-slate-400 text-sm">En Progreso</span>
            </div>
          </div>
        </div>
      </Card>
    </DndProvider>
  );
}