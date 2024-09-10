import {
  FormFieldDefinition,
  ZodFileCheck,
} from 'src/components/FormRenderer/types';
import { ZodEnum, ZodNumber, ZodString, ZodTypeAny } from 'zod';

// Zod Type Guards

export function isZodString(schema: ZodTypeAny): schema is ZodString {
  return schema instanceof ZodString;
}

export function isZodNumber(schema: ZodTypeAny): schema is ZodNumber {
  return schema instanceof ZodNumber;
}

export function isZodEnum(
  schema: ZodTypeAny
): schema is ZodEnum<[string, ...string[]]> {
  return schema instanceof ZodEnum;
}

export function isZodFile(schema: ZodTypeAny): schema is ZodFileCheck {
  return schema._def.typeName === 'ZodFile';
}

export function getFieldType(
  zodType: ZodTypeAny
): FormFieldDefinition<unknown>['type'] {
  if (isZodString(zodType)) {
    return 'text';
  }

  if (isZodNumber(zodType)) {
    return 'number';
  }

  if (isZodEnum(zodType)) {
    return 'select';
  }

  return 'text';
}

// TODO: TO BE CONTINUED
