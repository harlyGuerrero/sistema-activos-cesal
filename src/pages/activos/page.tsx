import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function ActivosPage (){

  return(

    <div>
      <h1>Este será el contenido de Activos</h1>
      <Link to={"editar"}>
        <Button variant={"outline"}>Crear Activo</Button>
      </Link>
    </div>

  )

}