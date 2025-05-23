<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\RolesController;
use App\Http\Controllers\Api\AuthController;

use App\Http\Controllers\Api\OrganizacionController;
use App\Http\Controllers\Api\NovedadesController;
use App\Http\Controllers\Api\PersonasController;
use App\Http\Controllers\Api\PuestosController;
use App\Http\Controllers\Api\TipoNovedadesController;
use App\Http\Controllers\Api\AssignmentsController;

use App\Http\Controllers\Api\ArmasController;
use App\Http\Controllers\Api\EspecialidadesController;
use App\Http\Controllers\Api\EstadocvController;
use App\Http\Controllers\Api\FuerzasController;
use App\Http\Controllers\Api\GradosController;
use App\Http\Controllers\Api\SexoController;
use App\Http\Controllers\Api\SituacionesController; 
use App\Http\Controllers\Api\ExpedicionesController;

use App\Http\Controllers\Api\ReportsController;
use App\Http\Controllers\Api\InfoReportsController;
use App\Http\Controllers\Api\ReparticionesController; 
use App\Http\Controllers\Api\AsignacionVacacionesController; 
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
// Route::apiResource('/usuarios', UserController::class);
// Route::apiResource('/rolsUser', RolesController::class);
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('login', [AuthController::class,'login']);
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('register', [AuthController::class,'register']);
    Route::post('me', [AuthController::class,'me']);
    
});

// Route::get('novedades-excel-completo', [ReportsController::class, 'generateAllNovedadesExcel']);}
Route::middleware(['jwt.verify'])->group(function () {

    Route::apiResource('usuarios', UserController::class);
    Route::put('updatestatususer/{id}', [UserController::class, 'updateStatusUser']);
    Route::get('showroluser/{id}',  [UserController::class, 'showroluser']);
    Route::apiResource('roles', RolesController::class);
    Route::apiResource('organizacion', OrganizacionController::class);
    Route::get('organizacion/{id}/hijos', [OrganizacionController::class, 'obtenerHijos']);
    Route::get('organigrama', [OrganizacionController::class, 'getOrganigrama']);
    Route::get('obtenerOrganizacionesPadres', [OrganizacionController::class, 'obtenerOrganizacionesPadres']);
    Route::get('obtenerHijastros/{id}/hijos', [OrganizacionController::class, 'obtenerHijastros']);

    Route::apiResource('puestos', PuestosController::class);
    Route::apiResource('tiponovedades', TipoNovedadesController::class);
    Route::apiResource('persona', PersonasController::class);
    Route::get('indexpersonal', [PersonasController::class, 'indexPersonal']);
    
    Route::get('showpersonal/{id}', [PersonasController::class, 'showPersonal']);
    Route::get('getdesvinculados', [PersonasController::class, 'getDesvinculadosGestionActual']);
    Route::get('listpersonasbyuseraccess/{id}', [PersonasController::class, 'listPeopleByUserAccess']);
    Route::get('listpersonaspermisos/{id}', [PersonasController::class, 'listPeopleByUserPermisos']);
    Route::get('listpeoplepartediaria/{id}', [PersonasController::class, 'listPeoplePartediaria']);
    /**PERMISOS SOLITADOS VIGENTES */
    Route::get('listpermisossolicitados', [PersonasController::class, 'listPermisosSolicitados']);

    Route::apiResource('assignments', AssignmentsController::class);
    Route::post('changeAssignment', [AssignmentsController::class, 'changeAssignment']);
    Route::get('showAssignments/{id}', [AssignmentsController::class, 'showAssignments']);
    Route::put('updateEndDate/{id}', [AssignmentsController::class, 'updateEndDate']);
    Route::apiResource('novedades', NovedadesController::class);
    Route::get('indexVigentes', [NovedadesController::class, 'indexVigentes']);
    Route::post('storemassive', [NovedadesController::class, 'storeMassive']);

    Route::post('roldeusuario', [UserController::class,'asignarRoles']);
    Route::post('registraracceso', [UserController::class,'registrarAcceso']);
    Route::delete('eliminaracceso/{iduser}/{idorg}', [UserController::class,'eliminarAcceso']);
    Route::get('userindex', [UserController::class,'userIndex']);
    Route::get('showuseraccesses/{iduser}/{idorg}', [UserController::class,'showUserAccesses']);

    Route::apiResource('armas', ArmasController::class);
    Route::apiResource('especialidades', EspecialidadesController::class);
    Route::apiResource('estadocv', EstadocvController::class);
    Route::apiResource('fuerzas', FuerzasController::class);
    Route::apiResource('grados', GradosController::class);
    Route::apiResource('sexos', SexoController::class);
    Route::apiResource('situaciones', SituacionesController::class); 
    Route::apiResource('expediciones', ExpedicionesController::class);

    Route::get('listnovedadesbydate/{iduser}/{fecha}',  [ReportsController::class, 'listNovedadesByDate']);
    Route::get('partereportsgeneral/{iduser}/{fecha}',  [ReportsController::class, 'parteReportsGeneral']);

    // REPORTES EN EXCEL
    Route::get('exportar-personas', [ReportsController::class, 'exportPersonasExcel']);
    Route::get('planillavacacionesexcel', [ReportsController::class, 'planillaVacacionesExcel']);

    Route::get('vacacionpersona', [PersonasController::class, 'obtenerVacacionesPersona']);


    Route::get('partereportsusers/{iduser}/{fecha}',  [ReportsController::class, 'parteReportsUsers']);
    Route::get('solpermisosrrhh/{iduser}/{fecha}',  [ReportsController::class, 'solPermisosRrhh']);
    Route::get('papeletapermiso/{id}',  [ReportsController::class, 'PapeletaPermiso']);
    

    Route::get('indexreporpartes/{id}',  [InfoReportsController::class, 'indexReporPartes']);
    /**REPORTE DE PARTES RRHH */
    Route::get('indexreporpartesrrhh',  [InfoReportsController::class, 'indexReporPartesRrHh']);
    Route::get('userseguimientorrhh',  [InfoReportsController::class, 'userSeguimiento']);
    Route::get('userhomecuadros',  [InfoReportsController::class, 'userHomeCuadros']);
    Route::get('countpersonal',  [InfoReportsController::class, 'countPersonal']);
    Route::get('countnovedades',  [InfoReportsController::class, 'countNovedades']);
    Route::get('countpartepersona',  [InfoReportsController::class, 'countPartePersona']);

    Route::apiResource('reparticiones', ReparticionesController::class);

    Route::get('indexpersonalgeneral', [PersonasController::class, 'indexPersonalGeneral']);
    Route::apiResource('vacaciones', AsignacionVacacionesController::class);
    //vericador de vacaciones 
    Route::get('verificadorvacaciones/{idper}/{idvacacion}', [NovedadesController::class, 'verificadorVacaciones']);
    Route::get('verificadorVacacionesHoras/{idper}/{idvacacion}/{fecha}', [NovedadesController::class, 'verificadorVacacionesHoras']);
    Route::get('verificadorVacacionesDiasVigentes/{idper}/{idvacacion}/{fechini}/{fechfin}', [NovedadesController::class, 'verificadorVacacionesDiasVigentes']);
    Route::get('planillavacaciones',  [ReportsController::class, 'planillaVacaciones']);
});