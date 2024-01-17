import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from "class-transformer";
import { UserDto } from "src/users/dtos/user.dto";
import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";

interface ClassConstructor {
    new (...args: any[]): {};
}

export function Serialize(dto: any) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}

    intercept(
        context: ExecutionContext, 
        next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
            return next.handle().pipe(
                map((data: any) => {
                    return plainToClass(UserDto, data, {
                        excludeExtraneousValues: true,
                    })
            })
        )
    }
}