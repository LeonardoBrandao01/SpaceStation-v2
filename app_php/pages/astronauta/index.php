<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Astronautas';

if (($_GET['action'] ?? '') === 'delete') {
    $id = (int)($_GET['id'] ?? 0);
    if ($id > 0) {
        try {
            crud_delete('astronauta', 'idAstronauta', $id);
            flash_set('ok', 'Astronauta removido.');
        } catch (Throwable $e) {
            flash_set('err', 'Não foi possível remover (verifique vínculos).');
        }
    }
    redirect('/pages/astronauta/index.php');
}

$pdo = db();
$sql = 'SELECT a.*, e.nome AS especialidade_nome
        FROM astronauta a
        JOIN especialidade e ON e.idEspecialidade = a.especialidade_idEspecialidade
        ORDER BY a.idAstronauta DESC';
$rows = $pdo->query($sql)->fetchAll();

require_once __DIR__ . '/../../includes/header.php';
?>

<div class="actions">
  <a class="btn primary" href="create.php">Novo astronauta</a>
</div>
<br />

<div class="card">
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>País</th>
        <th>Especialidade</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
    <?php foreach ($rows as $r): ?>
      <tr>
        <td><?= (int)$r['idAstronauta'] ?></td>
        <td><?= h($r['nomeAstro']) ?></td>
        <td><?= h($r['pais']) ?></td>
        <td><?= h($r['especialidade_nome']) ?></td>
        <td class="actions">
          <a class="btn" href="edit.php?id=<?= (int)$r['idAstronauta'] ?>">Editar</a>
          <a class="btn danger" href="?action=delete&id=<?= (int)$r['idAstronauta'] ?>" onclick="return confirm('Remover?')">Excluir</a>
        </td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
</div>

<?php require_once __DIR__ . '/../../includes/footer.php'; ?>

