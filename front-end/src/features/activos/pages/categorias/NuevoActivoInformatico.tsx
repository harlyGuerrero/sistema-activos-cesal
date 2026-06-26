import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ActivoInformaticoSchema,
  type ActivoInformaticoFormData,
} from "../../schemas/ActivoInformaticoSchema";

import { Button } from "@/shared/ui/button";
import { UbicacionAsignacion } from "../../components/formulario/UbicacionAsignacion";
import { InformacionPatrimonial } from "../../components/formulario/InformacionPatrimonial";
import { EspecificacionesTecnicasInformatico } from "../../components/formulario/EspecificacionesTecnicasInformatico";
import { useState } from "react";
import { RegistroFotografico } from "../../components/formulario/RegistroFotografico";
import { Link } from "react-router";

export default function NuevoActivoInformatico() {
  const form = useForm<ActivoInformaticoFormData>({
    resolver: zodResolver(ActivoInformaticoSchema),
  });

  const [imagenes, setImagenes] = useState<File[]>([]);

  const onSubmit = (data: ActivoInformaticoFormData) => {
    const payload = {
      ...data,
      imagenes,
    };

    console.log(payload);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Nuevo Equipo Informático</h1>

        <p className="text-muted-foreground">
          Registre la información del activo.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* IZQUIERDA */}

        <div className="space-y-6 lg:col-span-8">
          {/* Información Patrimonial */}
          <InformacionPatrimonial
            control={form.control}
            errors={form.formState.errors}
          />

          {/* Especificaciones Técnicas */}
          <EspecificacionesTecnicasInformatico
            control={form.control}
            errors={form.formState.errors}
          />
        </div>

        {/* DERECHA */}

        <div className="space-y-6 lg:col-span-4">
          {/* Ubicación */}
          <UbicacionAsignacion
            control={form.control}
            errors={form.formState.errors}
          />
          {/* Fotografías */}
          <RegistroFotografico images={imagenes} onChange={setImagenes} />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Link to="/activos/nuevo">
          <Button className="cursor-pointer bg-slate-100 shadow text-slate-900">
            Volver
          </Button>
        </Link>
        <Button type="submit" className="cursor-pointer shadow bg-blue-700 text-slate-100">
          Guardar Activo
        </Button>
      </div>
    </form>
  );
}
