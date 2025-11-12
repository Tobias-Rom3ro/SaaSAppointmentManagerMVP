import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, Clock, DollarSign, Edit2, Trash2, Scissors, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface Service {
  id: number;
  name: string;
  category: string;
  description: string;
  duration: string;
  price: string;
  icon: string;
  color: string;
  popular: boolean;
}

const services: Service[] = [
  {
    id: 1,
    name: 'Corte de Cabello',
    category: 'Peluquería',
    description: 'Corte de cabello profesional adaptado a tu estilo',
    duration: '45 min',
    price: '$35',
    icon: 'scissors',
    color: 'teal',
    popular: true,
  },
  {
    id: 2,
    name: 'Corte y Barba',
    category: 'Peluquería',
    description: 'Servicio completo de corte de cabello y arreglo de barba',
    duration: '1 hora',
    price: '$45',
    icon: 'scissors',
    color: 'teal',
    popular: true,
  },
  {
    id: 3,
    name: 'Tinte',
    category: 'Coloración',
    description: 'Tinte profesional con productos de alta calidad',
    duration: '2 horas',
    price: '$80',
    icon: 'sparkles',
    color: 'marine',
    popular: false,
  },
  {
    id: 4,
    name: 'Mechas',
    category: 'Coloración',
    description: 'Mechas y reflejos para iluminar tu cabello',
    duration: '2.5 horas',
    price: '$95',
    icon: 'sparkles',
    color: 'marine',
    popular: false,
  },
  {
    id: 5,
    name: 'Balayage',
    category: 'Coloración',
    description: 'Técnica moderna de coloración degradada',
    duration: '3 horas',
    price: '$120',
    icon: 'sparkles',
    color: 'marine',
    popular: true,
  },
  {
    id: 6,
    name: 'Manicura',
    category: 'Estética',
    description: 'Cuidado completo de manos y uñas',
    duration: '45 min',
    price: '$25',
    icon: 'sparkles',
    color: 'teal',
    popular: false,
  },
  {
    id: 7,
    name: 'Pedicura',
    category: 'Estética',
    description: 'Tratamiento completo para pies y uñas',
    duration: '1 hora',
    price: '$30',
    icon: 'sparkles',
    color: 'teal',
    popular: false,
  },
  {
    id: 8,
    name: 'Masaje Relajante',
    category: 'Bienestar',
    description: 'Masaje terapéutico para aliviar tensiones',
    duration: '1 hora',
    price: '$60',
    icon: 'sparkles',
    color: 'marine',
    popular: true,
  },
];

const categories = ['Todos', 'Peluquería', 'Coloración', 'Estética', 'Bienestar'];

export function ServicesModule() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [editingService, setEditingService] = useState<number | null>(null);

  const filteredServices = selectedCategory === 'Todos'
    ? services
    : services.filter(s => s.category === selectedCategory);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-2">Gestión de Servicios</h1>
          <p className="text-slate-600">Administra los servicios que ofreces</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-gradient-to-r from-teal-500 to-marine-500 hover:from-teal-600 hover:to-marine-600 text-white px-6 h-11 rounded-xl macos-shadow">
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Servicio
          </Button>
        </motion.div>
      </div>

      {/* Search and Categories */}
      <div className="space-y-4">
        <Card className="p-4 macos-shadow border-0 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Buscar servicios..."
              className="pl-10 h-10 bg-slate-50 border-slate-200 rounded-xl"
            />
          </div>
        </Card>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-teal-500 to-marine-500 text-white macos-shadow'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`p-6 macos-shadow hover:shadow-lg transition-all duration-300 border-0 bg-white group relative overflow-hidden ${
              editingService === service.id ? 'ring-2 ring-teal-500' : ''
            }`}>
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs rounded-full macos-shadow">
                    Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
                service.color === 'teal' ? 'from-teal-500 to-teal-600' : 'from-marine-500 to-marine-600'
              } flex items-center justify-center macos-shadow mb-4`}>
                {service.icon === 'scissors' ? (
                  <Scissors className="w-7 h-7 text-white" />
                ) : (
                  <Sparkles className="w-7 h-7 text-white" />
                )}
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-slate-900 mb-1">{service.name}</h4>
                  <p className="text-slate-500 text-xs mb-2">{service.category}</p>
                  <p className="text-slate-600 text-sm">{service.description}</p>
                </div>

                {/* Details */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-teal-600" />
                      <span className="text-slate-900">{service.price}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex gap-2">
                  <motion.button
                    onClick={() => setEditingService(service.id)}
                    className="flex-1 py-2 px-4 bg-slate-50 hover:bg-teal-50 text-slate-700 hover:text-teal-700 rounded-xl transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="text-sm">Editar</span>
                  </motion.button>
                  <motion.button
                    className="p-2 hover:bg-red-50 rounded-xl transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </motion.button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 macos-shadow border-0 bg-white">
          <div className="text-center">
            <h3 className="text-slate-900 mb-1">{services.length}</h3>
            <p className="text-slate-600 text-sm">Servicios Totales</p>
          </div>
        </Card>

        <Card className="p-6 macos-shadow border-0 bg-white">
          <div className="text-center">
            <h3 className="text-slate-900 mb-1">{services.filter(s => s.popular).length}</h3>
            <p className="text-slate-600 text-sm">Servicios Populares</p>
          </div>
        </Card>

        <Card className="p-6 macos-shadow border-0 bg-white">
          <div className="text-center">
            <h3 className="text-slate-900 mb-1">$58</h3>
            <p className="text-slate-600 text-sm">Precio Promedio</p>
          </div>
        </Card>

        <Card className="p-6 macos-shadow border-0 bg-white">
          <div className="text-center">
            <h3 className="text-slate-900 mb-1">1.5h</h3>
            <p className="text-slate-600 text-sm">Duración Promedio</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
