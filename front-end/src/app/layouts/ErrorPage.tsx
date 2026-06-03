import { Button } from "@/shared/ui/button";
import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <main className="grid min-h-screen place-items-center  bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="font-semibold text-blue-600 text-5xl">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Página no disponible
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Lo siento, no encontramos la página localizada.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/dashboard">
            <Button
              className="rounded-md bg-blue-600 px-3.5 py-5 text-sm font-semibold text-white shadow-xs hover:bg-blue-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Ir al Inicio
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
