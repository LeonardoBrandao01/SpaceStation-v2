<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Editar combustível';

$id = (int)($_GET['id'] ?? 0);
$row = $id > 0 ? crud_find('combustivel', 'idCombustivel', $id) : null;
if (!$row) {
    flash_set('err', 'Registro não encontrado.');
    redirect('/pages/combustivel/index.php');
}

$tipo = (string)$row['tipo'];
$marca = (string)$row['marca'];
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tipo = trim((string)($_POST['tipo'] ?? ''));
    $marca = trim((string)($_POST['marca'] ?? ''));

    if ($tipo === '') $errors[] = 'Tipo é obrigatório.';
    if ($marca === '') $errors[] = 'Marca é obrigatória.';

    if (!$errors) {
        try {
            $pdo = db();
            $stmt = $pdo->prepare('UPDATE combustivel SET tipo=:tipo, marca=:marca WHERE idCombustivel=:id');
            $stmt->execute(['tipo' => $tipo, 'marca' => $marca, 'id' => $id]);
            flash_set('ok', 'Combustível atualizado.');
            redirect('/pages/combustivel/index.php');
        } catch (Throwable $e) {
            $errors[] = 'Erro ao salvar.';
        }
    }
}

require_once __DIR__ . '/../../includes/header.php';
?>

<div class="card">
  <h2>Editar combustível</h2>

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

