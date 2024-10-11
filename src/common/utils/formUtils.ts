export const mapHookFormErrorsToZodIssues = (formData: FormData) => {
  const data = Object.fromEntries(formData);

  const fields: Record<string, string> = {};
  for (const key of Object.keys(formData)) {
    fields[key] = data.toString();
  }

  return fields;
};

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: 'accurate' | 'normal';
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate'
      ? (accurateSizes[i] ?? 'Bytest')
      : (sizes[i] ?? 'Bytes')
  }`;
}

export const mapInputToFormData = (input: Record<string, any>) => {
  const formData = new FormData();

  Object.entries(input).forEach(([key, value]) => {
    if (value instanceof Date) {
      formData.append(key, value.toISOString()); // Convert Date to ISO string
    } else if (
      Array.isArray(value) &&
      value.every((file) => file instanceof File)
    ) {
      value.forEach((file) => {
        formData.append(key, file);
      });
    } else if (value !== undefined && value !== null) {
      formData.append(key, value.toString()); // Convert other types to string
    }
  });

  return formData;
};
