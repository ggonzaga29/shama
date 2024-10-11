import { FileInputAcceptType } from 'src/common/types';
import { z, ZodError } from 'zod';

export const createSingleFileSchema = ({
  maxFileSize = 5 * 1024 * 1024, // 5MB
  accept,
}: {
  maxFileSize?: number;
  accept: FileInputAcceptType[];
}) => {
  return z.custom<File>().superRefine((file, ctx) => {
    // Comes from react-hook-form and I don't why
    // if (typeof file === 'string') {
    //   return true;
    // }

    // The rest is server validation

    if (!(file instanceof File)) {
      throw new ZodError([
        {
          code: z.ZodIssueCode.custom,
          message: 'Invalid file. Please try again',
          path: [],
        },
      ]);
    }

    if (file.size > maxFileSize) {
      return {
        success: false,
        message: `File size must be less than ${maxFileSize / 1024 / 1024}MB`,
      };
    }

    if (!accept.includes(file.type as FileInputAcceptType)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid file type. Accepted types: ${accept.join(', ')}`,
      });
    }

    return true;
  });
};

export const singleFileSchema = z
  .array(z.instanceof(File))
  .max(1)
  .or(z.instanceof(File));

export const multipleFilesSchema = z.array(z.instanceof(File));

// If the file submission has only one file, the shape of the schema is a single file object, not an array of files.
export const fileSchema = z.array(z.instanceof(File)).or(z.instanceof(File));
