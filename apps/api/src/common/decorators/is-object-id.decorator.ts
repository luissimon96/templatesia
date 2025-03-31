import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Utility } from '../utils/utility';

/**
 * Decorator para validação de MongoDB ObjectId
 * 
 * Exemplo de uso:
 * ```
 * @IsObjectId()
 * id: string;
 * ```
 * 
 * @param validationOptions - Opções de validação
 * @returns Decorator para validação de ObjectId
 */
export function IsObjectId(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isObjectId',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `${propertyName} must be a valid MongoDB ObjectId`,
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }
          
          return Utility.isValidObjectId(value);
        },
      },
    });
  };
} 