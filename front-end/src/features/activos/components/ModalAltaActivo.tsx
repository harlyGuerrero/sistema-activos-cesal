"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcw, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";

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
import { Input } from "@/shared/ui/input";

interface ModalAltaActivoProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalAltaActivo({
  isOpen,
  onClose,
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
                <DialogTitle className="text-[20px] font-bold text-slate-900">
                  Confirmar Alta de Activo
                </DialogTitle>

                <DialogDescription className="text-base text-slate-500">
                  Gestión Institucional de Inventarios
                </DialogDescription>
              </div>
            </div>
          </div>
        </div>

        {/* BODY */}

        <div className="space-y-6 px-5 py-5 sm:px-8 sm:py-6">

          {/* MENSAJE */}

          <div className="rounded-3xl bg-slate-100 p-6 dark:bg-slate-950 ">
            <p className="text-[15px] leading-6 text-slate-700 dark:text-slate-300">
              ¿Desea reactivar este activo en el inventario institucional?
              El activo volverá a estar disponible para asignación y
              reportes financieros.
            </p>
          </div>

          {/* FORM */}

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div>
              <label className="mb-3 block text-sm font-semibold uppercase tracking-wide text-slate-600">
                Nueva Ubicación o Proyecto
              </label>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <Input
                  placeholder="Ej: Sede Central - Ala Este"
                  {...form.register("ubicacionProyecto")}
                  className="h-14 rounded-2xl border-none bg-slate-100 pl-12 text-base"
                />
              </div>

              {form.formState.errors.ubicacionProyecto ? (
                <p className="mt-2 text-xs text-red-500">
                  {
                    form.formState.errors
                      .ubicacionProyecto.message
                  }
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