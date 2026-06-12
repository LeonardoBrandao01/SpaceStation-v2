<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Estações';

if (($_GET['action'] ?? '') === 'delete') {
    $id = (int)($_GET['id'] ?? 0);
    if ($id > 0) {
        try {
            crud_delete('estacao', 'idEstacao', $id);
            flash_set('ok', 'Estação removida.');
        } catch (Throwable $e) {
            flash_set('err', 'Não foi possível remover (verifique vínculos).');
        }
    }
    redirect('/pages/estacao/index.php');
}

$pdo = db();
$sql = 'SELECT e.*, m.nomeMissao, o.estado AS oxigenio_estado
        FROM estacao e
        LEFT JOIN missao m ON e.missao_idMissao = m.idMissao
        LEFT JOIN oxigenio o ON e.oxigenio_idOxigenio = o.idOxigenio
        ORDER BY e.idEstacao DESC';
$rows = $pdo->query($sql)->fetchAll();

require_once __DIR__ . '/../../includes/header.php';
?>

<div class="actions">
  <a class="btn primary" href="create.php">Nova estação</a>
</div>
<br />

<div class="card">
  <h2>Estações</h2>
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Módulos</th>
        <th>Ativa</th>
        <th>Missão</th>
        <th>Temp.</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
    <?php foreach ($rows as $r): ?>
      <tr>
        <td><?= (int)$r['idEstacao'] ?></td>
        <td><?= h($r['nome']) ?></td>
        <td><?= h($r['quantidadeModulos']) ?></td>
        <td><?= $r['estaAtiva'] ? 'Sim' : 'Não' ?></td>
        <td><?= h($r['nomeMissao'] ?? '') ?></td>
        <td><?= h((string)$r['temperatura']) ?></td>
        <td class="actions">
          <a class="btn" href="edit.php?id=<?= (int)$r['idEstacao'] ?>">Editar</a>
          <a class="btn danger" href="?action=delete&id=<?= (int)$r['idEstacao'] ?>" onclick="return confirm('Remover?')">Excluir</a>
        </td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
</div>

<?php require_once __DIR__ . '/../../includes/footer.php'; ?>