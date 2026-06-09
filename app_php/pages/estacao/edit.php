<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Editar estação';

$id = (int)($_GET['id'] ?? 0);
$row = $id > 0 ? crud_find('estacao', 'idEstacao', $id) : null;
if (!$row) {
    flash_set('err', 'Registro não encontrado.');
    redirect('/pages/estacao/index.php');
}

$nome = (string)$row['nome'];
$quantidadeModulos = (string)$row['quantidadeModulos'];
$estaAtiva = (int)$row['estaAtiva'];
$temperatura = (float)$row['temperatura'];
$missao_idMissao = (int)$row['missao_idMissao'];
$missao_empresaParceira_idEmpresaParceira = (int)$row['missao_empresaParceira_idEmpresaParceira'];
$missao_astronauta_idAstronauta = (int)$row['missao_astronauta_idAstronauta'];
$missao_foguete_idFoguete = (int)$row['missao_foguete_idFoguete'];
$missao_foguete_combustivel_idCombustivel = (int)$row['missao_foguete_combustivel_idCombustivel'];
$oxigenio_idOxigenio = (int)$row['oxigenio_idOxigenio'];
$errors = [];

$missoes = fetch_pairs('missao', 'idMissao', 'nomeMissao', 'nomeMissao');
$empresas = fetch_pairs('empresa_parceira', 'idEmpresaParceira', 'nomeEmpresa', 'nomeEmpresa');
$astronautas = fetch_pairs('astronauta', 'idAstronauta', 'nomeAstro', 'nomeAstro');
$foguetes = fetch_pairs('foguete', 'idFoguete', 'nome', 'nome');
$combustiveis = fetch_pairs('combustivel', 'idCombustivel', 'tipo', 'tipo');
$oxigenios = fetch_pairs('oxigenio', 'idOxigenio', 'estado', 'idOxigenio');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = trim((string)($_POST['nome'] ?? ''));
    $quantidadeModulos = trim((string)($_POST['quantidadeModulos'] ?? ''));
    $estaAtiva = isset($_POST['estaAtiva']) ? 1 : 0;
    $temperatura = (float)($_POST['temperatura'] ?? 0);
    $missao_idMissao = (int)($_POST['missao_idMissao'] ?? 0);
    $missao_empresaParceira_idEmpresaParceira = (int)($_POST['missao_empresaParceira_idEmpresaParceira'] ?? 0);
    $missao_astronauta_idAstronauta = (int)($_POST['missao_astronauta_idAstronauta'] ?? 0);
    $missao_foguete_idFoguete = (int)($_POST['missao_foguete_idFoguete'] ?? 0);
    $missao_foguete_combustivel_idCombustivel = (int)($_POST['missao_foguete_combustivel_idCombustivel'] ?? 0);
    $oxigenio_idOxigenio = (int)($_POST['oxigenio_idOxigenio'] ?? 0);

    if ($nome === '') $errors[] = 'Nome é obrigatório.';
    if ($quantidadeModulos === '') $errors[] = 'Quantidade de módulos é obrigatório.';
    if ($missao_idMissao <= 0) $errors[] = 'Missão é obrigatória.';

    if (!$errors) {
        try {
            $pdo = db();
            $stmt = $pdo->prepare('UPDATE estacao SET nome=?, quantidadeModulos=?, estaAtiva=?, temperatura=?, missao_idMissao=?, missao_empresaParceira_idEmpresaParceira=?, missao_astronauta_idAstronauta=?, missao_foguete_idFoguete=?, missao_foguete_combustivel_idCombustivel=?, oxigenio_idOxigenio=? WHERE idEstacao=?');
            $stmt->execute([
                $nome, $quantidadeModulos, $estaAtiva, $temperatura,
                $missao_idMissao, $missao_empresaParceira_idEmpresaParceira,
                $missao_astronauta_idAstronauta, $missao_foguete_idFoguete, 
                $missao_foguete_combustivel_idCombustivel, $oxigenio_idOxigenio, $id
            ]);
            flash_set('ok', 'Estação atualizada com sucesso.');
            redirect('/pages/estacao/index.php');
        } catch (Throwable $e) {
            $errors[] = 'Erro ao salvar: ' . $e->getMessage();
        }
    }
}

