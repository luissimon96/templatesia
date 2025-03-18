import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }

  async findAll() {
    const users = await this.userModel.find().exec();
    return users.map(user => {
      const { password, ...result } = user.toObject();
      return result;
    });
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    const { password, ...result } = user.toObject();
    return result;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async create(userData: any) {
    // Hash da senha se não estiver hasheada
    if (userData.password && !userData.password.startsWith('$2')) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async update(id: string, userData: any) {
    // Hash da senha se fornecida e não estiver hasheada
    if (userData.password && !userData.password.startsWith('$2')) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, userData, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    const { password, ...result } = updatedUser.toObject();
    return result;
  }

  async delete(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return { message: 'Usuário removido com sucesso' };
  }
}
