<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte Excel Personal</title>
</head>
<body>

<table>
        <tr>
            <th colspan="2"><img src="{{ public_path('minlogo.png') }}" alt="Logo"></th>
            <th colspan="30" style="font-family: 'Courier New', Courier, monospace; font-size:32 px; rgba(95, 92, 92, 0.5); text-align: center;">REPORTE PERSONAL ACTIVOS DEL SISTEMA CONTROL PERSONAL MILITAR</th>
        </tr>
</table>
<table>
    <thead>
        <tr>
            <th colspan="4" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">REPARTICIÓN</th>
            <th colspan="3" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">FUERZA</th>
            <th colspan="2" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">GRADO</th>
            <th colspan="3" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">NOMBRES</th>
            <th colspan="2" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">AP_PATERNO</th>
            <th colspan="2" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">AP_MATERNO</th>
            <th colspan="2" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">PUESTOS</th>
            <th colspan="2" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">CELULAR</th>
            <th colspan="2" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">CI</th>
            <th colspan="3" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">EMAIL</th>
            <th colspan="2" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">FECHA DE NACIMIENTO</th>
            <th colspan="2" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">FECHA DE EGRESO</th>
            <th colspan="2" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">ARMA</th>
            <th colspan="2" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">ESPECIALIDAD</th>
            <th colspan="2" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">SEXO</th>
            <th colspan="2" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">ESTAD CV</th>
            <!-- <th>Situación</th> -->
            <th colspan="2" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">EXPEDICIÓN</th>
            <th colspan="2" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">GRUPO S.</th>
            
            
        </tr>
    </thead>
    <tbody>
        @foreach($personas as $p)
            <tr>
                <td colspan="4" style="text-align: left; font-weight: bold; background-color: #DCE6F1; border: 1px solid #000;">{{ $p->nombre_organizacion }}</td>
                <td colspan="3" style="text-align: left; font-weight: bold; background-color: #DCE6F1; border: 1px solid #000;">{{ $p->fuerza }}</td>
                <td colspan="2" style="text-align: left; font-weight: bold; background-color: #DCE6F1; border: 1px solid #000;">{{ $p->grado }}</td>
                <td colspan="3" style="text-align: left; font-weight: bold; background-color: #DCE6F1; border: 1px solid #000;">{{ $p->nombres }}</td>
                <td colspan="2" style="text-align: left; font-weight: bold; background-color: #DCE6F1; border: 1px solid #000;">{{ $p->appaterno }}</td>
                <td colspan="2" style="text-align: left; font-weight: bold; background-color: #DCE6F1; border: 1px solid #000;">{{ $p->apmaterno }}</td>
                <td colspan="2" style="text-align: left; font-weight: bold; background-color: #DCE6F1; border: 1px solid #000;">{{ $p->nombre_puesto }}</td>
                <td colspan="2" style="text-align: left; font-weight: bold; background-color: #DCE6F1; border: 1px solid #000;">{{ $p->celular }}</td>
                <td colspan="2" style="text-align: left; font-weight: bold; background-color: #DCE6F1; border: 1px solid #000;">{{ $p->ci }}</td>
                <td colspan="3" style="text-align: left; font-weight: bold; background-color: #DCE6F1; border: 1px solid #000;">{{ $p->email }}</td>
                <td colspan="2" style="text-align: left; font-weight: bold; background-color: #DCE6F1; border: 1px solid #000;">{{ $p->fechnacimeinto }}</td>
                <td colspan="2" style="text-align: left; font-weight: bold; background-color: #DCE6F1; border: 1px solid #000;">{{ $p->fechaegreso }}</td>
                <td colspan="2" style="text-align: left; font-weight: bold; background-color: #DCE6F1; border: 1px solid #000;">{{ $p->arma }}</td>
                <td colspan="2" style="text-align: left; font-weight: bold; background-color: #DCE6F1; border: 1px solid #000;">{{ $p->especialidad }}</td>
                <td colspan="2" style="text-align: left; font-weight: bold; background-color: #DCE6F1; border: 1px solid #000;">{{ $p->sexo }}</td>
                <td colspan="2" style="text-align: left; font-weight: bold; background-color: #DCE6F1; border: 1px solid #000;">{{ $p->cv }}</td>
                <!-- <td>{{ $p->situacion }}</td> -->
                <td colspan="2" style="text-align: left; font-weight: bold; background-color: #DCE6F1; border: 1px solid #000;">{{ $p->expedicion }}</td>
                <td colspan="2" style="text-align: left; font-weight: bold; background-color: #DCE6F1; border: 1px solid #000;">{{ $p->gsanguineo }}</td>
            </tr>
        @endforeach
    </tbody>
</table>

</body>
</html>
