import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { Lock, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ParticleBackground } from './ParticleBackground';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (email === 'admin@laestacion.com' && password === 'password') {
      onLogin();
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-teal-50 via-marine-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Image with Blur */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1760442903458-664c65a88b8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdyYWRpZW50JTIwYmx1ZSUyMHRlYWx8ZW58MXx8fHwxNzYyOTAwMjgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Background"
          className="w-full h-full object-cover opacity-30 dark:opacity-20 blur-2xl scale-110"
        />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <ParticleBackground count={90} />
      </div>

      {/* Login Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="glassmorphism macos-shadow-xl rounded-3xl p-10 border border-white/40 dark:border-white/10 backdrop-blur-xl">
            {/* Header */}
            <div className="text-center mb-10">
              <motion.div initial={{ y: -6 }} animate={{ y: 0 }} transition={{ repeat: Infinity, repeatType: 'reverse', duration: 3 }} className="inline-flex items-center justify-center mb-3">
                <img src="/logo.png" alt="SphereUp" className="w-16 h-16 object-contain" />
              </motion.div>
              <img src="/Nombre (2).png" alt="SphereUp Nombre" className="mx-auto h-8 object-contain" />
              <p className="text-slate-600 dark:text-slate-400 mt-2">Panel de Administración</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 h-12 bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 h-12 bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-teal-500 to-marine-500 hover:from-teal-600 hover:to-marine-600 text-white rounded-xl macos-shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                Iniciar Sesión
              </Button>
              {error && (
                <p className="text-center mt-3 text-red-600 dark:text-red-400 text-sm">{error}</p>
              )}
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <button onClick={() => setShowForgot(true)} className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>

          
        </motion.div>
      </div>
      {showForgot && createPortal(
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-slate-900/50 dark:bg-slate-900/70 backdrop-blur-sm" onClick={() => setShowForgot(false)} />
          <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex items-center justify-center">
            <div className="w-full max-w-md sm:max-w-lg bg-white dark:bg-slate-800 rounded-3xl macos-shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-marine-500 text-white p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="mb-1 text-xl font-semibold">Recuperar contraseña</h2>
                    <p className="text-white/80 text-sm">Para reestablecer la contraseña debes contactar al administrador de SphereUp</p>
                  </div>
                  <button onClick={() => setShowForgot(false)} className="p-2 hover:bg-white/20 rounded-xl transition-colors" aria-label="Cerrar">✕</button>
                </div>
              </div>
              <div className="p-5 sm:p-6 space-y-4">
                <p className="text-slate-700 dark:text-slate-300">Haz clic en el botón para enviar un correo:</p>
                <div className="flex justify-end">
                  <a href="mailto:servicioalcliente@sphereup.com?subject=Restablecer%20contraseña%20admin" className="px-6 h-11 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-marine-500 hover:from-teal-600 hover:to-marine-600 text-white macos-shadow">
                    Contactar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
