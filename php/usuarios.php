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
            $sql = "SELECT * FROM usuarios WHERE id = $id";
        } else {
            $sql = "SELECT * FROM usuarios";
        }

        $result = $conn->query($sql);

        if ($result) {
            if ($result->num_rows > 0) {
                $usuarios = array();
                while ($row = $result->fetch_assoc()) {
                    $usuarios[] = $row;
                }
                header('Content-Type: application/json');
                echo json_encode($usuarios);
            } else {
                echo "No se encontraron usuarios";
            }
        } else {
            echo "Error en la consulta: " . $conn->error;
        }
        break;

    case 'POST':
        // Operación de Crear (Create)
        $data = json_decode(file_get_contents("php://input"), true);

        if (!empty($data)) {
            $nombre = $conn->real_escape_string($data['nombre']);
            $usuario = $conn->real_escape_string($data['usuario']);
            $contrasena = $conn->real_escape_string($data['contrasenia']);
            $cargo = $conn->real_escape_string($data['cargo']);

            // Consulta SQL para insertar el nuevo usuario
            $sql = "INSERT INTO usuarios (nombre, usuario, contrasena, cargo) VALUES ('$nombre', '$usuario', '$contrasena', '$cargo')";
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
            $nombre = isset($data['nombre']) ? $conn->real_escape_string($data['nombre']) : '';
            $usuario = isset($data['usuario']) ? $conn->real_escape_string($data['usuario']) : '';
            $contrasena = isset($data['contrasena']) ? $conn->real_escape_string($data['contrasena']) : '';
            $cargo = isset($data['cargo']) ? $conn->real_escape_string($data['cargo']) : '';

            $sql = "UPDATE usuarios SET nombre='$nombre', usuario='$usuario', contrasena='$contrasena', cargo='$cargo' WHERE id=$id";


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
        $sql = "DELETE FROM usuarios WHERE id=$id";
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
