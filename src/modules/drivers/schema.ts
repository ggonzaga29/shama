import { fileSchema, singleFileSchema } from 'src/common/utils/schemaUtils';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const addDriverSchema = zfd.formData({
  first_name: zfd.text(),
  middle_name: zfd.text().optional(),
  last_name: zfd.text(),
  phone: zfd.text().optional(),
  email: zfd.text(z.string().email()),
  license_number: zfd.text().optional(),
  license_expiry_date: z
    .date()
    .or(zfd.text().transform((str) => new Date(str)))
    .optional(),
  employee_id: zfd.text().optional(),
  address: zfd.text().optional(),
  birth_date: z
    .date()
    .or(zfd.text().transform((str) => new Date(str)))
    .optional(),
  avatar_file: singleFileSchema.optional(),
  files: fileSchema.optional(),
});

export const editDriverSchema = zfd.formData({
  id: zfd.text(),
  first_name: zfd.text(),
  middle_name: zfd.text().optional(),
  last_name: zfd.text(),
  phone: zfd.text().optional(),
  email: zfd.text(z.string().email()),
  license_number: zfd.text().optional(),
  license_expiry_date: z
    .date()
    .or(zfd.text().transform((str) => new Date(str)))
    .optional(),
  employee_id: zfd.text().optional(),
  address: zfd.text().optional(),
  birth_date: z
    .date()
    .or(zfd.text().transform((str) => new Date(str)))
    .optional(),
  avatar_file: singleFileSchema.optional(),
  files: fileSchema.optional(),
});
