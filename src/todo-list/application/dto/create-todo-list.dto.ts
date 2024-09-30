import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoListDto {
  @ApiProperty({
    description: 'Title of the Todo List',
    example: 'My Important Todos',
  })
  @IsString()
  @IsNotEmpty({ message: 'Title should not be empty' })
  @MaxLength(255, { message: 'Title should not exceed 255 characters' })
  readonly title: string;
}
