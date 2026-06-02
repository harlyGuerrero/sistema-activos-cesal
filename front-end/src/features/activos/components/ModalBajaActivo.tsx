"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
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

import { Textarea } from "@/shared/ui/textarea";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/field";

import {
  type BajaActivoFormData,
  BajaActivoSchema,
} from "../schemas/BajaActivoSchema";

type ModalBajaActivoProps = {
  isOpen: boolean;
  onClose: () => void;

  activo: {
    codigo: string;
    nombre: string;
  };
};

export function ModalBajaActivo({
  isOpen,
  onClose,
  activo,
}: ModalBajaActivoProps) {
  const form = useForm<BajaActivoFormData>({
    resolver: zodResolver(BajaActivoSchema),
    defaultValues: {
      motivoBaja: "",
      observaciones: "",
    },
  });

  const onSubmit = (data: BajaActivoFormData) => {
    console.log(data);

    form.reset();
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="w-[calc(100%-2rem)] max-w-180 rounded-3xl border-none shadow-lg">
        <DialogHeader>
          <div className="flex gap-4">
            <div className="flex h-20 w-28 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-7 w-7 text-red-600" />
            </div>

            <div>
              <DialogTitle className="text-3xl font-bold">
                Confirmar Baja de Activo
              </DialogTitle>

              <DialogDescription className="mt-1 text-base">
                ¿Está seguro de que desea dar de baja este activo?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* ACTIVO */}
          <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-950">
            <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              ACTIVO SELECCIONADO
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="font-semibold text-lg dark:text-slate-300">
                {activo.nombre}
              </span>

              <span className="rounded-xl bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                {activo.codigo}
              </span>
            </div>
          </div>

          <FieldGroup className="space-y-5">
            {/* MOTIVO */}
            <Controller
              control={form.control}
              name="motivoBaja"
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error}>
                  <FieldLabel>
                    Motivo de la baja
                  </FieldLabel>

                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      aria-invalid={
                        !!fieldState.error
                      }
                    >
                      <SelectValue placeholder="Seleccione un motivo..." />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="obsolescencia">
                        Obsolescencia tecnológica
                      </SelectItem>

                      <SelectItem value="deterioro">
                        Deterioro irreversible
                      </SelectItem>

                      <SelectItem value="robo">
                        Robo o pérdida
                      </SelectItem>

                      <SelectItem value="venta">
                        Venta
                      </SelectItem>

                      <SelectItem value="donacion">
                        Donación
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FieldError
                    errors={[fieldState.error]}
                  />
                </Field>
              )}
            />

            {/* OBSERVACIONES */}
            <Field
              data-invalid={
                !!form.formState.errors.observaciones
              }
            >
              <FieldLabel>
                Observaciones
              </FieldLabel>

              <Textarea
                rows={5}
                placeholder="Describa brevemente la razón técnica o administrativa..."
                {...form.register(
                  "observaciones"
                )}
              />

              <FieldError
                errors={[
                  form.formState.errors
                    .observaciones,
                ]}
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="border-t border-slate-200 pt-5">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              className="rounded-xl bg-red-600 hover:bg-red-700"
            >
              Dar de Baja
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}