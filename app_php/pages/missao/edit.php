<?php
declare(strict_types=1);
require_once __DIR__ . '/../../includes/crud.php';

$title = 'Editar missão';

$id = (int)($_GET['id'] ?? 0);
$row = $id > 0 ? crud_find('missao', 'idMissao', $id) : null;
if (!$row) {
    flash_set('err', 'Registro não encontrado.');
    redirect('/pages/missao/index.php');
}

$nomeMissao = (string)$row['nomeMissao'];
$duracaoDias = (string)$row['duracaoDias'];
$motivo = (string)$row['motivo'];

$empresaId = (int)$row['empresaParceira_idEmpresaParceira'];
$astronautaId = (int)$row['astronauta_idAstronauta'];
$fogueteId = (int)$row['foguete_idFoguete'];
$combustivelId = (int)$row['foguete_combustivel_idCombustivel'];
$relatorioId = (int)$row['relatorio_idRelatorio'];

$errors = [];

$empresas = fetch_pairs('empresa_parceira', 'idEmpresaParceira', 'nomeEmpresa', 'nomeEmpresa');
$astronautas = fetch_pairs('astronauta', 'idAstronauta', 'nomeAstro', 'nomeAstro');
$foguetes = fetch_pairs('foguete', 'idFoguete', 'nome', 'nome');
$relatorios = fetch_pairs('relatorio', 'idRelatorio', 'idRelatorio', 'idRelatorio');
$combustiveis = db()->query('SELECT idCombustivel, CONCAT(tipo, " - ", marca) AS label FROM combustivel ORDER BY tipo, marca')->fetchAll();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nomeMissao = trim((string)($_POST['nomeMissao'] ?? ''));
    $duracaoDias = trim((string)($_POST['duracaoDias'] ?? ''));
    $motivo = trim((string)($_POST['motivo'] ?? ''));

    $empresaId = (int)($_POST['empresaParceira_idEmpresaParceira'] ?? 0);
    $astronautaId = (int)($_POST['astronauta_idAstronauta'] ?? 0);
    $fogueteId = (int)($_POST['foguete_idFoguete'] ?? 0);
    $combustivelId = (int)($_POST['foguete_combustivel_idCombustivel'] ?? 0);
    $relatorioId = (int)($_POST['relatorio_idRelatorio'] ?? 0);

    if ($nomeMissao === '') $errors[] = 'Nome é obrigatório.';
    if ($duracaoDias === '' || !ctype_digit($duracaoDias) || (int)$duracaoDias <= 0) $errors[] = 'Duração deve ser um número inteiro > 0.';
    if ($motivo === '') $errors[] = 'Motivo é obrigatório.';

    if ($empresaId <= 0) $errors[] = 'Selecione uma empresa.';
    if ($astronautaId <= 0) $errors[] = 'Selecione um astronauta.';
    if ($fogueteId <= 0) $errors[] = 'Selecione um foguete.';
    if ($combustivelId <= 0) $errors[] = 'Selecione um combustível.';
    if ($relatorioId <= 0) $errors[] = 'Selecione um relatório.';

    if (!$errors) {
        try {
            $pdo = db();
            $stmt = $pdo->prepare('UPDATE missao SET
                nomeMissao=:nome,
                duracaoDias=:duracao,
                motivo=:motivo,
                empresaParceira_idEmpresaParceira=:empresa,
                astronauta_idAstronauta=:astronauta,
                foguete_idFoguete=:foguete,
                foguete_combustivel_idCombustivel=:comb,
                relatorio_idRelatorio=:rel
                WHERE idMissao=:id');
            $stmt->execute([
                'nome' => $nomeMissao,
                'duracao' => (int)$duracaoDias,
                'motivo' => $motivo,
                'empresa' => $empresaId,
                'astronauta' => $astronautaId,
                'foguete' => $fogueteId,
                'comb' => $combustivelId,
                'rel' => $relatorioId,
                'id' => $id,
            ]);

            flash_set('ok', 'Missão atualizada.');
            redirect('/pages/missao/index.php');
        } catch (Throwable $e) {
            $errors[] = 'Erro ao salvar.';
        }
    }
}

require_once __DIR__ . '/../../includes/header.php';
?>

<div class="card">
  <h2>Editar missão</h2>

  <?php if ($errors): ?>
    <div class="flash err"><?php foreach ($errors as $er): ?><div><?= h($er) ?></div><?php endforeach; ?></div>
  <?php endif; ?>

  <form method="post">
    <div class="row">
      <div>
        <label>Nome</label>
        <input class="input" name="nomeMissao" value="<?= h($nomeMissao) ?>" maxlength="45" required />
      </div>
      <div>
        <label>Duração (dias)</label>
        <input class="input" name="duracaoDias" value="<?= h($duracaoDias) ?>" required />
      </div>
    </div>

    <label>Motivo</label>
    <textarea class="input" name="motivo" rows="5" required><?= h($motivo) ?></textarea>


    <div class="row">
      <div>
        <label>Empresa parceira</label>
        <select name="empresaParceira_idEmpresaParceira" required>
          <option value="">Selecione</option>
          <?php foreach ($empresas as $eid => $label): ?>
            <option value="<?= (int)$eid ?>" <?= $empresaId===(int)$eid?'selected':'' ?>><?= h($label) ?></option>
          <?php endforeach; ?>
        </select>
      </div>
      <div>
        <label>Astronauta</label>
        <select name="astronauta_idAstronauta" required>
          <option value="">Selecione</option>
          <?php foreach ($astronautas as $aid => $label): ?>
            <option value="<?= (int)$aid ?>" <?= $astronautaId===(int)$aid?'selected':'' ?>><?= h($label) ?></option>
          <?php endforeach; ?>
        </select>
      </div>
    </div>

    <div class="row">
      <div>
        <label>Foguete</label>
        <select name="foguete_idFoguete" required>
          <option value="">Selecione</option>
          <?php foreach ($foguetes as $fid => $label): ?>
            <option value="<?= (int)$fid ?>" <?= $fogueteId===(int)$fid?'selected':'' ?>><?= h($label) ?></option>
          <?php endforeach; ?>
        </select>
      </div>
      <div>
        <label>Combustível</label>
        <select name="foguete_combustivel_idCombustivel" required>
          <option value="">Selecione</option>
          <?php foreach ($combustiveis as $c): ?>
            <?php $cid = (int)$c['idCombustivel']; ?>
            <option value="<?= $cid ?>" <?= $combustivelId===$cid?'selected':'' ?>><?= h($c['label']) ?></option>
          <?php endforeach; ?>
        </select>
      </div>
    </div>

    <label>Relatório</label>
    <select name="relatorio_idRelatorio" required>
      <option value="">Selecione</option>
      <?php foreach ($relatorios as $rid => $label): ?>
        <option value="<?= (int)$rid ?>" <?= $relatorioId===(int)$rid?'selected':'' ?>>Relatório #<?= (int)$rid ?></option>
      <?php endforeach; ?>
    </select>

    <br />
    <div class="actions">
      <button class="btn primary" type="submit">Salvar</button>
      <a class="btn" href="index.php">Voltar</a>
    </div>
  </form>
</div>

<?php require_once __DIR__ . '/../../includes/footer.php'; ?>

