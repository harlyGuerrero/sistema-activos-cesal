import { usuarios } from "../data/usuarios.mock";

import {
  estadosActivo,
  tiposActivo,
  marcas,
  modelos,
  sistemasOperativos,
} from "../data/catalogos.mock";

import type { AssetStatus }
from "../constants/asset-status";

export function obtenerEstado(
  id: number
): AssetStatus {
  return (
    estadosActivo.find(
      estado => estado.id === id
    )?.nombre as AssetStatus
  );
}

export function obtenerCategoria(
  id: number
) {
  return (
    tiposActivo.find(
      tipo => tipo.id === id
    )?.nombre ?? "-"
  );
}

export function obtenerResponsable(
  id: number
) {
  return (
    usuarios.find(
      usuario => usuario.id === id
    ) ?? null
  );
}

/* ==========================================
 * MARCAS
 * ========================================== */

export function obtenerMarca(
  id?: number,
): string {
  if (!id) return "-";

  return (
    marcas.find(
      (marca) => marca.id === id,
    )?.nombre ?? "-"
  );
}

/* ==========================================
 * MODELOS
 * ========================================== */

export function obtenerModelo(
  id?: number,
): string {
  if (!id) return "-";

  return (
    modelos.find(
      (modelo) => modelo.id === id,
    )?.nombre ?? "-"
  );
}

/* ==========================================
 * SISTEMAS OPERATIVOS
 * ========================================== */

export function obtenerSistemaOperativo(
  id?: number,
): string {
  if (!id) return "-";

  return (
    sistemasOperativos.find(
      (sistema) => sistema.id === id,
    )?.nombre ?? "-"
  );
}