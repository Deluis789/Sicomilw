const columnsVacaciones = [
{ name: "Gestión", uid: "gestion", sortable: true },
{ name: "Años de Servicio", uid: "anios_servicio", sortable: true },
{ name: "Días Asignados", uid: "dias_asignados", sortable: true },
{ name: "Días Utilizados", uid: "dias_utilizados", sortable: true },
{ name: "Asignación ID", uid: "id_asigv", sortable: false },
];

const columnsNovedades = [
{ name: "Inicio", uid: "startdate", sortable: true },
{ name: "Fin", uid: "enddate", sortable: true },
{ name: "Descripción", uid: "descripcion", sortable: true },
{ name: "Estado", uid: "estado", sortable: true },
{ name: "Días", uid: "dias", sortable: true },
{ name: "Fecha Registro", uid: "created_at", sortable: true },
];

export { columnsVacaciones, columnsNovedades };
