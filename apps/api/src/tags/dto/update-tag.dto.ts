import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateTagDto {
  @ApiProperty({ description: 'Nome da tag', example: 'React', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Slug da tag (URL amigável)', example: 'react', required: false })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({ description: 'Número de usos da tag', example: 10, required: false })
  @IsNumber()
  @IsOptional()
  count?: number;
} 