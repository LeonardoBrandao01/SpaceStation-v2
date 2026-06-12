<?php
declare(strict_types=1);
$title = 'Home';
require_once __DIR__ . '/includes/header.php';
?>

<div class="card">
  <h1>Space Station</h1>
  <p class="small">CRUDs em PHP + MySQL baseados no diagrama ER.</p>
</div>

<br />

<div class="grid">
  <div class="card">
    <h3>Cadastros</h3>
    <ul>
      <li><a href="/pages/especialidade/index.php">Especialidades</a></li>
      <?php if (auth_is_admin()): ?>
        <li><a href="/pages/astronauta/index.php">Astronautas</a></li>
      <?php endif; ?>
      <li><a href="/pages/combustivel/index.php">Combustíveis</a></li>
      <li><a href="/pages/foguete/index.php">Foguetes</a></li>
      <li><a href="/pages/empresa_parceira/index.php">Empresas Parceiras</a></li>
      <li><a href="/pages/relatorio/index.php">Relatórios</a></li>
      <li><a href="/pages/missao/index.php">Missões</a></li>
      <li><a href="/pages/oxigenio/index.php">Oxigênio</a></li>
      <li><a href="/pages/estacao/index.php">Estações</a></li>
    </ul>
  </div>

  <div class="card">
    <h3>Desenvolvedores</h3>
    <p class="small">
      <strong>Mateus Monteiro</strong><br />
    </p>
    <p class="small">
      <strong>Endrio Emanuel</strong><br />
    </p>
    <p class="small">
      <strong>Guilherme Dias</strong><br />
    </p>
    <p class="small">
      <strong>Leonardo de Paiva</strong><br />
    </p>
  </div>
</div>