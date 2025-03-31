import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ description: 'Nome da tag', example: 'React' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Slug da tag (URL amigável)', example: 'react' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ description: 'Número inicial de usos da tag', example: 0, required: false })
  @IsNumber()
  @IsOptional()
  count?: number;
} 