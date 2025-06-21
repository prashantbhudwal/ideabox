"use client";

import React, { useState, useMemo } from "react";
import { Badge } from "~/client/components/ui/badge";
import { Input } from "~/client/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/client/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/client/components/ui/tooltip";
import { Check, X } from "lucide-react";
import { sweetenerData } from "./sweetener-data";
import type { SweetenerData } from "./sweetener-data";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import { type ChangeEvent } from "react";

const GI_TABLE_SUGAR = 65;

export default function SweetenerList() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set([""])); // First row expanded by default
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const toggleRow = (rowId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(rowId)) {
      newExpandedRows.delete(rowId);
    } else {
      newExpandedRows.add(rowId);
    }
    setExpandedRows(newExpandedRows);
  };

  // Color coding for glycemic index
  const getGIColorClass = (gi: number): string => {
    if (gi <= 10)
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
    if (gi <= 30)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
    if (gi <= 50)
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
  };

  // Define columns for the table
  const columns = useMemo<ColumnDef<SweetenerData[0]>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <button
            className="flex items-center space-x-1 hover:text-primary transition-colors"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span>Name</span>
            <SortIcon isSorted={column.getIsSorted()} />
          </button>
        ),
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("name")}</div>
        ),
        filterFn: "includesString",
      },
      {
        accessorKey: "gi",
        header: ({ column }) => (
          <div className="text-center">
            <button
              className="flex items-center justify-center space-x-1 hover:text-primary transition-colors"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <span>GI</span>
              <SortIcon isSorted={column.getIsSorted()} />
            </button>
          </div>
        ),
        cell: ({ row }) => {
          const gi = row.getValue<number>("gi");
          return (
            <div className="text-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className={getGIColorClass(gi)}>
                      {gi}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      {gi === 0
                        ? "No impact on blood sugar"
                        : `${Math.round((gi / GI_TABLE_SUGAR) * 100)}% of table sugar`}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        },
        sortingFn: "basic",
      },
      {
        accessorKey: "relativeSweetness",
        header: ({ column }) => (
          <div className="text-center">
            <button
              className="flex items-center justify-center space-x-1 hover:text-primary transition-colors"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <span>Sweetness</span>
              <SortIcon isSorted={column.getIsSorted()} />
            </button>
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-center">
            {row.getValue<number>("relativeSweetness")}x
          </div>
        ),
        sortingFn: "basic",
      },
      {
        accessorKey: "state",
        header: ({ column }) => (
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4">
              <span>Powder</span>
              <span>Liquid</span>
            </div>
          </div>
        ),
        cell: ({ row }) => {
          const state = row.getValue<string>("state");
          return (
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center justify-center w-6">
                {state === "powder" || state === "both" ? (
                  <Check className="h-5 w-5 text-primary" />
                ) : (
                  <X className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex items-center justify-center w-6">
                {state === "liquid" || state === "both" ? (
                  <Check className="h-5 w-5 text-primary" />
                ) : (
                  <X className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "caloriesPerGram",
        header: ({ column }) => (
          <div className="text-right">
            <button
              className="flex items-center justify-end space-x-1 hover:text-primary transition-colors"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <span>Calories/g</span>
              <SortIcon isSorted={column.getIsSorted()} />
            </button>
          </div>
        ),
        cell: ({ row }) => {
          const calories = row.getValue<number>("caloriesPerGram");
          return (
            <span
              className={
                calories === 0 ? "text-primary font-medium" : "text-foreground"
              }
            >
              {calories}
            </span>
          );
        },
        sortingFn: "basic",
      },
    ],
    [],
  );

  // Setup the table
  const table = useReactTable({
    data: sweetenerData,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    enableColumnFilters: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="w-full px-2 py-4 space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search"
          value={globalFilter ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setGlobalFilter(e.target.value)
          }
        />
      </div>

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-muted/50">
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => toggleRow(row.id)}
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
                  {expandedRows.has(row.id) && (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="p-4 bg-muted/20"
                      >
                        <div className="grid gap-4">
                          <div className="space-y-4">
                            {/* Comparison Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex flex-col space-y-1 rounded-md border border-border p-3 bg-card">
                                <span className="text-xs text-muted-foreground">
                                  Comparison to Sugar
                                </span>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-sm">GI Impact:</span>
                                    <span className="text-sm font-medium">
                                      {row.original.gi === 0
                                        ? "Zero impact"
                                        : `${Math.round((row.original.gi / GI_TABLE_SUGAR) * 100)}% of sugar`}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm">
                                      Amount Needed:
                                    </span>
                                    <span className="text-sm font-medium">
                                      {row.original.relativeSweetness > 0
                                        ? `${(1 / row.original.relativeSweetness).toFixed(4)}x`
                                        : "N/A"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Carrier Information if applicable */}
                              {row.original.requiresCarrier && (
                                <div className="flex flex-col space-y-1 rounded-md border border-border p-3 bg-card">
                                  <span className="text-xs text-muted-foreground">
                                    Carrier Information
                                  </span>
                                  <div className="space-y-1">
                                    <div className="flex justify-between">
                                      <span className="text-sm">
                                        Solid Carrier:
                                      </span>
                                      <span className="text-sm font-medium">
                                        {row.original.solidCarrier || "N/A"}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm">
                                        Liquid Carrier:
                                      </span>
                                      <span className="text-sm font-medium">
                                        {row.original.liquidCarrier || "N/A"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Sources Section */}
                            <div className="rounded-md border border-border p-3 bg-card">
                              <h4 className="text-sm font-medium mb-2">
                                Sources & References
                              </h4>
                              <div className="grid gap-2">
                                {Object.entries(row.original.sources).map(
                                  ([key, source]) => (
                                    <div
                                      key={key}
                                      className="text-sm grid grid-cols-[120px,1fr] gap-2 items-baseline"
                                    >
                                      <span className="text-xs text-muted-foreground capitalize">
                                        {key.replace(/([A-Z])/g, " $1").trim()}:
                                      </span>
                                      <a
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline text-xs inline-flex items-center"
                                      >
                                        {source.description}
                                        <svg
                                          className="h-3 w-3 ml-1"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                          />
                                        </svg>
                                      </a>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Helper component for sort icons
function SortIcon({ isSorted }: { isSorted: false | "asc" | "desc" }) {
  if (!isSorted) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 opacity-30"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
        />
      </svg>
    );
  }

  return isSorted === "asc" ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 15l7-7 7 7"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
