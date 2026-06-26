"use client";

import type { Table } from "@tanstack/react-table";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/shared/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePaginacion<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        px-2
      "
    >
      {/* TOTAL */}
      <div className="text-sm text-muted-foreground">
        {table.getFilteredRowModel().rows.length} activos encontrados
      </div>

      <div className="flex items-center gap-6">
        {/* ROWS PER PAGE */}
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Filas por página</p>

          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-17.5]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="10">10</SelectItem>

              <SelectItem value="20">20</SelectItem>

              <SelectItem value="50">50</SelectItem>

              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* PAGE INFO */}
        <div className="text-sm font-medium">
          Página {table.getState().pagination.pageIndex + 1}
          {" de "}
          {table.getPageCount()}
        </div>

        {/* BUTTONS */}
        <div className="flex items-center gap-1">
          <Button
            className="border-0 shadow"
            variant="outline"
            size="icon"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            className="border-0 shadow"
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            className="border-0 shadow"
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            className="border-0 shadow"
            variant="outline"
            size="icon"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
