import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../lib/jwt';

export function authenticate(handler: Function) {
  return async (req: NextRequest) => {
    // Obtener el token del header Authorization
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No autorizado - Token no proporcionado' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'No autorizado - Token inválido' },
        { status: 401 }
      );
    }

    // Añadir el usuario decodificado a la request para uso posterior
    const requestWithUser = Object.assign(req, { user: decoded });
    
    return handler(requestWithUser);
  };
}

export function authenticateRole(roles: string[]) {
  return (handler: Function) => {
    return authenticate(async (req: NextRequest & { user: any }) => {
      if (!roles.includes(req.user.role)) {
        return NextResponse.json(
          { error: 'Prohibido - No tienes permisos suficientes' },
          { status: 403 }
        );
      }
      
      return handler(req);
    });
  };
}