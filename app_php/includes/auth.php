<?php
// includes/auth.php

declare(strict_types=1);

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/util.php';

function auth_start(): void
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }
}

function auth_user(): ?array
{
    auth_start();
    $user = $_SESSION['auth_user'] ?? null;
    return is_array($user) ? $user : null;
}

function auth_is_logged_in(): bool
{
    return auth_user() !== null;
}

function auth_is_admin(): bool
{
    $user = auth_user();
    return (string)($user['perfil'] ?? '') === 'admin';
}

function auth_login(string $username, string $password, bool $asAdmin = false): bool
{
    $pdo = db();
    $stmt = $pdo->prepare('SELECT idLogin, nome, username, senha_hash, perfil, ativo FROM login WHERE username = :username LIMIT 1');
    $stmt->execute(['username' => $username]);
    $row = $stmt->fetch();

    if (!$row || (int)$row['ativo'] !== 1) {
        return false;
    }

    if (!password_verify($password, (string)$row['senha_hash'])) {
        return false;
    }

    if ($asAdmin && (string)$row['perfil'] !== 'admin') {
        return false;
    }

    auth_start();
    session_regenerate_id(true);

    $_SESSION['auth_user'] = [
        'idLogin' => (int)$row['idLogin'],
        'nome' => (string)$row['nome'],
        'username' => (string)$row['username'],
        'perfil' => (string)$row['perfil'],
    ];

    return true;
}

function auth_logout(): void
{
    auth_start();
    unset($_SESSION['auth_user']);
    session_regenerate_id(true);
}

function require_auth(): void
{
    if (!auth_is_logged_in()) {
        flash_set('err', 'Faça login para acessar o sistema.');
        redirect('/login.php');
    }
}

function auth_enforce_current_request(): void
{
    require_auth();

    $uri = (string)($_SERVER['REQUEST_URI'] ?? '');
    if (strpos($uri, '/pages/astronauta/') !== false && !auth_is_admin()) {
        flash_set('err', 'Apenas administradores podem acessar Astronautas.');
        redirect('/');
    }
}

