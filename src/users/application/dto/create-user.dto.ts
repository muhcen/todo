import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description:
      'The username of the user. Must be between 4 and 20 characters.',
    example: 'john_doe',
    minLength: 4,
    maxLength: 20,
  })
  @IsString()
  @MinLength(4, { message: 'Username must be at least 4 characters long.' })
  @MaxLength(20, { message: 'Username must be at most 20 characters long.' })
  username: string;

  @ApiProperty({
    description:
      'The password of the user. Must contain at least one uppercase letter, one lowercase letter, one number, and one special character. Must be between 8 and 30 characters.',
    example: 'Password@123',
    minLength: 8,
    maxLength: 30,
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(30, { message: 'Password must be at most 30 characters long.' })
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  password: string;
}
