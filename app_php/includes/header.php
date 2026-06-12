<?php
declare(strict_types=1);
require_once __DIR__ . '/util.php';
require_once __DIR__ . '/auth.php';

auth_enforce_current_request();

$flash = flash_get();
$user = auth_user();
?><!doctype html>
<html lang="pt-br">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title><?= h($title ?? 'Space Station') ?></title>
  <link rel="stylesheet" href="/assets/style.css" />
</head>
<body>
<nav>
  <span class="brand">Space Station</span>
  <a href="/">Home</a>
  <a href="/pages/especialidade/index.php">Especialidades</a>
  <?php if (auth_is_admin()): ?>
    <a href="/pages/astronauta/index.php">Astronautas</a>
  <?php endif; ?>
  <a href="/pages/combustivel/index.php">Combustíveis</a>
  <a href="/pages/foguete/index.php">Foguetes</a>
  <a href="/pages/empresa_parceira/index.php">Empresas</a>
  <a href="/pages/relatorio/index.php">Relatórios</a>
  <a href="/pages/missao/index.php">Missões</a>
  <a href="/pages/oxigenio/index.php">Oxigênio</a>
  <a href="/pages/estacao/index.php">Estações</a>
  <span class="nav-spacer"></span>
  <span class="nav-user"><?= h((string)($user['nome'] ?? '')) ?> (<?= h((string)($user['perfil'] ?? '')) ?>)</span>
  <a class="btn" href="/logout.php">Logout</a>
</nav>
<div class="container">
<?php if ($flash): ?>
  <div class="flash <?= $flash['type'] === 'ok' ? 'ok' : 'err' ?>">
    <?= h($flash['message']) ?>
  </div>
<?php endif; ?>

