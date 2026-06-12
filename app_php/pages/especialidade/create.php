<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Nova especialidade';

$nome = '';
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = trim((string)($_POST['nome'] ?? ''));

    if ($nome === '') {
        $errors[] = 'Nome é obrigatório.';
    }

    if (!$errors) {
        try {
            $pdo = db();
            $stmt = $pdo->prepare('INSERT INTO especialidade (nome) VALUES (:nome)');
            $stmt->execute(['nome' => $nome]);
            flash_set('ok', 'Especialidade criada.');
            redirect('/pages/especialidade/index.php');
        } catch (Throwable $e) {
            $errors[] = 'Erro ao salvar.';
        }
    }
}

require_once __DIR__ . '/../../includes/header.php';
?>

<div class="card">
  <h2>Nova especialidade</h2>

  <?php if ($errors): ?>
    <div class="flash err">
      <?php foreach ($errors as $er): ?>
        <div><?= h($er) ?></div>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>

  <form method="post">
    <label>Nome</label>
    <input class="input" name="nome" value="<?= h($nome) ?>" maxlength="45" required />

    <br /><br />
    <div class="actions">
      <button class="btn primary" type="submit">Salvar</button>
      <a class="btn" href="index.php">Voltar</a>
    </div>
  </form>
</div>

<?php require_once __DIR__ . '/../../includes/footer.php'; ?>

