import { Button } from "@/shared/ui/button";
import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="px-4py-8 flex flex-col items-center justify-center justify-self-center text-center">
        <h2 className="text-base-content mb-6 text-5xl font-semibold">
          ¡Ups!
        </h2>
        <h3 className="text-base-content mb-1.5 text-3xl font-semibold">
          Algo salió mal
        </h3>
        <p className="text-base-content mb-6 max-w-sm">
          La página que busca no se encuentra. Le sugerimos que regrese a la página de inicio.
        </p>
        <Link to="/dashboard">
          <Button variant="default" className="px-6 py-6 cursor-pointer">
            Volver a la página de inicio
          </Button>
        </Link>
      </div>
      <div className="relative max-h-screen w-full p-2 max-lg:hidden">
        <img
          src="https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/404/error-5.png"
          alt="404 background"
          className="h-full w-full rounded-2xl"
        />
        <img
          src="https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/404/error-6.png"
          alt="404 illustration"
          className="absolute top-1/2 left-1/2 h-[clamp(300px,40vw,477px)] -translate-x-[42%] -translate-y-1/2"
        />
      </div>
    </main>
  );
}
