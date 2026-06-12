<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Editar astronauta';

$id = (int)($_GET['id'] ?? 0);
$row = $id > 0 ? crud_find('astronauta', 'idAstronauta', $id) : null;
if (!$row) {
    flash_set('err', 'Registro não encontrado.');
    redirect('/pages/astronauta/index.php');
}

$nomeAstro = (string)$row['nomeAstro'];
$pais = (string)$row['pais'];
$especialidadeId = (int)$row['especialidade_idEspecialidade'];
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
            $stmt = $pdo->prepare('UPDATE astronauta SET nomeAstro=:nome, pais=:pais, especialidade_idEspecialidade=:esp WHERE idAstronauta=:id');
            $stmt->execute(['nome' => $nomeAstro, 'pais' => $pais, 'esp' => $especialidadeId, 'id' => $id]);
            flash_set('ok', 'Astronauta atualizado.');
            redirect('/pages/astronauta/index.php');
        } catch (Throwable $e) {
            $errors[] = 'Erro ao salvar.';
        }
    }
}

require_once __DIR__ . '/../../includes/header.php';
?>

<div class="card">
  <h2>Editar astronauta</h2>

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
      <?php foreach ($especialidades as $eid => $label): ?>
        <option value="<?= (int)$eid ?>" <?= $especialidadeId===(int)$eid?'selected':'' ?>><?= h($label) ?></option>
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

