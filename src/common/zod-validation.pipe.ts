import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown, _metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      const first = result.error.errors[0];
      throw new BadRequestException({
        message: 'Validación fallida',
        path: first?.path?.join('.') ?? '',
        issue: first?.message,
        issues: result.error.issues,
      });
    }
    return result.data;
  }
}

