<?php
require 'db.php';

$stmt = $pdo->query("SELECT id, nombre, detalles, fecha, completada FROM tasks ORDER BY fecha ASC, id ASC");
$tasks = $stmt->fetchAll();
echo json_encode($tasks);
