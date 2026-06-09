import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { SpaceService } from '../services/space.service';
import { 
  CreateEspecialidadeDto,
  CreateCombustivelDto,
  CreateRelatorioDto,
  CreateEmpresaParceiraDto,
  CreateFogueteDto,
  CreateAstronautaDto,
  CreateMissaoDto,
  CreateOxigenioDto,
  CreateEstacaoDto,
  LoginDto
} from '../dto/space.dto';

@Controller('api')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  // ==========================================
  // ESPECIALIDADE
  // ==========================================
  @Get('especialidades')
  async getEspecialidades() {
    return this.spaceService.getEspecialidades();
  }

  @Get('especialidades/:id')
  async getEspecialidadeById(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getEspecialidadeById(id);
  }

  @Post('especialidades')
  async createEspecialidade(@Body() dto: CreateEspecialidadeDto) {
    return this.spaceService.createEspecialidade(dto);
  }

  @Put('especialidades/:id')
  async updateEspecialidade(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateEspecialidadeDto) {
    return this.spaceService.updateEspecialidade(id, dto);
  }

  @Delete('especialidades/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEspecialidade(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.deleteEspecialidade(id);
  }

  // ==========================================
  // COMBUSTIVEL
  // ==========================================
  @Get('combustiveis')
  async getCombustiveis() {
    return this.spaceService.getCombustiveis();
  }

  @Get('combustiveis/:id')
  async getCombustivelById(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getCombustivelById(id);
  }

  @Post('combustiveis')
  async createCombustivel(@Body() dto: CreateCombustivelDto) {
    return this.spaceService.createCombustivel(dto);
  }

  @Put('combustiveis/:id')
  async updateCombustivel(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateCombustivelDto) {
    return this.spaceService.updateCombustivel(id, dto);
  }

  @Delete('combustiveis/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCombustivel(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.deleteCombustivel(id);
  }

  // ==========================================
  // RELATORIO
  // ==========================================
  @Get('relatorios')
  async getRelatorios() {
    return this.spaceService.getRelatorios();
  }

  @Get('relatorios/:id')
  async getRelatorioById(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getRelatorioById(id);
  }

  @Post('relatorios')
  async createRelatorio(@Body() dto: CreateRelatorioDto) {
    return this.spaceService.createRelatorio(dto);
  }

  @Put('relatorios/:id')
  async updateRelatorio(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateRelatorioDto) {
    return this.spaceService.updateRelatorio(id, dto);
  }

  @Delete('relatorios/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRelatorio(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.deleteRelatorio(id);
  }

  // ==========================================
  // EMPRESA PARCEIRA
  // ==========================================
  @Get('empresas')
  async getEmpresas() {
    return this.spaceService.getEmpresas();
  }

  @Get('empresas/:id')
  async getEmpresaById(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getEmpresaById(id);
  }

  @Post('empresas')
  async createEmpresa(@Body() dto: CreateEmpresaParceiraDto) {
    return this.spaceService.createEmpresa(dto);
  }

  @Put('empresas/:id')
  async updateEmpresa(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateEmpresaParceiraDto) {
    return this.spaceService.updateEmpresa(id, dto);
  }

  @Delete('empresas/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEmpresa(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.deleteEmpresa(id);
  }

  // ==========================================
  // FOGUETE
  // ==========================================
  @Get('foguetes')
  async getFoguetes() {
    return this.spaceService.getFoguetes();
  }

  @Get('foguetes/:id')
  async getFogueteById(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getFogueteById(id);
  }

  @Post('foguetes')
  async createFoguete(@Body() dto: CreateFogueteDto) {
    return this.spaceService.createFoguete(dto);
  }

  @Put('foguetes/:id')
  async updateFoguete(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateFogueteDto) {
    return this.spaceService.updateFoguete(id, dto);
  }

  @Delete('foguetes/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFoguete(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.deleteFoguete(id);
  }

  // ==========================================
  // ASTRONAUTA
  // ==========================================
  @Get('astronautas')
  async getAstronautas() {
    return this.spaceService.getAstronautas();
  }

  @Get('astronautas/:id')
  async getAstronautaById(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getAstronautaById(id);
  }

  @Post('astronautas')
  async createAstronauta(@Body() dto: CreateAstronautaDto) {
    return this.spaceService.createAstronauta(dto);
  }

  @Put('astronautas/:id')
  async updateAstronauta(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateAstronautaDto) {
    return this.spaceService.updateAstronauta(id, dto);
  }

  @Delete('astronautas/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAstronauta(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.deleteAstronauta(id);
  }

  // ==========================================
  // MISSAO
  // ==========================================
  @Get('missoes')
  async getMissoes() {
    return this.spaceService.getMissoes();
  }

  @Get('missoes/:id')
  async getMissaoById(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getMissaoById(id);
  }

  @Post('missoes')
  async createMissao(@Body() dto: CreateMissaoDto) {
    return this.spaceService.createMissao(dto);
  }

  @Put('missoes/:id')
  async updateMissao(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateMissaoDto) {
    return this.spaceService.updateMissao(id, dto);
  }

  @Delete('missoes/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMissao(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.deleteMissao(id);
  }

  // ==========================================
  // OXIGENIO
  // ==========================================
  @Get('oxigenios')
  async getOxigenios() {
    return this.spaceService.getOxigenios();
  }

  @Get('oxigenios/:id')
  async getOxigenioById(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getOxigenioById(id);
  }

  @Post('oxigenios')
  async createOxigenio(@Body() dto: CreateOxigenioDto) {
    return this.spaceService.createOxigenio(dto);
  }

  @Put('oxigenios/:id')
  async updateOxigenio(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateOxigenioDto) {
    return this.spaceService.updateOxigenio(id, dto);
  }

  @Delete('oxigenios/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOxigenio(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.deleteOxigenio(id);
  }

  // ==========================================
  // ESTACAO
  // ==========================================
  @Get('estacoes')
  async getEstacoes() {
    return this.spaceService.getEstacoes();
  }

  @Get('estacoes/:id')
  async getEstacaoById(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getEstacaoById(id);
  }

  @Post('estacoes')
  async createEstacao(@Body() dto: CreateEstacaoDto) {
    return this.spaceService.createEstacao(dto);
  }

  @Put('estacoes/:id')
  async updateEstacao(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateEstacaoDto) {
    return this.spaceService.updateEstacao(id, dto);
  }

  @Delete('estacoes/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEstacao(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.deleteEstacao(id);
  }

  // ==========================================
  // AUTH
  // ==========================================
  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.spaceService.validateUser(dto.nome, dto.senha);
  }
}
