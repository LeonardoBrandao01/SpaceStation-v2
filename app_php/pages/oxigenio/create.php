<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Novo oxigênio';

$quantidade = '';
$estado = '';
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $quantidade = trim((string)($_POST['quantidadeAbastecida'] ?? ''));
    $estado = trim((string)($_POST['estado'] ?? ''));

    if ($quantidade === '' || !is_numeric($quantidade)) $errors[] = 'Quantidade deve ser numérica.';
    if ($estado === '') $errors[] = 'Estado é obrigatório.';

    if (!$errors) {
        try {
            $pdo = db();
            $stmt = $pdo->prepare('INSERT INTO oxigenio (quantidadeAbastecida, estado) VALUES (:q, :e)');
            $stmt->execute(['q' => (float)$quantidade, 'e' => $estado]);
            flash_set('ok', 'Registro criado.');
            redirect('/pages/oxigenio/index.php');
        } catch (Throwable $e) {
            $errors[] = 'Erro ao salvar.';
        }
    }
}

require_once __DIR__ . '/../../includes/header.php';
?>

<div class="card">
  <h2>Novo registro de oxigênio</h2>

  <?php if ($errors): ?>
    <div class="flash err"><?php foreach ($errors as $er): ?><div><?= h($er) ?></div><?php endforeach; ?></div>
  <?php endif; ?>

  <form method="post">
    <div class="row">
      <div>
        <label>Quantidade abastecida</label>
        <input class="input" name="quantidadeAbastecida" value="<?= h($quantidade) ?>" required />
      </div>
      <div>
        <label>Estado</label>
        <input class="input" name="estado" value="<?= h($estado) ?>" maxlength="45" required />
      </div>
    </div>

    <br />
    <div class="actions">
      <button class="btn primary" type="submit">Salvar</button>
      <a class="btn" href="index.php">Voltar</a>
    </div>
  </form>
</div>

<?php require_once __DIR__ . '/../../includes/footer.php'; ?>

