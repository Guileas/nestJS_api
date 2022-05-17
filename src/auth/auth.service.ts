import { authToken } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";
import { LoginDto, LogoutDto } from "src/auth/dto/login.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async login(loginDto: LoginDto): Promise<string> {
        const passwordHashed = crypto
            .createHash("md5")
            .update(loginDto.password)
            .digest("hex");

        // Check if the user exist
        const user = await this.prisma.users.findFirst({
            where: {
                AND: [
                    { email: loginDto.email },
                    { password_hash: passwordHashed },
                ],
            },
        });
        // if no user found return
        if (!user) {
            return "no user found with those credentials";
        }

        // Generate a token and save it
        const userToken = crypto.randomBytes(32).toString("hex");

        // If token exist for user update it else create a new entry
        const newAuthToken = await this.prisma.authToken.upsert({
            create: {
                token: userToken,
                userId: user.id,
            },
            update: {
                token: userToken,
            },
            where: {
                userId: user.id,
            },
        });

        return newAuthToken.token;
    }

    async logout(logoutDto: LogoutDto) {
        return this.prisma.authToken.delete({
            where: { userId: logoutDto.userId },
        });
    }

    async findToken(token: string): Promise<authToken> {
        return this.prisma.authToken.findUnique({ where: { token: token } });
    }
}
