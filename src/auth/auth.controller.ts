import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('signup')
    async inscription(@Body() credentials: any) {
        let result = await this.authService.signUp(credentials);
        return result
    }
}
