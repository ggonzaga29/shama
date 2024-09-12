'use client';

import { Control, FieldValues } from 'react-hook-form';
import {
  FileInputField,
  InputField,
  SelectField,
  TextareaField,
} from 'src/components/FormRenderer';
import HiddenField from 'src/components/FormRenderer/components/HiddenField';
import { FormFieldDefinition } from 'src/components/FormRenderer/types';

const RenderFields = <T extends FieldValues>({
  fields,
  control,
}: {
  fields: FormFieldDefinition<T>[];
  control: Control<T, any>;
}) => {
  return (
    <>
      {fields.map((formField, index) => {
        const { type, name } = formField;
        const isAutoFocus = index === 0;

        switch (type) {
          case 'textarea':
            return (
              <TextareaField
                key={name as string}
                formField={formField}
                control={control}
                autoFocus={isAutoFocus}
              />
            );

          case 'select':
            return (
              <SelectField
                key={name as string}
                formField={formField}
                control={control}
              />
            );

          case 'file':
            return (
              <FileInputField
                key={name as string}
                formField={formField}
                control={control}
              />
            );

          case 'hidden':
            return (
              <HiddenField
                key={name as string}
                formField={formField}
                control={control}
              />
            );

          default:
            return (
              <InputField
                key={name as string}
                formField={formField}
                control={control}
                autoFocus={isAutoFocus}
              />
            );
        }
      })}
    </>
  );
};

export default RenderFields;
