import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../../app.constants";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    
    if (req.user.role === "admin") {
      return true;
    }

    if (!requiredRoles) {
      return true; 
    }


    const userRole = req.user?.role;
    if (!userRole) {
      throw new ForbiddenException("User role not found.");
    }

    const hasAccess = requiredRoles.includes(userRole);

    if (!hasAccess) {
      throw new ForbiddenException(
        "You do not have permission to perform this action."
      );
    }

    return true;
  }
}
