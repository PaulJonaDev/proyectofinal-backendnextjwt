import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { registerSchema } from '@/lib/validations';
import { signToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    // Conectar a la base de datos
    await dbConnect();
    
    // Obtener y validar los datos del cuerpo de la petición
    const body = await req.json();
    
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Datos de entrada inválidos', details: result.error.format() },
        { status: 400 }
      );
    }
    
    const { name, email, password, role } = result.data;
    
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'El usuario con este email ya existe' },
        { status: 409 }
      );
    }
    
    // Crear nuevo usuario
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'usuario'
    });
    
    // Generar token JWT
    const token = signToken(user);
    
    // Devolver respuesta exitosa
    return NextResponse.json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Error en el registro:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}