import { useCallback, useState } from 'react';
import { OnUploadResponse, UploadedFile } from 'src/common/types';

type UseFileDropHandlerProps = {
  maxFileSize: number;
  onUpload: (file: FormData) => Promise<OnUploadResponse>;
}

/**
 * Custom hook to handle file drop events.
 * Converts each file to an ArrayBuffer, creates a Blob, and uploads it using the provided onUpload function.
 * 
 * @param {UseFileDropHandlerProps} props - The properties required by the hook.
 * @returns {object} - An object containing the onDrop function and the list of uploaded files.
 */
const useFileDropHandler = ({
  maxFileSize,
  onUpload,
}: UseFileDropHandlerProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  /**
   * Handles the drop event when files are dropped into the dropzone.
   * Converts each file to an ArrayBuffer and calls the onUpload function.
   *
   * @param {File[]} acceptedFiles - The files that were dropped.
   */
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        if (file.size > maxFileSize) {
          console.error(
            `File size exceeds the maximum of ${maxFileSize} bytes`
          );
          return;
        }

        file.arrayBuffer().then((buffer) => {
          const blob = new Blob([buffer], { type: file.type });
          const formData = new FormData();
          formData.append('file', blob, file.name);
          onUpload(formData).then((uploadedFile) => {
            if (uploadedFile.success) {
              const newFile: UploadedFile = {
                id: uploadedFile.data.id,
                fullPath: uploadedFile.data.fullPath,
                path: uploadedFile.data.path,
              };
              setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
            }
          });
        });
      });
    },
    [maxFileSize, onUpload]
  );

  return { onDrop, uploadedFiles };
};

export default useFileDropHandler;
