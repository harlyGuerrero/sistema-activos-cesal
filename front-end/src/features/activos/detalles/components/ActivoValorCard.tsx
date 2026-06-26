import { Wallet } from "lucide-react";

interface Props {
  costo: number;
}

export function ActivoValorCard({
  costo,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        bg-blue-600
        p-5
        text-white
      "
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium">
          Valor Patrimonial
        </h3>

        <Wallet className="h-5 w-5" />
      </div>

      <p className="text-4xl font-bold">
        S/ {costo.toLocaleString()}
      </p>

      <p className="mt-2 text-sm text-blue-100">
        Valor registrado del activo
      </p>
    </div>
  );
}