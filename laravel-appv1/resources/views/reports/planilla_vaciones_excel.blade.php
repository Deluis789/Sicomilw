<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body>
    <table>
        <tr>
            <th colspan="2"><img src="{{ public_path('minlogo.png') }}" alt="Logo"></th>
            <th colspan="10" style="font-family: 'Courier New', Courier, monospace; font-size: 36px; color:rgb(83, 77, 77); text-align: center;">PLANILLA DE VACACIONES</th>
        </tr>
    </table>
    <table>
        <thead>
            <tr>
                <th style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">APELLIDOS Y NOMBRES</th>
                <th colspan="2" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">FUERZA</th>
                <th colspan="2" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">GRADO</th>
                <th colspan="2" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">AÑOS DE SERVICIO</th>
                <th colspan="2" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">DIAS ASGINADOS</th>
                <th colspan="2" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">DIAS UTILIZADOS</th>
                <th colspan="1" style="background-color: #4F81BD; color: #FFFFFF; font-weight: bold; text-align: center;">TOTAL</th>
            </tr>
        </thead>
        <tbody>
            @foreach($personas as $persona)
                <tr>
                    <td style="text-align: center; font-weight: bold; background-color: #DCE6F1;">{{ $persona->nombre }}</td>
                    <td colspan="2" style="text-align: center; font-weight: bold; background-color: #DCE6F1;">{{ $persona->fuerza }}</td>
                    <td colspan="2" style="text-align: center; font-weight: bold; background-color: #DCE6F1;">{{ $persona->grado }}</td>
                    <td colspan="2" style="text-align: center; font-weight: bold; background-color: #DCE6F1;">{{ $persona->anios_servicio }}</td>
                    <td colspan="2" style="text-align: center; font-weight: bold; background-color: #DCE6F1;">{{ $persona->dias_asignados }}</td>
                    <td colspan="2" style="text-align: center; font-weight: bold; background-color: #DCE6F1;">{{ $persona->dias_utilizados }}</td>
                    <td colspan="1" style="text-align: center; font-weight: bold; background-color: #DCE6F1;">{{ $persona->total_dias }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
