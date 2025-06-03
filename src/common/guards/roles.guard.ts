import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../../app.constants";

export enum UserRole {
  ADMIN = "admin",
  USER = "user"
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const req = context.switchToHttp().getRequest();

    if (!req.user) {
      throw new ForbiddenException("User not authenticated.");
    }

    const userRole: UserRole = req.user.role;

    if (!userRole) {
      throw new ForbiddenException("User role not found.");
    }

    if (userRole === UserRole.ADMIN) {
      return true;
    }

    if (!requiredRoles.includes(userRole)) {
      throw new ForbiddenException(
        "You do not have permission to perform this action."
      );
    }

    return true;
  }
}
