<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Editar relatório';

$id = (int)($_GET['id'] ?? 0);
$row = $id > 0 ? crud_find('relatorio', 'idRelatorio', $id) : null;
if (!$row) {
    flash_set('err', 'Registro não encontrado.');
    redirect('/pages/relatorio/index.php');
}

$descricao = (string)$row['descricao'];
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $descricao = trim((string)($_POST['descricao'] ?? ''));

    if ($descricao === '') $errors[] = 'Descrição é obrigatória.';

    if (!$errors) {
        try {
            $pdo = db();
            $stmt = $pdo->prepare('UPDATE relatorio SET descricao=:d WHERE idRelatorio=:id');
            $stmt->execute(['d' => $descricao, 'id' => $id]);
            flash_set('ok', 'Relatório atualizado.');
            redirect('/pages/relatorio/index.php');
        } catch (Throwable $e) {
            $errors[] = 'Erro ao salvar.';
        }
    }
}

require_once __DIR__ . '/../../includes/header.php';
?>

<div class="card">
  <h2>Editar relatório</h2>

  <?php if ($errors): ?>
    <div class="flash err"><?php foreach ($errors as $er): ?><div><?= h($er) ?></div><?php endforeach; ?></div>
  <?php endif; ?>

  <form method="post">
    <label>Descrição</label>
    <textarea class="input" name="descricao" rows="8" required><?= h($descricao) ?></textarea>

    <br />
    <div class="actions">
      <button class="btn primary" type="submit">Salvar</button>
      <a class="btn" href="index.php">Voltar</a>
    </div>
  </form>
</div>

<?php require_once __DIR__ . '/../../includes/footer.php'; ?>

