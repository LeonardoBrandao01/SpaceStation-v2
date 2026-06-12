<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Empresas Parceiras';

if (($_GET['action'] ?? '') === 'delete') {
    $id = (int)($_GET['id'] ?? 0);
    if ($id > 0) {
        try {
            crud_delete('empresa_parceira', 'idEmpresaParceira', $id);
            flash_set('ok', 'Empresa removida.');
        } catch (Throwable $e) {
            flash_set('err', 'Não foi possível remover (verifique vínculos).');
        }
    }
    redirect('/pages/empresa_parceira/index.php');
}

$rows = crud_all('empresa_parceira', 'idEmpresaParceira');
require_once __DIR__ . '/../../includes/header.php';
?>

<div class="actions">
  <a class="btn primary" href="create.php">Nova empresa</a>
</div>
<br />

<div class="card">
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>País</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
    <?php foreach ($rows as $r): ?>
      <tr>
        <td><?= (int)$r['idEmpresaParceira'] ?></td>
        <td><?= h($r['nomeEmpresa']) ?></td>
        <td><?= h($r['pais']) ?></td>
        <td class="actions">
          <a class="btn" href="edit.php?id=<?= (int)$r['idEmpresaParceira'] ?>">Editar</a>
          <a class="btn danger" href="?action=delete&id=<?= (int)$r['idEmpresaParceira'] ?>" onclick="return confirm('Remover?')">Excluir</a>
        </td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
</div>

<?php require_once __DIR__ . '/../../includes/footer.php'; ?>

