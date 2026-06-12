<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Editar foguete';

$id = (int)($_GET['id'] ?? 0);
$row = $id > 0 ? crud_find('foguete', 'idFoguete', $id) : null;
if (!$row) {
    flash_set('err', 'Registro não encontrado.');
    redirect('/pages/foguete/index.php');
}

$nome = (string)$row['nome'];
$combustivelId = (int)$row['combustivel_idCombustivel'];
$localLancamento = (string)$row['localLancamento'];
$errors = [];

$combustiveis = db()->query('SELECT idCombustivel, CONCAT(tipo, " - ", marca) AS label FROM combustivel ORDER BY tipo, marca')->fetchAll();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = trim((string)($_POST['nome'] ?? ''));
    $combustivelId = (int)($_POST['combustivel_idCombustivel'] ?? 0);
    $localLancamento = trim((string)($_POST['localLancamento'] ?? ''));

    if ($nome === '') $errors[] = 'Nome é obrigatório.';
    if ($combustivelId <= 0) $errors[] = 'Selecione um combustível.';
    if ($localLancamento === '') $errors[] = 'Local de lançamento é obrigatório.';

    if (!$errors) {
        try {
            $pdo = db();
            $stmt = $pdo->prepare('UPDATE foguete SET nome=:n, combustivel_idCombustivel=:c, localLancamento=:l WHERE idFoguete=:id');
            $stmt->execute(['n' => $nome, 'c' => $combustivelId, 'l' => $localLancamento, 'id' => $id]);
            flash_set('ok', 'Foguete atualizado.');
            redirect('/pages/foguete/index.php');
        } catch (Throwable $e) {
            $errors[] = 'Erro ao salvar.';
        }
    }
}

require_once __DIR__ . '/../../includes/header.php';
?>

<div class="card">
  <h2>Editar foguete</h2>

  <?php if ($errors): ?>
    <div class="flash err"><?php foreach ($errors as $er): ?><div><?= h($er) ?></div><?php endforeach; ?></div>
  <?php endif; ?>

  <form method="post">
    <div class="row">
      <div>
        <label>Nome</label>
        <input class="input" name="nome" value="<?= h($nome) ?>" maxlength="45" required />
      </div>
      <div>
        <label>Combustível</label>
        <select name="combustivel_idCombustivel" required>
          <option value="">Selecione</option>
          <?php foreach ($combustiveis as $c): ?>
            <?php $cid = (int)$c['idCombustivel']; ?>
            <option value="<?= $cid ?>" <?= $combustivelId===$cid?'selected':'' ?>><?= h($c['label']) ?></option>
          <?php endforeach; ?>
        </select>
      </div>
    </div>

    <label>Local de lançamento</label>
    <input class="input" name="localLancamento" value="<?= h($localLancamento) ?>" maxlength="45" required />

    <br />
    <div class="actions">
      <button class="btn primary" type="submit">Salvar</button>
      <a class="btn" href="index.php">Voltar</a>
    </div>
  </form>
</div>

<?php require_once __DIR__ . '/../../includes/footer.php'; ?>

