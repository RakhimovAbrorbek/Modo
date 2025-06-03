import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";

export enum UserRole {
  ADMIN = "admin",
  USER = "user"
}

@Injectable()
export class CreatorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    if (!req.user) {
      throw new ForbiddenException("User not authenticated.");
    }

    const user = req.user;
    const isAdmin = user.role === UserRole.ADMIN;
    const isCreator = user.isCreator === true;

    if (!isAdmin) {
      throw new ForbiddenException("Only admins can access this resource.");
    }

    if (!isCreator) {
      throw new ForbiddenException("User is not a creator.");
    }

    return true;
  }
}
