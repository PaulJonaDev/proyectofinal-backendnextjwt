import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { authenticateRole } from '@/middleware/authenticate';

async function getUsers(req: NextRequest) {
  await dbConnect();
  
  // Obtener todos los usuarios (excluyendo la contraseña)
  const users = await User.find({}).select('-password');
  
  return NextResponse.json({ users });
}

// Proteger la ruta para que solo los administradores puedan acceder
export const GET = authenticateRole(['admin'])(getUsers);