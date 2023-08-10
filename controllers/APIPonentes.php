<?php

namespace Controllers;

use Model\Dia;
use Model\Hora;
use MVC\Router;
use Model\Ponente;
use Model\Categoria;

class APIPonentes {
    public static function index(Router $router) {
        $nombre = $_POST['nombre'];
        $errors = ['data' => false];
        
        $ponentesFiltrados = Ponente::filterSearch($nombre);
        if ($ponentesFiltrados) {
            echo json_encode($ponentesFiltrados);
        } else {
            echo json_encode($errors);
        }
    }

    public static function ponente() {
        $id = $_GET['id'];
        $id = filter_var($id, FILTER_VALIDATE_INT);

        if (!$id || $id < 1) {
            echo json_encode([]);
            return;
        }

        $ponente = Ponente::find($id);
        echo json_encode($ponente, JSON_UNESCAPED_SLASHES);
    }
}