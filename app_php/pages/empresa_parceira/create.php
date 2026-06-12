<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Nova empresa';

$nomeEmpresa = '';
$pais = '';
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nomeEmpresa = trim((string)($_POST['nomeEmpresa'] ?? ''));
    $pais = trim((string)($_POST['pais'] ?? ''));

    if ($nomeEmpresa === '') $errors[] = 'Nome é obrigatório.';
    if ($pais === '') $errors[] = 'País é obrigatório.';

    if (!$errors) {
        try {
            $pdo = db();
            $stmt = $pdo->prepare('INSERT INTO empresa_parceira (nomeEmpresa, pais) VALUES (:nome, :pais)');
            $stmt->execute(['nome' => $nomeEmpresa, 'pais' => $pais]);
            flash_set('ok', 'Empresa criada.');
            redirect('/pages/empresa_parceira/index.php');
        } catch (Throwable $e) {
            $errors[] = 'Erro ao salvar.';
        }
    }
}

require_once __DIR__ . '/../../includes/header.php';
?>

<div class="card">
  <h2>Nova empresa</h2>

  <?php if ($errors): ?>
    <div class="flash err"><?php foreach ($errors as $er): ?><div><?= h($er) ?></div><?php endforeach; ?></div>
  <?php endif; ?>

  <form method="post">
    <div class="row">
      <div>
        <label>Nome</label>
        <input class="input" name="nomeEmpresa" value="<?= h($nomeEmpresa) ?>" maxlength="45" required />
      </div>
      <div>
        <label>País</label>
        <input class="input" name="pais" value="<?= h($pais) ?>" maxlength="45" required />
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

