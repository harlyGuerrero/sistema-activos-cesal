import {
  UserRound,
  Wrench,
  Truck,
  FilePlus2,
  Trash2,
} from "lucide-react";

export const movimientoConfig = {
  Mantenimiento: {
    icon: Wrench,

    iconBg:
      "bg-violet-100",

    iconColor:
      "text-violet-600",

    badge:
      "bg-violet-100 text-violet-600",
  },

  Traslado: {
    icon: Truck,

    iconBg:
      "bg-amber-100",

    iconColor:
      "text-amber-600",

    badge:
      "bg-amber-100 text-amber-600",
  },

  Asignación: {
    icon: UserRound,

    iconBg:
      "bg-green-100",

    iconColor:
      "text-green-600",

    badge:
      "bg-green-100 text-green-600",
  },

  Alta: {
    icon: FilePlus2,

    iconBg:
      "bg-blue-100",

    iconColor:
      "text-blue-600",

    badge:
      "bg-blue-100 text-blue-600",
  },

  Baja: {
    icon: Trash2,

    iconBg:
      "bg-red-100",

    iconColor:
      "text-red-600",

    badge:
      "bg-red-100 text-red-600",
  },
};