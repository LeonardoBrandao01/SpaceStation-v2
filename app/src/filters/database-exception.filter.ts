import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    const driverError = exception.driverError as any;
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Ocorreu um erro no servidor de banco de dados.';

    if (driverError && (driverError.code === 'SQLITE_CONSTRAINT' || String(driverError).includes('SQLITE_CONSTRAINT'))) {
      status = HttpStatus.CONFLICT;
      const errorMsg = String(driverError.message || driverError);
      
      if (errorMsg.includes('FOREIGN KEY constraint failed')) {
        message = 'Operação negada: Este registro está vinculado a outros dados e não pode ser removido ou alterado no momento.';
      } else if (errorMsg.includes('UNIQUE constraint failed')) {
        message = 'Operação negada: Já existe um registro cadastrado com estas especificações exclusivas.';
      } else {
        message = `Restrição de banco de dados violada: ${errorMsg}`;
      }
    } else {
      // Log generic DB errors
      console.error('Database Error:', exception.message);
      message = `Erro de persistência de dados: ${exception.message}`;
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      error: 'DatabaseConstraintError',
      timestamp: new Date().toISOString(),
    });
  }
}
