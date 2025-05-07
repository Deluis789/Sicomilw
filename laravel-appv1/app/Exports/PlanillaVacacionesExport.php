<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class PlanillaVacacionesExport implements FromView
{
    protected $personas;

    public function __construct($personas)
    {
        $this->personas = $personas;
    }

    public function view(): View
    {
        return view('reports.planilla_vaciones_excel', [
            'personas' => $this->personas
        ]);
    }
}
