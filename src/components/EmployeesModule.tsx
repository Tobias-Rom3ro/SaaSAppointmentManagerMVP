import { useState } from "react";
import { motion } from "motion/react";
import {
  Plus,
  Search,
  Mail,
  Phone,
  Calendar,
  Edit2,
  Trash2,
  Star,
} from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAppData } from "../App";
import { NewEmployeeModal } from "./NewEmployeeModal";
import { EditEmployeeModal } from "./EditEmployeeModal";

export function EmployeesModule() {
  const { employees, deleteEmployee } = useAppData();
  const [selectedEmployee, setSelectedEmployee] =
    useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 dark:text-white mb-2">
            Gestión de Empleados
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Administra tu equipo de trabajo
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button onClick={() => setIsNewOpen(true)} className="bg-gradient-to-r from-teal-500 to-marine-500 hover:from-teal-600 hover:to-marine-600 text-white px-6 h-11 rounded-xl macos-shadow">
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Empleado
          </Button>
        </motion.div>
      </div>

      {/* Search */}
      <Card className="p-4 macos-shadow border-0 bg-white dark:bg-slate-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
          <Input
            placeholder="Buscar empleados por nombre, rol o especialidad..."
            className="pl-10 h-10 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400"
          />
        </div>
      </Card>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {employees.map((employee, index) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 macos-shadow hover:shadow-lg transition-all duration-300 border-0 bg-white dark:bg-slate-800 group">
              {/* Avatar and Status */}
              <div className="flex items-start justify-between mb-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-marine-400 flex items-center justify-center macos-shadow">
                    <span className="text-white text-2xl">
                      {employee.avatar}
                    </span>
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-slate-800 ${
                      employee.status === "active"
                        ? "bg-emerald-500"
                        : "bg-slate-400"
                    }`}
                  />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors" onClick={() => { setSelectedEmployee(employee); setIsEditing(true); }}>
                    <Edit2 className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  </button>
                  <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" onClick={() => deleteEmployee(employee.id)}>
                    <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-slate-900 dark:text-white mb-1">
                    {employee.name}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {employee.role}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-slate-900 dark:text-white">
                      {employee.rating}
                    </span>
                  </div>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600 dark:text-slate-400 text-sm">
                    {employee.appointmentsToday} citas hoy
                  </span>
                </div>

                {/* Contact */}
                <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">
                      {employee.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                    <Phone className="w-4 h-4" />
                    <span>{employee.phone}</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700">
                  <p className="text-slate-500 dark:text-slate-400 text-xs mb-2">
                    Especialidades
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {employee.specialties.map(
                      (specialty, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded-lg text-xs"
                        >
                          {specialty}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                {/* Actions */}
                <motion.button
                  className="w-full mt-4 py-2 px-4 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calendar className="w-4 h-4" />
                  Ver Horario
                </motion.button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 macos-shadow border-0 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center macos-shadow">
              <Calendar className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-white mb-1">
                26
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Citas Totales Hoy
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 macos-shadow border-0 bg-gradient-to-br from-marine-50 to-marine-100 dark:from-marine-900/30 dark:to-marine-800/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center macos-shadow">
              <Star className="w-6 h-6 text-marine-600 dark:text-marine-400" />
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-white mb-1">
                4.8
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Calificación Promedio
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 macos-shadow border-0 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center macos-shadow">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 rounded-full bg-emerald-500"
              />
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-white mb-1">
                {employees.filter(e => e.status === 'active').length}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Empleados Activos
              </p>
            </div>
          </div>
        </Card>
      </div>
      <NewEmployeeModal isOpen={isNewOpen} onClose={() => setIsNewOpen(false)} />
      <EditEmployeeModal isOpen={isEditing} onClose={() => setIsEditing(false)} employee={selectedEmployee} />
    </div>
  );
}
