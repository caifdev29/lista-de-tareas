<?php
require 'db.php';

// esperar JSON
$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    http_response_code(400);
    echo json_encode(['error'=>'invalid json']);
    exit;
}

$nombre = $data['nombre'] ?? 'Nueva tarea';
$detalles = $data['detalles'] ?? '';
$fecha = $data['fecha'] ?? date('Y-m-d');
$completada = isset($data['completada']) && $data['completada'] ? 1 : 0;

$stmt = $pdo->prepare("INSERT INTO tasks (nombre, detalles, fecha, completada) VALUES (?, ?, ?, ?)");
$stmt->execute([$nombre, $detalles, $fecha, $completada]);
$id = $pdo->lastInsertId();

echo json_encode([
  'id' => (int)$id,
  'nombre' => $nombre,
  'detalles' => $detalles,
  'fecha' => $fecha,
  'completada' => (bool)$completada
]);
