<?php

$servername = "localhost";
$username = "root";
$password = "Flujo2002.";
$database = "controlinventario";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

session_start();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['login']) && $_GET['login'] === 'true') {
            $usuario = $conn->real_escape_string($_GET['usuario']);
            $contrasena = $conn->real_escape_string($_GET['contrasena']);
            
            $sql = "SELECT * FROM usuarios WHERE usuario = '$usuario' AND contrasena = '$contrasena'";
            $result = $conn->query($sql);
            
            if ($result && $result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $_SESSION['usuario'] = $usuario; // Guardar el usuario en la sesión
                header('Content-Type: application/json');
                echo json_encode(['status' => 'success', 'user' => $row]);
            } else {
                header('Content-Type: application/json');
                echo json_encode(['status' => 'error', 'message' => 'Credenciales incorrectas']);
            }
        } elseif (isset($_GET['session_user']) && $_GET['session_user'] === 'true') {
            if (isset($_SESSION['usuario'])) {
                $usuario = $_SESSION['usuario'];
                $usuario = $conn->real_escape_string($usuario);
                
                $sql = "SELECT * FROM usuarios WHERE usuario = '$usuario'";
                $result = $conn->query($sql);
                
                if ($result && $result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    header('Content-Type: application/json');
                    echo json_encode($row);
                } else {
                    header('Content-Type: application/json');
                    echo json_encode([]);
                }
            } else {
                echo json_encode(['error' => 'Usuario no autenticado']);
            }
        } else {
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
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);

        if (!empty($data)) {
            $nombre = $conn->real_escape_string($data['nombre']);
            $usuario = $conn->real_escape_string($data['usuario']);
            $contrasena = $conn->real_escape_string($data['contrasenia']);
            $cargo = $conn->real_escape_string($data['cargo']);

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

$conn->close();


?>
