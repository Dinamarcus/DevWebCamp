<?php

namespace Controllers;

use MVC\Router;
use Model\Evento;
use Classes\Email;
use Model\Usuario;
use Model\Registro;

class DashboardController {
    public static function index(Router $router) {
        //Obtener los ultimos registros 
        $registros = Registro::get(5);

        foreach($registros as $registro) {
            $registro->usuario = Usuario::find($registro->usuario_id);
        }

        //calcular ingresos
        $virtuales = Registro::total('paquete_id', 2);
        $presenciales = Registro::total('paquete_id', 1);

        $ingresos = ($virtuales * 46.41) + ($presenciales * 189.54); //46.41 y 189.54 es la cantidad que ingresa a la cuenta descontada las comisiones de paypal

        //Obtener eventos con mas y menos lugares disponibles
        $menos_disponibles = Evento::ordenarLimite('disponibles', 'ASC', 5);
        $mas_disponibles = Evento::ordenarLimite('disponibles', 'DESC', 5);
        
        $router->render('admin/dashboard/index', [
            'titulo' => 'Panel de administración',
            'registros' => $registros,
            'ingresos' => $ingresos,
            'menos_disponibles' => $menos_disponibles,
            'mas_disponibles' => $mas_disponibles
        ]);
    }
}