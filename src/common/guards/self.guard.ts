import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

interface UserPayload {
  id: string | number;
  role: string;
}

@Injectable()
export class JwtSelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const user = req.user as UserPayload;
    const paramId = req.params?.id;

    if (!user) {
      throw new ForbiddenException("User info missing in request");
    }

    if (!paramId) {
      throw new ForbiddenException("Resource identifier missing");
    }

    if (user.role === "admin") {
      return true;
    }

    if (user.id !== paramId) {
      throw new ForbiddenException(
        "Unauthorized: you cannot access this information"
      );
    }

    return true;
  }
}
