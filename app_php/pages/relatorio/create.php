<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Novo relatório';

$descricao = '';
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $descricao = trim((string)($_POST['descricao'] ?? ''));

    if ($descricao === '') $errors[] = 'Descrição é obrigatória.';

    if (!$errors) {
        try {
            $pdo = db();
            $stmt = $pdo->prepare('INSERT INTO relatorio (descricao) VALUES (:d)');
            $stmt->execute(['d' => $descricao]);
            flash_set('ok', 'Relatório criado.');
            redirect('/pages/relatorio/index.php');
        } catch (Throwable $e) {
            $errors[] = 'Erro ao salvar.';
        }
    }
}

require_once __DIR__ . '/../../includes/header.php';
?>

<div class="card">
  <h2>Novo relatório</h2>

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

