import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verifyToken } from '../services/space.service';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler()) || 
                  this.reflector.get<string[]>('roles', context.getClass());

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    // Validar se o cabeçalho Authorization está presente e no formato correto (Bearer <token>)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Acesso negado: Identificação orbital necessária (Token ausente).');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      throw new UnauthorizedException('Acesso negado: Assinatura do token inválida ou expirada.');
    }

    // Vincular o usuário decodificado à requisição
    request.user = decoded;

    // Se a rota/método exige papéis específicos, validar se o usuário os possui
    if (roles && roles.length > 0 && !roles.includes(decoded.role)) {
      throw new ForbiddenException('Acesso negado: Nível de permissão insuficiente para esta operação orbital.');
    }

    return true;
  }
}
