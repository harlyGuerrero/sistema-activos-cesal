import { Controller } from "react-hook-form";
import type {
  Control,
  FieldErrors,
} from "react-hook-form";

import { Package } from "lucide-react";

import { Input } from "@/shared/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/field";

import { FormSection } from "./FormSection";

import type { ActivoInformaticoFormData } from "../../schemas/ActivoInformaticoSchema";

interface InformacionPatrimonialProps {
  control: Control<ActivoInformaticoFormData>;
  errors: FieldErrors<ActivoInformaticoFormData>;
}

export function InformacionPatrimonial({
  control,
}: InformacionPatrimonialProps) {
  return (
    <FormSection
      title="Información Patrimonial"
      icon={
        <Package className="h-5 w-5 text-[#006BA6]" />
      }
    >
      <FieldGroup className="space-y-5">

        {/* NOMBRE DEL ACTIVO */}

        <Controller
          name="nombre"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel>
                Nombre del Activo
              </FieldLabel>

              <Input
                placeholder="Ej. Laptop Lenovo ThinkPad E14"
                {...field}
              />

              <FieldError
                errors={[fieldState.error]}
              />
            </Field>
          )}
        />

        {/* CÓDIGO PATRIMONIAL / PROYECTO */}

        <div className="grid gap-4 md:grid-cols-2">

          <Controller
            name="codigoPatrimonial"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>
                  Código Patrimonial
                </FieldLabel>

                <Input
                  placeholder="PAT-000001"
                  {...field}
                />

                <FieldError
                  errors={[fieldState.error]}
                />
              </Field>
            )}
          />

          <Controller
            name="codigoProyecto"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>
                  Código Proyecto
                </FieldLabel>

                <Input
                  placeholder="PROY-001"
                  {...field}
                />

                <FieldError
                  errors={[fieldState.error]}
                />
              </Field>
            )}
          />

        </div>

        {/* PROVEEDOR / FACTURA */}

        <div className="grid gap-4 md:grid-cols-2">

          <Controller
            name="codigoProveedor"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>
                  Código Proveedor
                </FieldLabel>

                <Input
                  placeholder="PROV-001"
                  {...field}
                />

                <FieldError
                  errors={[fieldState.error]}
                />
              </Field>
            )}
          />

          <Controller
            name="numeroFactura"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>
                  Número de Factura
                </FieldLabel>

                <Input
                  placeholder="F001-000123"
                  {...field}
                />

                <FieldError
                  errors={[fieldState.error]}
                />
              </Field>
            )}
          />

        </div>

        {/* FECHA / COSTO */}

        <div className="grid gap-4 md:grid-cols-2">

          <Controller
            name="fechaAdquisicion"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>
                  Fecha de Adquisición
                </FieldLabel>

                <Input
                  type="date"
                  value={
                    field.value
                      ? new Date(field.value)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      new Date(e.target.value)
                    )
                  }
                />

                <FieldError
                  errors={[fieldState.error]}
                />
              </Field>
            )}
          />

          <Controller
            name="costo"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>
                  Costo de Adquisición
                </FieldLabel>

                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="0.00"
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      Number(e.target.value)
                    )
                  }
                />

                <FieldError
                  errors={[fieldState.error]}
                />
              </Field>
            )}
          />

        </div>

        {/* ESTADO */}

        <Controller
          name="estadoActivoId"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel>
                Estado del Activo
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
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un estado" />
                </SelectTrigger>

                <SelectContent>

                  {/* TEMPORAL */}

                  <SelectItem value="1">
                    Disponible
                  </SelectItem>

                  <SelectItem value="2">
                    Asignado
                  </SelectItem>

                  <SelectItem value="3">
                    Mantenimiento
                  </SelectItem>

                  <SelectItem value="4">
                    Baja
                  </SelectItem>

                </SelectContent>
              </Select>

              <FieldError
                errors={[fieldState.error]}
              />
            </Field>
          )}
        />

      </FieldGroup>
    </FormSection>
  );
}