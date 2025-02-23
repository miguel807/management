import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export const GetUserId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedException("No token provided");
  }

  const token = authHeader.split(" ")[1];
  const jwtService = new JwtService(); 
  try {
    const decoded = jwtService.verify(token);
    return decoded.id; 
  } catch (error) {
    throw new UnauthorizedException("Invalid or expired token");
  }
});
