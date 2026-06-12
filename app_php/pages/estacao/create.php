<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Nova estação';

$nome = '';
$quantidadeModulos = '';
$estaAtiva = 1;
$temperatura = 0.0;
$missao_idMissao = 0;
$missao_empresaParceira_idEmpresaParceira = 0;
$missao_astronauta_idAstronauta = 0;
$missao_foguete_idFoguete = 0;
$missao_foguete_combustivel_idCombustivel = 0;
$oxigenio_idOxigenio = 0;
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
    // ... validate other relations if needed

    if (!$errors) {
        try {
            $pdo = db();
            $stmt = $pdo->prepare('INSERT INTO estacao (nome, quantidadeModulos, estaAtiva, temperatura, missao_idMissao, missao_empresaParceira_idEmpresaParceira, missao_astronauta_idAstronauta, missao_foguete_idFoguete, missao_foguete_combustivel_idCombustivel, oxigenio_idOxigenio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
            $stmt->execute([
                $nome, $quantidadeModulos, $estaAtiva, $temperatura,
                $missao_idMissao, $missao_empresaParceira_idEmpresaParceira,
                $missao_astronauta_idAstronauta, $missao_foguete_idFoguete, 
                $missao_foguete_combustivel_idCombustivel, $oxigenio_idOxigenio
            ]);
            flash_set('ok', 'Estação criada com sucesso.');
            redirect('/pages/estacao/index.php');
        } catch (Throwable $e) {
            $errors[] = 'Erro ao salvar: ' . $e->getMessage();
        }
    }
}

require_once __DIR__ . '/../../includes/header.php';
?>

<div class="card">
  <h2>Nova estação</h2>

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
      <?php foreach ($missoes as $id => $label): ?>
        <option value="<?= (int)$id ?>" <?= $missao_idMissao===$id?'selected':'' ?>><?= h($label) ?></option>
      <?php endforeach; ?>
    </select>

    <label>Empresa Parceira (FK da Missão)</label>
    <select class="input" name="missao_empresaParceira_idEmpresaParceira" required>
      <option value="">Selecione</option>
      <?php foreach ($empresas as $id => $label): ?>
        <option value="<?= (int)$id ?>" <?= $missao_empresaParceira_idEmpresaParceira===$id?'selected':'' ?>><?= h($label) ?></option>
      <?php endforeach; ?>
    </select>

    <label>Astronauta (FK da Missão)</label>
    <select class="input" name="missao_astronauta_idAstronauta" required>
      <option value="">Selecione</option>
      <?php foreach ($astronautas as $id => $label): ?>
        <option value="<?= (int)$id ?>" <?= $missao_astronauta_idAstronauta===$id?'selected':'' ?>><?= h($label) ?></option>
      <?php endforeach; ?>
    </select>

    <label>Foguete (FK da Missão)</label>
    <select class="input" name="missao_foguete_idFoguete" required>
      <option value="">Selecione</option>
      <?php foreach ($foguetes as $id => $label): ?>
        <option value="<?= (int)$id ?>" <?= $missao_foguete_idFoguete===$id?'selected':'' ?>><?= h($label) ?></option>
      <?php endforeach; ?>
    </select>

    <label>Combustível Foguete (FK da Missão)</label>
    <select class="input" name="missao_foguete_combustivel_idCombustivel" required>
      <option value="">Selecione</option>
      <?php foreach ($combustiveis as $id => $label): ?>
        <option value="<?= (int)$id ?>" <?= $missao_foguete_combustivel_idCombustivel===$id?'selected':'' ?>><?= h($label) ?></option>
      <?php endforeach; ?>
    </select>

    <label>Oxigênio</label>
    <select class="input" name="oxigenio_idOxigenio" required>
      <option value="">Selecione</option>
      <?php foreach ($oxigenios as $id => $label): ?>
        <option value="<?= (int)$id ?>" <?= $oxigenio_idOxigenio===$id?'selected':'' ?>><?= h("ID " . $id . " - " . $label) ?></option>
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