<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Combustíveis';

if (($_GET['action'] ?? '') === 'delete') {
    $id = (int)($_GET['id'] ?? 0);
    if ($id > 0) {
        try {
            crud_delete('combustivel', 'idCombustivel', $id);
            flash_set('ok', 'Combustível removido.');
        } catch (Throwable $e) {
            flash_set('err', 'Não foi possível remover (verifique vínculos).');
        }
    }
    redirect('/pages/combustivel/index.php');
}

$rows = crud_all('combustivel', 'idCombustivel');
require_once __DIR__ . '/../../includes/header.php';
?>

<div class="actions">
  <a class="btn primary" href="create.php">Novo combustível</a>
</div>
<br />

<div class="card">
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Tipo</th>
        <th>Marca</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
    <?php foreach ($rows as $r): ?>
      <tr>
        <td><?= (int)$r['idCombustivel'] ?></td>
        <td><?= h($r['tipo']) ?></td>
        <td><?= h($r['marca']) ?></td>
        <td class="actions">
          <a class="btn" href="edit.php?id=<?= (int)$r['idCombustivel'] ?>">Editar</a>
          <a class="btn danger" href="?action=delete&id=<?= (int)$r['idCombustivel'] ?>" onclick="return confirm('Remover?')">Excluir</a>
        </td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
</div>

<?php require_once __DIR__ . '/../../includes/footer.php'; ?>

