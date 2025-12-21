"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Bell, CreditCard, Shield, LogOut, Crown, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function CabinetProfile() {
  const [formData, setFormData] = useState({
    name: "Анна",
    email: "anna@example.com",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    reminders: true,
  });

  const handleSave = () => {
    // TODO: Implement save
    alert("Настройки сохранены");
  };

  return (
    <div className="p-6 lg:p-10 max-w-3xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-heading font-light mb-2">
          Профиль
        </h1>
        <p className="text-[var(--color-stone)]">
          Управляйте настройками аккаунта
        </p>
      </motion.div>

      {/* Subscription */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-gradient-to-br from-[var(--color-moss)] to-[var(--color-moss-light)] p-6 rounded-2xl text-white mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6" />
            <span className="text-lg font-medium">Подписка активна</span>
          </div>
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
            500 ₽/мес
          </span>
        </div>
        <p className="text-sm text-white/70 mb-4">
          Следующее списание: 21 января 2025
        </p>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="sm"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Изменить план
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Отменить подписку
          </Button>
        </div>
      </motion.div>

      {/* Personal Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white p-6 rounded-2xl shadow-sm mb-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-[var(--color-primary)]" />
          <h2 className="text-lg font-medium">Личные данные</h2>
        </div>

        <div className="space-y-4">
          <Input
            label="Имя"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white p-6 rounded-2xl shadow-sm mb-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-[var(--color-primary)]" />
          <h2 className="text-lg font-medium">Уведомления</h2>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span className="text-[var(--color-charcoal)]">
              Email-рассылка
            </span>
            <button
              onClick={() =>
                setNotifications({ ...notifications, email: !notifications.email })
              }
              className={`w-12 h-6 rounded-full transition-colors ${
                notifications.email
                  ? "bg-[var(--color-primary)]"
                  : "bg-[var(--color-muted)]"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  notifications.email ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </label>

          <label className="flex items-center justify-between">
            <span className="text-[var(--color-charcoal)]">
              Напоминания о практиках
            </span>
            <button
              onClick={() =>
                setNotifications({
                  ...notifications,
                  reminders: !notifications.reminders,
                })
              }
              className={`w-12 h-6 rounded-full transition-colors ${
                notifications.reminders
                  ? "bg-[var(--color-primary)]"
                  : "bg-[var(--color-muted)]"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  notifications.reminders ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </label>
        </div>
      </motion.div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white p-6 rounded-2xl shadow-sm mb-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-[var(--color-primary)]" />
          <h2 className="text-lg font-medium">Безопасность</h2>
        </div>

        <Button variant="secondary" size="sm">
          Изменить пароль
        </Button>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex gap-4"
      >
        <Button variant="primary" size="lg" onClick={handleSave}>
          <Check className="w-4 h-4 mr-2" />
          Сохранить изменения
        </Button>
      </motion.div>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-10 pt-6 border-t border-[var(--color-muted)]"
      >
        <button className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Выйти из аккаунта</span>
        </button>
      </motion.div>
    </div>
  );
}




