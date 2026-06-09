<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Foguetes';

if (($_GET['action'] ?? '') === 'delete') {
    $id = (int)($_GET['id'] ?? 0);
    if ($id > 0) {
        try {
            crud_delete('foguete', 'idFoguete', $id);
            flash_set('ok', 'Foguete removido.');
        } catch (Throwable $e) {
            flash_set('err', 'Não foi possível remover (verifique vínculos).');
        }
    }
    redirect('/pages/foguete/index.php');
}

$pdo = db();
$sql = 'SELECT f.*, c.tipo AS combustivel_tipo, c.marca AS combustivel_marca
        FROM foguete f
        JOIN combustivel c ON c.idCombustivel = f.combustivel_idCombustivel
        ORDER BY f.idFoguete DESC';
$rows = $pdo->query($sql)->fetchAll();

require_once __DIR__ . '/../../includes/header.php';
?>

<div class="actions">
  <a class="btn primary" href="create.php">Novo foguete</a>
</div>
<br />

<div class="card">
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Combustível</th>
        <th>Local de lançamento</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
    <?php foreach ($rows as $r): ?>
      <tr>
        <td><?= (int)$r['idFoguete'] ?></td>
        <td><?= h($r['nome']) ?></td>
        <td><?= h($r['combustivel_tipo'] . ' - ' . $r['combustivel_marca']) ?></td>
        <td><?= h($r['localLancamento']) ?></td>
        <td class="actions">
          <a class="btn" href="edit.php?id=<?= (int)$r['idFoguete'] ?>">Editar</a>
          <a class="btn danger" href="?action=delete&id=<?= (int)$r['idFoguete'] ?>" onclick="return confirm('Remover?')">Excluir</a>
        </td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
</div>

<?php require_once __DIR__ . '/../../includes/footer.php'; ?>

