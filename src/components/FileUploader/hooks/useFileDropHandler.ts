import { useCallback, useState } from 'react';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

type UseFileDropHandlerProps<T extends FieldValues> = {
  maxFileSize: number;
  field: ControllerRenderProps<T, Path<T>>;
};

/**
 * Custom hook to handle file drop events.
 * Converts each file to an ArrayBuffer, creates a Blob, and uploads it using the provided onUpload function.
 *
 * @param {UseFileDropHandlerProps} props - The properties required by the hook.
 * @returns {object} - An object containing the onDrop function and the list of uploaded files.
 */
const useFileDropHandler = <T extends FieldValues>({
  maxFileSize,
  field,
}: UseFileDropHandlerProps<T>) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { onChange } = field;

  /**
   * Handles the drop event when files are dropped into the dropzone.
   * Converts each file to an ArrayBuffer and calls the onUpload function.
   *
   * @param {File[]} acceptedFiles - The files that were dropped.
   */
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter((file) => {
        if (file.size > maxFileSize) {
          console.error(
            `File size exceeds the maximum of ${maxFileSize} bytes`
          );
          return false;
        }
        return true;
      });

      if (validFiles.length > 0) {
        field.onChange(validFiles);
        setUploadedFiles(validFiles);
      }
    },
    [maxFileSize]
  );

  return { onDrop, uploadedFiles };
};

export default useFileDropHandler;
