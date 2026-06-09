<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Novo combustível';

$tipo = '';
$marca = '';
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tipo = trim((string)($_POST['tipo'] ?? ''));
    $marca = trim((string)($_POST['marca'] ?? ''));

    if ($tipo === '') $errors[] = 'Tipo é obrigatório.';
    if ($marca === '') $errors[] = 'Marca é obrigatória.';

    if (!$errors) {
        try {
            $pdo = db();
            $stmt = $pdo->prepare('INSERT INTO combustivel (tipo, marca) VALUES (:tipo, :marca)');
            $stmt->execute(['tipo' => $tipo, 'marca' => $marca]);
            flash_set('ok', 'Combustível criado.');
            redirect('/pages/combustivel/index.php');
        } catch (Throwable $e) {
            $errors[] = 'Erro ao salvar.';
        }
    }
}

require_once __DIR__ . '/../../includes/header.php';
?>

<div class="card">
  <h2>Novo combustível</h2>

  <?php if ($errors): ?>
    <div class="flash err"><?php foreach ($errors as $er): ?><div><?= h($er) ?></div><?php endforeach; ?></div>
  <?php endif; ?>

  <form method="post">
    <div class="row">
      <div>
        <label>Tipo</label>
        <input class="input" name="tipo" value="<?= h($tipo) ?>" maxlength="45" required />
      </div>
      <div>
        <label>Marca</label>
        <input class="input" name="marca" value="<?= h($marca) ?>" maxlength="45" required />
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

