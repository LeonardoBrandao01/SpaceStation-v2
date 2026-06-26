import { hashPassword, comparePassword, generateToken, verifyToken } from '../services/space.service';
import { RolesGuard } from './roles.guard';
import { ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

describe('Security and Authorization Tests', () => {
  describe('Password Hashing', () => {
    it('should generate a hashed password and successfully match it', () => {
      const password = 'orbitalsecret123';
      const hash = hashPassword(password);
      
      expect(hash).toContain(':');
      expect(comparePassword(password, hash)).toBe(true);
    });

    it('should fail comparing an incorrect password', () => {
      const password = 'orbitalsecret123';
      const hash = hashPassword(password);
      
      expect(comparePassword('wrongpassword', hash)).toBe(false);
    });

    it('should return false for invalid hash formats', () => {
      expect(comparePassword('pass', 'invalidhash')).toBe(false);
    });
  });

  describe('Cryptographic Tokens (HMAC-SHA256)', () => {
    it('should generate and successfully verify a signed token', () => {
      const payload = { username: 'astronauta1', role: 'user' };
      const token = generateToken(payload);
      
      expect(token).toContain('.');
      const decoded = verifyToken(token);
      expect(decoded).not.toBeNull();
      expect(decoded?.username).toBe(payload.username);
      expect(decoded?.role).toBe(payload.role);
    });

    it('should fail verification if token signature is altered', () => {
      const payload = { username: 'astronauta1', role: 'user' };
      const token = generateToken(payload);
      const alteredToken = token + 'manipulated';
      
      expect(verifyToken(alteredToken)).toBeNull();
    });

    it('should fail verification if payload portion is altered', () => {
      const payload = { username: 'astronauta1', role: 'user' };
      const token = generateToken(payload);
      const parts = token.split('.');
      // Alter raw base64 data but keep signature
      const alteredPayload = parts[0] + 'xyz';
      const alteredToken = `${alteredPayload}.${parts[1]}`;
      
      expect(verifyToken(alteredToken)).toBeNull();
    });

    it('should return null for invalid token formats', () => {
      expect(verifyToken('notatoken')).toBeNull();
      expect(verifyToken('a.b.c')).toBeNull();
    });
  });

  describe('RolesGuard with JWS Tokens', () => {
    let rolesGuard: RolesGuard;
    let reflector: Reflector;

    beforeEach(() => {
      reflector = new Reflector();
      rolesGuard = new RolesGuard(reflector);
    });

    function createMockContext(headers: Record<string, string>, handlerRoles?: string[], isPublic = false): ExecutionContext {
      const mockRequest = { headers };
      const mockHandler = () => {};
      const mockClass = class {};

      jest.spyOn(reflector, 'getAllAndOverride').mockImplementation((key) => {
        if (key === 'isPublic') return isPublic;
        return undefined;
      });

      jest.spyOn(reflector, 'get').mockImplementation((key) => {
        if (key === 'roles') return handlerRoles;
        return undefined;
      });

      return {
        switchToHttp: () => ({
          getRequest: () => mockRequest,
        }),
        getHandler: () => mockHandler,
        getClass: () => mockClass,
      } as unknown as ExecutionContext;
    }

    it('should allow request if route is marked as public', () => {
      const ctx = createMockContext({}, undefined, true);
      expect(rolesGuard.canActivate(ctx)).toBe(true);
    });

    it('should throw UnauthorizedException if Authorization header is missing', () => {
      const ctx = createMockContext({});
      expect(() => rolesGuard.canActivate(ctx)).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if Authorization header does not start with Bearer', () => {
      const ctx = createMockContext({
        'authorization': 'Basic credentials',
      });
      expect(() => rolesGuard.canActivate(ctx)).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if token signature is invalid', () => {
      const ctx = createMockContext({
        'authorization': 'Bearer invalid.token.signature',
      });
      expect(() => rolesGuard.canActivate(ctx)).toThrow(UnauthorizedException);
    });

    it('should allow request if valid user token is sent and no specific roles are required', () => {
      const token = generateToken({ username: 'operator', role: 'user' });
      const ctx = createMockContext({
        'authorization': `Bearer ${token}`,
      });
      expect(rolesGuard.canActivate(ctx)).toBe(true);
    });

    it('should throw ForbiddenException if token role is not allowed on route', () => {
      const token = generateToken({ username: 'operator', role: 'user' });
      const ctx = createMockContext(
        {
          'authorization': `Bearer ${token}`,
        },
        ['admin']
      );
      expect(() => rolesGuard.canActivate(ctx)).toThrow(ForbiddenException);
    });
    it('should allow request if token role matches allowed roles', () => {
      const token = generateToken({ username: 'director', role: 'admin' });
      const ctx = createMockContext(
        {
          'authorization': `Bearer ${token}`,
        },
        ['admin']
      );
      expect(rolesGuard.canActivate(ctx)).toBe(true);
    });
  });
});
