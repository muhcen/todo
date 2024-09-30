import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateTodoListDto {
  @ApiProperty({
    description: 'The new title for the Todo List',
    example: 'Updated Todo List Title',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;
}
