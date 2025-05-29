<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Historial de Vacaciones</title>
        <style>
            body {
                font-family: 'Segoe UI', 'Helvetica', 'Arial', sans-serif;
                font-size: 13px;
                color: #2c2c2c;
                margin: 30px 50px;
            }

            .logo {
                text-align: center;
                margin-bottom: 10px;
            }

            .logo img {
                width: 240px;
            }

            .header-text {
                text-align: center;
                margin-bottom: 25px;
            }

            .header-text h1 {
                margin: 0;
                font-size: 22px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .header-text h4 {
                margin: 5px 0;
                font-weight: 500;
                font-size: 14px;
                color: #555;
            }

            .header-text p {
                font-size: 12px;
                margin-top: 8px;
                color: #444;
            }

            .info {
                margin-top: 25px;
                padding: 15px 20px;
                border: 1px solid #ccc;
                border-radius: 8px;
                background-color: #fdfdfd;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            }

            .info-table {
                width: 100%;
                font-size: 13px;
            }

            .info-table td {
                padding: 6px 0;
                vertical-align: top;
            }

            .info-table td:first-child {
                font-weight: 600;
                width: 220px;
            }

            .section-title {
                background-color: #f0f0f0;
                padding: 8px 12px;
                font-weight: bold;
                margin-top: 35px;
                font-size: 13px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
            }

            th, td {
                border: 1px solid #ccc;
                padding: 8px;
                font-size: 12px;
                text-align: center;
            }

            th {
                background-color: #e6e6e6;
            }

            .signatures {
                margin-top: 60px;
                width: 100%;
                text-align: center;
            }

            .signatures td {
                padding: 60px 10px 10px 10px;
                font-size: 12px;
                font-weight: bold;
            }

            .note {
                font-size: 11px;
                text-align: center;
                margin-top: 40px;
                color: #777;
            }
        </style>
    </head>
    <body>

        <div class="logo">
            <img src="{{ public_path('minlogo.png') }}" alt="Logo">
        </div>

        <div class="header-text">
            <h4>UNIDAD DE RECURSOS HUMANOS</h4>
            <h1>HISTORIAL DE VACACIONES</h1>
            <p><strong>Fecha de Impresión: {{ \Carbon\Carbon::now()->format('d/m/Y') }}</strong></p>
        </div>

        <div class="info">
            <table class="info-table">
                <tr>
                    <td>GRADO NOMBRES Y APELLIDOS:</td>
                    <td>{{ $nombreCompleto }}</td>
                </tr>
                <tr>
                    <td>FECHA EGRESO:</td>
                    <td>{{ $fechaEgreso }}</td>
                </tr>
            </table>
        </div>

        <div class="section-title">Asignaciones de Vacaciones</div>
        <table>
            <thead>
            <tr>
                <th>Gestión</th>
                <th>Años de Servicio</th>
                <th>Días de Vacación</th>
                <th>Días Utilizados</th>
            </tr>
            </thead>
            <tbody>
            @foreach($asignaciones as $asig)
                <tr>
                    <td>{{ $asig->gestion }}</td>
                    <td>{{ $asig->anios_servicio }}</td>
                    <td>{{ $asig->dias_asignados }}</td>
                    <td>{{ $asig->dias_utilizados }}</td>
                </tr>
            @endforeach
            </tbody>
        </table>

        <div class="section-title">Permisos Vacación y Cuenta Vacación</div>
        <table>
            <thead>
            <tr>
                <th>Fecha Desde</th>
                <th>Fecha Hasta</th>
                <th>Tipo de Permiso</th>
                <th>N° Días</th>
            </tr>
            </thead>
            <tbody>
            @foreach($novedades as $nov)
                <tr>
                    <td>{{ $nov->startdate }}</td>
                    <td>{{ $nov->enddate }}</td>
                    <td>{{ $nov->novedad }}</td>
                    <td>{{ $nov->dias }}</td>
                </tr>
            @endforeach
            </tbody>
            <tbody>
                <tr>
                    <td colspan="3"></td>
                    <td><strong>Total: {{ $totalDias }}</strong></td>
                </tr>
            </tbody>
        </table>

        <table class="signatures">
            <tr>
                <td>_________________________<br>{{ $nombreCompleto }}<br> CONFORME<br><br> SELLO FIRMA</td>
                <td>_________________________<br>ENCARGADO DE DOTACIÓN<br>REGISTRO Y MOVILIDAD DE PERSONAL<br><br> SELLO FIRMA</td>
                <td>_________________________<br>JEFE DE UNIDAD DE RECURSOS HUMANOS<br><br><br> SELLO FIRMA</td>
            </tr>
        </table>

        <p class="note">Nota: Este documento refleja el historial de asignaciones y usos de días de vacaciones registrados oficialmente.</p>
    </body>
</html>
