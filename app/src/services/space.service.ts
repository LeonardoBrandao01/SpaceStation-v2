import { Injectable, OnModuleInit, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  Especialidade, 
  Combustivel, 
  Relatorio, 
  EmpresaParceira, 
  Foguete, 
  Astronauta, 
  Missao, 
  Oxigenio, 
  Estacao, 
  Login 
} from '../entities/space.entities';

@Injectable()
export class SpaceService implements OnModuleInit {
  constructor(
    @InjectRepository(Especialidade) private especialidadeRepo: Repository<Especialidade>,
    @InjectRepository(Combustivel) private combustivelRepo: Repository<Combustivel>,
    @InjectRepository(Relatorio) private relatorioRepo: Repository<Relatorio>,
    @InjectRepository(EmpresaParceira) private empresaRepo: Repository<EmpresaParceira>,
    @InjectRepository(Foguete) private fogueteRepo: Repository<Foguete>,
    @InjectRepository(Astronauta) private astronautaRepo: Repository<Astronauta>,
    @InjectRepository(Missao) private missaoRepo: Repository<Missao>,
    @InjectRepository(Oxigenio) private oxigenioRepo: Repository<Oxigenio>,
    @InjectRepository(Estacao) private estacaoRepo: Repository<Estacao>,
    @InjectRepository(Login) private loginRepo: Repository<Login>,
  ) {}

  async onModuleInit() {
    // Check if seeding is needed
    const count = await this.especialidadeRepo.count();
    if (count === 0) {
      console.log('Database empty. Running seed scripts...');
      await this.runSeeds();
    }
  }

