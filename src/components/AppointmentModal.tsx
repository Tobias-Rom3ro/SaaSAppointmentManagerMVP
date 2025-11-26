import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { X, Calendar as CalendarIcon, Clock, User, Briefcase, Phone, Mail, DollarSign, Edit2, Trash2 } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import { useAppData } from '../App'
import { ConfirmCancelModal } from './ConfirmCancelModal'
import { EditAppointmentModal } from './EditAppointmentModal'

interface AppointmentModalProps {
  appointment: any
  isOpen: boolean
  onClose: () => void
}

export function AppointmentModal({ appointment, isOpen, onClose }: AppointmentModalProps) {
  const { updateAppointment } = useAppData()
  const [showConfirmCancel, setShowConfirmCancel] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  if (!appointment) return null
  const statusLabel: Record<string, string> = {
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    'in-progress': 'En Progreso',
    completed: 'Completada',
    cancelled: 'Cancelada',
    'no-show': 'No se presentó',
  }
  const statusClass: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-teal-100 text-teal-700',
    'in-progress': 'bg-marine-100 text-marine-700',
    completed: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
    'no-show': 'bg-red-100 text-red-700',
  }
  const s = appointment.status as string
  const isPending = s === 'pending'
  const isInProgress = s === 'in-progress'
  const isCompleted = s === 'completed'
  const isCancelled = s === 'cancelled'
  const isNoShow = s === 'no-show'
  const disableAll = isCompleted || isCancelled || isNoShow
  const confirmDisabled = !isPending
  const completeDisabled = !(isInProgress || s === 'confirmed')
  const noShowDisabled = disableAll || isInProgress
  const cancelDisabled = disableAll || isInProgress
  const editDisabled = disableAll || isInProgress
  return createPortal(
      <AnimatePresence>
        {isOpen && (
            <>
              {/* Backdrop: ahora sí cubre todo el viewport */}
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={onClose}
                  className="fixed inset-0 z-[100] bg-slate-900/50 dark:bg-slate-900/70 backdrop-blur-sm"
              />

              {/* Wrapper centrado con padding para respiración */}
              <div className="fixed inset-0 z-[101] p-4 sm:p-6 md:p-8 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 8 }}
                    transition={{ type: 'spring', duration: 0.45 }}
                    className="
                w-full max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-4xl
                bg-white dark:bg-slate-800 rounded-3xl macos-shadow-xl overflow-hidden
                max-h-[90vh]
                flex flex-col
              "
                >
                  {/* Header (sticky para que el botón cerrar siempre esté visible) */}
                  <div className="bg-gradient-to-r from-teal-500 to-marine-500 text-white p-5 sm:p-6 sticky top-0 z-10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="mb-1">Detalles de la Cita</h2>
                        <p className="text-white/80">ID: #{appointment.id}</p>
                      </div>
                      <button
                          onClick={onClose}
                          className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                          aria-label="Cerrar"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                        <span className="text-xl sm:text-2xl">{appointment.client?.charAt(0) || 'C'}</span>
                      </div>
                      <div>
                        <h3 className="mb-0.5">{appointment.client || 'Cliente'}</h3>
                        <p className="text-white/80 text-sm sm:text-base">{appointment.email || 'email@ejemplo.com'}</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs mt-2 ${statusClass[appointment.status] || 'bg-slate-100 text-slate-700'}`}>
                          {statusLabel[appointment.status] || appointment.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contenido scrollable */}
                  <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
                    {/* Info Grid (responsivo) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                        <div className="flex items-center gap-3">
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
                        <div className="flex items-center gap-3">
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
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                            <CalendarIcon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                          </div>
                          <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Fecha</p>
                            <p className="text-slate-900 dark:text-white">{appointment.date || 'N/A'}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                        <div className="flex items-center gap-3">
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

                    {/* Precio/Duración */}
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

                    {/* Contacto */}
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

                    {/* Notas */}
                    <div className="space-y-3">
                      <h4 className="text-slate-900 dark:text-white">Notas</h4>
                      <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                        <p className="text-slate-600 dark:text-slate-400">
                          Cliente prefiere música relajante durante el servicio.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions (sticky bottom para móvil) */}
                  <div className="p-5 sm:p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-end gap-3 sticky bottom-0">
                    <Button
                        variant="outline"
                        disabled={cancelDisabled}
                        className="px-6 h-11 rounded-xl border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => setShowConfirmCancel(true)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Cancelar Cita
                    </Button>
                    <Button variant="outline" disabled={confirmDisabled || disableAll} className="px-6 h-11 rounded-xl border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20" onClick={() => updateAppointment(appointment.id, { status: 'confirmed' })}>
                      Confirmar
                    </Button>
                    <Button variant="outline" disabled={completeDisabled || disableAll} className="px-6 h-11 rounded-xl border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20" onClick={() => updateAppointment(appointment.id, { status: 'completed' })}>
                      Completar
                    </Button>
                    <Button variant="outline" disabled={noShowDisabled} className="px-6 h-11 rounded-xl border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => updateAppointment(appointment.id, { status: 'no-show', color: 'red' })}>
                      No se presentó
                    </Button>
                    <Button disabled={editDisabled} className="px-6 h-11 bg-gradient-to-r from-teal-500 to-marine-500 hover:from-teal-600 hover:to-marine-600 text-white rounded-xl macos-shadow" onClick={() => setShowEdit(true)}>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Editar Cita
                    </Button>
                  </div>
            </motion.div>
          </div>
          <ConfirmCancelModal
            isOpen={showConfirmCancel}
            onClose={() => setShowConfirmCancel(false)}
            onConfirm={() => {
              updateAppointment(appointment.id, { status: 'cancelled' })
              setShowConfirmCancel(false)
              onClose()
            }}
          />
          <EditAppointmentModal isOpen={showEdit} onClose={() => setShowEdit(false)} appointment={appointment} />
        </>
      )}
      </AnimatePresence>,
      document.body
  )
}
