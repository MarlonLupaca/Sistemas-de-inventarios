<?php

$servername = "localhost";
$username = "root";
$password = "Flujo2002.";
$database = "controlinventario";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $action = $_GET['action'];

        switch ($action) {
            case 'seleccion':

                $sql = "select * from movimientoalmacen";
        
                $result = $conn->query($sql);

                if ($result) {
                    if ($result->num_rows > 0) {
                        $movimientos = array();
                        while ($row = $result->fetch_assoc()) {
                            $movimientos[] = $row;
                        }
                        header('Content-Type: application/json');
                        echo json_encode($movimientos);
                    } else {
                        echo "No se encontraron movimientos";
                    }
                } else {
                    echo "Error en la consulta: " . $conn->error;
                }
                break;
            case 'lastID':
                $sql = "SELECT * FROM configuracion WHERE clave = 'ultimo_id_movimiento'";
                $resultado = $conn->query($sql);

                if ($resultado) {
                    if ($resultado->num_rows > 0) {
                        $movimiento = $resultado->fetch_assoc();
                        header('Content-Type: application/json');
                        echo json_encode($movimiento);
                    } else {
                        echo "No se encontraron movimientos";
                    }
                } else {
                    echo "Error en la consulta: " . $conn->error;
                }
                break;

            case 'unico':
                $id = $_GET['id'];
                $sql = "select * from movimientoalmacen where idMovimiento = $id";
        
                $result = $conn->query($sql);

                if ($result) {
                    if ($result->num_rows > 0) {
                        $movimientos = array();
                        while ($row = $result->fetch_assoc()) {
                            $movimientos[] = $row;
                        }
                        header('Content-Type: application/json');
                        echo json_encode($movimientos);
                    } else {
                        echo "No se encontraron movimientos";
                    }
                } else {
                    echo "Error en la consulta: " . $conn->error;
                }
                break;
            case 'detallesMovimiento':
                $id = $_GET['id'];

                $sql = "SELECT 
                            DM.idDetalle,
                            DM.idMovimiento,
                            DM.codigoProducto,
                            P.producto,
                            P.categoria,
                            P.proveedor,
                            DM.cantidad,
                            DM.precioUnitario,
                            DM.subtotal
                        FROM 
                            DetalleMovimiento DM
                        JOIN 
                            productos P ON DM.codigoProducto = P.id
                        WHERE 
                            DM.idMovimiento = $id";

                $result = $conn->query($sql);

                if ($result) {
                    if ($result->num_rows > 0) {
                        $detalle = array();
                        while ($row = $result->fetch_assoc()) {
                            $detalle[] = $row;
                        }
                        header('Content-Type: application/json');
                        echo json_encode($detalle);
                    } else {
                        echo "No se encontraron movimientos";
                    }
                } else {
                    echo "Error en la consulta: " . $conn->error;
                }
                break;
            case 'estadisticas':

                $sql = "SELECT 
                            table_name, 
                            table_rows 
                        FROM 
                            information_schema.tables 
                        WHERE 
                            table_schema = 'controlinventario'";
                            
                $result = $conn->query($sql);

                if ($result) {
                    if ($result->num_rows > 0) {
                        $detalle = array();
                        while ($row = $result->fetch_assoc()) {
                            $detalle[] = $row;
                        }
                        header('Content-Type: application/json');
                        echo json_encode($detalle);
                    } else {
                        echo "No se encontraron movimientos";
                    }
                } else {
                    echo "Error en la consulta: " . $conn->error;
                }
                break;
            default:
                break;
        }

        
        break;

    case 'POST':

        $action = $_GET['action'];
        $tipo = $_GET['tipo'];

        switch ($action) {
            case 'cabecera':
                    // Operación de Crear (Create)
                $objeto = json_decode(file_get_contents("php://input"), true);

                if (!empty($objeto)) {
                    $fecha = $conn->real_escape_string($objeto['fecha']);
                    $hora = $conn->real_escape_string($objeto['hora']);
                    $cantidad = $conn->real_escape_string($objeto['cantidad']);
                    $tipo = $conn->real_escape_string($objeto['tipo']);
                    $total = $conn->real_escape_string($objeto['total']);

                    // Iniciar una transacción para asegurar la atomicidad
                    $conn->begin_transaction();

                    // Consulta SQL para insertar el nuevo registro en MovimientoAlmacen
                    $sql = "INSERT INTO MovimientoAlmacen (fecha, hora, tipoMovimiento, cantidadProductos, totalVenta) VALUES ('$fecha', '$hora', '$tipo', '$cantidad', '$total')";

                    if ($conn->query($sql) === TRUE) {
                        // Capturar el último id insertado
                        $nuevoID = $conn->insert_id;

                        // Consulta SQL para actualizar la tabla de configuración con el nuevo ID
                        $sql_update = "UPDATE configuracion SET valor = $nuevoID WHERE clave = 'ultimo_id_movimiento'";

                        if ($conn->query($sql_update) === TRUE) {
                            // Confirmar la transacción
                            $conn->commit();
                            echo "Nuevo registro creado correctamente y configuración actualizada";
                        } else {
                            // Revertir la transacción en caso de error
                            $conn->rollback();
                            echo "Error al actualizar la configuración: " . $conn->error;
                        }
                    } else {
                        // Revertir la transacción en caso de error
                        $conn->rollback();
                        echo "Error al crear nuevo registro: " . $conn->error;
                    }
                } else {
                    echo "Error: Datos vacíos";
                }
                break;
            case 'detalle':
                $objeto = json_decode(file_get_contents("php://input"), true);
                if (!empty($objeto)) {
                    $idMovimiento = $conn->real_escape_string($objeto['idMovimiento']);
                    $cantidad = $conn->real_escape_string($objeto['cantidad']);
                    $codigoProducto = $conn->real_escape_string($objeto['codigoProducto']);
                    $precioUnitario = $conn->real_escape_string($objeto['precioUnitario']);
                    $subtotal = $conn->real_escape_string($objeto['subtotal']);

                    // Iniciar una transacción
                    $conn->begin_transaction();

                    try {
                        // Paso 1: Insertar en DetalleMovimiento
                        $sql = "INSERT INTO DetalleMovimiento (idMovimiento, codigoProducto, cantidad, precioUnitario, subtotal) 
                                VALUES ('$idMovimiento', '$codigoProducto', '$cantidad', '$precioUnitario', '$subtotal')";
                        if ($conn->query($sql) === FALSE) {
                            throw new Exception("Error al insertar en DetalleMovimiento: " . $conn->error);
                        }

                        
                        if($tipo == "Salida"){
                            $sql_update = "UPDATE productos
                            SET stocks = stocks - $cantidad
                            WHERE id = '$codigoProducto'";
                        }else{
                            // Paso 2: Actualizar cantidad en Producto
                            $sql_update = "UPDATE productos
                            SET stocks = stocks + $cantidad
                            WHERE id = '$codigoProducto'";
                        }

                        if ($conn->query($sql_update) === FALSE) {
                            throw new Exception("Error al actualizar stock en productos: " . $conn->error);
                        }

                        // Confirmar la transacción
                        $conn->commit();
                        echo "Nuevo registro creado correctamente y stock actualizado";
                    } catch (Exception $e) {
                        // Revertir la transacción en caso de error
                        $conn->rollback();
                        echo $e->getMessage();
                    }
                } else {
                    echo "Error: Datos vacíos";
                }

                break;
            default:
                # code...
                break;
        }
        

        break;
    
    case 'PUT':
        break;

    case 'DELETE':
        $id = intval($_GET['id']);
        
        // Eliminar registros de detallemovimiento
        $sql = "DELETE FROM detallemovimiento WHERE idMovimiento = $id";
        if ($conn->query($sql) === TRUE) {
            echo "Registros eliminados de detallemovimiento.";
        } else {
            echo "Error al eliminar registros de detallemovimiento: " . $conn->error;
        }
    
        // Eliminar registros de movimientoalmacen
        $sqlDos = "DELETE FROM movimientoalmacen WHERE idMovimiento = $id";
        if ($conn->query($sqlDos) === TRUE) {
            echo "Registro eliminado de movimientoalmacen.";
        } else {
            echo "Error al eliminar registro de movimientoalmacen: " . $conn->error;
        }
    
        break;
        
        
    default:
        echo "Método no soportado";
        break;
}

// Cerrar la conexión
$conn->close();
?>