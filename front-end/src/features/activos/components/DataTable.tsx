"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

import { DataTablePaginacion } from "./DataTablePagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}


export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),

    getPaginationRowModel: getPaginationRowModel(),

    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });
  
  return (
    <div className="space-y-4 hidden md:block">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="overflow-x-auto ">
          <Table className="">
            {/* HEADER */}
            <TableHeader className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-900 ">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-slate-200 dark:border-slate-800
                    "
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="font-semibold text-slate-600 dark:text-slate-300"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            {/* BODY */}
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className=" border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-40 text-center"
                  >
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-500">
                        No se encontraron activos
                      </p>
                      <p className="text-xs text-slate-400">
                        Prueba modificando los filtros
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <DataTablePaginacion table={table} />
    </div>
  );
}
