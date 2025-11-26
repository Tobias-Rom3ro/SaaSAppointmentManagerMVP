import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, DollarSign, Tag, Scissors, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAppData } from '../App';

interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: any | null;
}

export function EditServiceModal({ isOpen, onClose, service }: EditServiceModalProps) {
  const { updateService, deleteService } = useAppData();
  const [formData, setFormData] = useState({
    name: '', category: '', description: '', duration: '', price: '', icon: 'scissors', color: 'teal', popular: false
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        category: service.category,
        description: service.description,
        duration: service.duration,
        price: service.price,
        icon: service.icon,
        color: service.color,
        popular: !!service.popular,
      });
    }
  }, [service]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;
    updateService(service.id, { ...formData });
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
                    <h2 className="mb-1 text-xl font-semibold">Editar Servicio</h2>
                    <p className="text-white/80 text-sm">Actualiza los datos del servicio</p>
                  </div>
                  <button type="button" onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-colors" aria-label="Cerrar">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[calc(90vh-200px)] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Input id="category" name="category" value={formData.category} onChange={handleChange} className="h-11 rounded-xl bg-slate-50 dark:bg-slate-700" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Input id="description" name="description" value={formData.description} onChange={handleChange} className="h-11 rounded-xl bg-slate-50 dark:bg-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duración</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input id="duration" name="duration" value={formData.duration} onChange={handleChange} className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input id="price" name="price" value={formData.price} onChange={handleChange} className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="icon">Ícono</Label>
                    <select id="icon" name="icon" value={formData.icon} onChange={handleChange} className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white">
                      <option value="scissors">Tijeras</option>
                      <option value="sparkles">Brillos</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <select id="color" name="color" value={formData.color} onChange={handleChange} className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white">
                      <option value="teal">Teal</option>
                      <option value="marine">Marine</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="popular">Popular</Label>
                    <select id="popular" name="popular" value={String(formData.popular)} onChange={(e) => setFormData(prev => ({ ...prev, popular: e.target.value === 'true' }))} className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white">
                      <option value="false">No</option>
                      <option value="true">Sí</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={onClose} className="px-6 h-11 rounded-xl border-slate-200 dark:border-slate-700">Cancelar</Button>
                  <Button type="submit" className="px-6 h-11 bg-gradient-to-r from-teal-500 to-marine-500 hover:from-teal-600 hover:to-marine-600 text-white rounded-xl macos-shadow">Guardar Cambios</Button>
                  <Button type="button" onClick={() => { if (service) deleteService(service.id); onClose(); }} className="px-6 h-11 bg-red-600 hover:bg-red-700 text-white rounded-xl">Eliminar</Button>
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

