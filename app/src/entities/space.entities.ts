import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('especialidade')
export class Especialidade {
  @PrimaryGeneratedColumn()
  idEspecialidade: number;

  @Column({ length: 45 })
  nome: string;
}

@Entity('combustivel')
export class Combustivel {
  @PrimaryGeneratedColumn()
  idCombustivel: number;

  @Column({ length: 45 })
  tipo: string;

  @Column({ length: 45 })
  marca: string;
}

@Entity('relatorio')
export class Relatorio {
  @PrimaryGeneratedColumn()
  idRelatorio: number;

  @Column('text')
  descricao: string;
}

@Entity('empresa_parceira')
export class EmpresaParceira {
  @PrimaryGeneratedColumn()
  idEmpresaParceira: number;

  @Column({ length: 45 })
  nomeEmpresa: string;

  @Column({ length: 45 })
  pais: string;
}

@Entity('foguete')
export class Foguete {
  @PrimaryGeneratedColumn()
  idFoguete: number;

  @Column({ length: 45 })
  nome: string;

  @Column()
  combustivel_idCombustivel: number;

  @Column({ length: 45 })
  localLancamento: string;

  @ManyToOne(() => Combustivel, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'combustivel_idCombustivel' })
  combustivel: Combustivel;
}

@Entity('astronauta')
export class Astronauta {
  @PrimaryGeneratedColumn()
  idAstronauta: number;

  @Column({ length: 45 })
  nomeAstro: string;

  @Column({ length: 45 })
  pais: string;

  @Column()
  especialidade_idEspecialidade: number;

  @ManyToOne(() => Especialidade, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'especialidade_idEspecialidade' })
  especialidade: Especialidade;
}

@Entity('missao')
export class Missao {
  @PrimaryGeneratedColumn()
  idMissao: number;

  @Column({ length: 45 })
  nomeMissao: string;

  @Column('int')
  duracaoDias: number;

  @Column('text')
  motivo: string;

  @Column()
  empresaParceira_idEmpresaParceira: number;

  @Column()
  astronauta_idAstronauta: number;

  @Column()
  foguete_idFoguete: number;

  @Column()
  foguete_combustivel_idCombustivel: number;

  @Column()
  relatorio_idRelatorio: number;

  @ManyToOne(() => EmpresaParceira, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'empresaParceira_idEmpresaParceira' })
  empresaParceira: EmpresaParceira;

  @ManyToOne(() => Astronauta, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'astronauta_idAstronauta' })
  astronauta: Astronauta;

  @ManyToOne(() => Foguete, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'foguete_idFoguete' })
  foguete: Foguete;

  @ManyToOne(() => Combustivel, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'foguete_combustivel_idCombustivel' })
  combustivel: Combustivel;

  @ManyToOne(() => Relatorio, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'relatorio_idRelatorio' })
  relatorio: Relatorio;
}

@Entity('oxigenio')
export class Oxigenio {
  @PrimaryGeneratedColumn()
  idOxigenio: number;

  @Column('float')
  quantidadeAbastecida: number;

  @Column({ length: 45 })
  estado: string;
}

@Entity('estacao')
export class Estacao {
  @PrimaryGeneratedColumn()
  idEstacao: number;

  @Column({ length: 45 })
  nome: string;

  @Column({ length: 45 })
  quantidadeModulos: string;

  @Column({ type: 'boolean', default: true })
  estaAtiva: boolean;

  @Column()
  missao_idMissao: number;

  @Column()
  missao_empresaParceira_idEmpresaParceira: number;

  @Column()
  missao_astronauta_idAstronauta: number;

  @Column()
  missao_foguete_idFoguete: number;

  @Column()
  missao_foguete_combustivel_idCombustivel: number;

  @Column('float')
  temperatura: number;

  @Column()
  oxigenio_idOxigenio: number;

  @ManyToOne(() => Missao, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'missao_idMissao' })
  missao: Missao;

  @ManyToOne(() => EmpresaParceira, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'missao_empresaParceira_idEmpresaParceira' })
  empresaParceira: EmpresaParceira;

  @ManyToOne(() => Astronauta, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'missao_astronauta_idAstronauta' })
  astronauta: Astronauta;

  @ManyToOne(() => Foguete, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'missao_foguete_idFoguete' })
  foguete: Foguete;

  @ManyToOne(() => Combustivel, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'missao_foguete_combustivel_idCombustivel' })
  combustivel: Combustivel;

  @ManyToOne(() => Oxigenio, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'oxigenio_idOxigenio' })
  oxigenio: Oxigenio;
}

@Entity('login')
export class Login {
  @PrimaryGeneratedColumn()
  idLogin: number;

  @Column({ length: 45 })
  nome: string;

  @Column({ length: 255 })
  senha: string;
}
