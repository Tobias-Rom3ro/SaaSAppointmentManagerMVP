import { motion } from 'motion/react';
import { User, Bell, Lock, Palette, Calendar, DollarSign, Globe, Shield, Save } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Switch } from './ui/switch';

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
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900 mb-2">Configuración</h1>
        <p className="text-slate-600">Personaliza tu experiencia y gestiona tu cuenta</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Menu */}
        <div className="lg:col-span-1">
          <Card className="p-4 macos-shadow border-0 bg-white space-y-2">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              return (
                <motion.button
                  key={section.id}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
                  whileHover={{ x: 4 }}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                    section.color === 'teal' ? 'from-teal-500 to-teal-600' : 'from-marine-500 to-marine-600'
                  } flex items-center justify-center macos-shadow`}>
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
          <Card className="p-6 macos-shadow border-0 bg-white">
            <h3 className="text-slate-900 mb-6">Información del Perfil</h3>
            <div className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-400 to-marine-400 flex items-center justify-center macos-shadow">
                  <span className="text-white text-2xl">A</span>
                </div>
                <div>
                  <Button variant="outline" className="rounded-xl border-slate-200 mb-2">
                    Cambiar Foto
                  </Button>
                  <p className="text-slate-500 text-sm">JPG, PNG o GIF. Máx 2MB</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input
                    id="firstName"
                    defaultValue="Admin"
                    className="h-11 rounded-xl bg-slate-50 border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    defaultValue="Usuario"
                    className="h-11 rounded-xl bg-slate-50 border-slate-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="admin@ejemplo.com"
                  className="h-11 rounded-xl bg-slate-50 border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  defaultValue="+34 600 000 000"
                  className="h-11 rounded-xl bg-slate-50 border-slate-200"
                />
              </div>
            </div>
          </Card>

          {/* Notifications Settings */}
          <Card className="p-6 macos-shadow border-0 bg-white">
            <h3 className="text-slate-900 mb-6">Preferencias de Notificaciones</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-slate-900">Notificaciones por Email</p>
                  <p className="text-slate-500 text-sm">Recibe actualizaciones importantes por correo</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-slate-900">Notificaciones Push</p>
                  <p className="text-slate-500 text-sm">Alertas en tiempo real en tu navegador</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-slate-900">Recordatorios de Citas</p>
                  <p className="text-slate-500 text-sm">Avisos 24h antes de cada cita</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-slate-900">Resumen Semanal</p>
                  <p className="text-slate-500 text-sm">Estadísticas cada lunes por la mañana</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          {/* Business Settings */}
          <Card className="p-6 macos-shadow border-0 bg-white">
            <h3 className="text-slate-900 mb-6">Configuración del Negocio</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Nombre del Negocio</Label>
                <Input
                  id="businessName"
                  defaultValue="Gestor de Citas"
                  className="h-11 rounded-xl bg-slate-50 border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona Horaria</Label>
                  <Input
                    id="timezone"
                    defaultValue="Europe/Madrid (GMT+1)"
                    className="h-11 rounded-xl bg-slate-50 border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Moneda</Label>
                  <Input
                    id="currency"
                    defaultValue="EUR (€)"
                    className="h-11 rounded-xl bg-slate-50 border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="openTime">Hora de Apertura</Label>
                  <Input
                    id="openTime"
                    type="time"
                    defaultValue="08:00"
                    className="h-11 rounded-xl bg-slate-50 border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="closeTime">Hora de Cierre</Label>
                  <Input
                    id="closeTime"
                    type="time"
                    defaultValue="20:00"
                    className="h-11 rounded-xl bg-slate-50 border-slate-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="slotDuration">Duración de Turnos (minutos)</Label>
                <Input
                  id="slotDuration"
                  type="number"
                  defaultValue="30"
                  className="h-11 rounded-xl bg-slate-50 border-slate-200"
                />
              </div>
            </div>
          </Card>

          {/* Security Settings */}
          <Card className="p-6 macos-shadow border-0 bg-white">
            <h3 className="text-slate-900 mb-6">Seguridad</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Contraseña Actual</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="••••••••"
                  className="h-11 rounded-xl bg-slate-50 border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  className="h-11 rounded-xl bg-slate-50 border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="h-11 rounded-xl bg-slate-50 border-slate-200"
                />
              </div>

              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-slate-900">Autenticación de Dos Factores</p>
                    <p className="text-slate-500 text-sm">Añade una capa extra de seguridad</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full h-12 bg-gradient-to-r from-teal-500 to-marine-500 hover:from-teal-600 hover:to-marine-600 text-white rounded-xl macos-shadow-lg">
              <Save className="w-5 h-5 mr-2" />
              Guardar Cambios
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
