import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Camera, UploadCloud, Trash2 } from "lucide-react";

import { Button } from "@/shared/ui/button";

import { FormSection } from "./FormSection";

interface Props {
  images: File[];
  onChange: (files: File[]) => void;
}

export function RegistroFotografico({
  images,
  onChange,
}: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange([...images, ...acceptedFiles]);
    },
    [images, onChange]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: true,
    onDrop,
  });

  const removeImage = (index: number) => {
    const updated = [...images];

    updated.splice(index, 1);

    onChange(updated);
  };

  return (
    <FormSection
      title="Registro Fotográfico"
      icon={
        <Camera className="h-5 w-5 text-[#006BA6]" />
      }
    >
      <div className="space-y-5">

        {/* DROPZONE */}

        <div
          {...getRootProps()}
          className={`
            cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all
            ${
              isDragActive
                ? "border-[#006BA6] bg-blue-50"
                : "border-slate-300"
            }
          `}
        >
          <input {...getInputProps()} />

          <UploadCloud className="mx-auto mb-3 h-10 w-10 text-slate-400" />

          <p className="font-medium">
            Arrastre imágenes aquí
          </p>

          <p className="text-sm text-slate-500">
            o haga clic para seleccionar archivos
          </p>
        </div>

        {/* PREVIEW */}

        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-3">

            {images.map((file, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl border"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="h-32 w-full object-cover"
                />

                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute right-2 top-2 h-8 w-8"
                  onClick={() =>
                    removeImage(index)
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

          </div>
        )}

      </div>
    </FormSection>
  );
}