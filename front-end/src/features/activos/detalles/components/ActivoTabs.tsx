import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

import { ActivoFichaTecnica } from "./ActivoFichaTecnica";
import { ActivoInformacionGeneral } from "./ActivoInformacionGeneral";
import { ActivoMovimientos } from "./ActivoMovimientos";

import { movimientosMock } from "../../data/movimientos.mock";
import type { ActivoListado } from "../../types/activo-listado.type";

interface Props {
  activo: ActivoListado;
}

export function ActivoTabs({ activo }: Props) {
  return (
    <Tabs defaultValue="informacion" className="w-full">
      <TabsList
        className="
          h-auto
          w-full
          justify-start
          rounded-2xl
          bg-slate-100
          p-1
          dark:bg-slate-900
        "
      >
        <TabsTrigger value="informacion">Información</TabsTrigger>

        <TabsTrigger value="especificaciones">Especificaciones</TabsTrigger>

        <TabsTrigger value="movimientos">Movimientos</TabsTrigger>

        <TabsTrigger value="documentos">Documentos</TabsTrigger>

        <TabsTrigger value="auditoria">Auditoría</TabsTrigger>
      </TabsList>

      {/* TAB 1 */}

      <TabsContent value="informacion" className="mt-6">
        <ActivoInformacionGeneral activo={activo} />
      </TabsContent>

      {/* TAB 2 */}

      <TabsContent value="especificaciones" className="mt-6">
        <ActivoFichaTecnica
          activoId={activo.id}
          codigoPatrimonial={activo.codigoPatrimonial}
          tipoActivoId={activo.tipoActivoId}
        />
      </TabsContent>

      {/* TAB 3 */}

      <TabsContent value="movimientos" className="mt-6">
        <ActivoMovimientos movimientos={movimientosMock} />
      </TabsContent>

      {/* TAB 4 */}

      <TabsContent value="documentos" className="mt-6">
        Documentos adjuntos
      </TabsContent>

      {/* TAB 5 */}

      <TabsContent value="auditoria" className="mt-6">
        Bitácora de auditoría
      </TabsContent>
    </Tabs>
  );
}
