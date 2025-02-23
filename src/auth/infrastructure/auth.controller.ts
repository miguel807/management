import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../application/authUseCase.service';
import { CreateAuthDto } from './create-auth.dto';
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserId } from './getUserId.guard';

@Controller('auth')
@ApiTags('auth') // 
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid credentials.' })
  login(@Body() createAuthDto: CreateAuthDto) {
  
    return this.authService.login(createAuthDto);
  }


  @Post("/logout")
  @ApiOperation({ summary: "Logout a user" })
  @ApiResponse({ status: 200, description: "User logged out successfully." })
  logout(@GetUserId() userId: string) {
    return this.authService.logout(userId); 
  }

  @Post("/refresh")
  @ApiOperation({ summary: "Refresh access token" }) 
  @ApiResponse({ status: 200, description: "New access token generated." })
  refresh(@Body("refreshToken") refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }
 
}