require_once __DIR__ . '/../../includes/header.php';
?>

<div class="card">
  <h2>Editar estação</h2>

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
        <label>Qtd. Módulos</label>
        <input class="input" name="quantidadeModulos" value="<?= h($quantidadeModulos) ?>" maxlength="45" required />
      </div>
    </div>
    
    <div class="row">
      <div>
        <label>Temperatura</label>
        <input type="number" step="0.01" class="input" name="temperatura" value="<?= h((string)$temperatura) ?>" required />
      </div>
      <div>
        <label>
          <input type="checkbox" name="estaAtiva" value="1" <?= $estaAtiva ? 'checked' : '' ?> /> Esta Ativa
        </label>
      </div>
    </div>

    <label>Missão</label>
    <select class="input" name="missao_idMissao" required>
      <option value="">Selecione</option>
      <?php foreach ($missoes as $mid => $label): ?>
        <option value="<?= (int)$mid ?>" <?= $missao_idMissao===$mid?'selected':'' ?>><?= h($label) ?></option>
      <?php endforeach; ?>
    </select>

    <label>Empresa Parceira (FK da Missão)</label>
    <select class="input" name="missao_empresaParceira_idEmpresaParceira" required>
      <option value="">Selecione</option>
      <?php foreach ($empresas as $eid => $label): ?>
        <option value="<?= (int)$eid ?>" <?= $missao_empresaParceira_idEmpresaParceira===$eid?'selected':'' ?>><?= h($label) ?></option>
      <?php endforeach; ?>
    </select>

    <label>Astronauta (FK da Missão)</label>
    <select class="input" name="missao_astronauta_idAstronauta" required>
      <option value="">Selecione</option>
      <?php foreach ($astronautas as $aid => $label): ?>
        <option value="<?= (int)$aid ?>" <?= $missao_astronauta_idAstronauta===$aid?'selected':'' ?>><?= h($label) ?></option>
      <?php endforeach; ?>
    </select>

    <label>Foguete (FK da Missão)</label>
    <select class="input" name="missao_foguete_idFoguete" required>
      <option value="">Selecione</option>
      <?php foreach ($foguetes as $fid => $label): ?>
        <option value="<?= (int)$fid ?>" <?= $missao_foguete_idFoguete===$fid?'selected':'' ?>><?= h($label) ?></option>
      <?php endforeach; ?>
    </select>

    <label>Combustível Foguete (FK da Missão)</label>
    <select class="input" name="missao_foguete_combustivel_idCombustivel" required>
      <option value="">Selecione</option>
      <?php foreach ($combustiveis as $cid => $label): ?>
        <option value="<?= (int)$cid ?>" <?= $missao_foguete_combustivel_idCombustivel===$cid?'selected':'' ?>><?= h($label) ?></option>
      <?php endforeach; ?>
    </select>

    <label>Oxigênio</label>
    <select class="input" name="oxigenio_idOxigenio" required>
      <option value="">Selecione</option>
      <?php foreach ($oxigenios as $oid => $label): ?>
        <option value="<?= (int)$oid ?>" <?= $oxigenio_idOxigenio===$oid?'selected':'' ?>><?= h("ID " . $oid . " - " . $label) ?></option>
      <?php endforeach; ?>
    </select>

    <br /><br />
    <div class="actions">
      <button class="btn primary" type="submit">Atualizar</button>
      <a class="btn" href="index.php">Voltar</a>
    </div>
  </form>
</div>

<?php require_once __DIR__ . '/../../includes/footer.php'; ?>