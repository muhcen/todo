import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class UpdateTodoItemDto {
  @ApiProperty({
    description: 'The new title of the Todo Item',
    example: 'Buy Groceries',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The new description of the Todo Item',
    example: 'Buy groceries for the week',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Updated priority of the Todo Item (1 - High, 20 - Low)',
    example: 3,
  })
  @IsInt()
  @Min(1)
  @Max(20)
  priority: number;
}
