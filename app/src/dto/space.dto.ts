import { IsString, IsNotEmpty, MaxLength, IsInt, Min, IsNumber, IsBoolean } from 'class-validator';

export class CreateEspecialidadeDto {
  @IsString({ message: 'O nome da especialidade deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome da especialidade é obrigatório.' })
  @MaxLength(45, { message: 'O nome da especialidade deve ter no máximo 45 caracteres.' })
  nome: string;
}

export class CreateCombustivelDto {
  @IsString({ message: 'O tipo de combustível deve ser um texto.' })
  @IsNotEmpty({ message: 'O tipo de combustível é obrigatório.' })
  @MaxLength(45, { message: 'O tipo de combustível deve ter no máximo 45 caracteres.' })
  tipo: string;

  @IsString({ message: 'A marca do combustível deve ser um texto.' })
  @IsNotEmpty({ message: 'A marca do combustível é obrigatória.' })
  @MaxLength(45, { message: 'A marca do combustível deve ter no máximo 45 caracteres.' })
  marca: string;
}

export class CreateRelatorioDto {
  @IsString({ message: 'A descrição do relatório deve ser um texto.' })
  @IsNotEmpty({ message: 'A descrição do relatório é obrigatória.' })
  descricao: string;
}

export class CreateEmpresaParceiraDto {
  @IsString({ message: 'O nome da empresa deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome da empresa é obrigatório.' })
  @MaxLength(45, { message: 'O nome da empresa deve ter no máximo 45 caracteres.' })
  nomeEmpresa: string;

  @IsString({ message: 'O país de origem deve ser um texto.' })
  @IsNotEmpty({ message: 'O país de origem é obrigatório.' })
  @MaxLength(45, { message: 'O país de origem deve ter no máximo 45 caracteres.' })
  pais: string;
}

export class CreateFogueteDto {
  @IsString({ message: 'O nome do foguete deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome do foguete é obrigatório.' })
  @MaxLength(45, { message: 'O nome do foguete deve ter no máximo 45 caracteres.' })
  nome: string;

  @IsInt({ message: 'O ID do combustível deve ser um número inteiro.' })
  combustivel_idCombustivel: number;

  @IsString({ message: 'O local de lançamento deve ser um texto.' })
  @IsNotEmpty({ message: 'O local de lançamento é obrigatório.' })
  @MaxLength(45, { message: 'O local de lançamento deve ter no máximo 45 caracteres.' })
  localLancamento: string;
}

export class CreateAstronautaDto {
  @IsString({ message: 'O nome do astronauta deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome do astronauta é obrigatório.' })
  @MaxLength(45, { message: 'O nome do astronauta deve ter no máximo 45 caracteres.' })
  nomeAstro: string;

  @IsString({ message: 'O país deve ser um texto.' })
  @IsNotEmpty({ message: 'O país é obrigatório.' })
  @MaxLength(45, { message: 'O país deve ter no máximo 45 caracteres.' })
  pais: string;

  @IsInt({ message: 'A especialidade deve ser informada através de um ID válido.' })
  especialidade_idEspecialidade: number;
}

export class CreateMissaoDto {
  @IsString({ message: 'O nome da missão deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome da missão é obrigatório.' })
  @MaxLength(45, { message: 'O nome da missão deve ter no máximo 45 caracteres.' })
  nomeMissao: string;

  @IsInt({ message: 'A duração em dias deve ser um número inteiro.' })
  @Min(1, { message: 'A duração da missão deve ser de no mínimo 1 dia.' })
  duracaoDias: number;

  @IsString({ message: 'O motivo deve ser um texto.' })
  @IsNotEmpty({ message: 'O motivo da missão é obrigatório.' })
  motivo: string;

  @IsInt({ message: 'A empresa parceira deve ser vinculada via ID.' })
  empresaParceira_idEmpresaParceira: number;

  @IsInt({ message: 'O astronauta deve ser vinculado via ID.' })
  astronauta_idAstronauta: number;

  @IsInt({ message: 'O foguete deve ser vinculado via ID.' })
  foguete_idFoguete: number;

  @IsInt({ message: 'O combustível do foguete deve ser vinculado via ID.' })
  foguete_combustivel_idCombustivel: number;

  @IsInt({ message: 'O relatório deve ser vinculado via ID.' })
  relatorio_idRelatorio: number;
}

export class CreateOxigenioDto {
  @IsNumber({}, { message: 'A quantidade abastecida deve ser um valor numérico.' })
  @Min(0, { message: 'A quantidade abastecida de oxigênio deve ser positiva.' })
  quantidadeAbastecida: number;

  @IsString({ message: 'O estado deve ser um texto.' })
  @IsNotEmpty({ message: 'O estado do oxigênio é obrigatório.' })
  @MaxLength(45, { message: 'O estado do oxigênio deve ter no máximo 45 caracteres.' })
  estado: string;
}

export class CreateEstacaoDto {
  @IsString({ message: 'O nome da estação deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome da estação é obrigatório.' })
  @MaxLength(45, { message: 'O nome da estação deve ter no máximo 45 caracteres.' })
  nome: string;

  @IsString({ message: 'A quantidade de módulos deve ser informada.' })
  @IsNotEmpty({ message: 'A quantidade de módulos é obrigatória.' })
  @MaxLength(45, { message: 'A quantidade de módulos deve ter no máximo 45 caracteres.' })
  quantidadeModulos: string;

  @IsBoolean({ message: 'O estado de atividade deve ser um valor booleano.' })
  estaAtiva: boolean;

  @IsInt({ message: 'A missão deve ser informada via ID.' })
  missao_idMissao: number;

  @IsInt({ message: 'A empresa parceira deve ser informada via ID.' })
  missao_empresaParceira_idEmpresaParceira: number;

  @IsInt({ message: 'O astronauta deve ser informado via ID.' })
  missao_astronauta_idAstronauta: number;

  @IsInt({ message: 'O foguete deve ser informado via ID.' })
  missao_foguete_idFoguete: number;

  @IsInt({ message: 'O combustível da missão deve ser informado via ID.' })
  missao_foguete_combustivel_idCombustivel: number;

  @IsNumber({}, { message: 'A temperatura da estação deve ser um valor numérico.' })
  temperatura: number;

  @IsInt({ message: 'O cilindro de oxigênio deve ser informado via ID.' })
  oxigenio_idOxigenio: number;
}

export class LoginDto {
  @IsString({ message: 'O usuário é obrigatório.' })
  @IsNotEmpty({ message: 'O usuário é obrigatório.' })
  nome: string;

  @IsString({ message: 'A senha é obrigatória.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  senha: string;
}
