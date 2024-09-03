export const mapHookFormErrorsToZodIssues = (formData: FormData) => {
  const data = Object.fromEntries(formData);

  const fields: Record<string, string> = {};
  for (const key of Object.keys(formData)) {
    fields[key] = data.toString();
  }

  return fields;
};
