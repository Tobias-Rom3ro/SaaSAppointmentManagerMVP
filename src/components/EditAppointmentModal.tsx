import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar as CalendarIcon, Clock, User, Briefcase, Mail, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAppData } from '../App';

interface EditAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: any | null;
}

export function EditAppointmentModal({ isOpen, onClose, appointment }: EditAppointmentModalProps) {
  const { updateAppointment } = useAppData();
  const [formData, setFormData] = useState({
    client: '', email: '', service: '', employee: '', date: '', time: '', duration: '1h', status: 'pending', price: '$0'
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        client: appointment.client || '',
        email: appointment.email || '',
        service: appointment.service || '',
        employee: appointment.employee || '',
        date: appointment.date || '',
        time: appointment.time || '',
        duration: appointment.duration || '1h',
        status: appointment.status || 'pending',
        price: appointment.price || '$0',
      });
    }
  }, [appointment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointment) return;
    updateAppointment(appointment.id, { ...formData });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[100] bg-slate-900/50 dark:bg-slate-900/70 backdrop-blur-sm" />
          <div className="fixed inset-0 z-[101] p-4 sm:p-6 md:p-8 flex items-center justify-center overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 8 }} transition={{ type: 'spring', duration: 0.45 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-lg sm:max-w-xl bg-white dark:bg-slate-800 rounded-3xl macos-shadow-xl overflow-hidden my-8">
              <div className="bg-gradient-to-r from-teal-500 to-marine-500 text-white p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="mb-1 text-xl font-semibold">Editar Cita</h2>
                    <p className="text-white/80 text-sm">Actualiza los detalles de la cita</p>
                  </div>
                  <button type="button" onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-colors" aria-label="Cerrar">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[calc(90vh-200px)] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Cliente</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input id="client" name="client" value={formData.client} onChange={handleChange} placeholder="Nombre del cliente" className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-700" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@ejemplo.com" className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="service">Servicio</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input id="service" name="service" value={formData.service} onChange={handleChange} placeholder="Tipo de servicio" className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="employee">Empleado</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input id="employee" name="employee" value={formData.employee} onChange={handleChange} placeholder="Nombre del empleado" className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Hora</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input id="time" name="time" type="time" value={formData.time} onChange={handleChange} className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duración</Label>
                    <Input id="duration" name="duration" value={formData.duration} onChange={handleChange} className="h-11 rounded-xl bg-slate-50 dark:bg-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input id="price" name="price" value={formData.price} onChange={handleChange} className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-700" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={onClose} className="px-6 h-11 rounded-xl border-slate-200 dark:border-slate-700">Cancelar</Button>
                  <Button type="submit" className="px-6 h-11 bg-gradient-to-r from-teal-500 to-marine-500 hover:from-teal-600 hover:to-marine-600 text-white rounded-xl macos-shadow">Guardar Cambios</Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

