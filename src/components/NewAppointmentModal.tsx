import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Briefcase, Mail, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAppData } from '../App';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewAppointmentModal({ isOpen, onClose }: NewAppointmentModalProps) {
  const { addAppointment, employees, services, settings } = useAppData();
  
  const [formData, setFormData] = useState({
    client: '',
    email: '',
    service: '',
    employee: '',
    date: '',
    time: '',
    duration: `${Math.max(15, settings.slotDurationMinutes)}min`,
    status: 'pending',
    price: '$0',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.client || !formData.service || !formData.employee || !formData.date || !formData.time) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    addAppointment({
      ...formData,
      color: 'teal',
    });

    // Resetear formulario
    setFormData({
      client: '',
      email: '',
      service: '',
      employee: '',
      date: '',
      time: '',
      duration: '1h',
      status: 'pending',
      price: '$0',
    });

    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-calcular precio basado en servicio seleccionado
    if (name === 'service') {
      const selectedService = services.find(s => s.name === value);
      if (selectedService) {
        setFormData(prev => ({ 
          ...prev, 
          service: value,
          price: selectedService.price,
          duration: selectedService.duration 
        }));
      }
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-slate-900/50 dark:bg-slate-900/70 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-[101] p-4 sm:p-6 md:p-8 flex items-center justify-center overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ type: 'spring', duration: 0.45 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg sm:max-w-xl bg-white dark:bg-slate-800 rounded-3xl macos-shadow-xl overflow-hidden my-8"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-500 to-marine-500 text-white p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="mb-1 text-xl font-semibold">Nueva Cita</h2>
                    <p className="text-white/80 text-sm">Completa los datos de la cita</p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                    aria-label="Cerrar"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[calc(90vh-200px)] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Cliente */}
                  <div className="space-y-2">
                    <Label htmlFor="client" className="text-slate-700 dark:text-slate-200">
                      Cliente <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="client"
                        name="client"
                        value={formData.client}
                        onChange={handleChange}
                        placeholder="Nombre del cliente"
                        className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-700"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 dark:text-slate-200">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@ejemplo.com"
                        className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-700"
                      />
                    </div>
                  </div>

                  {/* Servicio */}
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="service" className="text-slate-700 dark:text-slate-200">
                      Servicio <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                        required
                      >
                        <option value="">Seleccionar servicio</option>
                        {services.map(service => (
                          <option key={service.id} value={service.name}>
                            {service.name} - {service.price} ({service.duration})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Empleado */}
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="employee" className="text-slate-700 dark:text-slate-200">
                      Empleado <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
                      <select
                        id="employee"
                        name="employee"
                        value={formData.employee}
                        onChange={handleChange}
                        className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                        required
                      >
                        <option value="">Seleccionar empleado</option>
                        {employees.map(employee => (
                          <option key={employee.id} value={employee.name}>
                            {employee.name} - {employee.role}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Fecha */}
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-slate-700 dark:text-slate-200">
                      Fecha <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-700"
                        required
                      />
                    </div>
                  </div>

                  {/* Hora */}
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-slate-700 dark:text-slate-200">
                      Hora <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-700"
                        required
                      />
                    </div>
                  </div>

                  {/* Duración */}
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-slate-700 dark:text-slate-200">
                      Duración
                    </Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      className="h-11 rounded-xl bg-slate-100 dark:bg-slate-700/50"
                      readOnly
                    />
                  </div>

                  {/* Precio */}
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-slate-700 dark:text-slate-200">
                      Precio
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="price"
                        name="price"
                        value={formData.price}
                        className="pl-10 h-11 rounded-xl bg-slate-100 dark:bg-slate-700/50"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </form>

              {/* Actions */}
              <div className="p-5 sm:p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="px-6 h-11 rounded-xl border-slate-200 dark:border-slate-600"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-6 h-11 bg-gradient-to-r from-teal-500 to-marine-500 hover:from-teal-600 hover:to-marine-600 text-white rounded-xl macos-shadow"
                >
                  Crear Cita
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
