import { Injectable, NotFoundException } from '@nestjs/common';

// Simulação de banco de dados
const users = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@templatesia.com',
    username: 'admin',
    password: '$2a$10$XgNuWtjZm9U3tpUAjpmJQOFN0vK9yvd7xgwm.Bx1.jgmY.ZgvEJEa', // senha123
    photoUrl: 'https://ui-avatars.com/api/?name=Admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Injectable()
export class UsersService {
  async findAll() {
    return users.map(user => {
      const { password, ...result } = user;
      return result;
    });
  }

  async findById(id: string) {
    const user = users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    const { password, ...result } = user;
    return result;
  }

  async findByEmail(email: string) {
    return users.find(user => user.email === email);
  }

  async create(userData: any) {
    const newUser = {
      id: (users.length + 1).toString(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(newUser);
    return newUser;
  }
}
