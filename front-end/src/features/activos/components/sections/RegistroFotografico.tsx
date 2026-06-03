import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { 
  Camera, 
  UploadCloud, 
  Trash2, 
  Check, 
  FileImage, 
  FileText, 
  Eye
} from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/shared/ui/dialog";
import { FormSection } from "./FormSection";

interface Props {
  images: File[];
  onChange: (files: File[]) => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

const getFileConfig = (file: File) => {
  const type = file.type;
  if (type.startsWith("image/")) {
    return {
      icon: <FileImage className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      bgColor: "bg-blue-50 dark:bg-blue-950/40",
      isPreviewable: true,
    };
  }
  if (type === "application/pdf") {
    return {
      icon: <FileText className="h-5 w-5 text-rose-600 dark:text-rose-400" />,
      bgColor: "bg-rose-50 dark:bg-rose-950/40",
      isPreviewable: true, // ¡Ahora los PDFs también son previsualizables!
    };
  }
  return {
    icon: <FileText className="h-5 w-5 text-slate-600 dark:text-slate-400" />,
    bgColor: "bg-slate-50 dark:bg-slate-900",
    isPreviewable: false,
  };
};

export function RegistroFotografico({ images, onChange }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange([...images, ...acceptedFiles]);
    },
    [images, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
    multiple: true,
    onDrop,
  });

  const removeImage = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);
    onChange(updated);
    if (selectedFile === images[index]) {
      setSelectedFile(null);
    }
  };

  return (
    <FormSection
      title="Registro Fotográfico y Documental"
      icon={<Camera className="h-5 w-5 text-[#006BA6]" />}
    >
      <div className="space-y-4">
        {/* DROPZONE */}
        <div
          {...getRootProps()}
          className={`
            cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-200
            ${
              isDragActive
                ? "border-[#006BA6] bg-blue-50/40 dark:bg-blue-950/10"
                : "border-slate-200 hover:border-slate-300 bg-slate-50/30 dark:border-slate-900/40"
            }
          `}
        >
          <input {...getInputProps()} />
          <UploadCloud className="mx-auto mb-2 h-8 w-8 text-slate-400" />
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Arrastre imágenes o documentos PDF aquí
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            o haga clic para seleccionar desde su equipo
          </p>
        </div>

        {/* LISTA DE ARCHIVOS CARGADOS */}
        {images.length > 0 && (
          <div className="space-y-2.5">
            {images.map((file, index) => {
              const { icon, bgColor, isPreviewable } = getFileConfig(file);

              return (
                <div
                  key={`${file.name}-${index}`}
                  className="group flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-white shadow-xs hover:border-slate-200 transition-all dark:border-slate-800 dark:bg-slate-950"
                >
                  {/* Área Clickable */}
                  <div
                    className={`flex items-center gap-3.5 min-w-0 flex-1 pr-4 rounded-lg transition-colors ${
                      isPreviewable ? "cursor-pointer" : ""
                    }`}
                    onClick={() => isPreviewable && setSelectedFile(file)}
                    title={isPreviewable ? "Haga clic para previsualizar" : undefined}
                  >
                    <div className="p-2.5 rounded-xl shrink-0 relative group/icon" style={{ backgroundColor: "transparent" }}>
                      <div className={`p-2.5 rounded-xl ${bgColor}`}>
                        {icon}
                      </div>
                      {isPreviewable && (
                        <div className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-xl opacity-0 group-hover/icon:opacity-100 flex items-center justify-center transition-opacity">
                          <Eye className="h-3.5 w-3.5 text-slate-600 dark:text-slate-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-[#006BA6] transition-colors">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>

                  {/* Estado / Eliminar */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/60 group-hover:hidden transition-all">
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                    </div>

                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="hidden group-hover:flex h-7 w-7 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-all"
                      onClick={() => removeImage(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL ADAPTATIVO */}
      <VistaPreviaModal 
        file={selectedFile} 
        isOpen={!!selectedFile} 
        onClose={() => setSelectedFile(null)} 
      />
    </FormSection>
  );
}

/* ==========================================================================
   Componente: VistaPreviaModal (Soporte Inteligente para Imágenes y PDFs)
   ========================================================================== */
interface VistaPreviaModalProps {
  file: File | null;
  isOpen: boolean;
  onClose: () => void;
}

function VistaPreviaModal({ file, isOpen, onClose }: VistaPreviaModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const isPdf = file?.type === "application/pdf";

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    let isMounted = true;
    const url = URL.createObjectURL(file);

    if (isMounted) {
      setPreviewUrl(url);
    }

    return () => {
      isMounted = false;
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* CAMBIO CRÍTICO: max-w-5xl para PDFs (necesitan espacio) y max-w-2xl para imágenes normales.
        w-[95vw] asegura que en pantallas móviles o tablets se aproveche todo el espacio sin romperse.
      */}
      <DialogContent 
        className={`w-[95vw] p-0 overflow-hidden border-none shadow-2xl rounded-2xl bg-white dark:bg-slate-950 transition-all duration-300 ${
          isPdf ? "max-w-5xl" : "max-w-2xl"
        }`}
      >
        <DialogHeader className="p-4 border-b border-slate-100 dark:border-slate-800">
          <DialogTitle className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200 truncate pr-6">
            Previsualización de Archivo
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400 truncate max-w-[90%] mt-0.5">
            {file?.name} ({file ? formatFileSize(file.size) : ""})
          </DialogDescription>
        </DialogHeader>

        {/* Contenedor Adaptativo */}
        <div className="bg-slate-50 dark:bg-slate-900/40 flex items-center justify-center p-4 md:p-6 min-h-[200px]">
          {previewUrl ? (
            isPdf ? (
              /* RENDERIZADO DE PDF: Utiliza el motor nativo del navegador de forma segura */
              <iframe
                src={`${previewUrl}#toolbar=1`}
                className="w-full h-[65vh] md:h-[70vh] rounded-xl border border-slate-200 dark:border-slate-800 bg-white shadow-xs"
                title={file?.name}
              />
            ) : (
              /* RENDERIZADO DE IMAGEN: Tamaño real inteligente sin descuadres */
              <div className="w-full overflow-auto max-h-[70vh] flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt={file?.name || "Vista previa"}
                  className="max-w-full h-auto max-h-[68vh] object-contain rounded-xl shadow-md border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-950"
                />
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 py-12">
              <UploadCloud className="h-10 w-10 animate-pulse mb-2" />
              <p className="text-sm">Procesando archivo...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}