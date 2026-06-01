import { Controller } from "react-hook-form";
import type {
  Control,
  FieldErrors,
} from "react-hook-form";

import { MapPin } from "lucide-react";

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

interface Props {
  control: Control<ActivoInformaticoFormData>;
  errors: FieldErrors<ActivoInformaticoFormData>;
}

export function UbicacionAsignacion({
  control,
}: Props) {
  return (
    <FormSection
      title="Ubicación y Asignación"
      icon={
        <MapPin className="h-5 w-5 text-[#006BA6]" />
      }
    >
      <FieldGroup className="space-y-5">

        {/* ZONA OPERATIVA */}

        <Controller
          name="zonaOperativaId"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel>
                Zona Operativa
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
                  <SelectValue placeholder="Seleccione una zona" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="1">
                    Lima
                  </SelectItem>

                  <SelectItem value="2">
                    Sierra
                  </SelectItem>

                  <SelectItem value="3">
                    Selva
                  </SelectItem>
                </SelectContent>
              </Select>

              <FieldError
                errors={[fieldState.error]}
              />
            </Field>
          )}
        />

        {/* SEDE */}

        <Controller
          name="sedeId"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel>
                Sede
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
                  <SelectValue placeholder="Seleccione una sede" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="1">
                    San Isidro
                  </SelectItem>

                  <SelectItem value="2">
                    Huachipa
                  </SelectItem>

                  <SelectItem value="3">
                    Abancay
                  </SelectItem>
                </SelectContent>
              </Select>

              <FieldError
                errors={[fieldState.error]}
              />
            </Field>
          )}
        />

        {/* UNIDAD OPERATIVA */}

        <Controller
          name="unidadOperativaId"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel>
                Unidad Operativa
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
                  <SelectValue placeholder="Seleccione una unidad" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="1">
                    Sede Principal
                  </SelectItem>

                  <SelectItem value="2">
                    CETPRO
                  </SelectItem>

                  <SelectItem value="3">
                    CAE
                  </SelectItem>
                </SelectContent>
              </Select>

              <FieldError
                errors={[fieldState.error]}
              />
            </Field>
          )}
        />

        {/* AMBIENTE */}

        <Controller
          name="ambienteId"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel>
                Ambiente
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
                  <SelectValue placeholder="Seleccione un ambiente" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="1">
                    Oficina Principal
                  </SelectItem>

                  <SelectItem value="2">
                    Aula 01
                  </SelectItem>

                  <SelectItem value="3">
                    Almacén
                  </SelectItem>
                </SelectContent>
              </Select>

              <FieldError
                errors={[fieldState.error]}
              />
            </Field>
          )}
        />

        {/* RESPONSABLE */}

        <Controller
          name="responsableId"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel>
                Responsable
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
                  <SelectValue placeholder="Seleccione un responsable" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="1">
                    Juan Pérez
                  </SelectItem>

                  <SelectItem value="2">
                    María Torres
                  </SelectItem>

                  <SelectItem value="3">
                    Carlos Mendoza
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