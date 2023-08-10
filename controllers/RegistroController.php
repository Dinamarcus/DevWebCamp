<?php

namespace Controllers;

use Model\Dia;
use Model\Hora;
use MVC\Router;
use Model\Evento;
use Model\Regalo;
use Model\Paquete;
use Model\Ponente;
use Model\Usuario;
use Model\Registro;
use Model\Categoria;
use Model\EventosRegistros;

class RegistroController {
    public static function crear(Router $router) {
        if (!is_auth()) {
            header('Location: /');

            die();
        }

        //verificar si el usuario ya esta registrado
        $registro = Registro::where('usuario_id', $_SESSION['id']); //buscar en la DB

        if (isset($registro) && ($registro->paquete_id === "2" || $registro->paquete_id === "3")) {
            header('Location: /boleto?id=' . urlencode($registro->token));
            
            die();
        } 

        if (isset($registro) && $registro->paquete_id === "1") {
            header('Location: /finalizar-registro/conferencias');

            die();
        }

        $router->render('registro/crear', [
            'titulo' => 'Finalizar Registro'
        ]);
    }

    public static function gratis(Router $router) {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (!is_auth()) {
                header('Location: /login');

                die();
            }

            //verificar si el usuario ya esta registrado
            $registro = Registro::where('usuario_id', $_SESSION['id']); //buscar en la DB
            
            if (isset($registro) && $registro->paquete_id === "3") {
                header('Location: /boleto?id=' . urlencode($registro->token));

                die();
            } 

            $token =substr(md5(uniqid(rand(), true)), 0, 8);

            //crear registro
            $datos = [
                'paquete_id' => 3,
                'pago_id' => '',
                'token' => $token,
                'usuario_id' => $_SESSION['id']
            ];

            $registro = new Registro($datos);
            $resultado = $registro->guardar();

            if ($resultado) {
                header('Location: /boleto?id=' . urlencode($registro->token));

                die();
            }

        }
    }

    public static function pagar(Router $router) {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (!is_auth()) {
                header('Location: /login');

                die();
            }

            //verificar si el usuario ya esta registrado
            $registro = Registro::where('usuario_id', $_SESSION['id']); //buscar en la DB

            //validar que el post no venga vacio
            if(empty($_POST)) {
                echo json_encode([]);
                
                return;
            }

            //crear registro
            $token =substr(md5(uniqid(rand(), true)), 0, 8);

            $datos = $_POST;
            $datos['token'] = $token;
            $datos['usuario_id'] = $_SESSION['id'];

            try {
                $registro = new Registro($datos);
                $resultado = $registro->guardar();

                echo json_encode($resultado);
            } catch (\Exception $e) {
                echo json_encode([
                    'error' => $e->getMessage()
                ]);
            }

        }
    }

    public static function boleto(Router $router) {
        //validar la URL
        $id = $_GET['id'];

        if (!$id || !strlen($id) === 8) {
            header('Location: /');

            die();
        }

        //buscarlo en la DB
        $registro = Registro::where('token', $id);
        if (!$registro) {
            header('Location: /');

            die();
        }

        //Llenar las tablas de referencia
        $registro->usuario = Usuario::find($registro->usuario_id);
        $registro->paquete = Paquete::find($registro->paquete_id);

        $router->render('registro/boleto', [
            'titulo' => 'Asistencia a DevWebCamps',
            'registro' => $registro
        ]);
    }

    // public static function captura(Router $router) {
    //     debuguear($_GET);
    //     $paymentId = $_GET['payment_id'];
    //     $status = $_GET['status'];
    //     $paymentType = $_GET['payment_type'];
    //     $paymentOrderId = $_GET['merchant_order_id'];
        

    //     $router->render('registro/captura', [
    //         'titulo' => 'datos de la transaccion',
    //         'paymentId' => $paymentId,
    //         'status' => $status,
    //         'paymentType' => $paymentType,
    //         'paymentOrderId' => $paymentOrderId
    //     ]);
    // }

    public static function conferencias(Router $router) {
        if (!is_auth()) {
            header('Location: /login');

            die();
        }

        //validar que el usuario tenga el plan presencial
        $usuario_id = $_SESSION['id'];
        $registro = Registro::where('usuario_id', $usuario_id);
        $registroCompletado = EventosRegistros::where('registro_id', $registro->id);

        if (isset($registro) && $registro->paquete_id === "2") {
            header('Location: /boleto?id=' . urlencode($registro->token));
            
            die();
        }

        if ($registro->paquete_id !== "1") {
            header('Location: /');

            die();
        }

        //Redireccionar a boleto virtual en caso de haber finalizado el registro
        if(isset($registroCompletado)) {
            header('Location: /boleto?id=' . urlencode($registro->token));

            die();
        }

        $eventos = Evento::ordenar('hora_id', 'ASC');
        $eventos_formateados = [];

        foreach($eventos as $evento) {
            $evento->categoria = Categoria::find($evento->categoria_id);
            $evento->dia = Dia::find($evento->dia_id);
            $evento->hora = Hora::find($evento->hora_id);
            $evento->ponente = Ponente::find($evento->ponente_id);

            
            if ($evento->dia_id === "1" && $evento->categoria_id === "1") {
                $eventos_formateados['conferencias_v'][] = $evento; 
            }
            if ($evento->dia_id === "2" && $evento->categoria_id === "1") {
                $eventos_formateados['conferencias_s'][] = $evento; 
            }

            if ($evento->dia_id === "1" && $evento->categoria_id === "2") {
                $eventos_formateados['workshops_v'][] = $evento; 
            }
            if ($evento->dia_id === "2" && $evento->categoria_id === "2") {
                $eventos_formateados['workshops_s'][] = $evento; 
            }
        }

        $regalos = Regalo::all('ASC');

        //Manejando el registro mediante $_POST
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            //Revisar que el usuario esta autenticado
            if (!is_auth()) {
                header('Location: /login');

                die();
            }

            $eventos = explode(',', $_POST['eventos']);
            if (empty($eventos)) {
                echo json_encode(['resultado' => false]);

                return;
            }

            //Obtener el registro del usuario
            $registro = Registro::where('usuario_id', $_SESSION['id']);
            if (!isset($registro) || $registro->paquete_id !== "1") {
                echo json_encode(['resultado' => false]);

                return;
            }

            $eventos_array = [];
            //Revisar la disponibilidad de los proyectos
            foreach($eventos as $evento_id) {
                $evento = Evento::find($evento_id);

                //comprobar que el evento exista
                if (!isset($evento) || $evento->disponibles === '0') {
                    echo json_encode(['resultado' => false]);

                    return;
                }

                $eventos_array[] = $evento;
            }

            foreach($eventos_array as $evento) {
                $evento->disponibles -=1;
                $evento->guardar();

                //almacenar el registro
                $datos = [
                    'evento_id' => (int) $evento->id,
                    'registro_id' => (int) $registro->id
                ];

                $registro_usuario = new EventosRegistros($datos);
                $registro_usuario->guardar();
            }

            //almacenar el regalo
            $registro->sincronizar(['regalo_id' => $_POST['regalo_id']]);
            $resultado = $registro->guardar();

            if ($resultado) {
                echo json_encode([
                    'resultado' => $resultado,
                    'token' => $registro->token
                ]);
            } else {
                echo json_encode(['resultado' => false]);
            }

            return;
        }

        $router->render('registro/conferencias', [
            'titulo' => 'Elige Workshops y Conferencias',
            'eventos' => $eventos_formateados,
            'regalos' => $regalos
        ]);
    }
}