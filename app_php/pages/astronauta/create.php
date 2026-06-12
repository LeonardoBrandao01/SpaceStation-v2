<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Novo astronauta';

$nomeAstro = '';
$pais = '';
$especialidadeId = 0;
$errors = [];

$especialidades = fetch_pairs('especialidade', 'idEspecialidade', 'nome', 'nome');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nomeAstro = trim((string)($_POST['nomeAstro'] ?? ''));
    $pais = trim((string)($_POST['pais'] ?? ''));
    $especialidadeId = (int)($_POST['especialidade_idEspecialidade'] ?? 0);

    if ($nomeAstro === '') $errors[] = 'Nome é obrigatório.';
    if ($pais === '') $errors[] = 'País é obrigatório.';
    if ($especialidadeId <= 0) $errors[] = 'Selecione uma especialidade.';

    if (!$errors) {
        try {
            $pdo = db();
            $stmt = $pdo->prepare('INSERT INTO astronauta (nomeAstro, pais, especialidade_idEspecialidade) VALUES (:nome, :pais, :esp)');
            $stmt->execute(['nome' => $nomeAstro, 'pais' => $pais, 'esp' => $especialidadeId]);
            flash_set('ok', 'Astronauta criado.');
            redirect('/pages/astronauta/index.php');
        } catch (Throwable $e) {
            $errors[] = 'Erro ao salvar.';
        }
    }
}

require_once __DIR__ . '/../../includes/header.php';
?>

<div class="card">
  <h2>Novo astronauta</h2>

  <?php if ($errors): ?>
    <div class="flash err"><?php foreach ($errors as $er): ?><div><?= h($er) ?></div><?php endforeach; ?></div>
  <?php endif; ?>

  <form method="post">
    <div class="row">
      <div>
        <label>Nome</label>
        <input class="input" name="nomeAstro" value="<?= h($nomeAstro) ?>" maxlength="45" required />
      </div>
      <div>
        <label>País</label>
        <input class="input" name="pais" value="<?= h($pais) ?>" maxlength="45" required />
      </div>
    </div>

    <label>Especialidade</label>
    <select name="especialidade_idEspecialidade" required>
      <option value="">Selecione</option>
      <?php foreach ($especialidades as $id => $label): ?>
        <option value="<?= (int)$id ?>" <?= $especialidadeId===$id?'selected':'' ?>><?= h($label) ?></option>
      <?php endforeach; ?>
    </select>

    <br /><br />
    <div class="actions">
      <button class="btn primary" type="submit">Salvar</button>
      <a class="btn" href="index.php">Voltar</a>
    </div>
  </form>
</div>

<?php require_once __DIR__ . '/../../includes/footer.php'; ?>

