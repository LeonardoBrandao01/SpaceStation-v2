<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Missões';

if (($_GET['action'] ?? '') === 'delete') {
    $id = (int)($_GET['id'] ?? 0);
    if ($id > 0) {
        try {
            crud_delete('missao', 'idMissao', $id);
            flash_set('ok', 'Missão removida.');
        } catch (Throwable $e) {
            flash_set('err', 'Não foi possível remover (verifique vínculos).');
        }
    }
    redirect('/pages/missao/index.php');
}

$pdo = db();
$sql = 'SELECT m.*, 
               ep.nomeEmpresa AS empresa_nome,
               a.nomeAstro AS astronauta_nome,
               f.nome AS foguete_nome,
               c.tipo AS combustivel_tipo,
               c.marca AS combustivel_marca,
               r.descricao AS relatorio_desc
        FROM missao m
        JOIN empresa_parceira ep ON ep.idEmpresaParceira = m.empresaParceira_idEmpresaParceira
        JOIN astronauta a ON a.idAstronauta = m.astronauta_idAstronauta
        JOIN foguete f ON f.idFoguete = m.foguete_idFoguete
        JOIN combustivel c ON c.idCombustivel = m.foguete_combustivel_idCombustivel
        JOIN relatorio r ON r.idRelatorio = m.relatorio_idRelatorio
        ORDER BY m.idMissao DESC';
$rows = $pdo->query($sql)->fetchAll();

require_once __DIR__ . '/../../includes/header.php';
?>

<div class="actions">
  <a class="btn primary" href="create.php">Nova missão</a>
</div>
<br />

<div class="card">
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Duração (dias)</th>
        <th>Empresa</th>
        <th>Astronauta</th>
        <th>Foguete</th>
        <th>Combustível</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
    <?php foreach ($rows as $r): ?>
      <tr>
        <td><?= (int)$r['idMissao'] ?></td>
        <td><?= h($r['nomeMissao']) ?></td>
        <td><?= (int)$r['duracaoDias'] ?></td>
        <td><?= h($r['empresa_nome']) ?></td>
        <td><?= h($r['astronauta_nome']) ?></td>
        <td><?= h($r['foguete_nome']) ?></td>
        <td><?= h($r['combustivel_tipo'] . ' - ' . $r['combustivel_marca']) ?></td>
        <td class="actions">
          <a class="btn" href="edit.php?id=<?= (int)$r['idMissao'] ?>">Editar</a>
          <a class="btn danger" href="?action=delete&id=<?= (int)$r['idMissao'] ?>" onclick="return confirm('Remover?')">Excluir</a>
        </td>
      </tr>
      <tr>
        <td></td>
        <td colspan="7" class="small">
          <strong>Motivo:</strong> <?= nl2br(h($r['motivo'])) ?><br />
          <strong>Relatório:</strong> <?= nl2br(h($r['relatorio_desc'])) ?>
        </td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
</div>

<?php require_once __DIR__ . '/../../includes/footer.php'; ?>

