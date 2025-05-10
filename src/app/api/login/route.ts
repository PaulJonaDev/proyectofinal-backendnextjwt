import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { loginSchema } from '@/lib/validations';
import { signToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    // Conectar a la base de datos
    await dbConnect();
    
    // Obtener y validar los datos del cuerpo de la petición
    const body = await req.json();
    
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Datos de entrada inválidos', details: result.error.format() },
        { status: 400 }
      );
    }
    
    const { email, password } = result.data;
    
    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }
    
    // Verificar contraseña
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }
    
    // Generar token JWT
    const token = signToken(user);
    
    // Devolver respuesta exitosa
    return NextResponse.json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
    
  } catch (error: any) {
    console.error('Error en el login:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}