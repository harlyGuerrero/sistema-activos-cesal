import { AlertTriangle, CheckCircle2, Circle, XCircle } from "lucide-react";

import type { AssetStatus } from "../types/asset.types";

export const badgeStyles: Record<AssetStatus, string> = {
  Disponible:
    "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",

  Asignado: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",

  Mantenimiento:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",

  Baja: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
};

export const statusIcons: Record<AssetStatus, React.ReactNode> = {
  Disponible: (
    <CheckCircle2 className="h-3 w-3 fill-green-500 text-green-500" />
  ),

  Asignado: <Circle className="h-3 w-3 fill-blue-500 text-blue-500" />,

  Mantenimiento: <AlertTriangle className="h-3 w-3 text-yellow-500" />,

  Baja: <XCircle className="h-3 w-3 text-red-500" />,
};
