import { Cpu } from "lucide-react";
import { Controller } from "react-hook-form";

import type {
  Control,
  FieldErrors,
} from "react-hook-form";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/field";

import { Input } from "@/shared/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import { FormSection } from "./FormSection";

import type { ActivoInformaticoFormData } from "../../schemas/ActivoInformaticoSchema";

interface Props {
  control: Control<ActivoInformaticoFormData>;
  errors: FieldErrors<ActivoInformaticoFormData>;
}

export function EspecificacionesTecnicasInformatico({
  control,
}: Props) {
  return (
    <FormSection
      title="Especificaciones Técnicas"
      icon={
        <Cpu className="h-5 w-5 text-[#006BA6]" />
      }
    >
      <FieldGroup className="space-y-5">

        {/* TIPO EQUIPO */}

        <Controller
          name="tipoEquipoId"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel>
                Tipo de Equipo Informático
              </FieldLabel>

              <Select
                value={
                  field.value
                    ? String(field.value)
                    : undefined
                }
                onValueChange={(value) =>
                  field.onChange(Number(value))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un tipo" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="1">
                    Laptop
                  </SelectItem>

                  <SelectItem value="2">
                    Desktop
                  </SelectItem>

                  <SelectItem value="3">
                    Servidor
                  </SelectItem>

                  <SelectItem value="4">
                    Impresora
                  </SelectItem>

                  <SelectItem value="5">
                    Escáner
                  </SelectItem>
                </SelectContent>
              </Select>

              <FieldError
                errors={[fieldState.error]}
              />
            </Field>
          )}
        />

        {/* MARCA / MODELO */}

        <div className="grid gap-4 md:grid-cols-2">

          <Controller
            name="marcaId"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>
                  Marca
                </FieldLabel>

                <Select
                  value={
                    field.value
                      ? String(field.value)
                      : undefined
                  }
                  onValueChange={(value) =>
                    field.onChange(Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione marca" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="1">
                      Lenovo
                    </SelectItem>

                    <SelectItem value="2">
                      HP
                    </SelectItem>

                    <SelectItem value="3">
                      Dell
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FieldError
                  errors={[fieldState.error]}
                />
              </Field>
            )}
          />

          <Controller
            name="modeloId"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>
                  Modelo
                </FieldLabel>

                <Select
                  value={
                    field.value
                      ? String(field.value)
                      : undefined
                  }
                  onValueChange={(value) =>
                    field.onChange(Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione modelo" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="1">
                      ThinkPad E14
                    </SelectItem>

                    <SelectItem value="2">
                      EliteBook 840
                    </SelectItem>

                    <SelectItem value="3">
                      Latitude 5540
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FieldError
                  errors={[fieldState.error]}
                />
              </Field>
            )}
          />

        </div>

        {/* NÚMERO DE SERIE */}

        <Controller
          name="numeroSerie"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel>
                Número de Serie
              </FieldLabel>

              <Input
                placeholder="Ingrese el número de serie"
                {...field}
              />

              <FieldError
                errors={[fieldState.error]}
              />
            </Field>
          )}
        />

        {/* PROCESADOR / RAM */}

        <div className="grid gap-4 md:grid-cols-2">

          <Controller
            name="procesador"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>
                  Procesador
                </FieldLabel>

                <Input
                  placeholder="Intel Core i7"
                  {...field}
                />

                <FieldError
                  errors={[fieldState.error]}
                />
              </Field>
            )}
          />

          <Controller
            name="memoriaRam"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>
                  Memoria RAM
                </FieldLabel>

                <Input
                  placeholder="16 GB"
                  {...field}
                />

                <FieldError
                  errors={[fieldState.error]}
                />
              </Field>
            )}
          />

        </div>

        {/* ALMACENAMIENTO / SO */}

        <div className="grid gap-4 md:grid-cols-2">

          <Controller
            name="almacenamiento"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>
                  Almacenamiento
                </FieldLabel>

                <Input
                  placeholder="512 GB SSD"
                  {...field}
                />

                <FieldError
                  errors={[fieldState.error]}
                />
              </Field>
            )}
          />

          <Controller
            name="sistemaOperativoId"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>
                  Sistema Operativo
                </FieldLabel>

                <Select
                  value={
                    field.value
                      ? String(field.value)
                      : undefined
                  }
                  onValueChange={(value) =>
                    field.onChange(Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione sistema operativo" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="1">
                      Windows 11
                    </SelectItem>

                    <SelectItem value="2">
                      Ubuntu
                    </SelectItem>

                    <SelectItem value="3">
                      Windows Server
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FieldError
                  errors={[fieldState.error]}
                />
              </Field>
            )}
          />

        </div>

      </FieldGroup>
    </FormSection>
  );
}