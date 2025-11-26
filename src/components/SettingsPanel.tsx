import { motion } from 'motion/react';
import { User, Bell, Lock, Palette, Calendar, DollarSign, Globe, Shield, Save } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import React from 'react';
import { useAppData } from '../App';

const settingsSections = [
  {
    id: 'profile',
    title: 'Perfil',
    icon: User,
    color: 'teal',
  },
  {
    id: 'notifications',
    title: 'Notificaciones',
    icon: Bell,
    color: 'marine',
  },
  {
    id: 'security',
    title: 'Seguridad',
    icon: Shield,
    color: 'teal',
  },
  {
    id: 'business',
    title: 'Negocio',
    icon: Calendar,
    color: 'marine',
  },
  {
    id: 'appearance',
    title: 'Apariencia',
    icon: Palette,
    color: 'teal',
  },
];

export function SettingsPanel() {
  const { settings, updateSettings } = useAppData();
  const [editable, setEditable] = React.useState(settings as any);
  React.useEffect(() => { setEditable(settings as any); }, [settings]);
  const onChange = (field: string, value: any) => setEditable((prev: any) => ({ ...prev, [field]: value }));
  const onNested = (ns: 'notifications'|'security', field: string, value: any) => setEditable((prev: any) => ({ ...prev, [ns]: { ...prev[ns], [field]: value } }));
  const onSave = () => {
    if (!editable.businessName) return alert('El nombre del negocio es requerido');
    const [oh, om] = String(editable.openTime || '08:00').split(':').map(Number);
    const [ch, cm] = String(editable.closeTime || '20:00').split(':').map(Number);
    const openMins = oh * 60 + (om || 0);
    const closeMins = ch * 60 + (cm || 0);
    if (openMins >= closeMins) return alert('La hora de apertura debe ser menor que la de cierre');
    if (Number(editable.slotDurationMinutes) <= 0) return alert('La duración de turnos debe ser mayor a 0');
    updateSettings(editable);
    alert('Configuración guardada');
  };
  return (
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-slate-900 dark:text-slate-100 mb-2">Configuración</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Personaliza tu experiencia y gestiona tu cuenta
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Menu */}
          <div className="lg:col-span-1">
            <Card className="p-4 macos-shadow border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 space-y-2">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                return (
                    <motion.button
                        key={section.id}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                             text-slate-600 dark:text-slate-300
                             hover:bg-slate-50 dark:hover:bg-slate-700
                             transition-all"
                        whileHover={{ x: 4 }}
                    >
                      <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center macos-shadow
                      ${
                              section.color === 'teal'
                                  ? 'from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500'
                                  : 'from-cyan-600 to-sky-600 dark:from-cyan-500 dark:to-sky-500'
                          }`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span>{section.title}</span>
                    </motion.button>
                );
              })}
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <Card className="p-6 macos-shadow border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h3 className="text-slate-900 dark:text-slate-100 mb-6">Información del Perfil</h3>
              <div className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-400 to-sky-400 dark:from-teal-500 dark:to-sky-500 flex items-center justify-center macos-shadow">
                    <span className="text-white text-2xl">A</span>
                  </div>
                  <div>
                    <Button
                        variant="outline"
                        className="rounded-xl border-slate-200 dark:border-slate-700
                               text-slate-700 dark:text-slate-100
                               bg-white dark:bg-slate-800"
                    >
                      Cambiar Foto
                    </Button>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">JPG, PNG o GIF. Máx 2MB</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-slate-700 dark:text-slate-200">Nombre</Label>
                    <Input
                        id="firstName"
                        value={editable.firstName}
                        onChange={(e) => onChange('firstName', e.target.value)}
                        className="h-11 rounded-xl
                               bg-slate-50 dark:bg-slate-800
                               border-slate-200 dark:border-slate-700
                               text-slate-900 dark:text-slate-100
                               placeholder-slate-400 dark:placeholder-slate-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-slate-700 dark:text-slate-200">Apellido</Label>
                    <Input
                        id="lastName"
                        value={editable.lastName}
                        onChange={(e) => onChange('lastName', e.target.value)}
                        className="h-11 rounded-xl
                               bg-slate-50 dark:bg-slate-800
                               border-slate-200 dark:border-slate-700
                               text-slate-900 dark:text-slate-100
                               placeholder-slate-400 dark:placeholder-slate-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 dark:text-slate-200">Email</Label>
                  <Input
                      id="email"
                      type="email"
                      value={editable.email}
                      onChange={(e) => onChange('email', e.target.value)}
                      className="h-11 rounded-xl
                             bg-slate-50 dark:bg-slate-800
                             border-slate-200 dark:border-slate-700
                             text-slate-900 dark:text-slate-100
                             placeholder-slate-400 dark:placeholder-slate-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700 dark:text-slate-200">Teléfono</Label>
                  <Input
                      id="phone"
                      value={editable.phone}
                      onChange={(e) => onChange('phone', e.target.value)}
                      className="h-11 rounded-xl
                             bg-slate-50 dark:bg-slate-800
                             border-slate-200 dark:border-slate-700
                             text-slate-900 dark:text-slate-100
                             placeholder-slate-400 dark:placeholder-slate-500"
                  />
                </div>
              </div>
            </Card>

            {/* Notifications Settings */}
            <Card className="p-6 macos-shadow border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h3 className="text-slate-900 dark:text-slate-100 mb-6">Preferencias de Notificaciones</h3>
              <div className="space-y-4">
                {[
                  {
                    title: 'Notificaciones por Email',
                    desc: 'Recibe actualizaciones importantes por correo',
                    checked: true,
                  },
                  {
                    title: 'Notificaciones Push',
                    desc: 'Alertas en tiempo real en tu navegador',
                    checked: true,
                  },
                  {
                    title: 'Recordatorios de Citas',
                    desc: 'Avisos 24h antes de cada cita',
                    checked: true,
                  },
                  {
                    title: 'Resumen Semanal',
                    desc: 'Estadísticas cada lunes por la mañana',
                    checked: false,
                  },
                ].map((row, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between p-4 rounded-xl
                             bg-slate-50 dark:bg-slate-700/60"
                    >
                      <div>
                        <p className="text-slate-900 dark:text-slate-100">{row.title}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">{row.desc}</p>
                      </div>
                      <Switch defaultChecked={true} onCheckedChange={(v) => onNested('notifications', (['emailEnabled','pushEnabled','remindersEnabled','weeklySummaryEnabled'][i] as any), v)} />
                    </div>
                ))}
              </div>
            </Card>

            {/* Business Settings */}
            <Card className="p-6 macos-shadow border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h3 className="text-slate-900 dark:text-slate-100 mb-6">Configuración del Negocio</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-slate-700 dark:text-slate-200">Nombre del Negocio</Label>
                  <Input
                      id="businessName"
                      value={editable.businessName}
                      onChange={(e) => onChange('businessName', e.target.value)}
                      className="h-11 rounded-xl
                             bg-slate-50 dark:bg-slate-800
                             border-slate-200 dark:border-slate-700
                             text-slate-900 dark:text-slate-100
                             placeholder-slate-400 dark:placeholder-slate-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-slate-700 dark:text-slate-200">Zona Horaria</Label>
                    <Input
                        id="timezone"
                        value={editable.timezone}
                        onChange={(e) => onChange('timezone', e.target.value)}
                        className="h-11 rounded-xl
                               bg-slate-50 dark:bg-slate-800
                               border-slate-200 dark:border-slate-700
                               text-slate-900 dark:text-slate-100
                               placeholder-slate-400 dark:placeholder-slate-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency" className="text-slate-700 dark:text-slate-200">Moneda</Label>
                    <Input
                        id="currency"
                        value={editable.currency}
                        onChange={(e) => onChange('currency', e.target.value)}
                        className="h-11 rounded-xl
                               bg-slate-50 dark:bg-slate-800
                               border-slate-200 dark:border-slate-700
                               text-slate-900 dark:text-slate-100
                               placeholder-slate-400 dark:placeholder-slate-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="openTime" className="text-slate-700 dark:text-slate-200">Hora de Apertura</Label>
                    <Input
                        id="openTime"
                        type="time"
                        value={editable.openTime}
                        onChange={(e) => onChange('openTime', e.target.value)}
                        className="h-11 rounded-xl
                               bg-slate-50 dark:bg-slate-800
                               border-slate-200 dark:border-slate-700
                               text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="closeTime" className="text-slate-700 dark:text-slate-200">Hora de Cierre</Label>
                    <Input
                        id="closeTime"
                        type="time"
                        value={editable.closeTime}
                        onChange={(e) => onChange('closeTime', e.target.value)}
                        className="h-11 rounded-xl
                               bg-slate-50 dark:bg-slate-800
                               border-slate-200 dark:border-slate-700
                               text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slotDuration" className="text-slate-700 dark:text-slate-200">
                    Duración de Turnos (minutos)
                  </Label>
                  <Input
                      id="slotDuration"
                      type="number"
                      value={editable.slotDurationMinutes}
                      onChange={(e) => onChange('slotDurationMinutes', Number(e.target.value))}
                      className="h-11 rounded-xl
                             bg-slate-50 dark:bg-slate-800
                             border-slate-200 dark:border-slate-700
                             text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>
            </Card>

            {/* Security Settings */}
            <Card className="p-6 macos-shadow border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h3 className="text-slate-900 dark:text-slate-100 mb-6">Seguridad</h3>
              <div className="space-y-4">
                {[
                  { id: 'currentPassword', label: 'Contraseña Actual', type: 'password', ph: '••••••••' },
                  { id: 'newPassword', label: 'Nueva Contraseña', type: 'password', ph: '••••••••' },
                  { id: 'confirmPassword', label: 'Confirmar Nueva Contraseña', type: 'password', ph: '••••••••' },
                ].map((f) => (
                    <div key={f.id} className="space-y-2">
                      <Label htmlFor={f.id} className="text-slate-700 dark:text-slate-200">{f.label}</Label>
                      <Input
                          id={f.id}
                          type={f.type}
                          placeholder={f.ph}
                          className="h-11 rounded-xl
                               bg-slate-50 dark:bg-slate-800
                               border-slate-200 dark:border-slate-700
                               text-slate-900 dark:text-slate-100
                               placeholder-slate-400 dark:placeholder-slate-500"
                      />
                    </div>
                ))}

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/60">
                    <div>
                      <p className="text-slate-900 dark:text-slate-100">Autenticación de Dos Factores</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Añade una capa extra de seguridad</p>
                    </div>
                    <Switch defaultChecked={false} onCheckedChange={(v) => onNested('security', 'twoFAEnabled', v)} />
                  </div>
                </div>
              </div>
            </Card>

            {/* Save Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button onClick={onSave}
                  className="w-full h-12 rounded-xl macos-shadow-lg
                         bg-gradient-to-r from-teal-500 to-cyan-600
                         hover:from-teal-600 hover:to-cyan-700
                         dark:from-teal-400 dark:to-sky-500
                         dark:hover:from-teal-500 dark:hover:to-sky-600
                         text-white"
              >
                <Save className="w-5 h-5 mr-2" />
                Guardar Cambios
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
  );
}

