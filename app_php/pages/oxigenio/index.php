<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Oxigênio';

if (($_GET['action'] ?? '') === 'delete') {
    $id = (int)($_GET['id'] ?? 0);
    if ($id > 0) {
        try {
            crud_delete('oxigenio', 'idOxigenio', $id);
            flash_set('ok', 'Registro de oxigênio removido.');
        } catch (Throwable $e) {
            flash_set('err', 'Não foi possível remover (verifique vínculos).');
        }
    }
    redirect('/pages/oxigenio/index.php');
}

$rows = crud_all('oxigenio', 'idOxigenio');
require_once __DIR__ . '/../../includes/header.php';
?>

<div class="actions">
  <a class="btn primary" href="create.php">Novo registro</a>
</div>
<br />

<div class="card">
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Quantidade abastecida</th>
        <th>Estado</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
    <?php foreach ($rows as $r): ?>
      <tr>
        <td><?= (int)$r['idOxigenio'] ?></td>
        <td><?= h((string)$r['quantidadeAbastecida']) ?></td>
        <td><?= h($r['estado']) ?></td>
        <td class="actions">
          <a class="btn" href="edit.php?id=<?= (int)$r['idOxigenio'] ?>">Editar</a>
          <a class="btn danger" href="?action=delete&id=<?= (int)$r['idOxigenio'] ?>" onclick="return confirm('Remover?')">Excluir</a>
        </td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
</div>

<?php require_once __DIR__ . '/../../includes/footer.php'; ?>

