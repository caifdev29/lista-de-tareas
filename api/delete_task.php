<?php
require 'db.php';
$data = json_decode(file_get_contents('php://input'), true);
if (!$data || !isset($data['id'])) {
    http_response_code(400);
    echo json_encode(['error'=>'invalid request']);
    exit;
}
$id = (int)$data['id'];
$stmt = $pdo->prepare("DELETE FROM tasks WHERE id = ?");
$stmt->execute([$id]);
echo json_encode(['ok'=>true]);
