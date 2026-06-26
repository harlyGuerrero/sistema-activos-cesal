"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcw, MapPin } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

import {
  AltaActivoSchema,
  type AltaActivoFormData,
} from "../schemas/AltaActivoSchema";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/ui/dialog";

import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import type { ActivoListado } from "../types/activo-listado.type";
interface ModalAltaActivoProps {
  isOpen: boolean;

  onClose: () => void;

  activo?: ActivoListado | null;
}

export function ModalAltaActivo({
  isOpen,
  onClose,
  activo,
}: ModalAltaActivoProps) {
  const form = useForm<AltaActivoFormData>({
    resolver: zodResolver(AltaActivoSchema),
    defaultValues: {
      ubicacionProyecto: "",
    },
  });

  const onSubmit = (data: AltaActivoFormData) => {
    console.log("REACTIVAR ACTIVO", data);

    form.reset();

    onClose();
  };

  const sedes = [
    {
      id: "sede-central",
      nombre: "Sede Central - Lima",
    },
    {
      id: "huachipa",
      nombre: "Huachipa",
    },
    {
      id: "abancay",
      nombre: "Abancay",
    },
    {
      id: "atalaya",
      nombre: "Atalaya",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-180 overflow-hidden rounded-[28px] p-0 ">
        {/* HEADER */}

        <div className="px-5 pt-6 sm:px-8 sm:pt-8">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <RefreshCcw className="h-7 w-7 text-blue-700" />
              </div>

              <div>
                <DialogTitle className="text-[20px] font-bold">
                  Confirmar Alta de Activo
                </DialogTitle>

                <DialogDescription className="text-base text-slate-500">
                  {activo?.nombre}
                </DialogDescription>

                <p className="text-xs text-slate-400">
                  {activo?.codigoPatrimonial}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BODY */}

        <div className="space-y-6 px-5 py-5 sm:px-8 sm:py-6">
          {/* MENSAJE */}

          <div className="rounded-3xl bg-slate-100 p-6 dark:bg-slate-950 ">
            <p className="text-[15px] leading-6 text-slate-700 dark:text-slate-300">
              ¿Desea reactivar este activo en el inventario institucional? El
              activo volverá a estar disponible para asignación y reportes
              financieros.
            </p>
          </div>

          {/* FORM */}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="mb-3 block text-sm font-semibold uppercase tracking-wide text-slate-400">
                Nueva Ubicación o Proyecto
              </label>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <Controller
                  control={form.control}
                  name="ubicacionProyecto"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-14 w-full rounded-2xl border-none bg-slate-100 pl-12 text-base ">
                        <SelectValue placeholder="Seleccione una sede" />
                      </SelectTrigger>

                      <SelectContent>
                        {sedes.map((sede) => (
                          <SelectItem key={sede.id} value={sede.id}>
                            {sede.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {form.formState.errors.ubicacionProyecto ? (
                <p className="mt-2 text-xs text-red-500">
                  {form.formState.errors.ubicacionProyecto.message}
                </p>
              ) : (
                <p className="mt-2 text-xs text-slate-400">
                  Este campo es requerido para completar la reactivación.
                </p>
              )}
            </div>

            {/* BOTON PRINCIPAL */}

            <Button
              type="submit"
              className="
                h-14
                w-full
                rounded-2xl
                bg-blue-700
                text-lg
                font-semibold
                shadow-lg
                hover:bg-blue-800
                dark:bg-blue-600
                dark:hover:bg-blue-700
                text-white cursor-pointer
              "
            >
              Confirmar Alta
            </Button>

            {/* CANCELAR */}

            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="
                h-auto
                w-full
                text-lg
                text-slate-600
                underline
                hover:bg-transparent
                cursor-pointer
              "
            >
              Cancelar
            </Button>
          </form>
        </div>

        {/* FOOTER */}

        <div className="border-t border-slate-200 bg-slate-100 px-8 py-4 dark:bg-slate-950 dark:border-slate-700">
          <p className="text-sm text-slate-500">
            ℹ Esta acción será registrada en la bitácora de auditoría.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