  private async runSeeds() {
    // 1. Especialidades
    const spec1 = await this.especialidadeRepo.save({ nome: 'Engenharia de Voo' });
    const spec2 = await this.especialidadeRepo.save({ nome: 'Astrofísica' });
    const spec3 = await this.especialidadeRepo.save({ nome: 'Biologia Espacial' });
    const spec4 = await this.especialidadeRepo.save({ nome: 'Piloto Orbital' });

    // 2. Combustíveis
    const c1 = await this.combustivelRepo.save({ tipo: 'Oxigênio Líquido / Querosene (RP-1)', marca: 'SpaceX SpaceGrade' });
    const c2 = await this.combustivelRepo.save({ tipo: 'Hidrogênio Líquido / Oxigênio Líquido', marca: 'NASA SLS Aero' });
    const c3 = await this.combustivelRepo.save({ tipo: 'Metano Líquido / LOX', marca: 'Blue Origin Raptor' });

    // 3. Relatórios
    const r1 = await this.relatorioRepo.save({ descricao: 'Pressurização do módulo principal concluída com sucesso. Sem vazamentos detectados.' });
    const r2 = await this.relatorioRepo.save({ descricao: 'Experimento de microgravidade com células vegetais demonstrou taxa de crescimento acelerada.' });
    const r3 = await this.relatorioRepo.save({ descricao: 'Ajuste orbital menor concluído com sucesso às 04:12 UTC.' });

    // 4. Empresas
    const emp1 = await this.empresaRepo.save({ nomeEmpresa: 'SpaceX', pais: 'Estados Unidos' });
    const emp2 = await this.empresaRepo.save({ nomeEmpresa: 'NASA', pais: 'Estados Unidos' });
    const emp3 = await this.empresaRepo.save({ nomeEmpresa: 'ESA (Agência Espacial Europeia)', pais: 'Europa (Multi)' });
    const emp4 = await this.empresaRepo.save({ nomeEmpresa: 'JAXA', pais: 'Japão' });

    // 5. Oxigênio
    const o1 = await this.oxigenioRepo.save({ quantidadeAbastecida: 1500, estado: 'Excelente' });
    const o2 = await this.oxigenioRepo.save({ quantidadeAbastecida: 450, estado: 'Alerta Crítico' });
    const o3 = await this.oxigenioRepo.save({ quantidadeAbastecida: 980, estado: 'Estável' });

    // 6. Foguetes
    const f1 = await this.fogueteRepo.save({ nome: 'Falcon 9', combustivel_idCombustivel: c1.idCombustivel, localLancamento: 'Cabo Canaveral - LC-39A' });
    const f2 = await this.fogueteRepo.save({ nome: 'Space Launch System (SLS)', combustivel_idCombustivel: c2.idCombustivel, localLancamento: 'Kennedy Space Center' });
    const f3 = await this.fogueteRepo.save({ nome: 'Starship', combustivel_idCombustivel: c3.idCombustivel, localLancamento: 'Starbase - Boca Chica' });

    // 7. Astronautas
    const a1 = await this.astronautaRepo.save({ nomeAstro: 'Marcos Pontes', pais: 'Brasil', especialidade_idEspecialidade: spec1.idEspecialidade });
    const a2 = await this.astronautaRepo.save({ nomeAstro: 'Peggy Whitson', pais: 'Estados Unidos', especialidade_idEspecialidade: spec3.idEspecialidade });
    const a3 = await this.astronautaRepo.save({ nomeAstro: 'Chris Hadfield', pais: 'Canadá', especialidade_idEspecialidade: spec4.idEspecialidade });

    // 8. Missões
    const m1 = await this.missaoRepo.save({
      nomeMissao: 'Expedição 70',
      duracaoDias: 45,
      motivo: 'Instalação do novo laboratório de biologia molecular em gravidade zero e manutenção dos painéis solares principais.',
      empresaParceira_idEmpresaParceira: emp2.idEmpresaParceira,
      astronauta_idAstronauta: a2.idAstronauta,
      foguete_idFoguete: f1.idFoguete,
      foguete_combustivel_idCombustivel: c1.idCombustivel,
      relatorio_idRelatorio: r1.idRelatorio
    });

    const m2 = await this.missaoRepo.save({
      nomeMissao: 'Artemis III',
      duracaoDias: 14,
      motivo: 'Pouso tripulado na região do polo sul lunar para coleta de amostras de gelo de água e geologia.',
      empresaParceira_idEmpresaParceira: emp1.idEmpresaParceira,
      astronauta_idAstronauta: a3.idAstronauta,
      foguete_idFoguete: f3.idFoguete,
      foguete_combustivel_idCombustivel: c3.idCombustivel,
      relatorio_idRelatorio: r3.idRelatorio
    });

    // 9. Estações
    await this.estacaoRepo.save({
      nome: 'Gateway Alpha',
      quantidadeModulos: '8',
      estaAtiva: true,
      missao_idMissao: m2.idMissao,
      missao_empresaParceira_idEmpresaParceira: emp1.idEmpresaParceira,
      missao_astronauta_idAstronauta: a3.idAstronauta,
      missao_foguete_idFoguete: f3.idFoguete,
      missao_foguete_combustivel_idCombustivel: c3.idCombustivel,
      temperatura: 21.5,
      oxigenio_idOxigenio: o1.idOxigenio
    });

    await this.estacaoRepo.save({
      nome: 'Vanguard Station',
      quantidadeModulos: '4',
      estaAtiva: false,
      missao_idMissao: m1.idMissao,
      missao_empresaParceira_idEmpresaParceira: emp2.idEmpresaParceira,
      missao_astronauta_idAstronauta: a2.idAstronauta,
      missao_foguete_idFoguete: f1.idFoguete,
      missao_foguete_combustivel_idCombustivel: c1.idCombustivel,
      temperatura: 17.8,
      oxigenio_idOxigenio: o2.idOxigenio
    });

    // 10. Login
    await this.loginRepo.save({ nome: 'admin', senha: 'admin123' });
    await this.loginRepo.save({ nome: 'usuario', senha: 'user123' });

    console.log('Seeding completed successfully!');
  }

  // ==========================================
  // ESPECIALIDADE
  // ==========================================
  async getEspecialidades(): Promise<Especialidade[]> {
    return this.especialidadeRepo.find();
  }

  async getEspecialidadeById(id: number): Promise<Especialidade> {
    const item = await this.especialidadeRepo.findOneBy({ idEspecialidade: id });
    if (!item) throw new NotFoundException('Especialidade não encontrada.');
    return item;
  }

  async createEspecialidade(data: Partial<Especialidade>): Promise<Especialidade> {
    return this.especialidadeRepo.save(this.especialidadeRepo.create(data));
  }

