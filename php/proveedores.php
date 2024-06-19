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
                $sql = "SELECT * FROM proveedores WHERE id = $id";
            } else {
                $sql = "SELECT * FROM proveedores";
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
                    echo "No se encontraron proveedores";
                }
            } else {
                echo "Error en la consulta: " . $conn->error;
            }
            break;
    
        case 'POST':
            // Operación de Crear (Create)
            $data = json_decode(file_get_contents("php://input"), true);
    
            if (!empty($data)) {
                $nombre = $conn->real_escape_string($data['Nombre']);
                $direccion = $conn->real_escape_string($data['Direccion']);
                $correo = $conn->real_escape_string($data['Correo']);
                $contacto = $conn->real_escape_string($data['Contacto']);
                $tipoProductos = $conn->real_escape_string($data['TipoDeProducto']);
                $formaPago = $conn->real_escape_string($data['Pago']);
                $estado = $conn->real_escape_string($data['EstadoProveedor']);
        
                // Consulta SQL para insertar el nuevo proveedor
                $sql = "INSERT INTO proveedores (Nombre, Direccion, Email, ContactoPrincipal, TipoProductos, FormaPago, Estado) 
                        VALUES ('$nombre', '$direccion', '$correo', '$contacto', '$tipoProductos', '$formaPago', '$estado')";
        
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
                $nombre = isset($data['Nombre']) ? $conn->real_escape_string($data['Nombre']) : '';
                $direccion = isset($data['Direccion']) ? $conn->real_escape_string($data['Direccion']) : '';
                $correo = isset($data['Correo']) ? $conn->real_escape_string($data['Correo']) : '';
                $contacto = isset($data['Contacto']) ? $conn->real_escape_string($data['Contacto']) : '';
                $tipoProductos = isset($data['TipoDeProducto']) ? $conn->real_escape_string($data['TipoDeProducto']) : '';
                $pago = isset($data['Pago']) ? $conn->real_escape_string($data['Pago']) : '';
                $estado = isset($data['EstadoProveedor']) ? $conn->real_escape_string($data['EstadoProveedor']) : '';

                $sql = "UPDATE proveedores SET Nombre='$nombre', Direccion='$direccion', Email='$correo', ContactoPrincipal='$contacto', TipoProductos='$tipoProductos', FormaPago='$pago', Estado='$estado' WHERE id=$id";
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
            $sql = "DELETE FROM proveedores WHERE id=$id";
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