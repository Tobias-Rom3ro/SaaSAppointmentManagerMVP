import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

interface ConfirmCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmCancelModal({ isOpen, onClose, onConfirm }: ConfirmCancelModalProps) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[100] bg-slate-900/50 dark:bg-slate-900/70 backdrop-blur-sm" />
          <div className="fixed inset-0 z-[101] p-4 sm:p-6 md:p-8 flex items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 8 }} transition={{ type: 'spring', duration: 0.45 }} className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl macos-shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-rose-500 text-white p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="mb-1 text-xl font-semibold">Confirmar cancelación</h2>
                    <p className="text-white/80 text-sm">Esta acción marcará la cita como cancelada</p>
                  </div>
                  <button type="button" onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-colors" aria-label="Cerrar">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-5 sm:p-6 space-y-4">
                <p className="text-slate-700 dark:text-slate-300">¿Seguro que deseas cancelar esta cita?</p>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={onClose} className="px-6 h-11 rounded-xl border-slate-200 dark:border-slate-700">No, volver</Button>
                  <Button onClick={onConfirm} className="px-6 h-11 bg-red-600 hover:bg-red-700 text-white rounded-xl">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Sí, cancelar
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

