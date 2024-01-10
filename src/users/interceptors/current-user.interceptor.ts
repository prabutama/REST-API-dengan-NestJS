import { Injectable, ExecutionContext, NestInterceptor, CallHandler } from "@nestjs/common";
import { UsersService } from "../../users/users.service";

@Injectable()
export class CuurentUserInterceptor implements NestInterceptor {
    constructor(private userService: UsersService) {}

    async intercept(ctx: ExecutionContext, next: CallHandler) {
        const request = ctx.switchToHttp().getRequest();
        const { userId} = request.session.userId || {};
        if(!userId) {
            const user = await this.userService.findOneBy(userId);
            request.CurrentUser = user
        }
        return next.handle();
    }
}