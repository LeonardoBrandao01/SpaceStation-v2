<?php
// includes/crud.php

declare(strict_types=1);

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/util.php';
require_once __DIR__ . '/auth.php';

auth_enforce_current_request();

function crud_all(string $table, string $orderBy): array
{
    $pdo = db();
    $sql = "SELECT * FROM {$table} ORDER BY {$orderBy} DESC";
    return $pdo->query($sql)->fetchAll();
}

function crud_find(string $table, string $pk, int $id): array
{
    $pdo = db();
    $stmt = $pdo->prepare("SELECT * FROM {$table} WHERE {$pk} = :id");
    $stmt->execute(['id' => $id]);
    $row = $stmt->fetch();
    return $row ?: null;
}

function crud_delete(string $table, string $pk, int $id)
{
    $pdo = db();
    $stmt = $pdo->prepare("DELETE FROM {$table} WHERE {$pk} = :id");
    $stmt->execute(['id' => $id]);
}

function fetch_pairs(string $table, string $pk, string $labelCol, string $orderBy = ''): array
{
    $pdo = db();
    $order = $orderBy !== '' ? $orderBy : $pk;
    $stmt = $pdo->query("SELECT {$pk}, {$labelCol} FROM {$table} ORDER BY {$order} ASC");
    $out = [];
    foreach ($stmt->fetchAll() as $r) {
        $out[(int)$r[$pk]] = (string)$r[$labelCol];
    }
    return $out;
}

