import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Phone, Star, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAppData } from '../App';

interface NewEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewEmployeeModal({ isOpen, onClose }: NewEmployeeModalProps) {
  const { addEmployee } = useAppData();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    specialties: '' as string,
    rating: 4.5,
    appointmentsToday: 0,
    avatar: '',
    status: 'active' as 'active' | 'inactive',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.email) return alert('Completa nombre, rol y email');
    const specialties = formData.specialties
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    const avatar = formData.avatar || (formData.name[0] || '').toUpperCase();
    addEmployee({
      name: formData.name,
      role: formData.role,
      email: formData.email,
      phone: formData.phone,
      specialties,
      rating: Number(formData.rating) || 4.5,
      appointmentsToday: Number(formData.appointmentsToday) || 0,
      avatar,
      status: formData.status,
    });
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
                    <h2 className="mb-1 text-xl font-semibold">Nuevo Empleado</h2>
                    <p className="text-white/80 text-sm">Completa los datos del empleado</p>
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
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre completo" className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-700" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Rol</Label>
                    <Input id="role" name="role" value={formData.role} onChange={handleChange} placeholder="Rol" className="h-11 rounded-xl bg-slate-50 dark:bg-slate-700" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@ejemplo.com" className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-700" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+34 ..." className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="specialties">Especialidades (separadas por coma)</Label>
                    <Input id="specialties" name="specialties" value={formData.specialties} onChange={handleChange} placeholder="Corte, Peinado, Barba" className="h-11 rounded-xl bg-slate-50 dark:bg-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating</Label>
                    <div className="relative">
                      <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                      <Input id="rating" name="rating" type="number" step="0.1" value={formData.rating as any} onChange={handleChange} className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointmentsToday">Citas hoy</Label>
                    <Input id="appointmentsToday" name="appointmentsToday" type="number" value={formData.appointmentsToday as any} onChange={handleChange} className="h-11 rounded-xl bg-slate-50 dark:bg-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avatar">Avatar (letra)</Label>
                    <Input id="avatar" name="avatar" value={formData.avatar} onChange={handleChange} className="h-11 rounded-xl bg-slate-50 dark:bg-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Estado</Label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <select id="status" name="status" value={formData.status} onChange={handleChange} className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none">
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={onClose} className="px-6 h-11 rounded-xl border-slate-200 dark:border-slate-700">Cancelar</Button>
                  <Button type="submit" className="px-6 h-11 bg-gradient-to-r from-teal-500 to-marine-500 hover:from-teal-600 hover:to-marine-600 text-white rounded-xl macos-shadow">Crear Empleado</Button>
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

