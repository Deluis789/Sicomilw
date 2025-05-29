import api from '@/api/axios';


// Crear registro de parte diaria
const vacaciones = (data) => api.post('/vacaciones', data);


// Obtener historial de vacaciones por persona
const getHistorialVacaciones = (idpersona) => api.get(`/novedades/historial-vacaciones/${idpersona}`);
// Reporte
const getHistorialVacacionespdf = (idpersona) =>
    api.get(`historialVacacion/${idpersona}`, { responseType: 'blob' });


export default { vacaciones, getHistorialVacaciones, getHistorialVacacionespdf};
