import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const authTokenHeaders = req.headers.authorization;

        if (!authTokenHeaders) {
            return res.send("Not Authorized").status(401);
        }

        // Check if token exist
        const authorized = await this.authService.findToken(authTokenHeaders);

        if (!authorized) {
            return res.send("Not Authorized").status(401);
        }
        next();
    }
}
