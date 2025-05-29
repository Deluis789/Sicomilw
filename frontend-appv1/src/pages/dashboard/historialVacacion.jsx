import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Input, Pagination, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
  Chip, User, Tooltip, Button
} from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

import { usePersonas } from "@/context/PersonasContext";
import { columns as baseColumns } from "@/data/dataVacaciones";
import { capitalize } from "@/data/utils";

import { SearchIcon } from "@/pages/componentes/SearchIcon";
import { ChevronDownIcon } from "@/pages/componentes/ChevronDownIcon";
import { EditIcon } from "@/pages/componentes/modals/acctions/EditIcon";
import { useNovedades } from "@/context/NovedadesContext";
import { PrinterIcon } from "@heroicons/react/24/outline";

const statusColorMap = {
  EJERCITO: "success",
  FUERZA: "danger",
  ARMADA: "danger",
};

const columns = [
  ...baseColumns,
  { name: "ACCIONES", uid: "acciones", sortable: false },
];

const INITIAL_VISIBLE_COLUMNS = [
  "name", "dias_asignados", "dias_utilizados","anios", "fechaegreso", "fuerza", "acciones",
];


export function HistorialVacacion() {

  // Reporte

  const { users10, isInitDesvincu, getDesvinculados } = usePersonas();
  const { getHistorialVacaciones, getHistorialVacacionespdf } = useNovedades();

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });

  // Modal y selección de usuario
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [historialVacaciones, setHistorialVacaciones] = useState([]);
  const [vacacionesAsignadas, setVacacionesAsignadas] = useState([]);
  const [totalDiasUtilizados, setTotalDiasUtilizados] = useState(0);
  const [personaNombre, setPersonaNombre] = useState("");

  useEffect(() => {
    if (!isInitDesvincu) getDesvinculados();
  }, [isInitDesvincu]);

  const handleEditar = async (user) => {
    setSelectedUserId(user.id);
    const data = await getHistorialVacaciones(user.id);
    if (data.status) {
      // setSelectedUserName(data.persona);
      setHistorialVacaciones(data.novedades || []);
      setVacacionesAsignadas(data.vacaciones || []);
      setTotalDiasUtilizados(data.total_dias_utilizados || 0);
      setPersonaNombre(data.persona);
    } else {
      setHistorialVacaciones([]);
      setVacacionesAsignadas([]);
      setPersonaNombre("");
    }
    setIsModalOpen(true);
  };


  const handleUserChange = async (e) => {
    const id = e.target.value;
    setSelectedUserId(id);
    const data = await getHistorialVacaciones(id);
    if (data.status) {
      setHistorialVacaciones(data.novedades);
      setVacacionesAsignadas(data.vacaciones || []);
      setTotalDiasUtilizados(data.total_dias_utilizados || 0);
      setPersonaNombre(data.persona);
    } else {
      setHistorialVacaciones([]);
      setVacacionesAsignadas([]);
      setPersonaNombre("");
    }
  };

  // Reporte
