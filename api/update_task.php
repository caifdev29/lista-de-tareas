<?php
require 'db.php';
$data = json_decode(file_get_contents('php://input'), true);
if (!$data || !isset($data['id'])) {
    http_response_code(400);
    echo json_encode(['error'=>'invalid request']);
    exit;
}
$id = (int)$data['id'];
$nombre = $data['nombre'] ?? null;
$detalles = $data['detalles'] ?? null;
$fecha = $data['fecha'] ?? null;
$completada = isset($data['completada']) ? (int)$data['completada'] : null;

$fields = [];
$params = [];

if ($nombre !== null) { $fields[] = 'nombre = ?'; $params[] = $nombre; }
if ($detalles !== null) { $fields[] = 'detalles = ?'; $params[] = $detalles; }
if ($fecha !== null) { $fields[] = 'fecha = ?'; $params[] = $fecha; }
if ($completada !== null) { $fields[] = 'completada = ?'; $params[] = $completada; }

if (empty($fields)) {
    echo json_encode(['ok'=>true]);
    exit;
}

$params[] = $id;
$sql = "UPDATE tasks SET " . implode(', ', $fields) . " WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);

echo json_encode(['ok'=>true]);
