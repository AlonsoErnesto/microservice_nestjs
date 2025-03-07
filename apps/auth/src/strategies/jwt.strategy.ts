import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from 'express'
import { Strategy } from "passport-local";
import { ExtractJwt } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { TokenPayload } from "../interfaces/token-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(
      configService: ConfigService,
      private readonly userService: UsersService
   ) {
      super({
         jwtFromRequest: ExtractJwt.fromExtractors([ 
            (request: Request) => request?.cookies?.Authentication,
         ]),
         secretOrKey: configService.get('JWT_SECRET'),
      });
   }

   async validate({userId}:TokenPayload){
      return this.userService.getUser({_id:userId});
   }
}