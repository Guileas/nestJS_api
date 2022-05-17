import { Controller, Post, Body } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { LoginDto, LogoutDto } from "src/auth/dto/login.dto";
import { AuthService } from "./auth.service";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @ApiBody({ type: LoginDto })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post("logout")
    logout(@Body() logoutDto: LogoutDto) {
        return this.authService.logout(logoutDto);
    }
}
