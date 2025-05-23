<!DOCTYPE html>
<html>
<head>
    <title>Reporte</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px; /* Tamaño de fuente ajustado */
            margin: 0;
            padding: 0;
        }
        .header {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            border-bottom: 2px solid black;
        }
        .left {
            text-align: left;
        }
        .header img {
            width: 200px;
        }
        .left h4, .left p {
            margin: 0;
            line-height: 1.5;
        }
        .center {
            text-align: center;
            flex-grow: 1;
        }
        .center h1 {
            margin: 0;
            font-size: 18px;
            font-weight: bold;
            text-decoration: underline;
        }
        .center p {
            margin: 0;
            font-size: 14px;
        }
        .right {
            position: absolute;
            top: 10px; /* Ajusta la distancia desde el top */
            right: 20px; /* Ajusta la distancia desde el borde derecho */
        }
        .circle {
            display: inline-block;
            background-color: #6c9bd2; /* Azul similar al de la imagen */
            color: white;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .demostracion-title {
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            margin: 20px 0;
            text-transform: uppercase;
        }
    </style>
</head>
<body>
    <div class="header">
    <img src="{{ asset('minlogo.png') }}" alt="Logo">
        <div class="left">
            <h4>UNIDAD DE RECURSOS HUMANOS</h4>
        </div>
        <div class="center">
            <p><em>{{ $date }}</em></p>
            <h1>PLANILLA DE VACACIONES DEL PERSONAL MILITAR</h1>
            
        </div>
      
    </div>

    <!-- Título de DEMOSTRACIÓN -->
    <!-- <div class="demostracion-title">
        DEMOSTRACIÓN
    </div> -->
    
    <table>
        <thead>
            <tr>
                <th>N°</th>
                <th>Grado y Nombre</th>
                <th>Fuerza</th>
                <th>Años serv.</th>
                <th>Dias Vacación</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($personal as $index => $personales)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $personales->name }}</td>
                <td>{{ $personales->fuerza }}</td>
                <td>{{ $personales->anios_servicio }}</td>
                <td>{{ $personales->dias_asignados }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