  async updateEspecialidade(id: number, data: Partial<Especialidade>): Promise<Especialidade> {
    const item = await this.getEspecialidadeById(id);
    return this.especialidadeRepo.save({ ...item, ...data });
  }

  async deleteEspecialidade(id: number): Promise<void> {
    const item = await this.getEspecialidadeById(id);
    await this.especialidadeRepo.remove(item);
  }

  // ==========================================
  // COMBUSTIVEL
  // ==========================================
  async getCombustiveis(): Promise<Combustivel[]> {
    return this.combustivelRepo.find();
  }

  async getCombustivelById(id: number): Promise<Combustivel> {
    const item = await this.combustivelRepo.findOneBy({ idCombustivel: id });
    if (!item) throw new NotFoundException('Combustível não encontrado.');
    return item;
  }

  async createCombustivel(data: Partial<Combustivel>): Promise<Combustivel> {
    return this.combustivelRepo.save(this.combustivelRepo.create(data));
  }

  async updateCombustivel(id: number, data: Partial<Combustivel>): Promise<Combustivel> {
    const item = await this.getCombustivelById(id);
    return this.combustivelRepo.save({ ...item, ...data });
  }

  async deleteCombustivel(id: number): Promise<void> {
    const item = await this.getCombustivelById(id);
    await this.combustivelRepo.remove(item);
  }

  // ==========================================
  // RELATORIO
  // ==========================================
  async getRelatorios(): Promise<Relatorio[]> {
    return this.relatorioRepo.find();
  }

  async getRelatorioById(id: number): Promise<Relatorio> {
    const item = await this.relatorioRepo.findOneBy({ idRelatorio: id });
    if (!item) throw new NotFoundException('Relatório não encontrado.');
    return item;
  }

  async createRelatorio(data: Partial<Relatorio>): Promise<Relatorio> {
    return this.relatorioRepo.save(this.relatorioRepo.create(data));
  }

  async updateRelatorio(id: number, data: Partial<Relatorio>): Promise<Relatorio> {
    const item = await this.getRelatorioById(id);
    return this.relatorioRepo.save({ ...item, ...data });
  }

  async deleteRelatorio(id: number): Promise<void> {
    const item = await this.getRelatorioById(id);
    await this.relatorioRepo.remove(item);
  }

  // ==========================================
  // EMPRESA PARCEIRA
  // ==========================================
  async getEmpresas(): Promise<EmpresaParceira[]> {
    return this.empresaRepo.find();
  }

  async getEmpresaById(id: number): Promise<EmpresaParceira> {
    const item = await this.empresaRepo.findOneBy({ idEmpresaParceira: id });
    if (!item) throw new NotFoundException('Empresa parceira não encontrada.');
    return item;
  }

  async createEmpresa(data: Partial<EmpresaParceira>): Promise<EmpresaParceira> {
    return this.empresaRepo.save(this.empresaRepo.create(data));
  }

  async updateEmpresa(id: number, data: Partial<EmpresaParceira>): Promise<EmpresaParceira> {
    const item = await this.getEmpresaById(id);
    return this.empresaRepo.save({ ...item, ...data });
  }

  async deleteEmpresa(id: number): Promise<void> {
    const item = await this.getEmpresaById(id);
    await this.empresaRepo.remove(item);
  }

  // ==========================================
  // FOGUETE
  // ==========================================
  async getFoguetes(): Promise<Foguete[]> {
    return this.fogueteRepo.find();
  }

  async getFogueteById(id: number): Promise<Foguete> {
    const item = await this.fogueteRepo.findOneBy({ idFoguete: id });
    if (!item) throw new NotFoundException('Foguete não encontrado.');
    return item;
  }

  async createFoguete(data: Partial<Foguete>): Promise<Foguete> {
    if (data.combustivel_idCombustivel === undefined) {
      throw new BadRequestException('Combustível é obrigatório.');
    }
    await this.getCombustivelById(data.combustivel_idCombustivel);
    return this.fogueteRepo.save(this.fogueteRepo.create(data));
  }

  async updateFoguete(id: number, data: Partial<Foguete>): Promise<Foguete> {
    const item = await this.getFogueteById(id);
    if (data.combustivel_idCombustivel !== undefined) {
      await this.getCombustivelById(data.combustivel_idCombustivel);
    }
    return this.fogueteRepo.save({ ...item, ...data });
  }

