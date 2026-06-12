<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Relatórios';

if (($_GET['action'] ?? '') === 'delete') {
    $id = (int)($_GET['id'] ?? 0);
    if ($id > 0) {
        try {
            crud_delete('relatorio', 'idRelatorio', $id);
            flash_set('ok', 'Relatório removido.');
        } catch (Throwable $e) {
            flash_set('err', 'Não foi possível remover (verifique vínculos).');
        }
    }
    redirect('/pages/relatorio/index.php');
}

$rows = crud_all('relatorio', 'idRelatorio');
require_once __DIR__ . '/../../includes/header.php';
?>

<div class="actions">
  <a class="btn primary" href="create.php">Novo relatório</a>
</div>
<br />

<div class="card">
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Descrição</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
    <?php foreach ($rows as $r): ?>
      <tr>
        <td><?= (int)$r['idRelatorio'] ?></td>
        <td><?= nl2br(h($r['descricao'])) ?></td>
        <td class="actions">
          <a class="btn" href="edit.php?id=<?= (int)$r['idRelatorio'] ?>">Editar</a>
          <a class="btn danger" href="?action=delete&id=<?= (int)$r['idRelatorio'] ?>" onclick="return confirm('Remover?')">Excluir</a>
        </td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
</div>

<?php require_once __DIR__ . '/../../includes/footer.php'; ?>

