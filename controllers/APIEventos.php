<?php 

namespace Controllers;

use Model\Hora;
use Model\Evento;
use Model\Ponente;
use Model\EventoHorario;

class APIEventos {
    public static function index() {
        $dia = $_GET['dia_id'] ?? null;
        $categoria = $_GET['categoria_id'] ?? null;

        $dia_id = filter_var($dia, FILTER_VALIDATE_INT);
        $categoria_id = filter_var($categoria, FILTER_VALIDATE_INT);

        if (!$dia_id || !$categoria_id) {
            echo json_encode([]);
            return;
        }

        //consultar la DB
        $eventos = EventoHorario::whereArray(['dia_id' => $dia_id, 'categoria_id' => $categoria_id]);

        echo json_encode($eventos);    
    }
}