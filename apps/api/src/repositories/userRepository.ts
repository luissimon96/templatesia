import { Collection, ObjectId } from 'mongodb';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { connectToDatabase } from '../lib/mongodb';
import { User } from '../types/User';
import logger from '../utils/logger';

@Injectable()
export class UserRepository implements OnModuleInit {
  private collection: Collection<User>;
  private initialized = false;

  async onModuleInit() {
    await this.init();
  }

  private async init() {
    if (this.initialized) return;

    try {
      const { db } = await connectToDatabase();
      this.collection = db.collection<User>('users');

      // Criar índices
      await this.collection.createIndex({ email: 1 }, { unique: true });

      this.initialized = true;
      logger.debug('✅ UserRepository inicializado');
    } catch (error) {
      logger.error('❌ Erro ao inicializar UserRepository:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<User | null> {
    await this.init();
    try {
      return await this.collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      logger.error(`❌ Erro ao buscar usuário por ID ${id}:`, error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    await this.init();
    try {
      return await this.collection.findOne({ email });
    } catch (error) {
      logger.error(`❌ Erro ao buscar usuário por email ${email}:`, error);
      throw error;
    }
  }

  async create(userData: Omit<User, '_id'>): Promise<User> {
    await this.init();
    try {
      const result = await this.collection.insertOne({
        ...userData,
        _id: new ObjectId(),
      } as User);

      return {
        ...userData,
        _id: result.insertedId,
      } as User;
    } catch (error) {
      logger.error('❌ Erro ao criar usuário:', error);
      throw error;
    }
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    await this.init();
    try {
      const result = await this.collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...userData, updatedAt: new Date() } },
        { returnDocument: 'after' }
      );

      return result;
    } catch (error) {
      logger.error(`❌ Erro ao atualizar usuário ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    await this.init();
    try {
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch (error) {
      logger.error(`❌ Erro ao excluir usuário ${id}:`, error);
      throw error;
    }
  }
} 