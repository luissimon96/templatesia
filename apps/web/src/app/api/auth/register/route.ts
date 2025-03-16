import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { z } from 'zod';
import { addUser } from '../[...nextauth]/route';

// Schema de validação para o registro
const registerSchema = z.object({
  name: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
});

export async function POST(req: Request) {
  try {
    // Obter dados do corpo da requisição
    const body = await req.json();

    // Validar dados
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      // Retornar erros de validação
      return NextResponse.json(
        {
          success: false,
          message: 'Dados inválidos',
          errors: result.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    // Aqui você faria a verificação se o email já existe no banco de dados
    // Por enquanto, vamos simular isso

    // Simular verificação de email existente (remover quando integrar com banco de dados)
    // const existingUser = await db.user.findUnique({ where: { email } });
    const existingUser = false; // Simulação

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Este email já está em uso' },
        { status: 409 }
      );
    }

    // Hash da senha
    const hashedPassword = await hash(password, 10);

    // Criar usuário usando a função addUser do NextAuth
    const user = await addUser({
      id: 'user_' + Math.random().toString(36).substring(2, 11),
      name,
      email,
      password: hashedPassword,
    });

    // Retornar resposta de sucesso (sem incluir a senha)
    return NextResponse.json(
      {
        success: true,
        message: 'Usuário criado com sucesso',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 