  async deleteFoguete(id: number): Promise<void> {
    const item = await this.getFogueteById(id);
    await this.fogueteRepo.remove(item);
  }

  // ==========================================
  // ASTRONAUTA
  // ==========================================
  async getAstronautas(): Promise<Astronauta[]> {
    return this.astronautaRepo.find();
  }

  async getAstronautaById(id: number): Promise<Astronauta> {
    const item = await this.astronautaRepo.findOneBy({ idAstronauta: id });
    if (!item) throw new NotFoundException('Astronauta não encontrado.');
    return item;
  }

  async createAstronauta(data: Partial<Astronauta>): Promise<Astronauta> {
    if (data.especialidade_idEspecialidade === undefined) {
      throw new BadRequestException('Especialidade é obrigatória.');
    }
    await this.getEspecialidadeById(data.especialidade_idEspecialidade);
    return this.astronautaRepo.save(this.astronautaRepo.create(data));
  }

  async updateAstronauta(id: number, data: Partial<Astronauta>): Promise<Astronauta> {
    const item = await this.getAstronautaById(id);
    if (data.especialidade_idEspecialidade !== undefined) {
      await this.getEspecialidadeById(data.especialidade_idEspecialidade);
    }
    return this.astronautaRepo.save({ ...item, ...data });
  }

  async deleteAstronauta(id: number): Promise<void> {
    const item = await this.getAstronautaById(id);
    await this.astronautaRepo.remove(item);
  }

  // ==========================================
  // MISSAO
  // ==========================================
  async getMissoes(): Promise<Missao[]> {
    return this.missaoRepo.find();
  }

  async getMissaoById(id: number): Promise<Missao> {
    const item = await this.missaoRepo.findOneBy({ idMissao: id });
    if (!item) throw new NotFoundException('Missão não encontrada.');
    return item;
  }

  async createMissao(data: Partial<Missao>): Promise<Missao> {
    if (data.empresaParceira_idEmpresaParceira === undefined) throw new BadRequestException('Empresa parceira é obrigatória.');
    if (data.astronauta_idAstronauta === undefined) throw new BadRequestException('Astronauta é obrigatório.');
    if (data.foguete_idFoguete === undefined) throw new BadRequestException('Foguete é obrigatório.');
    if (data.foguete_combustivel_idCombustivel === undefined) throw new BadRequestException('Combustível do foguete é obrigatório.');
    if (data.relatorio_idRelatorio === undefined) throw new BadRequestException('Relatório é obrigatório.');

    await this.getEmpresaById(data.empresaParceira_idEmpresaParceira);
    await this.getAstronautaById(data.astronauta_idAstronauta);
    await this.getFogueteById(data.foguete_idFoguete);
    await this.getCombustivelById(data.foguete_combustivel_idCombustivel);
    await this.getRelatorioById(data.relatorio_idRelatorio);
    return this.missaoRepo.save(this.missaoRepo.create(data));
  }

  async updateMissao(id: number, data: Partial<Missao>): Promise<Missao> {
    const item = await this.getMissaoById(id);
    if (data.empresaParceira_idEmpresaParceira !== undefined) await this.getEmpresaById(data.empresaParceira_idEmpresaParceira);
    if (data.astronauta_idAstronauta !== undefined) await this.getAstronautaById(data.astronauta_idAstronauta);
    if (data.foguete_idFoguete !== undefined) await this.getFogueteById(data.foguete_idFoguete);
    if (data.foguete_combustivel_idCombustivel !== undefined) await this.getCombustivelById(data.foguete_combustivel_idCombustivel);
    if (data.relatorio_idRelatorio !== undefined) await this.getRelatorioById(data.relatorio_idRelatorio);
    return this.missaoRepo.save({ ...item, ...data });
  }

  async deleteMissao(id: number): Promise<void> {
    const item = await this.getMissaoById(id);
    await this.missaoRepo.remove(item);
  }

  // ==========================================
  // OXIGENIO
  // ==========================================
  async getOxigenios(): Promise<Oxigenio[]> {
    return this.oxigenioRepo.find();
  }

