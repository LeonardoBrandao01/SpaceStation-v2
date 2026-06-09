import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
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
} from './entities/space.entities';
import { SpaceService } from './services/space.service';
import { SpaceController } from './controllers/space.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite' as any,
      database: path.join(__dirname, '..', '..', 'database', 'spacestation.sqlite'),
      entities: [
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
      ],
      synchronize: true,
      extra: {
        foreign_keys: true, // Enforce SQLite foreign key constraints
      },
    }),
    TypeOrmModule.forFeature([
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
    ]),
  ],
  controllers: [SpaceController],
  providers: [SpaceService],
})
export class AppModule {}
