import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { useAppData } from '../App';

// hours will be computed from settings
const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

interface CalendarAppointment {
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

interface AppointmentCardProps {
  appointment: CalendarAppointment;
  onClick: (appointment: CalendarAppointment) => void;
}

function AppointmentCard({ appointment, onClick }: AppointmentCardProps) {
  const canDrag = appointment.status !== 'completed' && appointment.status !== 'cancelled' && appointment.status !== 'no-show'
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'appointment',
    item: appointment,
    canDrag: () => canDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [appointment]);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'teal':
        return 'bg-teal-500 border-teal-600 text-white';
      case 'marine':
        return 'bg-marine-500 border-marine-600 text-white';
      case 'amber':
        return 'bg-amber-400 border-amber-500 text-amber-900';
      case 'emerald':
        return 'bg-emerald-500 border-emerald-600 text-white';
      case 'red':
        return 'bg-red-500 border-red-600 text-white';
      default:
        return 'bg-slate-500 border-slate-600 text-white';
    }
  };

  return (
      <motion.div
          ref={canDrag ? (dragRef as any) : undefined}
          className={`p-2 rounded-lg border-l-4 ${canDrag ? 'cursor-move' : 'cursor-not-allowed'} ${getColorClasses(appointment.color)} ${
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
  appointmentsDay: CalendarAppointment[];
  openHour: number;
  closeHour: number;
  onDrop: (appointment: CalendarAppointment, day: number, hour: number) => void;
}

function TimeSlot({ day, hour, appointmentsDay, openHour, closeHour, onDrop }: TimeSlotProps) {
  const fits = (item: CalendarAppointment) => {
    const dur = item.duration;
    const end = hour + dur;
    if (hour < openHour || end > closeHour) return false;
    for (const apt of appointmentsDay) {
      if (apt.id === item.id) continue;
      const aStart = apt.startHour;
      const aEnd = apt.startHour + apt.duration;
      // overlap if intervals intersect
      if (!(end <= aStart || hour >= aEnd)) return false;
    }
    return true;
  };
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'appointment',
    canDrop: (item: CalendarAppointment) => fits(item),
    drop: (item: CalendarAppointment, monitor) => {
      if (monitor.canDrop()) onDrop(item, day, hour);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [day, hour, appointmentsDay, openHour, closeHour, onDrop]);

  return (
      <div
          ref={dropRef as any}
          className={`border-b border-r border-slate-200 dark:border-slate-700 transition-colors ${
              isOver ? 'bg-teal-50 dark:bg-teal-900/20' : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50'
          }`}
          style={{ height: '60px' }}
      />
  );
}

interface AppointmentCalendarProps {
  onAppointmentClick: (appointment: any) => void;
  filters?: { statuses: string[]; q: string };
}

export function AppointmentCalendar({ onAppointmentClick, filters }: AppointmentCalendarProps) {
  const { appointments: ctxAppointments, updateAppointment, settings } = useAppData();
  const appointments = useMemo<CalendarAppointment[]>(() => {
    const parseDuration = (d: string) => {
      if (!d) return 1;
      if (d.includes('hora')) return 1;
      if (d.includes('min')) {
        const n = parseFloat(d);
        return isNaN(n) ? 1 : n / 60;
      }
      if (d.includes('1.5')) return 1.5;
      if (d.includes('2')) return 2;
      const num = parseFloat(d);
      return isNaN(num) ? 1 : num;
    };
    const filtered = ctxAppointments.filter(a => {
      const statusOk = !filters?.statuses?.length || filters.statuses.includes(a.status);
      const q = (filters?.q || '').toLowerCase();
      const qOk = !q || [a.client, a.service, a.employee, a.email].some(x => String(x).toLowerCase().includes(q));
      if (a.status === 'cancelled') return false;
      return statusOk && qOk;
    });
    return filtered.map(a => {
      const t = a.time || '09:00';
      const [hh, mm] = t.split(':');
      const startHour = typeof a.startHour === 'number' ? a.startHour : (parseInt(hh) + (parseInt(mm) || 0) / 60);
      return {
        id: a.id,
        client: a.client,
        service: a.service,
        employee: a.employee,
        day: typeof a.day === 'number' ? a.day : 0,
        startHour,
        duration: parseDuration(a.duration),
        status: a.status,
        color: a.status === 'no-show' ? 'red' : (a.status === 'completed' ? 'emerald' : (a.color || 'teal')),
      };
    });
  }, [ctxAppointments]);
  const [currentWeek, setCurrentWeek] = useState(0);
  const openHour = useMemo(() => Number(settings.openTime.split(':')[0]), [settings.openTime]);
  const hours = useMemo(() => {
    const [oh] = settings.openTime.split(':').map(Number);
    const [ch] = settings.closeTime.split(':').map(Number);
    const start = oh;
    const end = ch;
    return Array.from({ length: Math.max(1, end - start + 1) }, (_, i) => start + i);
  }, [settings.openTime, settings.closeTime]);

  const handleDrop = (appointment: CalendarAppointment, newDay: number, newHour: number) => {
    const today = new Date();
    const weekStart = new Date(today);
    const dayOfWeek = (weekStart.getDay() + 6) % 7;
    weekStart.setDate(weekStart.getDate() - dayOfWeek + currentWeek * 7);
    const dropDate = new Date(weekStart);
    dropDate.setDate(weekStart.getDate() + newDay);
    const y = dropDate.getFullYear();
    const m = String(dropDate.getMonth() + 1).padStart(2, '0');
    const d = String(dropDate.getDate()).padStart(2, '0');
    const hh = String(Math.floor(newHour)).padStart(2, '0');
    const mm = String(Math.round((newHour % 1) * 60)).padStart(2, '0');
    updateAppointment(appointment.id, { day: newDay, startHour: newHour, date: `${y}-${m}-${d}`, time: `${hh}:${mm}` });
  };

  return (
      <DndProvider backend={HTML5Backend}>
        <Card className="p-6 macos-shadow border-0 bg-white dark:bg-slate-800 overflow-hidden">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            {(() => {
              const today = new Date();
              const dayOfWeek = (today.getDay() + 6) % 7;
              const start = new Date(today);
              start.setDate(today.getDate() - dayOfWeek + currentWeek * 7);
              const end = new Date(start);
              end.setDate(start.getDate() + 6);
              const fmt = (d: Date) => `${d.getDate()} ${d.toLocaleString('es-ES', { month: 'short' })} ${d.getFullYear()}`;
              return <h3 className="text-slate-900 dark:text-white">Semana del {fmt(start)} - {fmt(end)}</h3>;
            })()}
            <div className="flex items-center gap-2">
              <button
                  onClick={() => setCurrentWeek(currentWeek - 1)}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <button onClick={() => setCurrentWeek(0)} className="px-4 py-2 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors">
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
                {(() => {
                  const today = new Date();
                  const dayOfWeek = (today.getDay() + 6) % 7;
                  const start = new Date(today);
                  start.setDate(today.getDate() - dayOfWeek + currentWeek * 7);
                  return DAYS.map((day, index) => {
                    const d = new Date(start);
                    d.setDate(start.getDate() + index);
                    return (
                      <div key={day} className="p-3 text-center border-r border-slate-200 dark:border-slate-700 last:border-r-0">
                        <p className="text-slate-900 dark:text-white">{day}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs">{d.getDate()} {d.toLocaleString('es-ES', { month: 'short' })}</p>
                      </div>
                    );
                  });
                })()}
              </div>

              {/* Time Grid */}
              <div className="relative">
                <div className="grid grid-cols-8">
                  {/* Hours Column */}
                  <div className="border-r border-slate-200 dark:border-slate-700">
                    {hours.map((hour) => (
                      <div
                          key={hour}
                          className="h-[60px] p-2 text-right border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm"
                      >
                        {hour}:00
                      </div>
                    ))}
                  </div>

                  {/* Days Columns */}
                  {DAYS.map((_, dayIndex) => {
                    const dayAppointments = appointments.filter((apt) => {
                      const today = new Date();
                      const dayOfWeek = (today.getDay() + 6) % 7;
                      const start = new Date(today);
                      start.setDate(today.getDate() - dayOfWeek + currentWeek * 7);
                      const dateStr = ctxAppointments.find(a => a.id === apt.id)?.date;
                      if (!dateStr) return apt.day === dayIndex;
                      const d = new Date(dateStr + 'T00:00:00');
                      const diffDays = Math.floor((d.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
                      return diffDays === dayIndex;
                    });
                    return (
                      <div key={dayIndex} className="relative">
                        {hours.map((hour) => (
                          <TimeSlot
                            key={`${dayIndex}-${hour}`}
                            day={dayIndex}
                            hour={hour}
                            appointmentsDay={dayAppointments}
                            openHour={openHour}
                            closeHour={Number(settings.closeTime.split(':')[0])}
                            onDrop={handleDrop}
                          />
                        ))}
                        <div className="absolute inset-0 pointer-events-none">
                          {dayAppointments.map((apt) => (
                            <div
                              key={apt.id}
                              className="absolute left-1 right-1 pointer-events-auto"
                              style={{ top: `${(apt.startHour - openHour) * 60}px` }}
                            >
                              <AppointmentCard
                                appointment={apt}
                                onClick={(a) => {
                                  const full = ctxAppointments.find(x => x.id === a.id) || a as any;
                                  onAppointmentClick(full);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
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
