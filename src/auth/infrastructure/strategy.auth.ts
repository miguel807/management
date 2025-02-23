import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInterface } from '../domain/login.entity';
import { AuthService } from '../application/authUseCase.service';
import { UserService } from 'src/user/application/userUseCase.service';




@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: "jwt-secret"
        });
    }

    async validate(payload:LoginInterface) {
        const user = await this.userService.findOneByUsername(payload.username);
        if(!user) throw new UnauthorizedException()
        return user;
    }
}