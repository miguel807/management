import { Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from "bcrypt"; 
import { UserService } from 'src/user/application/userUseCase.service';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
              private userService:UserService,
              private prisma: PrismaService,
              ){}


              async login(userLogin: { username: string; password: string }) {
                const user = await this.userService.findOneByUsername(userLogin.username);
              
                if (!user || !(await bcrypt.compare(userLogin.password, user.password))) {
                  throw new UnauthorizedException('Invalid credentials');
                }
              
                const payload = { username: user.username, role: "admin", id: user.id };
                const accessToken = this.jwtService.sign(payload, { expiresIn: "60m" });
                const refreshToken = this.jwtService.sign(payload, { expiresIn: "7d" });
              
                
                const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
              
                await this.prisma.refreshToken.upsert({
                  where: { userId: user.id },
                  update: { token: hashedRefreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
                  create: { userId: user.id, token: hashedRefreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
                });
              
                return { access_token: accessToken, refresh_token: refreshToken };
              }
              
            
              async logout(userId: string) {
                await this.prisma.refreshToken.deleteMany({
                  where: { userId },
                });
              }
              
            
              async refreshAccessToken(refreshToken: string) {
                try {
                  const decoded = this.jwtService.verify(refreshToken);
                  const storedToken = await this.prisma.refreshToken.findUnique({
                    where: { userId: decoded.id },
                  });
              
                  if (!storedToken) {
                    throw new UnauthorizedException("Invalid refresh token");
                  }
              
                  const isMatch = await bcrypt.compare(refreshToken, storedToken.token);
                  if (!isMatch) {
                    throw new UnauthorizedException("Invalid refresh token");
                  }
              
                  const newAccessToken = this.jwtService.sign(
                    { username: decoded.username, role: "admin", id: decoded.id },
                    { expiresIn: "60m" }
                  );
              
                  return { access_token: newAccessToken };
                } catch (error) {
                  throw new UnauthorizedException("Invalid or expired refresh token");
                }
              }
    
}
