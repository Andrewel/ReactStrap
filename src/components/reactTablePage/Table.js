import React, {useMemo} from "react";
import {DefaultColumnFilter} from "./DefaultColumnFilter";
import {EditableCell} from "./EditableCell";
import {useExpanded, useFilters, useGroupBy, usePagination, useRowSelect, useSortBy, useTable} from "react-table";
import {IndeterminateCheckbox} from "./IndeterminateCheckbox";
import matchSorter from "match-sorter";

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = (val) => !val;

let selectedRows = [];

export function Table({ columns, data, updateMyData, skipReset }) {
    const filterTypes = useMemo(
        () => ({
            fuzzyText: fuzzyTextFilterFn,
            text: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            },
        }),
        []
    );

    const defaultColumn = useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
            // And also our default editable cell
            Cell: EditableCell,
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        rows,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {
            pageIndex,
            pageSize,
            sortBy,
            groupBy,
            expanded,
            filters,
            selectedRowIds,
        },
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes,
            updateMyData,
            autoResetPage: !skipReset,
            autoResetSelectedRows: !skipReset,
            disableMultiSort: true,
        },
        useFilters,
        useGroupBy,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: "selection",
                        groupByBoundary: true,
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <div>
                                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                            </div>
                        ),
                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ];
            });
        }
    );

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                <div>
                                    {column.canGroupBy ? (
                                        <span {...column.getGroupByToggleProps()}>
                        {column.isGrouped ? "🛑 " : "👊 "}
                      </span>
                                    ) : null}
                                    <span {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? " 🔽"
                                                : " 🔼"
                                            : ""}
                    </span>
                                </div>
                                <div>{column.canFilter ? column.render("Filter") : null}</div>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                    prepareRow(row);
                    {
                        selectedRows = rows;
                    }
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.isGrouped ? (
                                            <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? "👇" : "👉"}
                          </span>{" "}
                                                {cell.render("Cell", { editable: false })} (
                                                {row.subRows.length})
                                            </>
                                        ) : cell.isAggregated ? (
                                            cell.render("Aggregated")
                                        ) : cell.isPlaceholder ? null : (
                                            cell.render("Cell", { editable: true })
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {"<<"}
                </button>{" "}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {"<"}
                </button>{" "}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {">"}
                </button>{" "}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {">>"}
                </button>{" "}
                <span>
          Page{" "}
                    <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
                <span>
          | Go to page:{" "}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page);
                        }}
                        style={{ width: "100px" }}
                    />
        </span>{" "}
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <pre>
        <code>
          {JSON.stringify(
              {
                  pageIndex,
                  pageSize,
                  pageCount,
                  canNextPage,
                  canPreviousPage,
                  sortBy,
                  groupBy,
                  expanded,
                  filters,
                  selectedRowIds,
              },
              null,
              2
          )}
        </code>
      </pre>
        </>
    );
}