// src/todo-item/adapters/dto/add-todo-item.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateTodoItemDto {
  @ApiProperty({
    description: 'The title of the Todo Item',
    example: 'Buy Groceries',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the Todo Item',
    example: 'Buy groceries for the week',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Priority of the Todo Item (1 - High, 5 - Low)',
    example: 3,
  })
  @IsInt()
  @Min(1)
  @Max(20)
  priority: number;
}
