import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Briefcase, MapPin, Phone, Mail, DollarSign, Edit2, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

interface AppointmentModalProps {
  appointment: any;
  isOpen: boolean;
  onClose: () => void;
}

export function AppointmentModal({ appointment, isOpen, onClose }: AppointmentModalProps) {
  if (!appointment) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/50 dark:bg-slate-900/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white dark:bg-slate-800 rounded-3xl macos-shadow-xl w-full max-w-2xl pointer-events-auto overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-500 to-marine-500 p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="mb-2">Detalles de la Cita</h2>
                    <p className="text-white/80">ID: #{appointment.id}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                    <span className="text-2xl">{appointment.client?.charAt(0) || 'C'}</span>
                  </div>
                  <div>
                    <h3 className="mb-1">{appointment.client || 'Cliente'}</h3>
                    <p className="text-white/80">{appointment.email || 'email@ejemplo.com'}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Servicio</p>
                        <p className="text-slate-900 dark:text-white">{appointment.service || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-marine-100 dark:bg-marine-900/30 flex items-center justify-center">
                        <User className="w-5 h-5 text-marine-600 dark:text-marine-400" />
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Empleado</p>
                        <p className="text-slate-900 dark:text-white">{appointment.employee || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Fecha</p>
                        <p className="text-slate-900 dark:text-white">{appointment.date || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-marine-100 dark:bg-marine-900/30 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-marine-600 dark:text-marine-400" />
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Hora</p>
                        <p className="text-slate-900 dark:text-white">{appointment.time || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="p-4 bg-gradient-to-br from-teal-50 to-marine-50 dark:from-teal-900/20 dark:to-marine-900/20 rounded-xl border border-teal-100 dark:border-teal-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center macos-shadow">
                        <DollarSign className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">Precio Total</p>
                        <p className="text-slate-900 dark:text-white text-xl">{appointment.price || '$0'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-600 dark:text-slate-400 text-sm">Duración</p>
                      <p className="text-slate-900 dark:text-white">{appointment.duration || '1h'}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <h4 className="text-slate-900 dark:text-white">Información de Contacto</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <Phone className="w-5 h-5 text-slate-400" />
                      <p className="text-slate-700 dark:text-slate-300">+34 600 123 456</p>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <Mail className="w-5 h-5 text-slate-400" />
                      <p className="text-slate-700 dark:text-slate-300">{appointment.email || 'email@ejemplo.com'}</p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-3">
                  <h4 className="text-slate-900 dark:text-white">Notas</h4>
                  <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <p className="text-slate-600 dark:text-slate-400">Cliente prefiere música relajante durante el servicio.</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  className="px-6 h-11 rounded-xl border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Cancelar Cita
                </Button>
                <Button className="px-6 h-11 bg-gradient-to-r from-teal-500 to-marine-500 hover:from-teal-600 hover:to-marine-600 text-white rounded-xl macos-shadow">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Editar Cita
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}