import { NextResponse } from 'next/server';
import { z } from 'zod';
import { MongoClient, ObjectId } from 'mongodb';

// Conexão com o MongoDB
const uri = process.env.MONGO_URI || '';
// Verificar se a string começa com mongodb:// ou mongodb+srv://
if (uri && (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://'))) {
  console.error('Erro na string de conexão: formato inválido');
  console.error('MONGO_URI deve começar com mongodb:// ou mongodb+srv://');
  console.error('Atual:', uri.substring(0, 20));
}
console.log('MONGO_URI register:', typeof uri, uri ? `${uri.substring(0, 20)}...${uri.substring(uri.length - 20)}` : 'não definido');
const dbName = 'templatebuilderia';

// Schema de validação para o registro
const registerSchema = z.object({
  name: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
});

export async function POST(req: Request) {
  // Verificar se a URI está definida
  if (!uri) {
    console.error('URI de conexão do MongoDB não definida');
    return NextResponse.json(
      { success: false, message: 'Erro de configuração do servidor' },
      { status: 500 }
    );
  }

  // Verificar formato da URI
  if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    console.error('URI de conexão do MongoDB em formato inválido');
    return NextResponse.json(
      { success: false, message: 'Erro de configuração do servidor: formato de URI inválido' },
      { status: 500 }
    );
  }

  let client;
  try {
    // Obter dados do corpo da requisição
    const body = await req.json();
    console.log('Dados recebidos para registro:', { ...body, password: '******' });

    // Validar dados
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      console.log('Erro de validação:', result.error.flatten().fieldErrors);
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

    // Inicializar e conectar ao MongoDB
    console.log('Tentando conectar ao MongoDB...');
    client = new MongoClient(uri);
    await client.connect();
    console.log('Conexão bem-sucedida com MongoDB');
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    // Verificar se o email já existe
    console.log(`Verificando se email já existe: ${email}`);
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      console.log('Email já está em uso');
      return NextResponse.json(
        { success: false, message: 'Este email já está em uso' },
        { status: 409 }
      );
    }

    // Hash da senha
<<<<<<< HEAD
    console.log('Gerando hash da senha');
    const hashedPassword = await hash(password, 10);
=======
    const hashedPassword = hashPassword(password);
>>>>>>> dac5285b2e7058f2342b330a60f10e22fc903b4e

    // Criar usuário
    console.log('Criando usuário no MongoDB');
    const result2 = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      photoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`,
      isAdmin: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('Usuário criado com sucesso');

    // Retornar resposta de sucesso (sem incluir a senha)
    return NextResponse.json(
      {
        success: true,
        message: 'Usuário criado com sucesso',
        user: {
          id: result2.insertedId.toString(),
          name,
          email,
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
  } finally {
    if (client) {
      await client.close();
    }
  }
} 