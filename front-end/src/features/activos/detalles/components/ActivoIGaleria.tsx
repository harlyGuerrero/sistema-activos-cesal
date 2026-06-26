"use client";

import { useState } from "react";

import { ImageIcon, Expand } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";

interface ActivoGaleriaProps {
  imagenes?: string[];
}

export function ActivoGaleria({ imagenes = [] }: ActivoGaleriaProps) {
  const [imagenActual, setImagenActual] = useState(0);
  const [open, setOpen] = useState(false);

  const imagenPrincipal = imagenes[imagenActual];

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-950
      "
    >
      {/* IMAGEN PRINCIPAL */}

      <div
        className="
          relative
          flex
          h-[450px]
          items-center
          justify-center
          overflow-hidden
          rounded-3xl
          bg-slate-100
          dark:bg-slate-900
          group
        "
      >
        {imagenPrincipal ? (
          <>
            <img
              src={imagenPrincipal}
              alt="Activo"
              className="
      h-full
      w-full
      cursor-pointer
      object-cover
    "
              onClick={() => setOpen(true)}
            />

            <button
              onClick={() => setOpen(true)}
              className="
                absolute
                right-4
                top-4
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-black/60
                text-white
                opacity-0
                transition
                group-hover:opacity-100
              "
            >
              <Expand className="h-5 w-5" />
            </button>
          </>
        ) : (
          <div
            className="
              flex
              flex-col
              items-center
              gap-3
              text-slate-400
            "
          >
            <ImageIcon
              className="
                h-14
                w-14
              "
            />

            <p className="text-sm">No hay fotografías registradas</p>
          </div>
        )}
      </div>

      {/* MINIATURAS */}

      {imagenes.length > 0 && (
        <div
          className="
            mt-4
            flex
            gap-3
          "
        >
          {imagenes.map((imagen, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setImagenActual(index)}
              className={`
                  h-24
                  w-24
                  overflow-hidden
                  rounded-2xl
                  border-2
                  transition-all

                  ${
                    imagenActual === index
                      ? "border-blue-600"
                      : "border-transparent"
                  }
                `}
            >
              <img
                src={imagen}
                alt={`Foto ${index + 1}`}
                className="
                    h-full
                    w-full
                    object-cover
                  "
              />
            </button>
          ))}
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
          max-w-120
      border-none
      bg-transparent
      shadow-none
      p-0
      ring-0
      md:max-w-180
      xl:max-w-5xl
    "
        >
          <DialogTitle className="sr-only">Vista ampliada</DialogTitle>

          <img
            src={imagenPrincipal}
            alt="Activo"
            className="
        max-h-[85vh]
        w-full
        rounded-3xl
        object-cover
      "
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
