import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude'; // ajusta el import según tu lib

@Injectable()
export class ExcludePropertyInterceptor implements NestInterceptor {

    private readonly sanitizeInterceptor: SanitizeMongooseModelInterceptor;

    constructor() {
        this.sanitizeInterceptor = new SanitizeMongooseModelInterceptor({
            excludeMongooseId: false,
            excludeMongooseV: true,
        });
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return this.sanitizeInterceptor.intercept(context, next);
    }
}
