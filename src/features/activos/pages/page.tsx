import { AssetsTable } from "@/features/dashboard/components/AssetsTable";
import { Button } from "@/shared/ui/button";
import { Link } from "react-router";

export default function ActivosPage (){

  return(

    <div>
      <h1>Este será el contenido de Activos</h1>
      <Link to={"crear"}>
        <Button variant={"outline"}>Crear Activo</Button>
        <AssetsTable />
      </Link>
    </div>

  )

}