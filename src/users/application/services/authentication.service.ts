import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(userId: string, username: string): Promise<string> {
    const payload = { sub: userId, username };
    return this.jwtService.sign(payload);
  }
}
