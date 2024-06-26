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
            if (isset($_GET['id'])) {
                $id = $conn->real_escape_string($_GET['id']);
                $sql = "SELECT * FROM productos WHERE id = $id";
            } else if(isset($_GET['alertas'])){
                $sql = "SELECT * FROM productos WHERE stocks < min_aviso;";
            } else {
                $sql = "SELECT * FROM productos";
            }

            $result = $conn->query($sql);

            if ($result) {
                if ($result->num_rows > 0) {
                    $productos = array();
                    while ($row = $result->fetch_assoc()) {
                        $productos[] = $row;
                    }
                    header('Content-Type: application/json');
                    echo json_encode($productos);
                } else {
                    echo "No se encontraron productos";
                }
            } else {
                echo "Error en la consulta: " . $conn->error;
            }
            break;
    
        case 'POST':
            // Operación de Crear (Create)
            $data = json_decode(file_get_contents("php://input"), true);
    
            if (!empty($data)) {
                $categoria = $conn->real_escape_string($data['categoria']);
                $producto = $conn->real_escape_string($data['producto']);
                $proveedor = $conn->real_escape_string($data['proveedor']);
                $stocks = $conn->real_escape_string($data['stocks']);
                $min_aviso = $conn->real_escape_string($data['min_aviso']);
                $p_compra = $conn->real_escape_string($data['p_compra']);
                $p_venta = $conn->real_escape_string($data['p_venta']);
    
                $sql = "INSERT INTO productos (categoria, producto, proveedor, stocks, min_aviso, p_compra, p_venta) VALUES ('$categoria', '$producto', '$proveedor', '$stocks', '$min_aviso', '$p_compra', '$p_venta')";
                if ($conn->query($sql) === TRUE) {
                    echo "Nuevo registro creado correctamente";
                } else {
                    echo "Error al crear nuevo registro: " . $conn->error;
                }
            } else {
                echo "Error: Datos vacíos";
            }
            break;
        
        case 'PUT':
            // Operación de Actualizar (Update)
            $data = json_decode(file_get_contents("php://input"), true);
            if (!empty($data) && isset($data['id'])) {
                $id = $conn->real_escape_string($data['id']);
                $categoria = isset($data['categoria']) ? $conn->real_escape_string($data['categoria']) : '';
                $producto = isset($data['producto']) ? $conn->real_escape_string($data['producto']) : '';
                $proveedor = isset($data['proveedor']) ? $conn->real_escape_string($data['proveedor']) : '';
                $stocks = isset($data['stocks']) ? $conn->real_escape_string($data['stocks']) : 0;
                $min_aviso = isset($data['min_aviso']) ? $conn->real_escape_string($data['min_aviso']) : '';
                $p_compra = isset($data['p_compra']) ? $conn->real_escape_string($data['p_compra']) : '';
                $p_venta = isset($data['p_venta']) ? $conn->real_escape_string($data['p_venta']) : '';

                $sql = "UPDATE productos SET categoria='$categoria', producto='$producto', proveedor='$proveedor', stocks='$stocks', min_aviso='$min_aviso', p_compra='$p_compra', p_venta='$p_venta' WHERE id=$id";
                if ($conn->query($sql) === TRUE) {
                    echo "Registro actualizado correctamente";
                } else {
                    echo "Error al actualizar registro: " . $conn->error;
                }
            } else {
                echo "Error: Datos vacíos o ID no proporcionado";
            }
            break;
        
        case 'DELETE':
            // Operación de Eliminar (Delete)
            $id = intval($_GET['id']);
            $sql = "DELETE FROM productos WHERE id=$id";
            if ($conn->query($sql) === TRUE) {
                echo "Registro eliminado correctamente";
            } else {
                echo "Error al eliminar registro: " . $conn->error;
            }
            break;
    
        default:
            echo "Método no soportado";
            break;
}

// Cerrar la conexión
$conn->close();
?>