const handleImprimir = async (user) => {
  await getHistorialVacacionespdf(user.id);
};



  const filteredItems = useMemo(() => {
    const lowerSearch = filterValue.toLowerCase();
    return users10.filter(user =>
      Object.values(user).some(val =>
        typeof val === "string" && val.toLowerCase().includes(lowerSearch)
      )
    );
  }, [users10, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  const sortedItems = useMemo(() => {
    return [...filteredItems.slice(start, end)].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [filteredItems, start, end, sortDescriptor]);

  const headerColumns = useMemo(() => {
    return columns.filter(col => visibleColumns.has(col.uid));
  }, [visibleColumns]);

  const renderCell = useCallback((user, columnKey) => {
    const value = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "full", size: "sm", src: user.avatar }}
            description={user.email}
            name={value}
          />
        );
      case "fuerza":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[user.fuerza] || "default"}
            size="sm"
            variant="dot"
          >
            {value}
          </Chip>
        );
      case "acciones":
        return (
          <div className="flex justify-center gap-2">
            <Tooltip content="Ver" color="primary">
              <span
                onClick={() => handleEditar(user)} // lógica original intacta
                className="text-lg text-primary cursor-pointer active:opacity-50"
              >
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </Tooltip>
            <Tooltip content="Imprimir" color="success">
              <span
                onClick={() => handleImprimir(user)}
                className="text-lg cursor-pointer active:opacity-50"
              >
                <PrinterIcon className="h-5 w-5 text-green-600" />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return <span className="text-xs text-gray-700">{value}</span>;
    }
  }, []);

  const classNames = useMemo(() => ({
    wrapper: ["max-h-[382px]", "max-w-3xl"],
    th: ["bg-gray-100", "text-default-600", "text-xs", "border-b", "border-gray-200"],
    td: ["text-xs", "text-default-600", "border-b", "border-gray-100", "px-2", "py-1"],
  }), []);

  const topContent = (
    <div className="flex justify-between items-end gap-3">
      <Input
        isClearable
        classNames={{ base: "w-full sm:max-w-[44%]", inputWrapper: "border-1" }}
        placeholder="Buscar por cualquier campo..."
        size="sm"
        startContent={<SearchIcon className="text-default-400" />}
        value={filterValue}
        variant="bordered"
        onClear={() => setFilterValue("")}
        onValueChange={setFilterValue}
      />
      <Dropdown>
        <DropdownTrigger className="hidden sm:flex">
          <Button endContent={<ChevronDownIcon />} size="sm" variant="flat">
            Columnas
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Columnas"
          closeOnSelect={false}
          selectedKeys={visibleColumns}
          selectionMode="multiple"
          onSelectionChange={setVisibleColumns}
        >
          {columns.map((col) => (
            <DropdownItem key={col.uid} className="capitalize">
              {capitalize(col.name)}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );

  const bottomContent = (
    <div className="py-2 px-2 flex justify-between items-center">
      <Pagination
        showControls
        classNames={{ cursor: "bg-foreground text-background" }}
        color="default"
        isDisabled={!!filterValue}
        page={page}
        total={pages}
        variant="light"
        onChange={setPage}
        size="sm"
      />
      <span className="text-xs text-default-400">
        {selectedKeys === "all"
          ? "Todos seleccionados"
          : `${selectedKeys.size} seleccionados`}
      </span>
    </div>
  );

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-4 p-4">
          <Typography variant="h6" color="white">
            Historial de Vacaciones
          </Typography>
        </CardHeader>
        <CardBody className="p-4 overflow-x-auto">
          <Table
            isCompact
            removeWrapper
            aria-label="Historial de vacaciones"
            topContent={topContent}
            topContentPlacement="outside"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            selectedKeys={selectedKeys}
            sortDescriptor={sortDescriptor}
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
            checkboxesProps={{
              classNames: {
                wrapper: "after:bg-foreground after:text-background text-background",
              },
            }}
            classNames={classNames}
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "acciones" ? "center" : "start"}
                  allowsSorting={column.sortable}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={"No se encontraron registros"} items={sortedItems}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 px-4 backdrop-blur-sm">
          <div className="bg-[#f3f6f9] rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden border border-gray-200 animate-fade-in text-gray-800 flex flex-col text-[0.92rem]">

            {/* Encabezado */}
            <div className="flex justify-between items-center px-5 py-3 border-b bg-[#e7ecf3] shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 text-indigo-600 p-1.5 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2a4 4 0 014-4h4m1 0V9a4 4 0 00-4-4h-1a4 4 0 00-4 4v1a4 4 0 004 4h1v1" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Historial</p>
                  <h1 className="text-sm font-semibold text-indigo-800">Personal: <span className="text-indigo-700">{personaNombre}</span></h1>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-red-500 transition"
                aria-label="Cerrar modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">

              {/* Resumen Izquierdo */}
              <div className="col-span-1 p-4 bg-[#edf1f6] flex flex-col justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-indigo-600 mb-2">Resumen</h2>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✔️</span> Días Usados: <strong>{totalDiasUtilizados}</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">📆</span> Año: <strong>{new Date().getFullYear()}</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">📁</span> Registros: <strong>{historialVacaciones.length}</strong>
                    </li>
                  </ul>
                </div>
                <p className="mt-4 text-xs text-gray-800 italic">
                  Última actualización: {new Date().toLocaleDateString()}
                </p>
              </div>

              {/* Tabla Derecha */}
              <div className="col-span-3 p-3 bg-white overflow-y-auto">
                {historialVacaciones.length > 0 ? (
                  <div className="overflow-auto h-full">
                    <table className="w-full border border-gray-200 shadow-sm rounded-md overflow-hidden text-sm">
                      <thead className="bg-[#e4e8ef] text-gray-700 sticky top-0 z-10">
                        <tr className="text-left">
                          <th className="px-3 py-2">Inicio</th>
                          <th className="px-3 py-2">Fin</th>
                          <th className="px-3 py-2">Descripción</th>
                          <th className="px-3 py-2">Estado</th>
                          <th className="px-3 py-2">Días</th>
                          <th className="px-3 py-2">Registrado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historialVacaciones.map((item, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 transition text-gray-700 border-t border-gray-100"
                          >
                            <td className="px-3 py-2">{item.startdate}</td>
                            <td className="px-3 py-2">{item.enddate}</td>
                            <td className="px-3 py-2">{item.descripcion || "-"}</td>
                            <td className="px-3 py-2">{item.estado}</td>
                            <td className="px-3 py-2">{item.dias}</td>
                            <td className="px-3 py-2">{item.created_at}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-indigo-500 italic">
                    No hay registros disponibles.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