  async getOxigenioById(id: number): Promise<Oxigenio> {
    const item = await this.oxigenioRepo.findOneBy({ idOxigenio: id });
    if (!item) throw new NotFoundException('Oxigênio não encontrado.');
    return item;
  }

  async createOxigenio(data: Partial<Oxigenio>): Promise<Oxigenio> {
    return this.oxigenioRepo.save(this.oxigenioRepo.create(data));
  }

  async updateOxigenio(id: number, data: Partial<Oxigenio>): Promise<Oxigenio> {
    const item = await this.getOxigenioById(id);
    return this.oxigenioRepo.save({ ...item, ...data });
  }

  async deleteOxigenio(id: number): Promise<void> {
    const item = await this.getOxigenioById(id);
    await this.oxigenioRepo.remove(item);
  }

  // ==========================================
  // ESTACAO
  // ==========================================
  async getEstacoes(): Promise<Estacao[]> {
    return this.estacaoRepo.find();
  }

  async getEstacaoById(id: number): Promise<Estacao> {
    const item = await this.estacaoRepo.findOneBy({ idEstacao: id });
    if (!item) throw new NotFoundException('Estação não encontrada.');
    return item;
  }

  async createEstacao(data: Partial<Estacao>): Promise<Estacao> {
    if (data.missao_idMissao === undefined) throw new BadRequestException('Missão é obrigatória.');
    if (data.missao_empresaParceira_idEmpresaParceira === undefined) throw new BadRequestException('Empresa parceira é obrigatória.');
    if (data.missao_astronauta_idAstronauta === undefined) throw new BadRequestException('Astronauta é obrigatório.');
    if (data.missao_foguete_idFoguete === undefined) throw new BadRequestException('Foguete é obrigatório.');
    if (data.missao_foguete_combustivel_idCombustivel === undefined) throw new BadRequestException('Combustível da missão é obrigatório.');
    if (data.oxigenio_idOxigenio === undefined) throw new BadRequestException('Oxigênio é obrigatório.');

    await this.getMissaoById(data.missao_idMissao);
    await this.getEmpresaById(data.missao_empresaParceira_idEmpresaParceira);
    await this.getAstronautaById(data.missao_astronauta_idAstronauta);
    await this.getFogueteById(data.missao_foguete_idFoguete);
    await this.getCombustivelById(data.missao_foguete_combustivel_idCombustivel);
    await this.getOxigenioById(data.oxigenio_idOxigenio);
    return this.estacaoRepo.save(this.estacaoRepo.create(data));
  }

  async updateEstacao(id: number, data: Partial<Estacao>): Promise<Estacao> {
    const item = await this.getEstacaoById(id);
    if (data.missao_idMissao !== undefined) await this.getMissaoById(data.missao_idMissao);
    if (data.missao_empresaParceira_idEmpresaParceira !== undefined) await this.getEmpresaById(data.missao_empresaParceira_idEmpresaParceira);
    if (data.missao_astronauta_idAstronauta !== undefined) await this.getAstronautaById(data.missao_astronauta_idAstronauta);
    if (data.missao_foguete_idFoguete !== undefined) await this.getFogueteById(data.missao_foguete_idFoguete);
    if (data.missao_foguete_combustivel_idCombustivel !== undefined) await this.getCombustivelById(data.missao_foguete_combustivel_idCombustivel);
    if (data.oxigenio_idOxigenio !== undefined) await this.getOxigenioById(data.oxigenio_idOxigenio);
    return this.estacaoRepo.save({ ...item, ...data });
  }

  async deleteEstacao(id: number): Promise<void> {
    const item = await this.getEstacaoById(id);
    await this.estacaoRepo.remove(item);
  }

  // ==========================================
  // LOGIN / AUTH
  // ==========================================
  async validateUser(nome: string, senha: string): Promise<any> {
    const user = await this.loginRepo.findOneBy({ nome });
    if (!user || user.senha !== senha) {
      throw new BadRequestException('Credenciais espaciais incorretas.');
    }
    
    // Return appropriate session format
    return {
      name: user.nome === 'admin' ? 'Administrador da Estação' : 'Operador de Voo',
      username: user.nome,
      role: user.nome === 'admin' ? 'admin' : 'user',
    };
  }
}
