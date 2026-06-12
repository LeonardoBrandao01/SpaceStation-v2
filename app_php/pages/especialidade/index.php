<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Especialidades';

if (($_GET['action'] ?? '') === 'delete') {
    $id = (int)($_GET['id'] ?? 0);
    if ($id > 0) {
        try {
            crud_delete('especialidade', 'idEspecialidade', $id);
            flash_set('ok', 'Especialidade removida.');
        } catch (Throwable $e) {
            flash_set('err', 'Não foi possível remover (verifique vínculos).');
        }
    }
    redirect('/pages/especialidade/index.php');
}

$rows = crud_all('especialidade', 'idEspecialidade');
require_once __DIR__ . '/../../includes/header.php';
?>

<div class="actions">
  <a class="btn primary" href="create.php">Nova especialidade</a>
</div>
<br />

<div class="card">
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
    <?php foreach ($rows as $r): ?>
      <tr>
        <td><?= (int)$r['idEspecialidade'] ?></td>
        <td><?= h($r['nome']) ?></td>
        <td class="actions">
          <a class="btn" href="edit.php?id=<?= (int)$r['idEspecialidade'] ?>">Editar</a>
          <a class="btn danger" href="?action=delete&id=<?= (int)$r['idEspecialidade'] ?>" onclick="return confirm('Remover?')">Excluir</a>
        </td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
</div>

<?php require_once __DIR__ . '/../../includes/footer.php'; ?>

